/**
 * 401k Portfolio — Long Term, Moderately Conservative
 *
 * ═══════════════════════════════════════════════════════════════════════════════════════
 * NOVEMBER 25, 2026 — FROM-SCRATCH REBUILD (human-requested)
 * ═══════════════════════════════════════════════════════════════════════════════════════
 * A 20–30 year retirement core should not chase the AI correction — it should be built for
 * the regime that caused it. The regime now: the Fed is hiking (3.75–4.00%, a December
 * hike ~95% priced), headline PCE inflation is 3.8% and core 3.3%, the dollar sits near a
 * 19-month high, and gold has fallen ~36% from its January record as real yields rose.
 *
 * What changed from the prior 401k, and why:
 *   + SCHP 8%  (TIPS) — inflation-linked Treasuries hedge inflation directly; gold hedges
 *              it only loosely and has just shown it can fall 36% in a hiking cycle.
 *   + VGSH 6%  — short Treasuries yield ~4% with little rate risk while the Fed is still
 *              raising; BND trimmed 22% → 14% so total fixed income stays ~28%.
 *   ~ VXUS 12 → 14% — international equity trades ~14x earnings vs ~22x for the S&P 500,
 *              a wider-than-usual discount after the US tech correction.
 *   ~ VTI 28 → 30% — the broad US market is ~8% off its high; buying the whole market on
 *              the dip, not just the beaten-up AI corner, is the right move for this account.
 *   − SCHD 15 → 12%, VHT 9 → 7% — both near their highs after the defensive rotation;
 *              still held, but no longer bargains.
 *   − GLD 7 → 5% — kept as a crisis hedge, cut because TIPS now do the inflation job better.
 *   − VNQ 7 → 4% — REITs are among the most rate-sensitive assets in a hiking cycle.
 *
 * Framework: Prompt #5 BlackRock Portfolio Builder (allocation), #3 Bridgewater Risk
 * Assessment (regime/rates, tail hedges), #7 Harvard Endowment Dividend (SCHD income),
 * #10 McKinsey Macro (inflation and Fed regime), #13 Forensic screen on ETF constituents.
 * Note: the stock-picking prompts (#17 Moat, #8 Bain) are deliberately not the primary
 * framework here — for a diversified retirement core the relevant dimension is
 * risk-adjusted return and drawdown, not single-stock alpha.
 * ═══════════════════════════════════════════════════════════════════════════════════════
 */

import { PortfolioDefinition } from "@/types/portfolio";

export const PORTFOLIO_401K: PortfolioDefinition = {
  id: "401k",
  name: "Retirement Core",
  accountType: "Tax-Deferred Retirement",
  timeHorizon: "20–30 years",
  riskLevel: "Mod. Conservative",
  riskColor: "text-blue-400",
  accentColor: "border-blue-500/40",
  cardGradient: "from-blue-500/10 to-transparent",
  description:
    "Rebuilt Nov 25, 2026 for a rate-hiking, above-target-inflation regime. Broad US and international index funds " +
    "remain the growth engine (44%), with international raised because it trades at a wider discount to the US than usual. " +
    "Fixed income stays ~28% but is now split across core bonds, short Treasuries and inflation-protected TIPS, so the " +
    "portfolio is less exposed to further rate hikes. Gold and REITs were trimmed after a hiking cycle showed how " +
    "rate-sensitive both are.",
  promptsUsed: [
    "Prompt #5  — BlackRock Portfolio Builder (asset allocation + Sharpe optimisation)",
    "Prompt #3  — Bridgewater Risk Assessment (rate regime, inflation & tail-risk hedging)",
    "Prompt #7  — Harvard Endowment Dividend Strategy (income component via SCHD)",
    "Prompt #10 — McKinsey Macro Report (Fed hiking cycle, inflation at 3.8% headline)",
    "Prompt #13 — Forensic Accounting Auditor (mandatory screen — all ETFs clear)",
  ],
  holdings: [
    {
      ticker: "VTI",
      name: "Vanguard Total Market ETF",
      type: "etf",
      sector: "US Broad Market",
      allocation: 30,
      rationale:
        "One-ticket exposure to ~4,000 US stocks at a 0.03% fee. Raised from 28% because the whole US market is ~8% off its " +
        "high — buying broadly on the dip, rather than just the AI names that fell hardest, is the right move for a 20–30 year account.",
      color: "#3b82f6",
      risk: "Low",
    },
    {
      ticker: "VXUS",
      name: "Vanguard International ETF",
      type: "etf",
      sector: "International Equity",
      allocation: 14,
      rationale:
        "8,000+ non-US stocks at roughly 14x earnings versus ~22x for the S&P 500. Raised from 12% because that valuation gap is " +
        "wider than usual after the US tech correction. A strong dollar is the near-term headwind; over decades it tends to mean-revert.",
      color: "#60a5fa",
      risk: "Medium",
    },
    {
      ticker: "BND",
      name: "Vanguard Total Bond Market ETF",
      type: "bond",
      sector: "Fixed Income",
      allocation: 14,
      rationale:
        "Core investment-grade bonds and the portfolio's main shock absorber in an equity drawdown. Trimmed from 22% because its " +
        "intermediate duration loses value if the Fed keeps hiking; the difference moved into short Treasuries and TIPS below.",
      color: "#93c5fd",
      risk: "Low",
    },
    {
      ticker: "SCHD",
      name: "Schwab US Dividend Equity ETF",
      type: "etf",
      sector: "Dividend / Quality",
      allocation: 12,
      rationale:
        "Quality dividend growers with lower historical drawdowns than the S&P 500. Trimmed from 15% — it is near its high after " +
        "the defensive rotation, so still worth holding but no longer a bargain.",
      color: "#1d4ed8",
      risk: "Low",
    },
    {
      ticker: "SCHP",
      name: "Schwab US TIPS ETF",
      type: "bond",
      sector: "Inflation-Protected Bonds",
      allocation: 8,
      rationale:
        "New. Treasury Inflation-Protected Securities adjust principal with CPI, so they hedge inflation directly — useful with " +
        "headline PCE at 3.8%. Replaces part of the gold allocation, which hedges inflation only loosely and just fell ~36% as real yields rose.",
      color: "#0ea5e9",
      risk: "Low",
    },
    {
      ticker: "VHT",
      name: "Vanguard Health Care ETF",
      type: "etf",
      sector: "Healthcare",
      allocation: 7,
      rationale:
        "Defensive sector with demographic tailwinds, and where money has been rotating during the tech sell-off. Trimmed from 9% " +
        "because that rotation has already lifted it near its high.",
      color: "#2563eb",
      risk: "Low",
    },
    {
      ticker: "VGSH",
      name: "Vanguard Short-Term Treasury ETF",
      type: "bond",
      sector: "Short-Term Fixed Income",
      allocation: 6,
      rationale:
        "New to this portfolio. 1–3 year Treasuries yield roughly in line with the 3.75–4.00% policy rate with very little price risk if " +
        "rates keep rising. Dry powder to rebalance into stocks if the correction deepens.",
      color: "#7dd3fc",
      risk: "Low",
    },
    {
      ticker: "GLD",
      name: "SPDR Gold Shares ETF",
      type: "etf",
      sector: "Commodities / Gold",
      allocation: 5,
      rationale:
        "Kept as a crisis hedge with low correlation to stocks and bonds, but cut from 7%: gold fell ~36% from its January record as " +
        "the Fed hiked and the dollar strengthened, and TIPS now cover the inflation-hedging role more directly.",
      color: "#fbbf24",
      risk: "Medium",
    },
    {
      ticker: "VNQ",
      name: "Vanguard Real Estate ETF",
      type: "etf",
      sector: "Real Estate",
      allocation: 4,
      rationale:
        "Real-asset diversification and income. Cut from 7% because REITs are among the most rate-sensitive assets while the Fed is " +
        "still hiking; a candidate to rebuild once the hiking cycle ends.",
      color: "#a5b4fc",
      risk: "Medium",
    },
  ],
};

export const TICKERS_401K = PORTFOLIO_401K.holdings.map((h) => h.ticker);
