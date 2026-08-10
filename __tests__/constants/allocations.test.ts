import { ALL_PORTFOLIOS } from "@/constants/all-portfolios";
import { INDIA_STOCKS } from "@/constants/india-stocks";
import { CRYPTO_PORTFOLIO } from "@/constants/crypto-data";
import { PORTFOLIO_TARGETS } from "@/constants/portfolio-targets";

function sumAllocation(holdings: { allocation: number }[]): number {
  return holdings.reduce((sum, h) => sum + h.allocation, 0);
}

describe("portfolio allocation integrity", () => {
  it.each(ALL_PORTFOLIOS.map((p) => [p.id, p.name, p] as const))(
    "%s (%s) holdings sum to exactly 100%%",
    (_id, _name, portfolio) => {
      expect(sumAllocation(portfolio.holdings)).toBe(100);
    }
  );

  it("INDIA_STOCKS holdings sum to exactly 100%", () => {
    expect(sumAllocation(INDIA_STOCKS)).toBe(100);
  });

  it("CRYPTO_PORTFOLIO holdings sum to exactly 100%", () => {
    expect(sumAllocation(CRYPTO_PORTFOLIO)).toBe(100);
  });

  it.each(Object.entries(PORTFOLIO_TARGETS))(
    "PORTFOLIO_TARGETS[%s].sectors targetPct sums to exactly 100%%",
    (_style, target) => {
      const sum = target.sectors.reduce((s, sector) => s + sector.targetPct, 0);
      expect(sum).toBe(100);
    }
  );

  it("every holding allocation is a positive number", () => {
    for (const portfolio of ALL_PORTFOLIOS) {
      for (const h of portfolio.holdings) {
        expect(h.allocation).toBeGreaterThan(0);
      }
    }
    for (const h of INDIA_STOCKS) {
      expect(h.allocation).toBeGreaterThan(0);
    }
    for (const h of CRYPTO_PORTFOLIO) {
      expect(h.allocation).toBeGreaterThan(0);
    }
  });
});
