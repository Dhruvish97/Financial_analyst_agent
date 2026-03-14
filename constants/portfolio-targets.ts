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
    "Accepts short-term volatility in exchange for outsized 5–10 year returns.",
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
      description: "Custom ASIC moat accelerating for hyperscalers",
      suggestedBuys: ["NVDA", "AMD", "AVGO", "QCOM"],
      color: "#f59e0b",
    },
    {
      sector: "Consumer Growth",
      targetPct: 10,
      description: "Brand moat + pricing power in high-margin categories",
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
    "IT and FMCG provide defensive growth; minimal exposure to cyclicals.",
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
      description: "Non-cyclical demand with strong distribution moats",
      suggestedBuys: ["HINDUNILVR", "ITC", "NESTLEIND", "BRITANNIA"],
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
    "EV transition, and mid-cap compounders. " +
    "Concentrated in high-ROCE businesses with durable competitive advantages.",
  riskLevel: "Aggressive",
  timeHorizon: "5–10+ years",
  icon: "🚀",
  accentColor: "#f59e0b",
  sectors: [
    {
      sector: "IT Services (India)",
      targetPct: 25,
      description: "Global IT delivery + digital transformation moat",
      suggestedBuys: ["TCS", "INFY", "COFORGE", "PERSISTENT", "LTIM"],
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
      targetPct: 15,
      description: "High-ROCE mid-cap compounders in niche industries",
      suggestedBuys: ["POLYCAB", "TATAELXSI", "KPITTECH", "HAPPSTMNDS"],
      color: "#ec4899",
    },
    {
      sector: "Infrastructure / Capital Goods (India)",
      targetPct: 12,
      description: "India capex supercycle — defence, rail, roads",
      suggestedBuys: ["LT", "BEL", "SIEMENS", "ABB"],
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
