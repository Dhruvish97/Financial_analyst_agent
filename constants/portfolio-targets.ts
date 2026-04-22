// ── Portfolio Target Definitions ──────────────────────────────────────────────
// Based on backtested prompt accuracy research (PROMPT_ACCURACY_REPORT.md)
// Conservative: capital preservation + income · Aggressive: maximum growth

export type PortfolioStyle = "conservative" | "aggressive" | "india-conservative" | "india-aggressive";
export type Market = "us" | "india";

export interface SectorTarget {
  sector: string;
  targetPct: number;       // target allocation %
  description: string;     // why this sector
  suggestedBuys: string[]; // specific tickers to buy into this sector
  color: string;           // for UI
}

export interface PortfolioTarget {
  style: PortfolioStyle;
  market: Market;
  currency: "USD" | "INR";
  label: string;
  tagline: string;
  description: string;
  riskLevel: string;
  timeHorizon: string;
  icon: string;
  accentColor: string;
  sectors: SectorTarget[];
}

// ── US Conservative ───────────────────────────────────────────────────────────

export const CONSERVATIVE_TARGET: PortfolioTarget = {
  style: "conservative",
  market: "us",
  currency: "USD",
  label: "Conservative",
  tagline: "Capital Preservation + Steady Income",
  description:
    "Prioritises protecting principal and generating reliable income. " +
    "Heavy bond allocation buffers against market downturns. " +
    "Equity exposure limited to dividend-paying blue chips and broad-market ETFs.",
  riskLevel: "Low–Medium",
  timeHorizon: "3–7 years",
  icon: "🛡️",
  accentColor: "#22c55e",
  sectors: [
    {
      sector: "Bonds / Fixed Income",
      targetPct: 35,
      description: "Core ballast — buffers volatility and generates income",
      suggestedBuys: ["BND", "AGG", "VGSH", "SGOV"],
      color: "#6366f1",
    },
    {
      sector: "Dividend / Value Equity",
      targetPct: 25,
      description: "Steady dividend growers with strong 7-Powers moats",
      suggestedBuys: ["SCHD", "VYM", "KO", "PG", "JNJ"],
      color: "#22c55e",
    },
    {
      sector: "Broad Market ETF",
      targetPct: 15,
      description: "Low-cost index exposure for long-run market beta",
      suggestedBuys: ["VTI", "VOO", "SPY"],
      color: "#3b82f6",
    },
    {
      sector: "International",
      targetPct: 12,
      description: "Geographic diversification reduces single-country risk",
      suggestedBuys: ["VXUS", "VEA", "EFA"],
      color: "#f59e0b",
    },
    {
      sector: "REITs",
      targetPct: 8,
      description: "Real asset income stream uncorrelated with equities",
      suggestedBuys: ["VNQ", "O", "WELL"],
      color: "#ec4899",
    },
    {
      sector: "Healthcare",
      targetPct: 5,
      description: "Defensive sector — non-cyclical demand",
      suggestedBuys: ["JNJ", "UNH", "VHT"],
      color: "#14b8a6",
    },
  ],
};

// ── US Aggressive ─────────────────────────────────────────────────────────────

export const AGGRESSIVE_TARGET: PortfolioTarget = {
  style: "aggressive",
  market: "us",
  currency: "USD",
  label: "Aggressive",
  tagline: "Maximum Growth · High Conviction",
  description:
    "Concentrates in high-7-Powers moat companies and secular megatrends: " +
    "AI infrastructure, cybersecurity, and digital payments. " +
    "Accepts short-term volatility in exchange for outsized 5–10 year returns. " +
    "April 22, 2026 macro: Fed holding rate at 3.5–3.75% (Powell term expires May 15 — Chair transition adds uncertainty); S&P 500 +4.23% YTD (recovered from -19% tariff shock); " +
    "Q1 2026 earnings growth ~13% expected — 6th consecutive double-digit quarter; hyperscaler CapEx ~$700B in 2026 (~60% YoY increase), ~$450B AI-specific. " +
    "Mega-cap earnings catalyst week Apr 29: MSFT, META, GOOGL, AMZN all report simultaneously. AVGO Q1 FY2026 AI semiconductor +106% YoY confirmed. " +
    "MSFT -20% YTD = textbook Prompt #18 contrarian signal; PLTR FY2026 guidance $7.2B (+61% YoY); recession risk low at 20% per Morgan Stanley.",
  riskLevel: "Aggressive",
  timeHorizon: "5–10+ years",
  icon: "🚀",
  accentColor: "#f59e0b",
  sectors: [
    {
      sector: "Technology / AI",
      targetPct: 35,
      description: "CUDA moat + scale economies — dominant AI infrastructure",
      suggestedBuys: ["NVDA", "MSFT", "META", "GOOGL", "AVGO", "AAPL"],
      color: "#8b5cf6",
    },
    {
      sector: "Cybersecurity / Cloud",
      targetPct: 15,
      description: "Switching-cost moats — Falcon platform lock-in",
      suggestedBuys: ["CRWD", "NET", "PLTR", "PANW"],
      color: "#3b82f6",
    },
    {
      sector: "Semiconductors",
      targetPct: 12,
      description: "Custom ASIC moat accelerating for hyperscalers; MU (Micron HBM) added as AI memory watch",
      suggestedBuys: ["NVDA", "AMD", "AVGO", "QCOM", "MU"],
      color: "#f59e0b",
    },
    {
      sector: "Consumer Growth",
      targetPct: 10,
      description: "Brand moat + pricing power in high-margin categories; MELI (LatAm fintech+e-commerce flywheel, +39% rev 2025) flagged as strong new candidate",
      suggestedBuys: ["AMZN", "CMG", "SHOP", "MELI"],
      color: "#ec4899",
    },
    {
      sector: "Healthcare Innovation",
      targetPct: 10,
      description: "Process-power moats in high-growth specialty care",
      suggestedBuys: ["UNH", "ISRG", "DXCM", "ABBV"],
      color: "#14b8a6",
    },
    {
      sector: "Financials / Fintech",
      targetPct: 8,
      description: "Network-effect moats in payments + crypto infrastructure",
      suggestedBuys: ["COIN", "V", "MA", "HOOD"],
      color: "#22c55e",
    },
    {
      sector: "Broad Market ETF",
      targetPct: 5,
      description: "Core diversification floor — reduce single-stock tail risk",
      suggestedBuys: ["QQQ", "VGT", "VOO"],
      color: "#6366f1",
    },
    {
      sector: "International",
      targetPct: 5,
      description: "Emerging market growth + India IT services megatrend",
      suggestedBuys: ["VXUS", "EEM", "INDA"],
      color: "#f97316",
    },
  ],
};

// ── India Conservative ────────────────────────────────────────────────────────

export const INDIA_CONSERVATIVE_TARGET: PortfolioTarget = {
  style: "india-conservative",
  market: "india",
  currency: "INR",
  label: "India Conservative",
  tagline: "Stable Blue Chips + Dividend Income",
  description:
    "Built for the Indian investor seeking capital preservation. " +
    "Anchored in large-cap PSU and private sector blue chips with strong dividend history. " +
    "April 22, 2026 macro: RBI held repo at 5.25% (April MPC — neutral stance amid geopolitical uncertainty); CPI FY27 projected 4.6%; GDP FY27 projected 6.9%. " +
    "NIFTY target 29,000 by Dec 2026 (analyst consensus); West Asia conflict adds near-term INR and imported-inflation risk. " +
    "HCLTech Q4 FY26 actual +12.3% YoY revenue — IT sector recovery confirmed; HDFCBANK Q4 profit +9% YoY (GNPA 1.15% — best-in-class) offers contrarian value at 2.2x P/B.",
  riskLevel: "Low–Medium",
  timeHorizon: "3–7 years",
  icon: "🛡️",
  accentColor: "#22c55e",
  sectors: [
    {
      sector: "Banking & Finance (India)",
      targetPct: 25,
      description: "Large private banks with strong CASA ratios and provisioning",
      suggestedBuys: ["HDFCBANK", "ICICIBANK", "KOTAKBANK", "SBIN"],
      color: "#6366f1",
    },
    {
      sector: "IT Services (India)",
      targetPct: 20,
      description: "Global delivery moat — dollar-revenue hedge against INR depreciation",
      suggestedBuys: ["TCS", "INFY", "WIPRO", "HCLTECH"],
      color: "#8b5cf6",
    },
    {
      sector: "FMCG / Consumer Staples (India)",
      targetPct: 20,
      description: "Non-cyclical demand with strong distribution moats; ITC flagged for re-rating (rural volumes +8.4%, GST tailwind, 12–15% upside expected)",
      suggestedBuys: ["HINDUNILVR", "ITC", "NESTLEIND", "BRITANNIA", "DABUR"],
      color: "#22c55e",
    },
    {
      sector: "Pharma / Healthcare (India)",
      targetPct: 15,
      description: "Generic drug export moat + domestic chronic care growth",
      suggestedBuys: ["SUNPHARMA", "DRREDDY", "CIPLA", "DIVISLAB"],
      color: "#14b8a6",
    },
    {
      sector: "Broad Market ETF (India)",
      targetPct: 12,
      description: "Nifty index exposure for diversified large-cap beta",
      suggestedBuys: ["NIFTYBEES", "JUNIORBEES", "ICICIB22"],
      color: "#3b82f6",
    },
    {
      sector: "Energy / PSU (India)",
      targetPct: 8,
      description: "PSU dividend plays with government backing",
      suggestedBuys: ["RELIANCE", "ONGC", "NTPC", "POWERGRID"],
      color: "#f59e0b",
    },
  ],
};

// ── India Aggressive ──────────────────────────────────────────────────────────

export const INDIA_AGGRESSIVE_TARGET: PortfolioTarget = {
  style: "india-aggressive",
  market: "india",
  currency: "INR",
  label: "India Aggressive",
  tagline: "High Growth · India Megatrend",
  description:
    "Captures India's structural growth story — digitisation, capex supercycle, " +
    "EV transition, and mid-cap compounders. Concentrated in high-ROCE businesses with durable competitive advantages. " +
    "April 22, 2026 update: RBI held repo at 5.25% (April MPC — neutral amid global tensions); GDP FY27 projected 6.9%; NIFTY target 29,000 Dec 2026. " +
    "IT sector recovering: HCLTech Q4 FY26 revenue ₹33,981 cr +12.3% YoY; FY27 CC guidance upgraded 4.5–5%; TCS record TCV $40.7B FY26. " +
    "BAJFINANCE AUM +22% YoY; HDFCBANK Q4 profit +9% (GNPA 1.15% best-in-class); banking/NBFC re-rating underway as rate cycle turns. " +
    "Adani Green 15,000 MW installed + BESS entry; defence budget ₹7.85L Cr FY27 — India capex supercycle intact.",
  riskLevel: "Aggressive",
  timeHorizon: "5–10+ years",
  icon: "🚀",
  accentColor: "#f59e0b",
  sectors: [
    {
      sector: "IT Services (India)",
      targetPct: 27,
      description: "IT sector recovering: HCLTech Q4 FY26 +12.3% YoY; FY27 CC guidance upgraded to 4.5–5%; TCS FY26 TCV record $40.7B; AI embedded in every major deal; sector P/E de-rating creates selective entry before re-rating",
      suggestedBuys: ["HCLTECH", "TCS", "INFY", "COFORGE", "PERSISTENT"],
      color: "#8b5cf6",
    },
    {
      sector: "Banking & Finance (India)",
      targetPct: 18,
      description: "High-growth private banks + NBFC compounders",
      suggestedBuys: ["HDFCBANK", "ICICIBANK", "AXISBANK", "BAJFINANCE"],
      color: "#6366f1",
    },
    {
      sector: "Small / Mid Cap Growth (India)",
      targetPct: 13,
      description: "High-ROCE mid-cap compounders in niche industries (trimmed 2% to fund IT Services contrarian overweight)",
      suggestedBuys: ["POLYCAB", "TATAELXSI", "KPITTECH", "HAPPSTMNDS"],
      color: "#ec4899",
    },
    {
      sector: "Infrastructure / Capital Goods (India)",
      targetPct: 12,
      description: "India capex supercycle — defence, rail, roads; BEL flagged as strong new portfolio candidate (order book ₹75,000 cr = 3.1x FY25 revenue)",
      suggestedBuys: ["LT", "BEL", "SIEMENS", "ABB", "DATAPATT"],
      color: "#f97316",
    },
    {
      sector: "Auto & EV (India)",
      targetPct: 12,
      description: "EV transition + premium auto demand in growing middle class",
      suggestedBuys: ["TATAMOTORS", "M&M", "MARUTI", "BAJAJ-AUTO"],
      color: "#f59e0b",
    },
    {
      sector: "Pharma / Healthcare (India)",
      targetPct: 8,
      description: "Specialty pharma exports + hospital chains expansion",
      suggestedBuys: ["SUNPHARMA", "DRREDDY", "APOLLOHOSP", "MAXHEALTH"],
      color: "#14b8a6",
    },
    {
      sector: "Energy / PSU (India)",
      targetPct: 5,
      description: "Renewable energy transition plays + refining moats",
      suggestedBuys: ["RELIANCE", "ADANIENT", "NTPC", "COALINDIA"],
      color: "#22c55e",
    },
    {
      sector: "Broad Market ETF (India)",
      targetPct: 5,
      description: "Nifty/Nifty Next 50 as portfolio floor",
      suggestedBuys: ["NIFTYBEES", "JUNIORBEES"],
      color: "#3b82f6",
    },
  ],
};

export const PORTFOLIO_TARGETS: Record<PortfolioStyle, PortfolioTarget> = {
  conservative: CONSERVATIVE_TARGET,
  aggressive: AGGRESSIVE_TARGET,
  "india-conservative": INDIA_CONSERVATIVE_TARGET,
  "india-aggressive": INDIA_AGGRESSIVE_TARGET,
};
