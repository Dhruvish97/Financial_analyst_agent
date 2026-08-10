// Cross-portfolio sector exposure and ticker-overlap analytics.
//
// Deliberately groups by each holding's own `sector` field (the same field already
// shown in portfolio tables and PortfolioDetailModal's sector chart) rather than the
// independent TICKER_SECTOR map in lib/portfolio-analysis.ts — that map uses a
// different, finer-grained taxonomy built for the uploaded-portfolio Advisor feature
// and disagrees with the per-holding `sector` field on some tickers (e.g. TSLA).
// Mixing the two would produce numbers that don't match what's already on screen.

export interface AnalyticsHolding {
  ticker: string;
  name: string;
  sector: string;
  allocation: number;
}

export interface AnalyticsPortfolio {
  id: string;
  name: string;
  holdings: AnalyticsHolding[];
}

export interface SectorExposure {
  sector: string;
  avgWeightPct: number;
  byPortfolio: { portfolioId: string; portfolioName: string; weightPct: number }[];
}

export interface OverlapEntry {
  ticker: string;
  name: string;
  count: number;
  portfolios: { id: string; name: string; allocation: number }[];
}

export interface PairwiseOverlap {
  a: string;
  b: string;
  sharedTickers: string[];
  sharedCount: number;
  jaccardPct: number;
}

/**
 * Average sector weight across the given portfolios (each portfolio treated as its own
 * 100%-weighted unit, so a sector's avgWeightPct is the mean of its weight within each
 * portfolio — not a dollar-weighted blend, since these are model allocations, not
 * real account balances).
 */
export function aggregateSectorExposure(portfolios: AnalyticsPortfolio[]): SectorExposure[] {
  if (portfolios.length === 0) return [];

  const sectorTotals = new Map<string, { sum: number; byPortfolio: Map<string, number> }>();

  for (const portfolio of portfolios) {
    const weightBySector = new Map<string, number>();
    for (const h of portfolio.holdings) {
      weightBySector.set(h.sector, (weightBySector.get(h.sector) ?? 0) + h.allocation);
    }
    for (const [sector, weightPct] of weightBySector) {
      if (!sectorTotals.has(sector)) {
        sectorTotals.set(sector, { sum: 0, byPortfolio: new Map() });
      }
      const entry = sectorTotals.get(sector)!;
      entry.sum += weightPct;
      entry.byPortfolio.set(portfolio.id, weightPct);
    }
  }

  const results: SectorExposure[] = [];
  for (const [sector, { sum, byPortfolio }] of sectorTotals) {
    results.push({
      sector,
      avgWeightPct: sum / portfolios.length,
      byPortfolio: portfolios.map((p) => ({
        portfolioId: p.id,
        portfolioName: p.name,
        weightPct: byPortfolio.get(p.id) ?? 0,
      })),
    });
  }

  return results.sort((a, b) => b.avgWeightPct - a.avgWeightPct);
}

/** Tickers held in 2 or more of the given portfolios, sorted by how many portfolios hold them. */
export function findOverlappingHoldings(portfolios: AnalyticsPortfolio[]): OverlapEntry[] {
  const byTicker = new Map<string, OverlapEntry>();

  for (const portfolio of portfolios) {
    for (const h of portfolio.holdings) {
      if (!byTicker.has(h.ticker)) {
        byTicker.set(h.ticker, { ticker: h.ticker, name: h.name, count: 0, portfolios: [] });
      }
      const entry = byTicker.get(h.ticker)!;
      entry.count += 1;
      entry.portfolios.push({ id: portfolio.id, name: portfolio.name, allocation: h.allocation });
    }
  }

  return Array.from(byTicker.values())
    .filter((e) => e.count >= 2)
    .sort((a, b) => b.count - a.count);
}

/** Pairwise ticker-set overlap (Jaccard similarity) between every pair of portfolios. */
export function calcPairwiseOverlap(portfolios: AnalyticsPortfolio[]): PairwiseOverlap[] {
  const results: PairwiseOverlap[] = [];

  for (let i = 0; i < portfolios.length; i++) {
    for (let j = i + 1; j < portfolios.length; j++) {
      const setA = new Set(portfolios[i].holdings.map((h) => h.ticker));
      const setB = new Set(portfolios[j].holdings.map((h) => h.ticker));
      const shared = [...setA].filter((t) => setB.has(t));
      const union = new Set([...setA, ...setB]);
      results.push({
        a: portfolios[i].name,
        b: portfolios[j].name,
        sharedTickers: shared,
        sharedCount: shared.length,
        jaccardPct: union.size > 0 ? (shared.length / union.size) * 100 : 0,
      });
    }
  }

  return results.sort((a, b) => b.jaccardPct - a.jaccardPct);
}
