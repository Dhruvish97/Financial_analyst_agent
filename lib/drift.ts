export type DriftStatus = "overweight" | "underweight" | "on-target" | "unknown";

export interface HoldingDrift {
  ticker: string;
  targetPct: number;
  currentPct: number;
  gapPct: number;
  status: DriftStatus;
}

interface DriftHolding {
  ticker: string;
  allocation: number;
}

const DRIFT_THRESHOLD_PCT = 3;

/**
 * Reweights each holding's target allocation by its recent price return, then compares
 * the resulting (normalized) weight back against the static target — i.e. how far recent
 * price moves alone have pushed the portfolio off its target mix, with no purchase-date
 * or quantity data required.
 */
export function calcHoldingDrift(
  holdings: DriftHolding[],
  returns: Record<string, number | null>
): HoldingDrift[] {
  const growthFactors = holdings.map((h) => {
    const r = returns[h.ticker];
    return r === null || r === undefined ? null : 1 + r;
  });

  const driftedValues = holdings.map((h, i) => {
    const factor = growthFactors[i];
    return factor === null ? h.allocation : h.allocation * factor;
  });
  const driftedTotal = driftedValues.reduce((s, v) => s + v, 0);

  return holdings.map((h, i) => {
    const factor = growthFactors[i];
    const targetPct = h.allocation;

    if (factor === null || driftedTotal <= 0) {
      return {
        ticker: h.ticker,
        targetPct,
        currentPct: targetPct,
        gapPct: 0,
        status: "unknown",
      };
    }

    const currentPct = (driftedValues[i] / driftedTotal) * 100;
    const gapPct = currentPct - targetPct;
    let status: DriftStatus = "on-target";
    if (gapPct > DRIFT_THRESHOLD_PCT) status = "overweight";
    else if (gapPct < -DRIFT_THRESHOLD_PCT) status = "underweight";

    return { ticker: h.ticker, targetPct, currentPct, gapPct, status };
  });
}
