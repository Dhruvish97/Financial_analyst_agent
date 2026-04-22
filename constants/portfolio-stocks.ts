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
 *
 * March 2026 market refresh (research update — current intelligence):
 *   + PLTR increased 4→5%   (US commercial +137% YoY Q4; $7.2B FY26 revenue guidance +61%; AIP executing)
 *   − NET reduced 4→3%      (funded PLTR increase; NET still quality but PLTR revenue growth > edge)
 *   ~ NVDA updated           (Blackwell B200 extending moat; +73% revenue to $68.1B Q4 FY26)
 *   ~ META updated           ($27B Nebius AI infrastructure deal; CapEx raised to $115–135B 2026)
 *   ~ TSLA updated           (Cybercab production April 2026; Optimus 1M/yr target; stock ~$405 at 210x)
 *   ~ GOOGL updated          (Gemini 2.0 competitive with GPT-4o; Waymo scaling; Cloud +28%)
 *
 * April 2026 market refresh (research update — current intelligence):
 *   ~ NVDA updated           (Stock ~$198, forward P/E ~24x — cheapest in 3 yrs; May 20 earnings, ~$78B rev guidance expected; hyperscaler capex >$600B 2026 +36% YoY)
 *   ~ META updated           (3.58B DAU +7% YoY; Advantage+ AI ads $60B run-rate; MTIA 1GW chip deployment Apr 14; CapEx $115–135B unchanged)
 *   ~ MSFT updated           (Stock -23% YTD = Prompt #18 contrarian signal; Azure/Copilot monetisation intact; Q1 2026 earnings week of Apr 29)
 *   ~ GOOGL updated          (Stock ~$336; Q1 2026 earnings Apr 29, $107.7B expected +18% YoY; Google Cloud >50% growth; $243B backlog; KeyBanc Cloud $91.8B 2026 target)
 *   ~ AMZN updated           (AWS +24% Q4 2025, fastest in 13 qtrs; AI revenue >$15B annual run-rate; Ads $60B+ run-rate; Q1 earnings Apr 29)
 *   ~ AVGO updated           (Q1 FY2026: $19.3B rev +29% YoY; AI semiconductor $8.4B +106% YoY — mega AI ASIC cycle confirmed; EPS beat $2.05 vs $1.88)
 *   ~ TSLA updated           (Q1 2026 earnings Apr 22; consensus $0.36/$21.9B; 50K-unit inventory overhang; energy storage headwinds; growth narrative under pressure)
 *   ~ PLTR updated           (Q4 2025 US commercial +137% YoY; FY2025 rev $4.475B +56%; FY2026 guidance $7.2B +61%; GAAP net income $1.625B; Q1 earnings May 4)
 *   ~ NET updated            (Q1 2026 earnings Apr 30; Q1 guidance $620–621M; FY2026 guidance $2.785–$2.795B)
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
        "Q1 FY27 (calendar Q1 2026) earnings due May 20 — analysts expect ~$78B revenue guidance. " +
        "Stock ~$198, trailing P/E ~41x, forward P/E ~24x — cheapest vs 3-yr average of 69x (earnings growing faster than multiple). " +
        "Blackwell B200/GB200 NVL72 architecture deepens CUDA switching cost into 2027–28. " +
        "Hyperscaler capex exceeds $600B in 2026 (+36% YoY), ~$450B AI-specific — NVDA captures the largest share.",
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
        "Stock -23% YTD April 2026 — Prompt #18 (Behavioral Finance) flags a textbook contrarian entry; the business moat is structurally intact. " +
        "Q1 2026 earnings due Apr 29; Azure growth and Copilot per-seat monetisation are the key revenue drivers. " +
        "Government cloud (JEDI/JWCC), gaming (Activision synergies), and LinkedIn add rare multi-platform resilience.",
      color: "#00a4ef",
    },
    {
      ticker: "META",
      name: "Meta Platforms Inc.",
      type: "stock",
      sector: "Social Media & AI",
      allocation: 12,
      rationale:
        "7 Powers score: 5/7. Network effects on 3.58B DAU (+7% YoY) = the strongest single moat in consumer tech. " +
        "WhatsApp/Instagram/FB form a closed social graph that is structurally impossible to replicate. " +
        "Prompt #18 (Behavioral Finance): Jan 2023 analyst consensus was 55% sell — contrarian buyers returned +194%. " +
        "AI Advantage+ advertising suite at $60B annual run-rate. April 14, 2026: committed to deploying 1GW of custom MTIA chips — " +
        "a structural signal that Meta is building proprietary silicon to reduce long-term inference costs. " +
        "2026 CapEx guidance $115–135B, signalling hyper-aggressive AI infrastructure buildout. Llama open-source cuts inference costs $3B+/yr.",
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
        "(Search has real-time indexing no LLM can match). Stock ~$336; Q1 2026 earnings Apr 29 — " +
        "consensus $2.68 EPS on $106.9B revenue (+18% YoY). Google Cloud growth expected >50% YoY driven by Gemini and enterprise AI. " +
        "$243B cloud backlog provides unprecedented revenue visibility. KeyBanc 2026 Cloud revenue forecast $91.8B — 8% above Wall Street consensus. " +
        "Waymo commercially deployed and scaling. Greenblatt: highest ROIC in mega-cap internet (~28%).",
      color: "#4285f4",
    },
    {
      ticker: "AMZN",
      name: "Amazon.com Inc.",
      type: "stock",
      sector: "Cloud & E-Commerce",
      allocation: 10,
      rationale:
        "7 Powers score: 6/7. AWS scale economy (32% cloud market share) + logistics flywheel switching cost (Prime ecosystem). " +
        "AWS grew 24% in Q4 2025 — fastest pace in 13 quarters — with AI-driven cloud revenue crossing $15B annual run-rate. " +
        "Advertising segment at $60B+ run-rate now rivals Google Ads as a standalone business. " +
        "Q1 2026 earnings Apr 29. Operating margins tripled 2023–2025 as high-margin AWS/Ads overtake low-margin retail.",
      color: "#ff9900",
    },
    {
      ticker: "AVGO",
      name: "Broadcom Inc.",
      type: "stock",
      sector: "Semiconductors & Software",
      allocation: 10,
      rationale:
        "7 Powers score: 5/7. Custom AI ASIC chips for Google (TPU) and Meta (MTIA) = switching cost moat " +
        "(multi-year design partnerships lock hyperscalers in for 3–5 year silicon cycles). " +
        "Q1 FY2026 results (Mar 4): $19.3B revenue +29% YoY; AI semiconductor revenue $8.4B +106% YoY — custom ASIC cycle accelerating faster than consensus expected. EPS $2.05 beat $1.88 estimate by 9%. " +
        "VMware adds recurring software revenue; 50%+ EBITDA margins intact. " +
        "Increased to 10% (was 8%) — ASIC demand is the biggest structural shift in AI chips beyond NVDA.",
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
        "7 Powers score: 3/7. Weakest moat in this portfolio — EV is becoming a commoditised market with BYD/Chinese " +
        "OEMs compressing margins. Q1 2026 earnings Apr 22: consensus $0.36 EPS, $21.9B revenue. " +
        "50,000-unit inventory overhang and energy storage headwinds cloud near-term results. FSD v13 progress real but Cybercab production timelines remain unconfirmed. " +
        "Prompt #18 (Behavioral Finance): analyst consensus increasingly negative on EV thesis — same sentiment pattern that historically precedes re-ratings. " +
        "5% size reflects robotics/autonomy optionality on a $10T+ TAM, not EV conviction. Monitor Cybercab production timeline and inventory drawdown.",
      color: "#e82127",
    },
    {
      ticker: "NET",
      name: "Cloudflare Inc.",
      type: "stock",
      sector: "Edge Computing & AI",
      allocation: 3,
      rationale:
        "7 Powers score: 4/7. Global edge network in 330+ cities processes 20% of all internet traffic — " +
        "a scale economy with network effects (every node makes the whole network faster). " +
        "Workers AI platform captures AI inference at the edge. Q1 2026 earnings Apr 30: guidance $620–621M; FY2026 guidance $2.785–$2.795B with operating income $378–382M. " +
        "130%+ NRR confirms product-market fit. Reduced to 3% — high-quality business; PLTR revenue acceleration currently justifies heavier sizing.",
      color: "#f6821f",
    },
    {
      ticker: "PLTR",
      name: "Palantir Technologies",
      type: "stock",
      sector: "AI & Government Analytics",
      allocation: 5,
      rationale:
        "7 Powers score: 4/7. Cornered resource (classified government intelligence data partnerships) + " +
        "switching cost (AIP deeply embedded in enterprise and government workflows). " +
        "Q4 2025: US commercial revenue +137% YoY. FY2025 total revenue $4.475B (+56% YoY), GAAP net income $1.625B. " +
        "FY2026 guidance $7.2B (+61% YoY) with US commercial >$3.1B (+115% YoY) — AIP is a production revenue engine, not a proof-of-concept. " +
        "Stock ~$135–145 (down from $177 Jan start), forward multiple compressing as revenue catches up. Q1 2026 earnings May 4. " +
        "Morgan Stanley flags 'strong setup' for May earnings. Increased to 5% — AIP execution justifies elevated sizing.",
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
