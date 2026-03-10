/**
 * Aggressive Stocks Portfolio — Large Cap + Select Mid Cap
 *
 * Research methodology — backtested prompt sequence (see PROMPT_ACCURACY_REPORT.md):
 *   TIER 1 (Structural Foundation — highest accuracy):
 *   - Prompt #17 Moat Destroyer (7 Powers) → 92/100 accuracy — every holding must score ≥ 3/7
 *   - Prompt #8  Bain Competitive Analysis → 87/100 — sector winner confirmation
 *   - Prompt #18 Behavioral Finance Bias Auditor → 84/100 — contrarian opportunity ID
 *   TIER 2 (Signal Confirmation):
 *   - Prompt #6  Citadel Technical Analysis → 82/100 — RSI + entry timing validation
 *   - Prompt #19 Options Flow Intelligence → 80/100 — institutional accumulation check
 *   TIER 3 (Valuation):
 *   - Prompt #11 Peter Lynch GARP → 73/100 — PEG check for profitable names
 *   - Prompt #15 Greenblatt Magic Formula → 72/100 — ROIC + earnings yield
 *   TIER 4 (Macro / Theme):
 *   - Prompt #10 McKinsey Macro Report → 70/100 — megatrend alignment
 *   TIER 5 (Risk — mandatory):
 *   - Prompt #13 Forensic Accounting Auditor → run on every holding; all pass
 *   - Prompt #3  Bridgewater Risk Assessment → concentration + correlation check
 *
 * Strategy: Maximum growth with guardrails. Only large-cap and well-established
 * mid-cap companies — no speculative names, no penny stocks, no pre-revenue plays.
 * Every holding must have positive operating income, $10B+ market cap, and a
 * defensible competitive moat (min 3 of Hamilton Helmer's 7 Powers).
 * Concentrated in AI infrastructure, cloud, and platform businesses that compound
 * best over a 3–7 year horizon.
 *
 * March 2026 rebuild changes vs original:
 *   + AVGO increased 8→10%  (custom ASIC moat accelerating for Google/Meta)
 *   + COIN added 3%          (S&P 500 member, GAAP profitable, BTC ETF volume)
 *   − TSLA reduced 7→5%     (weakest 7 Powers score; no scale/switching-cost moat)
 *   − NET reduced 6→4%      (valid edge moat but lower conviction vs core names)
 *   − PLTR reduced 5→4%     (speculative; thin GAAP margin; government moat intact)
 */

import { PortfolioDefinition } from "@/types/portfolio";

export const PORTFOLIO_STOCKS: PortfolioDefinition = {
  id: "stocks",
  name: "Stocks",
  accountType: "Taxable Brokerage",
  timeHorizon: "3–7 years",
  riskLevel: "Aggressive",
  riskColor: "text-red-400",
  accentColor: "border-red-500/40",
  cardGradient: "from-red-500/10 to-transparent",
  description:
    "An aggressive growth portfolio restricted to large-cap and established mid-cap " +
    "companies — no penny stocks, no pre-revenue speculation. Every holding must score " +
    "≥ 3/7 on Hamilton Helmer's 7 Powers framework (Prompt #17 — 92/100 backtested accuracy). " +
    "Concentrated in AI infrastructure (NVDA, AVGO), hyperscale cloud (MSFT, AMZN, GOOGL), " +
    "high-growth platforms (META, COIN), and mission-critical software (CRWD, NET, PLTR). " +
    "Rebuilt March 2026 using the validated prompt accuracy sequence.",
  promptsUsed: [
    "Prompt #17 — Moat Destroyer / 7 Powers (92/100 — primary structural filter)",
    "Prompt #8  — Bain Competitive Analysis (87/100 — sector winner selection)",
    "Prompt #18 — Behavioral Finance Bias Auditor (84/100 — contrarian ID)",
    "Prompt #6  — Citadel Technical Analysis (82/100 — entry timing)",
    "Prompt #11 — Peter Lynch GARP (73/100 — PEG validation)",
    "Prompt #13 — Forensic Accounting Auditor (mandatory risk filter — all clear)",
  ],
  holdings: [
    {
      ticker: "NVDA",
      name: "NVIDIA Corporation",
      type: "stock",
      sector: "AI Semiconductors",
      allocation: 20,
      rationale:
        "7 Powers score: 6/7. CUDA ecosystem = switching cost (every AI model trained deepens lock-in) + " +
        "cornered resource (GPU talent + CUDA library monopoly) + scale economies + process power. " +
        "Dominant 80% AI training market share with H200/B200 Blackwell architecture extending lead. " +
        "Backtested: #17 Moat correctly identified NVDA as buy even during Jan 2023 semiconductor downturn.",
      color: "#76b900",
    },
    {
      ticker: "MSFT",
      name: "Microsoft Corporation",
      type: "stock",
      sector: "Cloud & Enterprise AI",
      allocation: 15,
      rationale:
        "7 Powers score: 7/7 (rare perfect score). Azure + Office 365 = switching cost (enterprise data lock-in) + " +
        "network effects (Teams/LinkedIn) + scale economies + process power (OpenAI partnership moat). " +
        "Azure growing 28%+ YoY. Copilot monetisation creating new per-seat revenue above the existing base. " +
        "Government cloud (JEDI/JWCC), gaming (Activision), and LinkedIn add rare multi-platform resilience.",
      color: "#00a4ef",
    },
    {
      ticker: "META",
      name: "Meta Platforms Inc.",
      type: "stock",
      sector: "Social Media & AI",
      allocation: 12,
      rationale:
        "7 Powers score: 5/7. Network effects on 3.27B DAU = the strongest single moat in consumer tech. " +
        "WhatsApp/Instagram/FB form a closed social graph that is structurally impossible to replicate. " +
        "Prompt #18 (Behavioral Finance): Jan 2023 analyst consensus was 55% sell — contrarian buyers returned +194%. " +
        "Llama open-source models reduce AI infra costs by $3B+/yr, compounding operating leverage.",
      color: "#0866ff",
    },
    {
      ticker: "GOOGL",
      name: "Alphabet Inc.",
      type: "stock",
      sector: "Internet & AI",
      allocation: 10,
      rationale:
        "7 Powers score: 6/7. 92% search share = unassailable scale economy + counter-positioning vs ChatGPT " +
        "(Search has real-time indexing no LLM can match). Google Cloud +28% YoY, Gemini 2.0 competitive. " +
        "Waymo robotaxi (10M+ autonomous miles) and DeepMind represent multi-hundred-billion unpriced optionality. " +
        "Greenblatt Magic Formula: highest ROIC in mega-cap internet (~28%) at a reasonable 20x forward earnings.",
      color: "#4285f4",
    },
    {
      ticker: "AMZN",
      name: "Amazon.com Inc.",
      type: "stock",
      sector: "Cloud & E-Commerce",
      allocation: 10,
      rationale:
        "7 Powers score: 6/7. AWS scale economy (32% cloud market share, 5x more cloud revenue than #3 Azure) + " +
        "logistics flywheel switching cost (Prime ecosystem). Advertising segment ($60B+ run-rate) now rivals Google. " +
        "Operating margins tripled 2023→2025 as high-margin AWS/Ads overtake low-margin retail — margin expansion story intact.",
      color: "#ff9900",
    },
    {
      ticker: "AVGO",
      name: "Broadcom Inc.",
      type: "stock",
      sector: "Semiconductors & Software",
      allocation: 10,
      rationale:
        "7 Powers score: 5/7. Custom AI ASIC chips for Google (TPU v5) and Meta (MTIA) = switching cost moat " +
        "(multi-year design partnerships lock hyperscalers in for 3–5 year silicon cycles). " +
        "VMware acquisition adds recurring software revenue — rare semiconductor + software hybrid with 50%+ EBITDA margins. " +
        "Increased to 10% (was 8%) — accelerating ASIC demand is the biggest structural shift in AI chips beyond NVDA.",
      color: "#cc0000",
    },
    {
      ticker: "CRWD",
      name: "CrowdStrike Holdings",
      type: "stock",
      sector: "Cybersecurity",
      allocation: 7,
      rationale:
        "7 Powers score: 5/7. Falcon platform = switching cost (single-agent security consolidation) + process power " +
        "(threat graph trained on 3T+ events/week, impossible to replicate from scratch). " +
        "130%+ net revenue retention confirms customers expand rather than churn. " +
        "Cybersecurity spend is non-discretionary — grows with AI threat surface expansion. Rule-of-40 positive.",
      color: "#f97316",
    },
    {
      ticker: "TSLA",
      name: "Tesla Inc.",
      type: "stock",
      sector: "EV & Autonomous / Robotics",
      allocation: 5,
      rationale:
        "7 Powers score: 3/7. Weakest moat in this portfolio — EV is becoming a commoditised market. " +
        "FSD software + Optimus robot represent genuine asymmetric optionality on a $10T+ robotics TAM. " +
        "Reduced to 5% (was 7%) — 7 Powers analysis confirms the manufacturing moat is eroding while software " +
        "optionality remains real but uncertain. Size reflects asymmetry rather than conviction.",
      color: "#e82127",
    },
    {
      ticker: "NET",
      name: "Cloudflare Inc.",
      type: "stock",
      sector: "Edge Computing & AI",
      allocation: 4,
      rationale:
        "7 Powers score: 4/7. Global edge network in 330+ cities processes 20% of all internet traffic — " +
        "a scale economy with network effects (every node makes the whole network faster). " +
        "Workers AI platform captures AI inference at the edge. 130%+ NRR confirms product-market fit. " +
        "Reduced to 4% (was 6%) — high-quality business but valuation premium limits near-term upside.",
      color: "#f6821f",
    },
    {
      ticker: "PLTR",
      name: "Palantir Technologies",
      type: "stock",
      sector: "AI & Government Analytics",
      allocation: 4,
      rationale:
        "7 Powers score: 4/7. Cornered resource (classified government intelligence data partnerships) + " +
        "switching cost (AIP deeply embedded in enterprise workflows). " +
        "AIP commercial revenue growing 50%+ YoY; US government contracts provide a profitable base. " +
        "Reduced to 4% (was 5%) — valuation (PS ~25x) limits sizing despite genuine moat quality.",
      color: "#6366f1",
    },
    {
      ticker: "COIN",
      name: "Coinbase Global Inc.",
      type: "stock",
      sector: "Crypto Finance",
      allocation: 3,
      rationale:
        "7 Powers score: 3/7. US crypto market scale leader + regulatory moat (licensed in 50 states, " +
        "first crypto company in S&P 500). GAAP net income $2.6B in 2024. Bitcoin spot ETF approval drives " +
        "institutional custody and trading volume. Prompt #18: regulatory optimism under new SEC regime is " +
        "not yet fully priced in. Starter 3% position — add on dips toward $150–180.",
      color: "#0052ff",
    },
  ],
};

export const TICKERS_STOCKS = PORTFOLIO_STOCKS.holdings.map((h) => h.ticker);
