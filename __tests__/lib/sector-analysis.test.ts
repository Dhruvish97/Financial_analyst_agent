import {
  aggregateSectorExposure,
  findOverlappingHoldings,
  calcPairwiseOverlap,
  AnalyticsPortfolio,
} from "@/lib/sector-analysis";

const portfolioA: AnalyticsPortfolio = {
  id: "a",
  name: "Portfolio A",
  holdings: [
    { ticker: "NVDA", name: "NVIDIA", sector: "AI Semiconductors", allocation: 60 },
    { ticker: "MSFT", name: "Microsoft", sector: "Cloud & AI", allocation: 40 },
  ],
};

const portfolioB: AnalyticsPortfolio = {
  id: "b",
  name: "Portfolio B",
  holdings: [
    { ticker: "NVDA", name: "NVIDIA", sector: "AI Semiconductors", allocation: 20 },
    { ticker: "JNJ", name: "Johnson & Johnson", sector: "Healthcare", allocation: 80 },
  ],
};

describe("aggregateSectorExposure", () => {
  it("returns an empty array for no portfolios", () => {
    expect(aggregateSectorExposure([])).toEqual([]);
  });

  it("averages a sector's weight across portfolios equally, not dollar-weighted", () => {
    const result = aggregateSectorExposure([portfolioA, portfolioB]);
    const aiSemis = result.find((s) => s.sector === "AI Semiconductors")!;
    // (60 + 20) / 2 portfolios = 40
    expect(aiSemis.avgWeightPct).toBeCloseTo(40, 5);
  });

  it("reports 0 weight for a portfolio that has no exposure to a given sector", () => {
    const result = aggregateSectorExposure([portfolioA, portfolioB]);
    const healthcare = result.find((s) => s.sector === "Healthcare")!;
    const aWeight = healthcare.byPortfolio.find((p) => p.portfolioId === "a")!.weightPct;
    expect(aWeight).toBe(0);
  });

  it("sorts sectors by descending average weight", () => {
    const result = aggregateSectorExposure([portfolioA, portfolioB]);
    for (let i = 1; i < result.length; i++) {
      expect(result[i - 1].avgWeightPct).toBeGreaterThanOrEqual(result[i].avgWeightPct);
    }
  });
});

describe("findOverlappingHoldings", () => {
  it("only includes tickers held in 2+ portfolios", () => {
    const result = findOverlappingHoldings([portfolioA, portfolioB]);
    expect(result).toHaveLength(1);
    expect(result[0].ticker).toBe("NVDA");
    expect(result[0].count).toBe(2);
  });

  it("excludes tickers held in only one portfolio", () => {
    const result = findOverlappingHoldings([portfolioA, portfolioB]);
    expect(result.find((e) => e.ticker === "MSFT")).toBeUndefined();
    expect(result.find((e) => e.ticker === "JNJ")).toBeUndefined();
  });

  it("returns an empty array when there is no overlap at all", () => {
    const disjointB: AnalyticsPortfolio = {
      id: "c",
      name: "Portfolio C",
      holdings: [{ ticker: "KO", name: "Coca-Cola", sector: "Consumer Staples", allocation: 100 }],
    };
    expect(findOverlappingHoldings([portfolioA, disjointB])).toEqual([]);
  });
});

describe("calcPairwiseOverlap", () => {
  it("computes Jaccard similarity between each pair of portfolios", () => {
    const result = calcPairwiseOverlap([portfolioA, portfolioB]);
    expect(result).toHaveLength(1);
    // shared = {NVDA}, union = {NVDA, MSFT, JNJ} -> 1/3
    expect(result[0].sharedCount).toBe(1);
    expect(result[0].jaccardPct).toBeCloseTo((1 / 3) * 100, 5);
  });

  it("returns no pairs for a single portfolio", () => {
    expect(calcPairwiseOverlap([portfolioA])).toEqual([]);
  });

  it("computes 100% overlap for identical ticker sets", () => {
    const identicalB: AnalyticsPortfolio = { ...portfolioA, id: "a2", name: "Portfolio A2" };
    const result = calcPairwiseOverlap([portfolioA, identicalB]);
    expect(result[0].jaccardPct).toBe(100);
  });
});
