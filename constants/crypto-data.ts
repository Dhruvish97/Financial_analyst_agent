/**
 * Crypto Portfolio — 2-4 Year Long-Term Opportunity Set
 *
 * Unlike the equity portfolios, this file had never been through a dated research cycle —
 * the original lineup was generic, undated placeholder text. This header comment starts
 * that practice: every future refresh should append a dated block below, exactly like
 * constants/portfolio-stocks.ts, rather than silently rewriting rationale in place.
 *
 * Framework: same moat-style lens as the equity side (network effects, switching cost,
 * cornered resource) translated to crypto-native terms — validator/developer network
 * effects, institutional integration depth, and tokenomics/security risk — applied with a
 * 2-4 year holding horizon rather than a trading view.
 *
 * September 5, 2026 rebuild (research update — first dated cycle for this file):
 *   ~ BTC reduced 40→35%   (still the core anchor — US Strategic Bitcoin Reserve, $564B
 *                            cumulative spot-ETF inflows, growing corporate treasury
 *                            allocations — trimmed slightly to fund the LINK increase below)
 *   ~ ETH held at 25%      (2026 roadmap: Glamsterdam + Hegotá upgrades targeting higher
 *                            throughput and L1 hardening; staked-ETH ETF launched; >30% of
 *                            supply now staked; SEC/CFTC jointly classified ETH a digital
 *                            commodity, confirming staking isn't a securities offering)
 *   ~ SOL reduced 15→12%   (Firedancer validator client live on mainnet since Dec 2025, but
 *                            only ~20%+ of validators had adopted it by Q2 2026 — full
 *                            network adoption still 12-24 months out; Alpenglow finality
 *                            upgrade targeting ~150ms finality possible Q3 2026. Real
 *                            progress, but the thesis is still mid-rollout, not proven)
 *   + LINK increased 7→15% (the strongest concrete 2-4yr institutional moat found this
 *                            cycle: Circle's Arc network goes live Sep 16, 2026 with
 *                            Chainlink as its official oracle/connectivity partner; DTCC —
 *                            the world's largest securities clearinghouse — is slated to
 *                            begin tokenizing DTC-custodied assets on Chainlink
 *                            infrastructure in H2 2027; a SWIFT messaging bridge connects
 *                            CCIP to traditional banking rails; Charles Schwab added LINK
 *                            to its retail platform Aug 30. This is the "picks and shovels"
 *                            bet on the broader real-world-asset tokenization supercycle)
 *   ~ AVAX held at 8%      (subnets increasingly used by institutions for tokenized bonds,
 *                            equity, and private funds; Charles Schwab added AVAX trading
 *                            Aug 29; Helicon mainnet upgrade planned for validator/staking
 *                            economics — steady story, no change in conviction)
 *   − INJ removed (was 5%) (an Aug 31, 2026 exploit drained ~$4.9M via a market-ID collision
 *                            in binary-options settlement logic; the team halted block
 *                            production for ~4 hours and initially characterized it publicly
 *                            as a routine "upgrade" rather than an incident response, which
 *                            multiple outlets disputed once the exploit details surfaced. No
 *                            full postmortem has been published as of this refresh. Native
 *                            INJ and staked assets were not directly drained, but the
 *                            transparency question is itself a governance red flag — a poor
 *                            fit for a multi-year, high-conviction slot)
 *   + ONDO added 5%        (new — a pure-play on real-world-asset tokenization, the single
 *                            most explosive theme found this cycle: on-chain RWA value grew
 *                            from ~$5.5B in early 2025 to ~$30B by mid-2026, led by
 *                            BlackRock, JPMorgan, and Franklin Templeton. Ondo's TVL has
 *                            crossed $3B, its OUSG product holds BlackRock BUIDL shares
 *                            directly, and it has a $200M seed deal with State Street and
 *                            Galaxy Asset Management for a new tokenized fund (SWEEP).
 *                            Confirmed tradable as ONDO-USD (#45 crypto by market cap).
 *                            Sized small — a Jan 2026 token unlock added ~1.94B ONDO to
 *                            circulating supply, a real dilution risk — this fills INJ's
 *                            former satellite slot rather than adding net risk)
 *
 * NEW CANDIDATE SCREENING — September 5, 2026:
 *   ~ TAO (Bittensor)  ON RADAR  (AI x crypto compute-market thesis; mentioned alongside
 *                                 SOL/LINK in long-term-pick roundups this cycle, but no
 *                                 concrete institutional integration comparable to LINK's
 *                                 found yet — watching, not adding)
 *   ~ XRP              ON RADAR  (payments/settlement thesis persists but didn't surface a
 *                                 new 2-4yr catalyst this cycle beyond what's already priced)
 */

import { CryptoHolding } from "@/types/portfolio";

export const CRYPTO_PORTFOLIO: CryptoHolding[] = [
  {
    ticker: "BTC-USD",
    displayTicker: "BTC",
    name: "Bitcoin",
    allocation: 35,
    rationale:
      "The core anchor. Institutional-reserve-asset thesis keeps strengthening: the US Strategic Bitcoin Reserve, $564B in cumulative spot-ETF net inflows, and " +
      "160+ listed companies now holding 110.5k+ BTC on their balance sheets. ETF daily inflows have exceeded $400M on strong days, and large asset managers holding " +
      "BTC ETF positions are up 150% YoY. The halving still matters for long-run supply, but flows — not the halving — are now the marginal price driver; Bitwise " +
      "estimates ETF demand alone could absorb more than 100% of newly issued BTC/ETH/SOL supply. Over a 2-4 year horizon, unmatched network effects and brand " +
      "recognition, plus a widening base of fiduciary buyers (pension funds, regulated ETF vehicles) with multi-year mandates, remain the core case.",
    color: "#f7931a",
    risk: "Medium",
  },
  {
    ticker: "ETH-USD",
    displayTicker: "ETH",
    name: "Ethereum",
    allocation: 25,
    rationale:
      "Dominant smart-contract platform and the settlement layer most RWA-tokenization projects (Ondo, BlackRock's BUIDL, Chainlink CCIP) build on top of. The 2026 " +
      "roadmap runs three tracks — Scale, UX, Harden — with the Glamsterdam and Hegotá upgrades targeting higher throughput, tighter L2 integration, and post-quantum " +
      "resilience; enshrined proposer-builder separation reduces trust in off-chain block builders. Staking has cleared a major regulatory hurdle: the SEC and CFTC " +
      "jointly classified ETH as a digital commodity and confirmed staking isn't a securities offering, clearing the way for BlackRock's staked-ETH ETF ($155M in " +
      "its first 24 hours). Over 1M validators are active and 30%+ of supply is staked, providing a real yield component on top of price appreciation potential.",
    color: "#627eea",
    risk: "Medium",
  },
  {
    ticker: "SOL-USD",
    displayTicker: "SOL",
    name: "Solana",
    allocation: 12,
    rationale:
      "High-throughput L1 with the deepest consumer-app and DeFi activity outside Ethereum. Firedancer, Jump Crypto's independent validator client, has been live on " +
      "mainnet since December 2025 and reached roughly 20%+ of active validators by Q2 2026 — real client diversity and a path toward 1M TPS, but full network " +
      "adoption is still projected 12-24 months out. The Alpenglow consensus upgrade, targeting ~150ms finality, could activate as early as Q3 2026 if testing stays " +
      "clean. Reduced slightly this cycle to reflect that the throughput/reliability thesis is still mid-rollout rather than fully proven at scale — still the " +
      "highest-conviction growth-L1 bet in the portfolio, just not yet a finished story.",
    color: "#9945ff",
    risk: "High",
  },
  {
    ticker: "LINK-USD",
    displayTicker: "LINK",
    name: "Chainlink",
    allocation: 15,
    rationale:
      "Critical oracle and cross-chain infrastructure — the strongest concrete 2-4 year institutional moat found this cycle. Circle's institutional blockchain, Arc, " +
      "goes live Sep 16, 2026 with Chainlink as its official oracle and connectivity partner; the DTCC (the world's largest securities clearinghouse) is expected to " +
      "begin tokenizing DTC-custodied assets on Chainlink infrastructure in H2 2027; a SWIFT partnership bridges traditional bank messaging rails into CCIP; and " +
      "Charles Schwab added LINK to its retail crypto platform Aug 30. Nine new integrations across five chains were announced Aug 31 alone. Ondo Finance's " +
      "tokenized-securities platform — itself tied to Fidelity, BlackRock, and PayPal's PYUSD — runs on Chainlink oracles, and network transfer volume is up 1,972% " +
      "YoY to $7.77B. This is the 'picks and shovels' bet on the broader RWA-tokenization supercycle rather than a bet on any single chain winning.",
    color: "#375bd2",
    risk: "Medium",
  },
  {
    ticker: "AVAX-USD",
    displayTicker: "AVAX",
    name: "Avalanche",
    allocation: 8,
    rationale:
      "Subnet (now 'Avalanche L1') architecture lets institutions run private, regulated chains for tokenized bonds, equities, and private funds separate from public " +
      "DeFi — 75+ active L1s were live by end-2025, up 158% YoY, after the Avalanche9000/Etna fork cut the cost of launching one by 99%+. Charles Schwab added AVAX " +
      "trading for its retail client base Aug 29, 2026, and the Helicon mainnet upgrade (planned for later in 2026) targets improved validator and staking " +
      "economics. A steadier, more institution-facing complement to LINK's oracle-layer bet on the same RWA-tokenization trend.",
    color: "#e84142",
    risk: "Medium",
  },
  {
    ticker: "ONDO-USD",
    displayTicker: "ONDO",
    name: "Ondo Finance",
    allocation: 5,
    rationale:
      "New this cycle — a direct, pure-play bet on real-world-asset tokenization, the single most explosive theme found in this research pass: on-chain RWA value " +
      "grew from roughly $5.5B in early 2025 to ~$30B by mid-2026, led by BlackRock, JPMorgan, and Franklin Templeton. Ondo's TVL has crossed $3B; its OUSG product " +
      "directly holds BlackRock BUIDL shares, connecting it to institutional tokenized-Treasury infrastructure, and it has a $200M seed deal with State Street and " +
      "Galaxy Asset Management for a new tokenized fund (SWEEP) launching in 2026. Real risk to flag: a January 2026 token unlock added ~1.94B ONDO to circulating " +
      "supply, a meaningful dilution event, and Ondo Global Markets' expansion into tokenized stocks/derivatives is still early. Sized small deliberately — this " +
      "fills the higher-risk satellite slot vacated by INJ without adding net portfolio risk.",
    color: "#1d4ed8",
    risk: "High",
  },
];

export const CRYPTO_TICKERS = CRYPTO_PORTFOLIO.map((c) => c.ticker);
