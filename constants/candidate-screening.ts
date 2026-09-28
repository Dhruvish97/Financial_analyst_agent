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
    ticker: "AMD",
    name: "Advanced Micro Devices",
    market: "us",
    label: "STRONG WATCH",
    date: "2026-09-27",
    rationale:
      "New this cycle — the single biggest AI story of the month. OpenAI committed to deploying 6GW of AMD " +
      "Instinct GPUs over multiple years (1GW starting 2026) and received a warrant for up to 160M AMD shares; " +
      "Meta struck a parallel 6GW deal and warrant days later. Both vest as AMD's stock climbs toward $600. " +
      "Oracle separately ordered 50,000 MI450 chips. AMD crossed $1T market cap Sep 21 on a five-session run; " +
      "Raymond James upgraded to Strong Buy, $641 target. Strategically, the warrants financially incentivize " +
      "the two largest AI labs to port models to AMD's ROCm stack — a structural first dent in NVDA's CUDA-" +
      "exclusivity moat, not just a new competitor shipping more chips. The strongest new candidate screened in " +
      "any cycle so far, and a plausible swap-in for the portfolio's flagged TSLA slot — though first GPU " +
      "shipments aren't until late 2026 and most of the revenue lands later still.",
  },
  {
    ticker: "ORCL",
    name: "Oracle Corporation",
    market: "us",
    label: "WATCH",
    date: "2026-09-27",
    rationale:
      "New this cycle. Record Q1 FY27 cloud revenue +62% YoY to $11.6B, infrastructure revenue +121%, backlog " +
      "swelled to $664B; raised FY27 guidance to $90B+ revenue. Real moat: hyperscaler-tier growth with multi-" +
      "year contracted visibility. Real, freshly-emerged risk: a force-majeure notice tied to its Project " +
      "Jupiter (NM) data-center campus raised execution questions, and S&P cut Oracle's credit rating to BBB- — " +
      "just above junk — citing heavy debt reliance to fund the AI buildout. Strong moat, real balance-sheet " +
      "risk that wasn't there last cycle; watch rather than chase.",
  },
  {
    ticker: "ALAB",
    name: "Astera Labs",
    market: "us",
    label: "STRONG WATCH",
    date: "2026-09-27",
    rationale:
      "AI-fabric connectivity chips (Scorpio-X switches, Aries retimers). Q2 2026 revenue $392.4M +104% YoY, " +
      "beat by $31M; non-GAAP EPS $0.80 beat by 15.6%, 8th consecutive beat; Q2 net income $153.1M +199% YoY, EPS " +
      "beat estimates by 82%. Cornered-resource + switching-cost moat in the AI-rack interconnect layer that " +
      "NVDA/AVGO/ANET all depend on. Momentum still accelerating: stock $364.62 as of Sep 26, up from $312 on " +
      "Sep 4. Getting more expensive to initiate by the cycle, not less.",
  },
  {
    ticker: "PANW",
    name: "Palo Alto Networks",
    market: "us",
    label: "STRONG WATCH",
    date: "2026-09-27",
    rationale:
      "7 Powers 5/7: platformization creates switching cost + network effects. Morningstar wide-moat. Fiscal " +
      "Q4 FY26 actual (reported Sep 1) closed out the fiscal year: $3.41B revenue +34% YoY beat $3.35B estimate; " +
      "adjusted EPS $1.02 beat $0.98 estimate. Acquired Console Systems (Sep 1) to deepen agentic capabilities in " +
      "its Cortex platform — part of CEO Arora's aggressive dealmaking run that already includes the $25B " +
      "CyberArk and $3.4B Chronosphere acquisitions. The moat is now being extended by acquisition as much as by " +
      "organic growth, but a swap into NET's slot still needs a NET-side catalyst, not just a PANW-side one — " +
      "and NET itself had its strongest cycle yet (see research log).",
  },
  {
    ticker: "CRDO",
    name: "Credo Technology",
    market: "us",
    label: "WATCH",
    date: "2026-09-27",
    rationale:
      "FY2026 revenue $1.3B, +206% YoY; Q4 FY26 revenue $437.0M +157% YoY; non-GAAP net income +5x YoY to $662M. " +
      "Active Electrical Cables (AECs) have become the intra-rack AI-connectivity standard for hyperscalers/" +
      "neoclouds, and PILOT diagnostic software embeds Credo into customers' network architecture — a " +
      "telemetry-first switching-cost moat similar in shape to ALAB's. First negative signal since being added: " +
      "Mizuho cut its price target to $245 (from $290) on Sep 21. Still a legitimate AI-interconnect name, just " +
      "cooling off relative to ALAB this cycle.",
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
