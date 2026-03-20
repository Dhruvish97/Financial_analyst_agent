/**
 * Weekly Market Research Script
 *
 * Run with: npm run research
 *
 * Fetches live market data via yahoo-finance2, calls Claude Opus to generate
 * updated investment theses and catalysts, patches the constants files, then
 * runs tests + build and commits + deploys.
 *
 * Requires: ANTHROPIC_API_KEY in environment (or .env.local)
 */

import Anthropic from "@anthropic-ai/sdk";
import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";
import yahooFinance from "yahoo-finance2";

const ROOT = path.join(__dirname, "..");
const client = new Anthropic(); // reads ANTHROPIC_API_KEY from env

// ── Tickers ───────────────────────────────────────────────────────────────────

const US_TICKERS = [
  "NVDA", "META", "GOOGL", "MSFT", "AMZN", "AVGO",
  "PLTR", "TSLA", "CRM", "NET", "COIN", "AMD",
];
const INDIA_TICKERS = [
  "HDFCBANK.NS", "RELIANCE.NS", "INFY.NS", "TCS.NS", "BAJFINANCE.NS",
  "HCLTECH.NS", "ZOMATO.NS", "ADANIGREEN.NS", "DMART.NS", "AXISBANK.NS",
];
const INDEX_TICKERS = ["^GSPC", "^IXIC", "^NSEI", "^BSESN"];

// ── Market data ───────────────────────────────────────────────────────────────

type QuoteSnapshot = {
  price: string;
  change: string;
  pe: string;
  weekHigh: string;
  weekLow: string;
  cap: string;
};

async function fetchMarketData(): Promise<Record<string, QuoteSnapshot>> {
  const all = [...US_TICKERS, ...INDIA_TICKERS, ...INDEX_TICKERS];
  const data: Record<string, QuoteSnapshot> = {};

  await Promise.allSettled(
    all.map(async (ticker) => {
      try {
        const q = await yahooFinance.quote(ticker);
        data[ticker] = {
          price: q.regularMarketPrice?.toFixed(2) ?? "N/A",
          change: (q.regularMarketChangePercent?.toFixed(2) ?? "0") + "%",
          pe: q.trailingPE?.toFixed(1) ?? "N/A",
          weekHigh: q.fiftyTwoWeekHigh?.toFixed(2) ?? "N/A",
          weekLow: q.fiftyTwoWeekLow?.toFixed(2) ?? "N/A",
          cap: q.marketCap ? (q.marketCap / 1e9).toFixed(1) + "B" : "N/A",
        };
      } catch {
        console.warn(`  ⚠️  Skipping ${ticker} — fetch failed`);
      }
    })
  );

  return data;
}

// ── TypeScript file patching ──────────────────────────────────────────────────
// Uses brace-counting to scope each object, then regex to update fields.

function getObjectScope(content: string, anchor: string): [number, number] | null {
  const anchorIdx = content.indexOf(anchor);
  if (anchorIdx === -1) return null;

  // Walk backward to the opening { for this object
  let start = anchorIdx;
  while (start > 0 && content[start] !== "{") start--;

  // Balance braces forward to find the matching }
  let depth = 0;
  let end = start;
  for (; end < content.length; end++) {
    if (content[end] === "{") depth++;
    else if (content[end] === "}") {
      depth--;
      if (depth === 0) break;
    }
  }

  return [start, end + 1];
}

function patchString(
  content: string,
  anchor: string,
  field: string,
  value: string
): string {
  const scope = getObjectScope(content, anchor);
  if (!scope) {
    console.warn(`  ⚠️  Anchor not found: ${anchor}`);
    return content;
  }
  const [start, end] = scope;
  const block = content.slice(start, end);

  // Match field: "..." (handles long single-line strings)
  const fieldRe = new RegExp(`([ \\t]+${field}:\\s*)"((?:[^"\\\\]|\\\\.)*)"`);
  const match = fieldRe.exec(block);
  if (!match) {
    console.warn(`  ⚠️  Field "${field}" not found for: ${anchor}`);
    return content;
  }

  const escaped = value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  const updated =
    block.slice(0, match.index) +
    match[1] +
    '"' + escaped + '"' +
    block.slice(match.index + match[0].length);

  return content.slice(0, start) + updated + content.slice(end);
}

function patchArray(
  content: string,
  anchor: string,
  field: string,
  values: string[]
): string {
  const scope = getObjectScope(content, anchor);
  if (!scope) {
    console.warn(`  ⚠️  Anchor not found: ${anchor}`);
    return content;
  }
  const [start, end] = scope;
  const block = content.slice(start, end);

  const fieldRe = new RegExp(`([ \\t]+${field}:\\s*)\\[`);
  const fieldMatch = fieldRe.exec(block);
  if (!fieldMatch) {
    console.warn(`  ⚠️  Array field "${field}" not found for: ${anchor}`);
    return content;
  }

  const arrayOpen = fieldMatch.index + fieldMatch[0].length - 1;

  // Balance brackets to find the closing ]
  let depth = 0;
  let arrayEnd = arrayOpen;
  for (; arrayEnd < block.length; arrayEnd++) {
    if (block[arrayEnd] === "[") depth++;
    else if (block[arrayEnd] === "]") {
      depth--;
      if (depth === 0) break;
    }
  }

  // Detect indentation from the field line
  const fieldLineMatch = /^([ \t]+)/m.exec(fieldMatch[0]);
  const baseIndent = fieldLineMatch ? fieldLineMatch[1] : "    ";
  const itemIndent = baseIndent + "  ";

  const newArray =
    `[\n` +
    values.map((v) => `${itemIndent}"${v.replace(/"/g, '\\"')}"`).join(",\n") +
    `,\n${baseIndent}]`;

  const updated =
    block.slice(0, arrayOpen) + newArray + block.slice(arrayEnd + 1);

  return content.slice(0, start) + updated + content.slice(end);
}

// ── Claude research ───────────────────────────────────────────────────────────

type StockUpdate = { ticker: string; rationale: string; catalysts: string[] };
type SectorUpdate = { sectorId: string; outlook: string; drivers: string[] };

async function callClaude(prompt: string): Promise<unknown> {
  const msg = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 8000,
    system:
      "You are a senior institutional equity analyst. " +
      "Return ONLY valid JSON — no markdown fences, no explanation, no preamble.",
    messages: [{ role: "user", content: prompt }],
  });
  const text = (msg.content.find((c) => c.type === "text") as { type: "text"; text: string } | undefined)?.text ?? "{}";
  return JSON.parse(text);
}

async function researchUSStocks(
  marketData: Record<string, QuoteSnapshot>,
  currentFile: string
): Promise<StockUpdate[]> {
  const dataStr = US_TICKERS.map(
    (t) => `${t}: ${JSON.stringify(marketData[t] ?? "no data")}`
  ).join("\n");

  const prompt = `Today is ${new Date().toISOString().split("T")[0]}.

You are doing the weekly Friday research refresh for an aggressive US large-cap growth portfolio.

Research frameworks (use all of these):
- Hamilton Helmer's 7 Powers (92/100): scale economies, network effects, counter-positioning, switching cost, branding, cornered resource, process power
- Bain Competitive Analysis (87/100): sector winner confirmation
- Behavioral Finance Bias Auditor (84/100): identify contrarian opportunities where analyst consensus is biased
- McKinsey Macro Report (70/100): megatrend alignment (AI infrastructure, cloud, autonomous)
- Forensic Accounting (mandatory): flag any earnings quality concerns

LIVE MARKET DATA (as of today):
${dataStr}

S&P 500: ${JSON.stringify(marketData["^GSPC"] ?? "N/A")}
NASDAQ: ${JSON.stringify(marketData["^IXIC"] ?? "N/A")}

CURRENT RESEARCH FILE (do not copy this — improve upon it with fresh analysis):
${currentFile.slice(0, 5000)}

YOUR TASK: For each ticker, write:
1. rationale: 2–3 sentences. Be specific — reference actual P/E, price levels, recent earnings, product launches, or macro catalysts. Must reflect current market conditions.
2. catalysts: 3–5 near-term catalysts with specific timeframes where possible.

Return ONLY this JSON (no markdown):
{
  "updates": [
    { "ticker": "NVDA", "rationale": "...", "catalysts": ["...", "...", "..."] },
    ...
  ]
}

Tickers: ${US_TICKERS.join(", ")}`;

  const result = (await callClaude(prompt)) as { updates: StockUpdate[] };
  return result.updates ?? [];
}

async function researchIndiaStocks(
  marketData: Record<string, QuoteSnapshot>,
  currentFile: string
): Promise<StockUpdate[]> {
  const dataStr = INDIA_TICKERS.map(
    (t) => `${t}: ${JSON.stringify(marketData[t] ?? "no data")}`
  ).join("\n");

  const prompt = `Today is ${new Date().toISOString().split("T")[0]}.

You are doing the weekly Friday research refresh for a high-conviction India equity portfolio (NSE stocks, 2–3 year horizon).

Research frameworks (adapted for India):
- Hamilton Helmer's 7 Powers: all holdings must score ≥3/7
- Behavioral Finance Bias Auditor: India-specific — RBI policy consensus anchoring, IT sector pessimism, NBFC NPA over-extrapolation
- McKinsey India Macro: capex supercycle, PLI schemes, digital India, rural credit expansion
- GARP / Peter Lynch: PEG < 1.5x for growth stocks in India context
- Forensic Accounting: SEBI filing quality, related-party transactions, promoter pledge %

LIVE MARKET DATA:
${dataStr}

NIFTY 50: ${JSON.stringify(marketData["^NSEI"] ?? "N/A")}
SENSEX: ${JSON.stringify(marketData["^BSESN"] ?? "N/A")}

CURRENT RESEARCH FILE:
${currentFile.slice(0, 5000)}

YOUR TASK: For each stock, write updated rationale (2–3 sentences referencing RBI stance, INR, domestic demand, sector-specific catalysts) and 3–4 near-term catalysts.

Return ONLY this JSON:
{
  "updates": [
    { "ticker": "HDFCBANK.NS", "rationale": "...", "catalysts": ["...", "..."] },
    ...
  ]
}

Tickers: ${INDIA_TICKERS.join(", ")}`;

  const result = (await callClaude(prompt)) as { updates: StockUpdate[] };
  return result.updates ?? [];
}

async function researchIndiaSectors(currentFile: string): Promise<SectorUpdate[]> {
  const prompt = `Today is ${new Date().toISOString().split("T")[0]}.

You are updating the India sector research cards shown on a financial dashboard.

Sectors to update (use these exact sectorId values):
- "banking" → Banking & Finance
- "it" → IT & Software
- "consumer" → Consumer & Retail
- "pharma" → Healthcare & Pharma
- "realestate" → Real Estate & Infra
- "energy" → Renewable Energy
- "defence" → Defence & Aerospace

For each sector:
1. outlook: 2–3 sentence sector-level view. Reference specific policy (PLI, SEBI, RBI, Union Budget), market size trends, or structural tailwinds.
2. drivers: 3–5 specific growth drivers (be concrete — e.g. "₹11L Cr Union Budget infra spend", not "government spending").

CURRENT FILE FOR CONTEXT:
${currentFile.slice(0, 3000)}

Return ONLY this JSON:
{
  "updates": [
    { "sectorId": "it", "outlook": "...", "drivers": ["...", "...", "..."] },
    ...
  ]
}`;

  const result = (await callClaude(prompt)) as { updates: SectorUpdate[] };
  return result.updates ?? [];
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const today = new Date().toISOString().split("T")[0];
  const monthYear = new Date().toLocaleString("en-US", { month: "long", year: "numeric" });
  console.log(`\n🔬  Weekly Market Research — ${today}\n`);

  // 1. Live market data
  console.log("📡  Fetching live market data from Yahoo Finance...");
  const marketData = await fetchMarketData();
  console.log(`    Got data for ${Object.keys(marketData).length} tickers\n`);

  // 2. Read current constants
  const portfolioPath = "constants/portfolio-stocks.ts";
  const indiaPath = "constants/india-stocks.ts";
  let portfolioFile = fs.readFileSync(path.join(ROOT, portfolioPath), "utf-8");
  let indiaFile = fs.readFileSync(path.join(ROOT, indiaPath), "utf-8");

  // 3. Research & patch US stocks
  console.log("🤖  Researching US stocks with Claude Opus...");
  const usUpdates = await researchUSStocks(marketData, portfolioFile);
  console.log(`    Got ${usUpdates.length} stock updates\n`);

  for (const update of usUpdates) {
    const anchor = `ticker: "${update.ticker}"`;
    console.log(`  ✏️   ${update.ticker}`);
    if (update.rationale) portfolioFile = patchString(portfolioFile, anchor, "rationale", update.rationale);
    if (update.catalysts?.length) portfolioFile = patchArray(portfolioFile, anchor, "catalysts", update.catalysts);
  }

  // 4. Research & patch India stocks
  console.log("\n🤖  Researching India stocks with Claude Opus...");
  const indiaStockUpdates = await researchIndiaStocks(marketData, indiaFile);
  console.log(`    Got ${indiaStockUpdates.length} stock updates\n`);

  for (const update of indiaStockUpdates) {
    const anchor = `ticker: "${update.ticker}"`;
    console.log(`  ✏️   ${update.ticker}`);
    if (update.rationale) indiaFile = patchString(indiaFile, anchor, "rationale", update.rationale);
    if (update.catalysts?.length) indiaFile = patchArray(indiaFile, anchor, "catalysts", update.catalysts);
  }

  // 5. Research & patch India sectors
  console.log("\n🤖  Researching India sectors with Claude Opus...");
  const sectorUpdates = await researchIndiaSectors(indiaFile);
  console.log(`    Got ${sectorUpdates.length} sector updates\n`);

  for (const update of sectorUpdates) {
    const anchor = `id: "${update.sectorId}"`;
    console.log(`  ✏️   sector: ${update.sectorId}`);
    if (update.outlook) indiaFile = patchString(indiaFile, anchor, "outlook", update.outlook);
    if (update.drivers?.length) indiaFile = patchArray(indiaFile, anchor, "drivers", update.drivers);
  }

  // 6. Stamp the date in the file header comments
  portfolioFile = portfolioFile.replace(
    /\* (January|February|March|April|May|June|July|August|September|October|November|December) \d{4} market refresh/,
    `* ${monthYear} market refresh`
  );
  indiaFile = indiaFile.replace(
    /\/\/ (January|February|March|April|May|June|July|August|September|October|November|December) \d{4} market refresh/,
    `// ${monthYear} market refresh`
  );

  // 7. Write files
  console.log("\n💾  Writing updated constants...");
  fs.writeFileSync(path.join(ROOT, portfolioPath), portfolioFile);
  fs.writeFileSync(path.join(ROOT, indiaPath), indiaFile);
  console.log("    ✅  constants/portfolio-stocks.ts");
  console.log("    ✅  constants/india-stocks.ts");

  // 8. Tests
  console.log("\n🧪  Running tests...");
  execSync("npm test -- --passWithNoTests", { cwd: ROOT, stdio: "inherit" });

  // 9. Build
  console.log("\n🏗️   Running build...");
  execSync("npm run build", { cwd: ROOT, stdio: "inherit" });

  // 10. Commit & push
  console.log("\n📦  Committing...");
  execSync(
    `git add ${portfolioPath} ${indiaPath}`,
    { cwd: ROOT }
  );

  const staged = execSync("git diff --staged --stat", { cwd: ROOT }).toString().trim();
  if (!staged) {
    console.log("    ℹ️   No changes detected — research content unchanged.\n");
    return;
  }

  execSync(
    `git commit -m "$(cat <<'EOF'\nresearch: weekly market refresh ${today}\n\nUpdated rationale, catalysts, and sector outlooks using live market data\nand Claude Opus analysis (7 Powers + Bain + Behavioral Finance frameworks).\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>\nEOF\n)"`,
    { cwd: ROOT, shell: "/bin/zsh" }
  );
  execSync("git push", { cwd: ROOT, stdio: "inherit" });

  // 11. Deploy
  console.log("\n🚀  Deploying to Vercel...");
  execSync("npx vercel --prod --yes", { cwd: ROOT, stdio: "inherit" });

  console.log(`\n✅  Done! Research deployed for ${today}\n`);
}

main().catch((err) => {
  console.error("\n❌  Research failed:", err.message);
  process.exit(1);
});
