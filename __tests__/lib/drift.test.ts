import { calcHoldingDrift } from "@/lib/drift";

describe("calcHoldingDrift", () => {
  const holdings = [
    { ticker: "AAA", allocation: 50 },
    { ticker: "BBB", allocation: 30 },
    { ticker: "CCC", allocation: 20 },
  ];

  it("reports on-target when all returns are equal", () => {
    const drift = calcHoldingDrift(holdings, { AAA: 0.1, BBB: 0.1, CCC: 0.1 });
    for (const d of drift) {
      expect(d.currentPct).toBeCloseTo(d.targetPct, 5);
      expect(d.gapPct).toBeCloseTo(0, 5);
      expect(d.status).toBe("on-target");
    }
  });

  it("flags overweight when a holding outperforms significantly", () => {
    // AAA doubles while others are flat -> AAA's weight should balloon well past +3pp
    const drift = calcHoldingDrift(holdings, { AAA: 1.0, BBB: 0, CCC: 0 });
    const aaa = drift.find((d) => d.ticker === "AAA")!;
    expect(aaa.currentPct).toBeGreaterThan(aaa.targetPct);
    expect(aaa.gapPct).toBeGreaterThan(3);
    expect(aaa.status).toBe("overweight");
  });

  it("flags underweight when a holding sells off significantly", () => {
    const drift = calcHoldingDrift(holdings, { AAA: -0.5, BBB: 0, CCC: 0 });
    const aaa = drift.find((d) => d.ticker === "AAA")!;
    expect(aaa.currentPct).toBeLessThan(aaa.targetPct);
    expect(aaa.gapPct).toBeLessThan(-3);
    expect(aaa.status).toBe("underweight");
  });

  it("marks a holding unknown when its return is null (fetch failure) without corrupting others", () => {
    const drift = calcHoldingDrift(holdings, { AAA: null, BBB: 0.2, CCC: 0.2 });
    const aaa = drift.find((d) => d.ticker === "AAA")!;
    expect(aaa.status).toBe("unknown");
    expect(aaa.currentPct).toBe(aaa.targetPct);
    expect(aaa.gapPct).toBe(0);
  });

  it("currentPct across all holdings still sums to ~100 when all returns are known", () => {
    const drift = calcHoldingDrift(holdings, { AAA: 0.3, BBB: -0.1, CCC: 0.05 });
    const total = drift.reduce((s, d) => s + d.currentPct, 0);
    expect(total).toBeCloseTo(100, 5);
  });

  it("returns an empty array for empty holdings", () => {
    expect(calcHoldingDrift([], {})).toEqual([]);
  });
});
