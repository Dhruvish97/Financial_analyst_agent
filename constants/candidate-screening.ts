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
  // ── Nov 25, 2026 from-scratch rebuild: names that were researched but did NOT make the
  //    portfolios, with what would change the verdict. Replaces the prior US list.
  {
    ticker: "VRT",
    name: "Vertiv Holdings",
    market: "us",
    label: "STRONG WATCH",
    date: "2026-11-25",
    rationale:
      "Biggest gap between fundamentals and price in the screen: Q3 revenue +61% to ~$4.3B, adjusted operating margin 25.2%, " +
      "guidance raised across the board — yet the stock is ~54% off its high at ~18x forward after the Nov 3 midterms brought " +
      "state data-center moratorium proposals. Not owned (ETN was chosen instead) because Vertiv is far more concentrated in " +
      "data centers, where Q3 project cancellations were reportedly the highest on record. Would move up if moratorium " +
      "proposals stall at the state level.",
  },
  {
    ticker: "AMD",
    name: "Advanced Micro Devices",
    market: "us",
    label: "WATCH",
    date: "2026-11-25",
    rationale:
      "Executing well: Q3 revenue $13.4B (+45%), data center $8.5B (+97%) on the MI450/Helios ramp, Q4 guided to ~$17B. " +
      "~38% off its high. Left out because at ~23x forward it is still more than twice NVDA's ~9x, and the OpenAI/Meta " +
      "warrants (up to ~320M shares) mean real dilution plus a growing non-cash GAAP charge. Would qualify on a lower price " +
      "or if NVDA's governance problem worsens.",
  },
  {
    ticker: "MU",
    name: "Micron Technology",
    market: "us",
    label: "WATCH",
    date: "2026-11-25",
    rationale:
      "The memory caution case. ~52% off its high at ~3x forward earnings — a P/E that low on a cyclical usually means the " +
      "market expects peak earnings. Bulls: 2027 HBM is largely sold out and JPMorgan sees shortages through 2028. Bears: " +
      "Chinese capacity (CXMT), slowing DRAM contract increases, and the fact that memory is the first link cut when AI " +
      "buyers slow spending. Revisit after earnings (~Dec 17) and Q1 2027 DRAM contract prices.",
  },
  {
    ticker: "ASML",
    name: "ASML Holding",
    market: "us",
    label: "WATCH",
    date: "2026-11-25",
    rationale:
      "Monopoly on EUV lithography, ~35% off its high at ~21x forward. Left out to avoid stacking more semiconductor-capex " +
      "exposure on top of TSM/NVDA/AVGO, and because chip-equipment spending is cyclical and export-control sensitive (BIS " +
      "proposed new remote-access chip rules Nov 16). Would qualify as a replacement if a chip holding is trimmed.",
  },
  {
    ticker: "LLY",
    name: "Eli Lilly",
    market: "us",
    label: "WATCH",
    date: "2026-11-25",
    rationale:
      "Arguably the highest-quality growth company outside tech, and a defensive-rotation favorite. Not owned only because it " +
      "never pulled back — ~6% off its high at ~27x forward. A 15%+ pullback without a pipeline problem would make it a buy.",
  },
  {
    ticker: "V",
    name: "Visa Inc.",
    market: "us",
    label: "WATCH",
    date: "2026-11-25",
    rationale:
      "Wide-moat payments network with US purchase volume still growing ~10%. Like LLY, it failed only the price test — ~4% " +
      "off its high at ~25x forward. A candidate for any portfolio that wants more defense if it corrects.",
  },
  {
    ticker: "CRWD",
    name: "CrowdStrike",
    market: "us",
    label: "WATCH",
    date: "2026-11-25",
    rationale:
      "Removed from the portfolios in the rebuild. Best-in-class security platform with record net-new ARR, but ~127x forward " +
      "earnings is too much multiple to carry while the Fed is hiking. A buy at a meaningfully lower multiple.",
  },
  {
    ticker: "INTU",
    name: "Intuit",
    market: "us",
    label: "ON RADAR",
    date: "2026-11-25",
    rationale:
      "~60% off its high at ~10x forward — cheap, but the business is visibly being hit: FY27 growth guided down to 9–10% and " +
      "another revenue-forecast cut Nov 20, with management citing a faster shift to AI tools. Peers H&R Block and ADP are up " +
      "this year, so this looks company-specific. Needs a guidance stabilization before it qualifies.",
  },
  {
    ticker: "ORCL",
    name: "Oracle",
    market: "us",
    label: "ON RADAR",
    date: "2026-11-25",
    rationale:
      "~58% off its high at ~9x forward, with a ~$638B backlog — but S&P has it at BBB-, one notch above junk, its 5-year CDS " +
      "is ~316bp, and roughly half the backlog depends on OpenAI. In a credit-led sell-off this is the riskiest way to own AI " +
      "infrastructure. Watching for a stabilized rating outlook.",
  },
  {
    ticker: "ALAB",
    name: "Astera Labs",
    market: "us",
    label: "ON RADAR",
    date: "2026-11-25",
    rationale:
      "Removed from STRONG WATCH. ~62% off its high — small, high-multiple AI names fell hardest in the risk-off move, as " +
      "expected. Still ~26x forward. Fundamentals were strong as of Q2; revisit once AI credit spreads stop widening.",
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
