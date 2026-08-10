// ── Research Changelog ───────────────────────────────────────────────────────
//
// A structured, browsable timeline of the dated header-comment blocks that already
// live inside constants/portfolio-stocks.ts, constants/india-stocks.ts, and
// constants/portfolio-roth-ira.ts. Those comments remain the source of truth for
// full research detail; this file distills each cycle into a short entry for the
// /research-log page.
//
// Every weekly research refresh (see CLAUDE.md → Weekly Research Refresh) that
// stamps a new dated header block must append one entry here too, or this page
// will silently fall behind the actual research history.

export type ResearchLogScope = "us-stocks" | "india" | "roth-ira" | "multi";

export interface ResearchLogEntry {
  date: string; // ISO date, or "YYYY-MM" when only month-level precision is documented
  scope: ResearchLogScope;
  title: string;
  summary: string;
  highlights: string[];
}

// Newest first.
export const RESEARCH_LOG: ResearchLogEntry[] = [
  {
    date: "2026-08-10",
    scope: "multi",
    title: "Q2 earnings resolve last cycle's pending decisions",
    summary:
      "NET, ANET, PLTR, and MELI all reported Q2 2026 earnings this cycle, resolving the swap-vs-hold " +
      "question flagged Aug 1 for NET. RBI held rates. Astera Labs (ALAB) added to the US watchlist.",
    highlights: [
      "NET beat its own guidance and jumped +14.9% — the bear case for swapping to ANET/PANW did not materialize",
      "PLTR delivered the strongest print of the cycle: +93% revenue growth, guidance raised to $8.15B, stock +29.5%",
      "MELI beat on revenue (+50%) but margin compression pressured the stock -4.6%",
      "RBI's Aug 3–5 MPC held repo unchanged at 5.25%, neutral stance",
      "New candidate: Astera Labs (ALAB) — AI-fabric interconnect chips, +104% revenue YoY",
      "HAL's Q1 FY27 results remain pending (board meeting Aug 12)",
    ],
  },
  {
    date: "2026-08-01",
    scope: "multi",
    title: "Weekly refresh + ANET/PANW candidate screen",
    summary:
      "Arista Networks (ANET) and Palo Alto Networks (PANW) both screened stronger than NET on the 7 Powers " +
      "framework, but with Q2 earnings for both still unreported, the swap decision was deferred to next cycle.",
    highlights: [
      "ANET (5/7 powers) and PANW (5/7 powers) flagged as top swap candidates for NET (4/7 powers)",
      "TSLA held at 3% after a 2nd consecutive EPS miss — confirmed as the portfolio's weakest-moat holding",
      "India: ITC and Data Patterns both promoted to STRONG WATCH",
      "Eternal (formerly Zomato) delivered its first GAAP-profitable quarter",
    ],
  },
  {
    date: "2026-04-22",
    scope: "us-stocks",
    title: "AAPL/MELI swap into Aggressive Growth",
    summary:
      "First allocation change since the March rebuild: AAPL added at 3% (replacing COIN), MELI added at 2%, " +
      "TSLA trimmed from 5% to 3%.",
    highlights: [
      "AAPL added 3% — 6/7 powers vs COIN's 3/7; Services flywheel judged stronger than crypto regulatory moat",
      "MELI added 2% — new position on the LatAm fintech + e-commerce flywheel, funded by the TSLA trim",
      "COIN removed — S&P 500 inclusion and regulatory upside judged already priced in",
      "MU and PANW flagged on radar for future cycles",
    ],
  },
  {
    date: "2026-04-22",
    scope: "india",
    title: "BEL added, DIXON removed",
    summary:
      "Bharat Electronics added at 8%, replacing Dixon Technologies — a stronger 7 Powers score and a " +
      "government-contract moat versus commodity electronics manufacturing.",
    highlights: [
      "BEL added 8% — 5/7 powers, order book 3.1x FY25 revenue, top analyst defence pick",
      "DIXON removed — 3/7 powers, no durable switching-cost moat in contract electronics",
      "ITC and ICICIBANK flagged on radar for future cycles",
    ],
  },
  {
    date: "2026-03",
    scope: "us-stocks",
    title: "March 2026 rebuild",
    summary: "Structural rebuild of the Aggressive Growth portfolio ahead of the weekly-refresh workflow's launch.",
    highlights: [
      "AVGO increased 8% → 10% — custom ASIC moat accelerating for Google/Meta",
      "COIN added at 3% — S&P 500 member, GAAP profitable, BTC ETF volume",
      "TSLA reduced 7% → 5% — weakest 7 Powers score in the portfolio",
      "NET reduced 6% → 4%, PLTR reduced 5% → 4%",
    ],
  },
  {
    date: "2026-03",
    scope: "us-stocks",
    title: "March 2026 market refresh",
    summary: "First research-driven refresh following the March rebuild.",
    highlights: [
      "PLTR increased 4% → 5% on US commercial +137% YoY and raised FY26 guidance",
      "NET reduced 4% → 3% to fund the PLTR increase",
      "NVDA, META, GOOGL, TSLA rationale updated with current-quarter numbers",
    ],
  },
  {
    date: "2026-03",
    scope: "india",
    title: "March 2026 portfolio changes",
    summary: "HCLTECH added replacing Tata Motors; HDFCBANK and Bajaj Finance increased on contrarian theses.",
    highlights: [
      "HDFCBANK increased 12% → 14% — NIM pessimism read as anchoring bias, GARP at multi-year lows",
      "BAJFINANCE increased 8% → 10% — NPA cycle concerns judged overextrapolated",
      "HCLTECH.NS added at 10%, replacing Tata Motors — stronger 7 Powers score",
      "RELIANCE reduced 14% → 12%; ZOMATO (later Eternal) reduced 8% → 6%",
    ],
  },
  {
    date: "2026-03",
    scope: "roth-ira",
    title: "March 2026 rebuild",
    summary: "Tax-Free Growth portfolio concentrated further into individual moat names, trimming broad ETF exposure.",
    highlights: [
      "AVGO added at 7% — custom ASIC + VMware moat, previously missing from the portfolio",
      "CRWD increased 8% → 10% — top cybersecurity 7 Powers score",
      "QQQ trimmed 15% → 12%, VGT trimmed 10% → 8% — funded the AVGO/CRWD conviction increase",
      "PLTR reduced 6% → 2% — retained exposure to the government moat at lower speculative sizing",
    ],
  },
  {
    date: "2026-03",
    scope: "roth-ira",
    title: "March 2026 market refresh",
    summary: "First research-driven refresh following the roth-ira rebuild.",
    highlights: [
      "PLTR increased 2% → 3% — AIP execution resolved the prior revenue-growth concern",
      "VGT reduced 8% → 7% to fund the PLTR increase",
      "NVDA, META, GOOGL rationale updated with current-quarter numbers",
    ],
  },
];
