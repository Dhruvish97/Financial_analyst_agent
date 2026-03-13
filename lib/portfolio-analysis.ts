import { PortfolioTarget, SectorTarget } from "@/constants/portfolio-targets";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface DetectedHolding {
  ticker: string;
  quantity: number;
  price: number | null;
  value: number | null;
}

export interface EnrichedHolding extends DetectedHolding {
  sector: string;
  computedValue: number; // quantity * price if value is null
}

export interface SectorAllocation {
  sector: string;
  currentPct: number;
  targetPct: number;
  gapPct: number;          // positive = overweight, negative = underweight
  currentValue: number;
  targetValue: number;
  color: string;
  status: "overweight" | "underweight" | "on-target";
}

export interface Recommendation {
  action: "BUY" | "SELL" | "HOLD";
  sector: string;
  tickers: string[];       // suggested tickers
  existingTickers: string[]; // user's current tickers in this sector
  amount: number;          // $ to buy or sell (positive)
  reason: string;
  priority: "high" | "medium" | "low";
}

export interface PortfolioAnalysis {
  holdings: EnrichedHolding[];
  totalValue: number;
  sectorAllocations: SectorAllocation[];
  recommendations: Recommendation[];
  overallScore: number;    // 0–100: how close to target
  summary: string;
}

// ── Ticker → Sector Map ───────────────────────────────────────────────────────

export const TICKER_SECTOR: Record<string, string> = {
  // Technology / AI
  NVDA: "Technology / AI",
  MSFT: "Technology / AI",
  AAPL: "Technology / AI",
  META: "Technology / AI",
  GOOGL: "Technology / AI",
  GOOG: "Technology / AI",
  AMZN: "Technology / AI",
  AVGO: "Technology / AI",
  VGT: "Technology / AI",

  // Semiconductors
  AMD: "Semiconductors",
  INTC: "Semiconductors",
  QCOM: "Semiconductors",
  TSM: "Semiconductors",
  MU: "Semiconductors",
  ASML: "Semiconductors",
  ARM: "Semiconductors",

  // Cybersecurity / Cloud
  CRWD: "Cybersecurity / Cloud",
  NET: "Cybersecurity / Cloud",
  PLTR: "Cybersecurity / Cloud",
  PANW: "Cybersecurity / Cloud",
  OKTA: "Cybersecurity / Cloud",
  ZS: "Cybersecurity / Cloud",
  S: "Cybersecurity / Cloud",
  SNOW: "Cybersecurity / Cloud",

  // Consumer Growth
  CMG: "Consumer Growth",
  SHOP: "Consumer Growth",
  NKE: "Consumer Growth",
  SBUX: "Consumer Growth",
  MCD: "Consumer Growth",
  MELI: "Consumer Growth",
  LULU: "Consumer Growth",
  TSLA: "Consumer Growth",

  // Healthcare / Healthcare Innovation
  UNH: "Healthcare Innovation",
  JNJ: "Healthcare Innovation",
  ABBV: "Healthcare Innovation",
  PFE: "Healthcare Innovation",
  ISRG: "Healthcare Innovation",
  DXCM: "Healthcare Innovation",
  LLY: "Healthcare Innovation",
  MDT: "Healthcare Innovation",
  VHT: "Healthcare Innovation",

  // Financials / Fintech
  COIN: "Financials / Fintech",
  V: "Financials / Fintech",
  MA: "Financials / Fintech",
  JPM: "Financials / Fintech",
  BAC: "Financials / Fintech",
  GS: "Financials / Fintech",
  HOOD: "Financials / Fintech",
  SQ: "Financials / Fintech",
  PYPL: "Financials / Fintech",

  // Dividend / Value Equity
  SCHD: "Dividend / Value Equity",
  VYM: "Dividend / Value Equity",
  KO: "Dividend / Value Equity",
  PG: "Dividend / Value Equity",
  PEP: "Dividend / Value Equity",
  MO: "Dividend / Value Equity",
  PM: "Dividend / Value Equity",
  MMM: "Dividend / Value Equity",

  // Telecom (maps to Dividend/Value for conservative, Broad Market for aggressive)
  T: "Dividend / Value Equity",
  VZ: "Dividend / Value Equity",
  TMUS: "Dividend / Value Equity",

  // Energy
  XOM: "Dividend / Value Equity",
  CVX: "Dividend / Value Equity",
  HAL: "Dividend / Value Equity",

  // Broad Market ETFs
  VOO: "Broad Market ETF",
  VTI: "Broad Market ETF",
  SPY: "Broad Market ETF",
  QQQ: "Broad Market ETF",
  IVV: "Broad Market ETF",
  ITOT: "Broad Market ETF",
  SCHB: "Broad Market ETF",

  // International
  VXUS: "International",
  VEA: "International",
  VWO: "International",
  EEM: "International",
  EFA: "International",
  INDA: "International",
  MCHI: "International",

  // Bonds / Fixed Income
  BND: "Bonds / Fixed Income",
  AGG: "Bonds / Fixed Income",
  TLT: "Bonds / Fixed Income",
  VGSH: "Bonds / Fixed Income",
  SGOV: "Bonds / Fixed Income",
  IEF: "Bonds / Fixed Income",
  LQD: "Bonds / Fixed Income",
  SHY: "Bonds / Fixed Income",
  HYG: "Bonds / Fixed Income",
  VCSH: "Bonds / Fixed Income",

  // REITs
  VNQ: "REITs",
  O: "REITs",
  WELL: "REITs",
  AMT: "REITs",
  PLD: "REITs",
  EQIX: "REITs",
};

// ── Core Analysis Functions ───────────────────────────────────────────────────

/** Map a ticker to its sector, falling back to "Other" */
export function getSector(ticker: string): string {
  return TICKER_SECTOR[ticker.toUpperCase()] ?? "Other";
}

/** Enrich raw holdings with sector and computed value */
export function enrichHoldings(holdings: DetectedHolding[]): EnrichedHolding[] {
  return holdings.map((h) => ({
    ...h,
    sector: getSector(h.ticker),
    computedValue:
      h.value !== null
        ? h.value
        : h.price !== null
        ? h.quantity * h.price
        : 0,
  }));
}

/** Calculate total portfolio value from enriched holdings */
export function calcTotalValue(holdings: EnrichedHolding[]): number {
  return holdings.reduce((sum, h) => sum + h.computedValue, 0);
}

/** Aggregate holdings into sector allocation percentages */
export function calcSectorAllocations(
  holdings: EnrichedHolding[],
  target: PortfolioTarget,
  totalValue: number
): SectorAllocation[] {
  // Build a map of sector → current value
  const sectorValues: Record<string, number> = {};
  for (const h of holdings) {
    sectorValues[h.sector] = (sectorValues[h.sector] ?? 0) + h.computedValue;
  }

  // Build sector allocations for all TARGET sectors
  const allSectors = new Set([
    ...target.sectors.map((s) => s.sector),
    ...Object.keys(sectorValues),
  ]);

  return Array.from(allSectors).map((sector) => {
    const sectorTarget: SectorTarget | undefined = target.sectors.find(
      (s) => s.sector === sector
    );
    const currentValue = sectorValues[sector] ?? 0;
    const currentPct = totalValue > 0 ? (currentValue / totalValue) * 100 : 0;
    const targetPct = sectorTarget?.targetPct ?? 0;
    const gapPct = currentPct - targetPct;

    let status: SectorAllocation["status"] = "on-target";
    if (gapPct > 3) status = "overweight";
    else if (gapPct < -3) status = "underweight";

    return {
      sector,
      currentPct: Math.round(currentPct * 10) / 10,
      targetPct,
      gapPct: Math.round(gapPct * 10) / 10,
      currentValue,
      targetValue: (targetPct / 100) * totalValue,
      color: sectorTarget?.color ?? "#6b7280",
      status,
    };
  }).sort((a, b) => b.targetPct - a.targetPct); // highest target first
}

/** Generate buy/sell/hold recommendations sorted by priority */
export function generateRecommendations(
  holdings: EnrichedHolding[],
  allocations: SectorAllocation[],
  target: PortfolioTarget,
  totalValue: number
): Recommendation[] {
  const recs: Recommendation[] = [];

  // Group user's existing tickers by sector
  const tickersBySector: Record<string, string[]> = {};
  for (const h of holdings) {
    tickersBySector[h.sector] = tickersBySector[h.sector] ?? [];
    tickersBySector[h.sector].push(h.ticker);
  }

  for (const alloc of allocations) {
    const sectorTarget = target.sectors.find((s) => s.sector === alloc.sector);
    const existingTickers = tickersBySector[alloc.sector] ?? [];
    const dollarGap = Math.abs(alloc.currentValue - alloc.targetValue);

    if (alloc.status === "overweight" && alloc.gapPct > 3) {
      // Too much in this sector — suggest trimming
      const sellTickers = existingTickers.length > 0 ? existingTickers : [];
      recs.push({
        action: "SELL",
        sector: alloc.sector,
        tickers: sellTickers,
        existingTickers,
        amount: Math.round(dollarGap),
        reason: `${alloc.sector} is ${alloc.gapPct.toFixed(1)}% overweight (${alloc.currentPct.toFixed(1)}% vs ${alloc.targetPct}% target). Trim to rebalance.`,
        priority: alloc.gapPct > 15 ? "high" : alloc.gapPct > 8 ? "medium" : "low",
      });
    } else if (alloc.status === "underweight" && alloc.gapPct < -3) {
      // Not enough in this sector — suggest buying
      const buySuggestions = sectorTarget?.suggestedBuys ?? [];
      // Prioritise tickers user doesn't already own
      const newTickers = buySuggestions.filter((t) => !existingTickers.includes(t));
      recs.push({
        action: "BUY",
        sector: alloc.sector,
        tickers: newTickers.length > 0 ? newTickers.slice(0, 3) : buySuggestions.slice(0, 3),
        existingTickers,
        amount: Math.round(dollarGap),
        reason: `${alloc.sector} is ${Math.abs(alloc.gapPct).toFixed(1)}% underweight (${alloc.currentPct.toFixed(1)}% vs ${alloc.targetPct}% target). Add exposure.`,
        priority: Math.abs(alloc.gapPct) > 15 ? "high" : Math.abs(alloc.gapPct) > 8 ? "medium" : "low",
      });
    }
  }

  // Sort: SELL high-priority first, then BUY high-priority
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  return recs.sort((a, b) => {
    if (a.action !== b.action) return a.action === "SELL" ? -1 : 1;
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

/** Score 0–100 how aligned the portfolio is with the target */
export function calcAlignmentScore(allocations: SectorAllocation[]): number {
  const targetSectors = allocations.filter((a) => a.targetPct > 0);
  if (targetSectors.length === 0) return 0;
  const totalError = targetSectors.reduce(
    (sum, a) => sum + Math.abs(a.gapPct),
    0
  );
  const maxError = targetSectors.reduce((sum, a) => sum + a.targetPct, 0);
  return Math.max(0, Math.round(100 - (totalError / maxError) * 100));
}

/** Full analysis pipeline */
export function analysePortfolio(
  rawHoldings: DetectedHolding[],
  target: PortfolioTarget
): PortfolioAnalysis {
  const holdings = enrichHoldings(rawHoldings);
  const totalValue = calcTotalValue(holdings);
  const sectorAllocations = calcSectorAllocations(holdings, target, totalValue);
  const recommendations = generateRecommendations(holdings, sectorAllocations, target, totalValue);
  const overallScore = calcAlignmentScore(sectorAllocations);

  const overweightCount = sectorAllocations.filter((a) => a.status === "overweight").length;
  const underweightCount = sectorAllocations.filter((a) => a.status === "underweight").length;

  const summary =
    overallScore >= 80
      ? `Your portfolio is well-aligned with the ${target.label} strategy (${overallScore}/100).`
      : overallScore >= 60
      ? `Your portfolio is moderately aligned (${overallScore}/100). ${underweightCount} sector(s) need more exposure.`
      : `Your portfolio needs significant rebalancing (${overallScore}/100). ` +
        `${overweightCount} sector(s) are overweight and ${underweightCount} are underweight.`;

  return { holdings, totalValue, sectorAllocations, recommendations, overallScore, summary };
}
