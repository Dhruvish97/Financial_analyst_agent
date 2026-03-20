/**
 * Weekly Market Research — Data Snapshot
 *
 * Run with: npm run research
 *
 * Fetches live market data and saves a snapshot to .research-snapshot.json.
 * Then ask Claude Code to "run the weekly research" — it reads the snapshot,
 * web-searches for recent news/earnings, updates the constants files,
 * runs tests + build, and commits + deploys. No API key required.
 */

import * as fs from "fs";
import * as path from "path";
import yahooFinance from "yahoo-finance2";

const ROOT = path.join(__dirname, "..");
const SNAPSHOT_PATH = path.join(ROOT, ".research-snapshot.json");

const US_TICKERS = [
  "NVDA", "META", "GOOGL", "MSFT", "AMZN", "AVGO",
  "PLTR", "TSLA", "CRM", "NET", "COIN", "AMD",
];
const INDIA_TICKERS = [
  "HDFCBANK.NS", "RELIANCE.NS", "INFY.NS", "TCS.NS", "BAJFINANCE.NS",
  "HCLTECH.NS", "ZOMATO.NS", "ADANIGREEN.NS", "DMART.NS", "AXISBANK.NS",
];
const INDEX_TICKERS = ["^GSPC", "^IXIC", "^NSEI", "^BSESN"];

type QuoteSnapshot = {
  price: number | null;
  changePercent: number | null;
  pe: number | null;
  weekHigh: number | null;
  weekLow: number | null;
  marketCapB: number | null; // in billions
};

async function fetchAll(): Promise<Record<string, QuoteSnapshot>> {
  const all = [...US_TICKERS, ...INDIA_TICKERS, ...INDEX_TICKERS];
  const data: Record<string, QuoteSnapshot> = {};

  await Promise.allSettled(
    all.map(async (ticker) => {
      try {
        const q = await yahooFinance.quote(ticker);
        data[ticker] = {
          price: q.regularMarketPrice ?? null,
          changePercent: q.regularMarketChangePercent ?? null,
          pe: q.trailingPE ?? null,
          weekHigh: q.fiftyTwoWeekHigh ?? null,
          weekLow: q.fiftyTwoWeekLow ?? null,
          marketCapB: q.marketCap ? q.marketCap / 1e9 : null,
        };
      } catch {
        console.warn(`  ⚠️  Skipping ${ticker}`);
        data[ticker] = { price: null, changePercent: null, pe: null, weekHigh: null, weekLow: null, marketCapB: null };
      }
    })
  );

  return data;
}

async function main() {
  const fetchedAt = new Date().toISOString();
  console.log(`\n📡  Fetching live market data — ${fetchedAt.split("T")[0]}\n`);

  const quotes = await fetchAll();
  const fetched = Object.values(quotes).filter((q) => q.price !== null).length;

  const snapshot = { fetchedAt, quotes };
  fs.writeFileSync(SNAPSHOT_PATH, JSON.stringify(snapshot, null, 2));

  console.log(`    Got live data for ${fetched}/${Object.keys(quotes).length} tickers`);
  console.log(`    Saved to .research-snapshot.json\n`);

  // Print a quick summary table
  console.log("── US Portfolio ─────────────────────────────────────");
  for (const t of US_TICKERS) {
    const q = quotes[t];
    if (!q?.price) { console.log(`  ${t.padEnd(8)} —`); continue; }
    const chg = q.changePercent != null ? (q.changePercent >= 0 ? "+" : "") + q.changePercent.toFixed(2) + "%" : "—";
    const pe  = q.pe != null ? `P/E ${q.pe.toFixed(1)}` : "";
    console.log(`  ${t.padEnd(8)} $${q.price.toFixed(2).padStart(8)}  ${chg.padStart(8)}  ${pe}`);
  }

  console.log("\n── India Portfolio ──────────────────────────────────");
  for (const t of INDIA_TICKERS) {
    const q = quotes[t];
    const display = t.replace(".NS", "").padEnd(12);
    if (!q?.price) { console.log(`  ${display} —`); continue; }
    const chg = q.changePercent != null ? (q.changePercent >= 0 ? "+" : "") + q.changePercent.toFixed(2) + "%" : "—";
    console.log(`  ${display} ₹${q.price.toFixed(2).padStart(9)}  ${chg.padStart(8)}`);
  }

  console.log("\n── Indices ──────────────────────────────────────────");
  const indexLabels: Record<string, string> = { "^GSPC": "S&P 500", "^IXIC": "NASDAQ", "^NSEI": "NIFTY 50", "^BSESN": "SENSEX" };
  for (const t of INDEX_TICKERS) {
    const q = quotes[t];
    if (!q?.price) continue;
    const chg = q.changePercent != null ? (q.changePercent >= 0 ? "+" : "") + q.changePercent.toFixed(2) + "%" : "—";
    console.log(`  ${indexLabels[t].padEnd(12)} ${q.price.toFixed(0).padStart(9)}  ${chg.padStart(8)}`);
  }

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅  Snapshot ready. Now ask Claude Code:

    "Run the weekly research update"

Claude will read the snapshot, web-search for recent
news and earnings, update the constants files, run
tests + build, and commit + deploy automatically.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
}

main().catch((err) => {
  console.error("❌  Snapshot failed:", err.message);
  process.exit(1);
});
