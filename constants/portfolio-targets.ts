// ── Portfolio Target Definitions ──────────────────────────────────────────────
// Based on backtested prompt accuracy research (PROMPT_ACCURACY_REPORT.md)
// Conservative: capital preservation + income · Aggressive: maximum growth

export type PortfolioStyle = "conservative" | "aggressive";

export interface SectorTarget {
  sector: string;
  targetPct: number;       // target allocation %
  description: string;     // why this sector
  suggestedBuys: string[]; // specific tickers to buy into this sector
  color: string;           // for UI
}

export interface PortfolioTarget {
  style: PortfolioStyle;
  label: string;
  tagline: string;
  description: string;
  riskLevel: string;
  timeHorizon: string;
  icon: string;
  accentColor: string;
  sectors: SectorTarget[];
}

// ── Conservative ──────────────────────────────────────────────────────────────

export const CONSERVATIVE_TARGET: PortfolioTarget = {
  style: "conservative",
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

// ── Aggressive ────────────────────────────────────────────────────────────────

export const AGGRESSIVE_TARGET: PortfolioTarget = {
  style: "aggressive",
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

export const PORTFOLIO_TARGETS: Record<PortfolioStyle, PortfolioTarget> = {
  conservative: CONSERVATIVE_TARGET,
  aggressive: AGGRESSIVE_TARGET,
};
