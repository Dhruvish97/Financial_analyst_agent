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
    "September 5, 2026 update: NVDA (Q2 FY27: $96.2B revenue +106% YoY), AVGO (Q3 FY26: $29.6B +86% YoY, AI semi +221% YoY), and CRWD (Q2 FY27: best quarter in company history per CEO Kurtz) " +
    "all beat and raised guidance. META agreed to an ~$18B settlement over youth-safety claims — Morgan Stanley called it a net positive that clears the way for new AI products — while capex keeps " +
    "climbing on new CoreWeave and Google Cloud compute deals. GOOGL won an antitrust ruling on its ad exchange and is recovering from its longest monthly losing streak in over a decade. " +
    "TSLA's Cybercab robotaxi launch underwhelmed investors and drew an NHTSA safety inquiry — a third straight soft catalyst. PLTR's fundamentals remain the portfolio's strongest, but its stock " +
    "touched ~150x trailing earnings, now the dominant risk. Apple's John Ternus became CEO Sep 1, the company's first leadership change since 2011, days before unveiling the iPhone 18 Pro/Pro Max " +
    "and its first foldable phone. Fed Chair Kevin Warsh has turned more hawkish since his Jackson Hole speech, lifting September rate-hike odds. " +
    "Credo Technology (CRDO) — an AI-interconnect name complementing Astera Labs — was added to the watchlist this cycle.",
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
      description: "Switching-cost moats — Falcon platform lock-in; ANET (Arista Networks, hyperscaler-embedded EOS switching cost, 5/7 powers) flagged this cycle as a stronger-moat watch than NET",
      suggestedBuys: ["CRWD", "NET", "PLTR", "PANW", "ANET"],
      color: "#3b82f6",
    },
    {
      sector: "Semiconductors",
      targetPct: 12,
      description: "Custom ASIC moat accelerating for hyperscalers; MU (Micron HBM) added as AI memory watch; ALAB (Astera Labs, AI-fabric interconnect) and CRDO (Credo Technology, AI cables, +206% FY26 rev) both flagged as strong-watch/watch candidates",
      suggestedBuys: ["NVDA", "AMD", "AVGO", "QCOM", "MU", "ALAB", "CRDO"],
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
    "August 10, 2026 macro: the Aug 3–5 MPC held repo unchanged at 5.25% (unanimous), neutral stance — Governor Malhotra wants 'greater clarity' on inflation before acting; headline inflation " +
    "sits above the 4% target on food/fuel and is expected to peak in the Oct–Dec quarter, with the next MPC meeting Oct 5–7. NIFTY ~24,584/SENSEX ~78,542 remain well below the 29,000 Dec-2026 " +
    "target set in April. The Feb 2026 US-India trade deal cut tariffs from 50% to 18%, easing a key macro risk. HCLTech Q1 FY27 PAT +20.3% YoY — IT sector recovery accelerating; HDFCBANK Q1 " +
    "profit +5% YoY with GNPA improving further to 1.17%, still offering contrarian value at a depressed P/B. ITC (down ~26% over the trailing year) stays on strong watch as rural FMCG demand improves.",
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
      description: "Non-cyclical demand with strong distribution moats; ITC flagged as a strong-watch candidate this cycle (5/7 powers, down ~22% YTD 2026 — a valuation reset, GAAP-profitable, dividend-paying)",
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
    "August 10, 2026 update: the Aug 3–5 MPC held repo unchanged at 5.25% (unanimous), neutral stance, with inflation above target but expected to peak Oct–Dec; next decision Oct 5–7. " +
    "NIFTY ~24,584/SENSEX ~78,542, tracking well below the 29,000 Dec-2026 target. HAL's Q1 FY27 results are still pending (board meeting Aug 12) after an 11% one-month rally on easing engine-supply issues. " +
    "IT sector accelerating: HCLTech Q1 FY27 revenue ₹34,579 cr +13.9% YoY, PAT +20.3% YoY; TCS AI revenue run-rate $2.6B annualized with new Anthropic/Mistral AI partnerships. " +
    "BAJFINANCE Q1 FY27 AUM +24% YoY with improving GNPA; HDFCBANK Q1 profit +5% YoY (GNPA improved to 1.17%); banking/NBFC re-rating underway despite RBI's inflation caution. " +
    "L&T record order book ₹7.79L Cr (+27% YoY) on offshore wind Europe wins; BEL Q1 FY27 revenue +25.3% YoY; defence budget ₹7.85L Cr FY27 — India capex supercycle intact. " +
    "ITC (down ~26% over the trailing year, rural demand improving) stays on strong watch as a new FMCG candidate for future allocation review.",
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
