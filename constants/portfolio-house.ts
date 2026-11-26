/**
 * House Fund Portfolio — ~3–5 Year Horizon, Capital Preservation + Modest Growth
 *
 * ═══════════════════════════════════════════════════════════════════════════════════════
 * NOVEMBER 25, 2026 — FROM-SCRATCH REBUILD (human-requested)
 * ═══════════════════════════════════════════════════════════════════════════════════════
 * Money needed in 3–5 years should not be "buying the dip" — the job is to not be forced to
 * sell into one. Two things changed since this portfolio was built: (1) cash-like Treasury
 * bills now pay roughly the 3.75–4.00% policy rate, with a hike likely in December, so
 * near-zero-risk yield is finally competitive; and (2) the classic defensive stocks this
 * portfolio held (JNJ, PG, KO) have been bid up near their highs by the rotation out of tech.
 *
 * What changed, and why:
 *   + SGOV 21%  (0–3 month T-bills) — new; earns the policy rate with essentially no price
 *               risk, and reprices higher if the Fed keeps hiking.
 *   ~ Fixed income 37% → 50% (SGOV 21 + VGSH 15 + BND 14) — a 3–5 year goal can't ride out
 *               a deep drawdown, and the rate environment now pays you to wait.
 *   − PG and KO removed — ~1–3% off their highs at ~23–28x forward earnings; defensive, but
 *               no longer priced defensively.
 *   + PEP added 7% — ~16% off its high at ~17x forward; the staples name the rotation left behind.
 *   ~ MCD kept (7 → 8%) — ~17% off its high at ~21x forward, recurring franchise fees.
 *   ~ JNJ trimmed 8 → 5% — still a Dividend King and low-beta, but near its high; held for
 *               stability, not value.
 *   ~ SCHD 18 → 15%, VTI 15% held — enough equity to keep up with inflation over 3–5 years.
 *
 * Framework: Prompt #5 BlackRock Portfolio Builder (allocation for a specific timeline),
 * #3 Bridgewater Risk Assessment (drawdown/sequence-of-returns risk), #7 Harvard Endowment
 * Dividend (income + stability), #10 McKinsey Macro (rates for bond positioning).
 * ═══════════════════════════════════════════════════════════════════════════════════════
 */

import { PortfolioDefinition } from "@/types/portfolio";

export const PORTFOLIO_HOUSE: PortfolioDefinition = {
  id: "house",
  name: "Medium-Term Savings",
  accountType: "Taxable / Savings",
  timeHorizon: "3–5 years",
  riskLevel: "Moderate",
  riskColor: "text-amber-400",
  accentColor: "border-amber-500/40",
  cardGradient: "from-amber-500/10 to-transparent",
  description:
    "Rebuilt Nov 25, 2026. Half the portfolio now sits in Treasuries — T-bills, short Treasuries and core bonds — because " +
    "cash-like yields near 4% make it cheap to protect a 3–5 year goal while markets correct. The equity half is broad-market " +
    "and dividend ETFs plus defensive stocks chosen for where they trade today: PEP and MCD, which have pulled back, rather " +
    "than PG and KO, which the defensive rotation has already pushed near their highs.",
  promptsUsed: [
    "Prompt #5 — BlackRock Portfolio Builder (3–5 year allocation framework)",
    "Prompt #3 — Bridgewater Risk Assessment (drawdown & sequence-of-returns risk)",
    "Prompt #7 — Harvard Endowment Dividend Strategy (income stability)",
    "Prompt #10 — McKinsey Macro Report (bond positioning in a hiking cycle)",
  ],
  holdings: [
    {
      ticker: "SGOV",
      name: "iShares 0–3 Month Treasury Bond ETF",
      type: "bond",
      sector: "Treasury Bills",
      allocation: 21,
      rationale:
        "New. Short-dated T-bills earn roughly the 3.75–4.00% policy rate with almost no price risk, and the yield rises if the Fed " +
        "hikes again in December. For money with a 3–5 year deadline, this is the safest place to wait out the correction.",
      color: "#fde68a",
      risk: "Low",
    },
    {
      ticker: "VGSH",
      name: "Vanguard Short-Term Treasury ETF",
      type: "bond",
      sector: "Short-Term Fixed Income",
      allocation: 15,
      rationale:
        "1–3 year Treasuries lock in today's yields a little longer than T-bills with only modest rate risk. Raised from 12% to " +
        "bridge the gap between cash-like SGOV and the longer-duration BND below.",
      color: "#fbbf24",
      risk: "Low",
    },
    {
      ticker: "SCHD",
      name: "Schwab US Dividend Equity ETF",
      type: "etf",
      sector: "Dividend / Quality",
      allocation: 15,
      rationale:
        "Quality dividend growers with lower volatility than the S&P 500. Trimmed from 18% to make room for more Treasuries; it is near " +
        "its high after the defensive rotation, so it is held for stability rather than as a value buy.",
      color: "#d97706",
      risk: "Low",
    },
    {
      ticker: "VTI",
      name: "Vanguard Total Market ETF",
      type: "etf",
      sector: "US Broad Market",
      allocation: 15,
      rationale:
        "Broad market participation so the fund keeps pace with inflation over 3–5 years. The market is ~8% off its high, so this " +
        "slice is being added at a modest discount; it stays capped at 15% because this money can't wait out a long bear market.",
      color: "#b45309",
      risk: "Low",
    },
    {
      ticker: "BND",
      name: "Vanguard Total Bond Market ETF",
      type: "bond",
      sector: "Fixed Income",
      allocation: 14,
      rationale:
        "Core bonds for ballast. Cut from 25% because its intermediate duration loses value if rates keep rising; most of that money " +
        "moved into shorter T-bills and Treasuries above.",
      color: "#f59e0b",
      risk: "Low",
    },
    {
      ticker: "MCD",
      name: "McDonald's Corporation",
      type: "stock",
      sector: "Consumer Discretionary",
      allocation: 8,
      rationale:
        "Franchise model: most revenue is recurring rent and royalties, not restaurant operating risk. ~17% off its high at ~21x " +
        "forward and 47+ consecutive years of dividend growth — a defensive name at a reasonable price, not a stretched one.",
      color: "#fde047",
      risk: "Low",
    },
    {
      ticker: "PEP",
      name: "PepsiCo Inc.",
      type: "stock",
      sector: "Consumer Staples",
      allocation: 7,
      rationale:
        "New. Snacks plus beverages, 50+ years of dividend increases, ~16% off its high at ~17x forward — the consumer-staples name " +
        "the defensive rotation largely skipped. Replaces PG and KO, which are near their highs at 23–28x forward.",
      color: "#2563eb",
      risk: "Low",
    },
    {
      ticker: "JNJ",
      name: "Johnson & Johnson",
      type: "stock",
      sector: "Healthcare / Defensive",
      allocation: 5,
      rationale:
        "Dividend King with pharma and medtech diversification, and very low beta. Trimmed from 8% because it is ~6% off its high at " +
        "~24x forward after the healthcare rotation — kept for stability, not value.",
      color: "#ef4444",
      risk: "Low",
    },
  ],
};

export const TICKERS_HOUSE = PORTFOLIO_HOUSE.holdings.map((h) => h.ticker);
