// ── Candidate Screening Watchlist ───────────────────────────────────────────
//
// The structured, current-cycle counterpart to the "NEW CANDIDATE SCREENING" prose
// blocks in constants/portfolio-stocks.ts and constants/india-stocks.ts' header
// comments. Those comments remain the source of truth for the full research
// narrative and history; this file holds only the LATEST cycle's entries in a
// machine-readable shape so the /watchlist page has something to render.
//
// Every weekly research refresh (see CLAUDE.md → Weekly Research Refresh) that
// screens new candidates must update this file, not just the header comment,
// or the Watchlist page will silently go stale.

export type ScreeningLabel = "ON RADAR" | "WATCH" | "STRONG WATCH";
export type ScreeningMarket = "us" | "india";

export interface CandidateScreening {
  ticker: string;
  name: string;
  market: ScreeningMarket;
  label: ScreeningLabel;
  date: string; // ISO date this entry was last confirmed/updated
  rationale: string;
}

export const CANDIDATE_SCREENING: CandidateScreening[] = [
  {
    ticker: "ALAB",
    name: "Astera Labs",
    market: "us",
    label: "STRONG WATCH",
    date: "2026-09-05",
    rationale:
      "AI-fabric connectivity chips (Scorpio-X switches, Aries retimers). Q2 2026 revenue $392.4M +104% YoY, " +
      "beat by $31M; non-GAAP EPS $0.80 beat by 15.6%, 8th consecutive beat. Cornered-resource + switching-cost " +
      "moat in the AI-rack interconnect layer that NVDA/AVGO/ANET all depend on. Momentum accelerating, not " +
      "cooling: stock $312 as of Sep 4 (+10.6% in a single session), Citi raised its target to $430 (from $315) " +
      "and Jefferies to $450 (from $270), both still Buy-rated. Getting more expensive to initiate, not less — " +
      "the 'watch for an entry point' caveat from last cycle is now more urgent.",
  },
  {
    ticker: "PANW",
    name: "Palo Alto Networks",
    market: "us",
    label: "STRONG WATCH",
    date: "2026-09-05",
    rationale:
      "7 Powers 5/7: platformization creates switching cost + network effects. Morningstar wide-moat. Fiscal " +
      "Q4 FY26 actual (reported Sep 1) closed out the fiscal year: $3.41B revenue +34% YoY beat $3.35B estimate; " +
      "adjusted EPS $1.02 beat $0.98 estimate. GAAP net loss was driven by one-time acquisition/stock-comp items, " +
      "not core operations. Stock round-tripped a 5% pop into a 2% after-hours loss — full-year results confirm " +
      "the moat and growth thesis, but the muted market reaction suggests a swap into NET's slot still needs a " +
      "NET-side catalyst (a guidance slip), not just a PANW-side one.",
  },
  {
    ticker: "CRDO",
    name: "Credo Technology",
    market: "us",
    label: "WATCH",
    date: "2026-09-05",
    rationale:
      "New this cycle. FY2026 revenue $1.3B, +206% YoY; Q4 FY26 revenue $437.0M +157% YoY; non-GAAP net income " +
      "+5x YoY to $662M. Active Electrical Cables (AECs) have become the intra-rack AI-connectivity standard for " +
      "hyperscalers/neoclouds, and PILOT diagnostic software embeds Credo into customers' network architecture — " +
      "a telemetry-first switching-cost moat similar in shape to ALAB's. Smaller-cap and less proven at scale than " +
      "ALAB, but complements rather than duplicates that thesis — a second way to play AI-interconnect demand.",
  },
  {
    ticker: "MU",
    name: "Micron Technology",
    market: "us",
    label: "WATCH",
    date: "2026-08-01",
    rationale:
      "Sold-out HBM supply through 2026, $100B+ binding multi-year contracts. Morgan Stanley's top 2026 semis " +
      "pick. Moat remains supply-lock rather than a durable platform — memory stays a cyclical business.",
  },
  {
    ticker: "ITC",
    name: "ITC Limited",
    market: "india",
    label: "STRONG WATCH",
    date: "2026-08-10",
    rationale:
      "7 Powers 5/7: brand moat across Aashirvaad/Bingo/Sunfeast + distribution scale + cigarette licensing " +
      "cornered resource. Stock down ~26% over the trailing year — a valuation reset. Rural demand improving " +
      "post-GST rationalisation and income-tax relief; rural premium-product usage rose from 30% to 42%. " +
      "GAAP-profitable, dividend-paying — stronger risk/reward than ETERNAL on paper, but no earnings catalyst " +
      "has yet forced a swap decision.",
  },
  {
    ticker: "AZADENGG",
    name: "Azad Engineering",
    market: "india",
    label: "ON RADAR",
    date: "2026-08-10",
    rationale:
      "Goldman Sachs top private-defence pick; India's only titanium-aerofoil manufacturer and one of few " +
      "globally machining complex aerospace components — cornered-resource moat, but small-cap and overlaps " +
      "existing HAL/BEL defence exposure. Watching for scale and liquidity improvement.",
  },
  {
    ticker: "ICICIBANK",
    name: "ICICI Bank",
    market: "india",
    label: "ON RADAR",
    date: "2026-08-01",
    rationale:
      "7 Powers 4/7: strong CASA ratio, digital moat (iMobile Pay) — a recurring analyst credit-cycle-recovery " +
      "theme this cycle. Overlaps existing HDFCBANK exposure, limiting the diversification benefit of adding it.",
  },
];
