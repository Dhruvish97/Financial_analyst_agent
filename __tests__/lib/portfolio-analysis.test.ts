import {
  getSector,
  enrichHoldings,
  calcTotalValue,
  calcSectorAllocations,
  generateRecommendations,
  calcAlignmentScore,
  analysePortfolio,
  DetectedHolding,
} from "@/lib/portfolio-analysis";
import {
  CONSERVATIVE_TARGET,
  AGGRESSIVE_TARGET,
} from "@/constants/portfolio-targets";

// ── getSector ─────────────────────────────────────────────────────────────────

describe("getSector", () => {
  it("maps known tech tickers", () => {
    expect(getSector("NVDA")).toBe("Technology / AI");
    expect(getSector("MSFT")).toBe("Technology / AI");
    expect(getSector("AAPL")).toBe("Technology / AI");
  });

  it("maps semiconductor tickers", () => {
    expect(getSector("AMD")).toBe("Semiconductors");
    expect(getSector("INTC")).toBe("Semiconductors");
  });

  it("maps ETF tickers", () => {
    expect(getSector("VOO")).toBe("Broad Market ETF");
    expect(getSector("BND")).toBe("Bonds / Fixed Income");
    expect(getSector("VXUS")).toBe("International");
    expect(getSector("VNQ")).toBe("REITs");
  });

  it("is case-insensitive", () => {
    expect(getSector("aapl")).toBe("Technology / AI");
    expect(getSector("Bnd")).toBe("Bonds / Fixed Income");
  });

  it("returns Other for unknown tickers", () => {
    expect(getSector("UNKNWN")).toBe("Other");
    expect(getSector("XYZ123")).toBe("Other");
  });
});

// ── enrichHoldings ────────────────────────────────────────────────────────────

describe("enrichHoldings", () => {
  const raw: DetectedHolding[] = [
    { ticker: "AAPL", quantity: 3, price: 255.9, value: 767.7 },
    { ticker: "BND", quantity: 10, price: 73, value: null },
    { ticker: "UNKNWN", quantity: 5, price: 100, value: 500 },
  ];

  it("adds sector to each holding", () => {
    const enriched = enrichHoldings(raw);
    expect(enriched[0].sector).toBe("Technology / AI");
    expect(enriched[1].sector).toBe("Bonds / Fixed Income");
    expect(enriched[2].sector).toBe("Other");
  });

  it("uses provided value when available", () => {
    const enriched = enrichHoldings(raw);
    expect(enriched[0].computedValue).toBe(767.7);
  });

  it("computes value from quantity * price when value is null", () => {
    const enriched = enrichHoldings(raw);
    expect(enriched[1].computedValue).toBe(730); // 10 * 73
  });

  it("sets computedValue to 0 when both value and price are null", () => {
    const noPrice: DetectedHolding[] = [{ ticker: "AAPL", quantity: 5, price: null, value: null }];
    const enriched = enrichHoldings(noPrice);
    expect(enriched[0].computedValue).toBe(0);
  });
});

// ── calcTotalValue ─────────────────────────────────────────────────────────────

describe("calcTotalValue", () => {
  it("sums all computed values", () => {
    const holdings = enrichHoldings([
      { ticker: "AAPL", quantity: 2, price: 100, value: 200 },
      { ticker: "MSFT", quantity: 3, price: 50, value: 150 },
    ]);
    expect(calcTotalValue(holdings)).toBe(350);
  });

  it("returns 0 for empty array", () => {
    expect(calcTotalValue([])).toBe(0);
  });
});

// ── calcSectorAllocations ─────────────────────────────────────────────────────

describe("calcSectorAllocations", () => {
  const holdings = enrichHoldings([
    { ticker: "AAPL", quantity: 1, price: 256, value: 256 }, // Tech
    { ticker: "BND", quantity: 4, price: 74, value: 296 },  // Bonds
  ]);
  const total = calcTotalValue(holdings); // 552

  it("calculates current percentage per sector", () => {
    const allocs = calcSectorAllocations(holdings, CONSERVATIVE_TARGET, total);
    const tech = allocs.find((a) => a.sector === "Technology / AI");
    const bonds = allocs.find((a) => a.sector === "Bonds / Fixed Income");
    expect(tech?.currentPct).toBeCloseTo(46.4, 0);
    expect(bonds?.currentPct).toBeCloseTo(53.6, 0);
  });

  it("marks sectors as overweight / underweight", () => {
    const allocs = calcSectorAllocations(holdings, CONSERVATIVE_TARGET, total);
    // Tech is 46% vs conservative target 0% → overweight (not a conservative sector target — 0%)
    // Bonds is 53% vs conservative target 35% → overweight
    const bonds = allocs.find((a) => a.sector === "Bonds / Fixed Income");
    expect(bonds?.status).toBe("overweight");
  });

  it("marks missing target sectors as underweight", () => {
    const allocs = calcSectorAllocations(holdings, CONSERVATIVE_TARGET, total);
    const intl = allocs.find((a) => a.sector === "International");
    // 0% allocation vs 12% target → underweight
    expect(intl?.status).toBe("underweight");
  });

  it("returns 0 currentPct for sectors with no holdings", () => {
    const allocs = calcSectorAllocations(holdings, CONSERVATIVE_TARGET, total);
    const reits = allocs.find((a) => a.sector === "REITs");
    expect(reits?.currentPct).toBe(0);
  });
});

// ── calcAlignmentScore ────────────────────────────────────────────────────────

describe("calcAlignmentScore", () => {
  it("returns 100 for perfectly aligned portfolio", () => {
    // Create fake allocations perfectly on target
    const perfectAllocs = CONSERVATIVE_TARGET.sectors.map((s) => ({
      sector: s.sector,
      currentPct: s.targetPct,
      targetPct: s.targetPct,
      gapPct: 0,
      currentValue: 0,
      targetValue: 0,
      color: s.color,
      status: "on-target" as const,
    }));
    expect(calcAlignmentScore(perfectAllocs)).toBe(100);
  });

  it("returns less than 100 for misaligned portfolio", () => {
    const holdings = enrichHoldings([
      { ticker: "AAPL", quantity: 1, price: 1000, value: 1000 }, // all tech, no bonds
    ]);
    const total = calcTotalValue(holdings);
    const allocs = calcSectorAllocations(holdings, CONSERVATIVE_TARGET, total);
    expect(calcAlignmentScore(allocs)).toBeLessThan(50); // heavily misaligned
  });

  it("returns 0 for empty allocations", () => {
    expect(calcAlignmentScore([])).toBe(0);
  });
});

// ── generateRecommendations ───────────────────────────────────────────────────

describe("generateRecommendations", () => {
  it("generates SELL for overweight sectors", () => {
    // All-tech portfolio vs conservative target
    const holdings = enrichHoldings([
      { ticker: "AAPL", quantity: 10, price: 256, value: 2560 },
      { ticker: "MSFT", quantity: 10, price: 402, value: 4020 },
    ]);
    const total = calcTotalValue(holdings);
    const allocs = calcSectorAllocations(holdings, CONSERVATIVE_TARGET, total);
    const recs = generateRecommendations(holdings, allocs, CONSERVATIVE_TARGET, total);

    const sells = recs.filter((r) => r.action === "SELL");
    expect(sells.length).toBeGreaterThan(0);
    expect(sells[0].tickers).toContain("AAPL");
  });

  it("generates BUY for underweight sectors", () => {
    const holdings = enrichHoldings([
      { ticker: "AAPL", quantity: 10, price: 256, value: 2560 },
    ]);
    const total = calcTotalValue(holdings);
    const allocs = calcSectorAllocations(holdings, CONSERVATIVE_TARGET, total);
    const recs = generateRecommendations(holdings, allocs, CONSERVATIVE_TARGET, total);

    const buys = recs.filter((r) => r.action === "BUY");
    expect(buys.length).toBeGreaterThan(0);
    // Bond sector should have suggested tickers
    const bondBuy = buys.find((r) => r.sector === "Bonds / Fixed Income");
    expect(bondBuy?.tickers.length).toBeGreaterThan(0);
  });

  it("prioritises high-gap sectors as high priority", () => {
    const holdings = enrichHoldings([
      { ticker: "AAPL", quantity: 100, price: 256, value: 25600 }, // huge tech overweight
    ]);
    const total = calcTotalValue(holdings);
    const allocs = calcSectorAllocations(holdings, CONSERVATIVE_TARGET, total);
    const recs = generateRecommendations(holdings, allocs, CONSERVATIVE_TARGET, total);

    const highPriority = recs.filter((r) => r.priority === "high");
    expect(highPriority.length).toBeGreaterThan(0);
  });
});

// ── analysePortfolio (integration) ───────────────────────────────────────────

describe("analysePortfolio", () => {
  const rawHoldings: DetectedHolding[] = [
    { ticker: "COIN",  quantity: 2,      price: 192.49, value: 384.97 },
    { ticker: "GOOGL", quantity: 6.0211, price: 304.07, value: 1830.50 },
    { ticker: "AMD",   quantity: 5,      price: 197.46, value: 987.30 },
    { ticker: "INTC",  quantity: 4,      price: 45.18,  value: 180.72 },
    { ticker: "AMZN",  quantity: 4,      price: 209.68, value: 838.72 },
    { ticker: "T",     quantity: 5.096,  price: 27.34,  value: 139.33 },
    { ticker: "AAPL",  quantity: 3.0365, price: 255.90, value: 777.94 },
    { ticker: "MSFT",  quantity: 1.633,  price: 401.95, value: 656.39 },
    { ticker: "UNH",   quantity: 2,      price: 277.09, value: 554.18 },
    { ticker: "CMG",   quantity: 3,      price: 32.68,  value: 98.04 },
    { ticker: "VOO",   quantity: 1.0124, price: 612.92, value: 620.24 },
  ];

  it("returns total value close to sum of position values", () => {
    const result = analysePortfolio(rawHoldings, CONSERVATIVE_TARGET);
    expect(result.totalValue).toBeGreaterThan(7000);
    expect(result.totalValue).toBeLessThan(8000);
  });

  it("enriches all holdings with a sector", () => {
    const result = analysePortfolio(rawHoldings, CONSERVATIVE_TARGET);
    expect(result.holdings).toHaveLength(11);
    result.holdings.forEach((h) => {
      expect(h.sector).toBeDefined();
    });
  });

  it("gives low alignment score for tech-heavy vs conservative target", () => {
    const result = analysePortfolio(rawHoldings, CONSERVATIVE_TARGET);
    expect(result.overallScore).toBeLessThan(50);
  });

  it("produces SELL recommendations for tech overweight vs conservative", () => {
    const result = analysePortfolio(rawHoldings, CONSERVATIVE_TARGET);
    const sells = result.recommendations.filter((r) => r.action === "SELL");
    expect(sells.length).toBeGreaterThan(0);
  });

  it("produces BUY recommendations for missing bonds vs conservative", () => {
    const result = analysePortfolio(rawHoldings, CONSERVATIVE_TARGET);
    const bondBuy = result.recommendations.find(
      (r) => r.action === "BUY" && r.sector === "Bonds / Fixed Income"
    );
    expect(bondBuy).toBeDefined();
    expect(bondBuy?.tickers).toContain("BND");
  });

  it("gives higher score for aggressive target (more tech = better fit)", () => {
    const conservative = analysePortfolio(rawHoldings, CONSERVATIVE_TARGET);
    const aggressive = analysePortfolio(rawHoldings, AGGRESSIVE_TARGET);
    expect(aggressive.overallScore).toBeGreaterThan(conservative.overallScore);
  });

  it("includes a human-readable summary", () => {
    const result = analysePortfolio(rawHoldings, CONSERVATIVE_TARGET);
    expect(typeof result.summary).toBe("string");
    expect(result.summary.length).toBeGreaterThan(10);
  });
});
