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
    date: "2026-08-10",
    rationale:
      "AI-fabric connectivity chips (Scorpio-X switches, Aries retimers). Q2 2026 revenue $392.4M +104% YoY, " +
      "beat by $31M; non-GAAP EPS $0.80 beat by 15.6%, 8th consecutive beat. Q3 guidance $540–560M (+40% QoQ) " +
      "as Scorpio-X enters volume production and becomes the largest product line a quarter early. Cornered-resource " +
      "+ switching-cost moat in the AI-rack interconnect layer that NVDA/AVGO/ANET all depend on — highest-growth " +
      "name screened this cycle, but richly valued after the beat; watch for an entry point rather than chasing.",
  },
  {
    ticker: "PANW",
    name: "Palo Alto Networks",
    market: "us",
    label: "STRONG WATCH",
    date: "2026-08-01",
    rationale:
      "7 Powers 5/7: platformization creates switching cost + network effects. Morningstar wide-moat, 17% " +
      "undervalued vs $225 fair value. Q3 FY26 revenue +31.1%, raised FY26 guidance to $11.41–11.42B — scores " +
      "higher than NET on both moat and valuation.",
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
