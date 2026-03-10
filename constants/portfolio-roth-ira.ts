/**
 * Roth IRA Portfolio — Semi Short Term, Moderately Aggressive
 *
 * Research methodology — backtested prompt sequence (see PROMPT_ACCURACY_REPORT.md):
 *   TIER 1 (Structural Foundation — highest accuracy):
 *   - Prompt #17 Moat Destroyer (7 Powers) → 92/100 — every holding must score ≥ 3/7
 *   - Prompt #8  Bain Competitive Analysis → 87/100 — sector winner selection
 *   - Prompt #18 Behavioral Finance Bias Auditor → 84/100 — contrarian opportunity check
 *   TIER 2 (Signal Confirmation):
 *   - Prompt #6  Citadel Technical Analysis → 82/100 — RSI + entry timing
 *   - Prompt #9  Renaissance Pattern Finder → 77/100 — momentum / breakout confirmation
 *   TIER 3 (Valuation):
 *   - Prompt #11 Peter Lynch GARP → 73/100 — PEG check for profitable positions
 *   TIER 5 (Risk — mandatory):
 *   - Prompt #13 Forensic Accounting Auditor → run on every holding; all clear
 *
 * Strategy: Tax-free compounding in high-growth names. The Roth structure maximises
 * the benefit of holding high-growth assets — all gains compound and are withdrawn
 * tax-free. Concentrated in proven mega-cap compounders with the strongest 7 Powers
 * moat scores. AVGO added: custom ASIC moat is among the strongest in semiconductors.
 * CRWD increased: cybersecurity #1 platform moat confirmed by backtesting.
 * ETF allocation (QQQ, VGT) trimmed to concentrate in higher-conviction names.
 *
 * March 2026 rebuild changes:
 *   + AVGO added 7%          (custom ASIC + VMware; missing from prior version)
 *   + CRWD increased 8→10%  (top cybersecurity 7 Powers score — Falcon switching cost)
 *   − QQQ reduced 15→12%    (trimmed to fund higher-conviction individual names)
 *   − VGT reduced 10→8%     (same — concentration in moat-quality names preferred)
 *   − PLTR reduced 6→2%     (retain exposure to govt moat; trim speculative sizing)
 */

import { PortfolioDefinition } from "@/types/portfolio";

export const PORTFOLIO_ROTH_IRA: PortfolioDefinition = {
  id: "roth-ira",
  name: "Roth IRA",
  accountType: "Roth IRA",
  timeHorizon: "5–10 years",
  riskLevel: "Mod. Aggressive",
  riskColor: "text-green-400",
  accentColor: "border-green-500/40",
  cardGradient: "from-green-500/10 to-transparent",
  description:
    "A tax-free growth portfolio concentrated in AI and technology leaders with the " +
    "highest moat scores (Prompt #17 — 92/100 backtested accuracy). The Roth structure " +
    "maximises the benefit of high-growth assets — all gains compound tax-free. " +
    "Core positions in mega-cap compounders with perfect or near-perfect 7 Powers scores, " +
    "supported by AVGO (custom ASIC moat) and CRWD (Falcon switching cost). " +
    "QQQ and VGT provide diversified tech breadth. Rebuilt March 2026.",
  promptsUsed: [
    "Prompt #17 — Moat Destroyer / 7 Powers (92/100 — primary filter for every holding)",
    "Prompt #8  — Bain Competitive Analysis (87/100 — sector winner confirmation)",
    "Prompt #18 — Behavioral Finance Bias Auditor (84/100 — contrarian check)",
    "Prompt #6  — Citadel Technical Analysis (82/100 — RSI entry timing)",
    "Prompt #11 — Peter Lynch GARP (73/100 — PEG validation on profitable names)",
    "Prompt #13 — Forensic Accounting Auditor (mandatory risk filter — all clear)",
  ],
  holdings: [
    {
      ticker: "NVDA",
      name: "NVIDIA Corporation",
      type: "stock",
      sector: "AI Semiconductors",
      allocation: 18,
      rationale:
        "7 Powers score: 6/7. CUDA ecosystem = switching cost + cornered resource. " +
        "~80% AI training market share with Blackwell B200 extending moat into 2026–27. " +
        "Every AI model trained today deepens the CUDA lock-in for the next training cycle. " +
        "Roth structure makes this ideal: tax-free exit on a stock with multi-year compounding ahead.",
      color: "#76b900",
    },
    {
      ticker: "MSFT",
      name: "Microsoft Corporation",
      type: "stock",
      sector: "Cloud & AI",
      allocation: 14,
      rationale:
        "7 Powers score: 7/7 (perfect score). Azure + Office 365 enterprise lock-in. " +
        "OpenAI partnership creates recurring AI revenue above existing durable base. " +
        "Azure growing 28%+ YoY; Copilot monetisation adds per-seat revenue. " +
        "GARP check: ~28x forward earnings for a business growing 15%+ EPS with high visibility.",
      color: "#00a4ef",
    },
    {
      ticker: "GOOGL",
      name: "Alphabet Inc.",
      type: "stock",
      sector: "Internet & AI",
      allocation: 11,
      rationale:
        "7 Powers score: 6/7. 92% search moat + YouTube flywheel + Google Cloud inflecting. " +
        "Gemini 2.0 competitive with GPT-4o. Waymo and DeepMind represent multi-billion optionality. " +
        "Greenblatt screen: highest ROIC (~28%) among mega-cap internet at a discount to MSFT/META multiples.",
      color: "#4285f4",
    },
    {
      ticker: "META",
      name: "Meta Platforms Inc.",
      type: "stock",
      sector: "Social Media & AI",
      allocation: 9,
      rationale:
        "7 Powers score: 5/7. Network effects on 3.27B DAU = strongest consumer tech moat. " +
        "Prompt #18 (Behavioral Finance — 84/100): In Jan 2023, META had 55% sell ratings → returned +194%. " +
        "Llama AI models save $3B+/yr in inference costs. AI-driven ad targeting already boosted engagement 10%+.",
      color: "#0866ff",
    },
    {
      ticker: "AMZN",
      name: "Amazon.com Inc.",
      type: "stock",
      sector: "Cloud & E-Commerce",
      allocation: 9,
      rationale:
        "7 Powers score: 6/7. AWS scale leader with 32% cloud share; advertising at $60B run-rate. " +
        "Operating margin tripling as high-margin AWS/Ads become dominant. " +
        "Roth is ideal for AMZN: zero dividends (no tax drag) and all return expected via capital appreciation.",
      color: "#ff9900",
    },
    {
      ticker: "QQQ",
      name: "Invesco QQQ Trust",
      type: "etf",
      sector: "ETF — Nasdaq 100",
      allocation: 12,
      rationale:
        "Broad Nasdaq-100 exposure captures tech beta without single-stock risk. " +
        "Trimmed to 12% (was 15%) — freed allocation moved to AVGO and CRWD " +
        "where moat analysis gives higher conviction than broad-index exposure.",
      color: "#8884d8",
    },
    {
      ticker: "VGT",
      name: "Vanguard Info Technology ETF",
      type: "etf",
      sector: "ETF — Technology",
      allocation: 8,
      rationale:
        "Pure-play technology sector ETF at 0.10% fee. Provides exposure to mid-cap tech " +
        "names not fully represented in QQQ. Trimmed to 8% (was 10%) — same rationale as QQQ trim; " +
        "backtesting shows concentrated moat-quality names outperform broad-tech ETFs.",
      color: "#a78bfa",
    },
    {
      ticker: "CRWD",
      name: "CrowdStrike Holdings",
      type: "stock",
      sector: "Cybersecurity",
      allocation: 10,
      rationale:
        "7 Powers score: 5/7. Falcon platform = switching cost (single-agent consolidation) + " +
        "process power (3T+ events/week threat graph). 130%+ net revenue retention. " +
        "Increased to 10% (was 8%) — backtesting shows cybersecurity + platform consolidation thesis " +
        "is durable regardless of macro regime. Strongest moat score in cybersecurity sector.",
      color: "#f97316",
    },
    {
      ticker: "AVGO",
      name: "Broadcom Inc.",
      type: "stock",
      sector: "Semiconductors & Software",
      allocation: 7,
      rationale:
        "7 Powers score: 5/7. Custom AI ASIC chips (Google TPU, Meta MTIA) = multi-year switching cost. " +
        "VMware acquisition adds high-margin recurring software revenue (50%+ EBITDA). " +
        "Added to Roth IRA — was missing from prior version. ASIC demand is the biggest AI chip " +
        "story beyond NVDA, and Broadcom is the only scaled competitor. Ideal Roth holding: no dividend.",
      color: "#cc0000",
    },
    {
      ticker: "PLTR",
      name: "Palantir Technologies",
      type: "stock",
      sector: "AI & Government Analytics",
      allocation: 2,
      rationale:
        "7 Powers score: 4/7. Cornered resource in government intelligence data + AIP switching cost. " +
        "Reduced to 2% (was 6%) — valuation premium (PS ~25x) limits sizing. " +
        "Retain small position for AIP commercial acceleration optionality; add on pullbacks below $60.",
      color: "#6366f1",
    },
  ],
};

export const TICKERS_ROTH_IRA = PORTFOLIO_ROTH_IRA.holdings.map((h) => h.ticker);
