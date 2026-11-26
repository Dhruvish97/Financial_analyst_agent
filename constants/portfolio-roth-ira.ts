/**
 * Roth IRA Portfolio — Semi Short Term, Moderately Aggressive
 *
 * ═══════════════════════════════════════════════════════════════════════════════════════
 * NOVEMBER 25, 2026 — FROM-SCRATCH REBUILD (human-requested; supersedes the lineup below)
 * ═══════════════════════════════════════════════════════════════════════════════════════
 * Rebuilt alongside Aggressive Growth (see constants/portfolio-stocks.ts for the full market
 * backdrop, the "should we be cautious on AI chips and memory?" answer, and the list of
 * names that did not re-qualify). Normal refresh rules were waived for this rebuild.
 *
 * Roth-specific logic: tax-free compounding makes this the right account to buy
 * long-duration growth during a correction, but through a 30% index core (VOO 16 + QQQ 14)
 * rather than concentrated single names. Single names are the Aggressive Growth holdings
 * with the longest runway; META, JPM and CRM were left out here (META's equity-funded capex
 * and CRM's AI-disruption risk are better sized in a taxable account where losses can be
 * harvested; JPM's role as a rate-cycle diversifier is already covered by VOO's ~13%
 * financials weight, and this account is meant to lean toward growth).
 *
 * New lineup: VOO 16 · QQQ 14 · MSFT 12 · TSM 10 · GOOGL 10 · NVDA 8 · AMZN 8 · AVGO 6 ·
 *             ETN 6 · NFLX 5 · UNH 5
 * Removed vs. prior lineup: META, CRWD (~127x forward), PLTR (~64x forward), VGT
 * (redundant with QQQ). NVDA cut 18% → 8% on governance risk.
 * ═══════════════════════════════════════════════════════════════════════════════════════
 *
 * HISTORY — prior lineup and refresh notes (superseded by the rebuild above):
 *
 * Research methodology — backtested prompt sequence (see PROMPT_ACCURACY_REPORT.md):
 *   TIER 1 (Structural Foundation — highest accuracy):
 *   - Prompt #17 Moat Destroyer (7 Powers) → 92/100 — every holding must score ≥ 3/7
 *   - Prompt #8  Bain Competitive Analysis → 87/100 — sector winner selection
 *   - Prompt #18 Behavioral Finance Bias Auditor → 84/100 — contrarian opportunity check
 *   TIER 2 (Signal Confirmation):
 *   - Prompt #6  Citadel Technical Analysis → 82/100 — RSI + entry timing
 *   - Prompt #9  Renaissance Pattern Finder → 77/100 — momentum / breakout confirmation
 *   TIER 3 (Valuation):
 *   - Prompt #11 Peter Lynch GARP → 73/100 — PEG check for profitable positions
 *   TIER 5 (Risk — mandatory):
 *   - Prompt #13 Forensic Accounting Auditor → run on every holding; all clear
 *
 * Strategy: Tax-free compounding in high-growth names. The Roth structure maximises
 * the benefit of holding high-growth assets — all gains compound and are withdrawn
 * tax-free. Concentrated in proven mega-cap compounders with the strongest 7 Powers
 * moat scores. AVGO added: custom ASIC moat is among the strongest in semiconductors.
 * CRWD increased: cybersecurity #1 platform moat confirmed by backtesting.
 * ETF allocation (QQQ, VGT) trimmed to concentrate in higher-conviction names.
 *
 * March 2026 rebuild changes:
 *   + AVGO added 7%          (custom ASIC + VMware; missing from prior version)
 *   + CRWD increased 8→10%  (top cybersecurity 7 Powers score — Falcon switching cost)
 *   − QQQ reduced 15→12%    (trimmed to fund higher-conviction individual names)
 *   − VGT reduced 10→8%     (same — concentration in moat-quality names preferred)
 *   − PLTR reduced 6→2%     (retain exposure to govt moat; trim speculative sizing)
 *
 * March 2026 market refresh (research update — current intelligence):
 *   + PLTR increased 2→3%   (US commercial +137% YoY; $7.2B FY26 guidance +61%; AIP resolved revenue concern)
 *   − VGT reduced 8→7%      (funded PLTR increase; broad ETF less efficient than moat names)
 *   ~ NVDA updated           (Blackwell B200 shipping; +73% Q4 FY26 revenue to $68.1B)
 *   ~ META updated           ($27B Nebius AI infrastructure deal; CapEx $115–135B 2026)
 *   ~ GOOGL updated          (Gemini 2.0 competitive with GPT-4o; Waymo commercially deployed)
 *
 * September 5, 2026 market refresh (research update — current intelligence; no allocation changes):
 *   ~ NVDA updated    (Q2 FY27 actual, reported Aug 26: $96.2B revenue +106% YoY beat; GAAP EPS $2.22 beat; data center revenue $89B +117% YoY, 92% of total. Q3 FY27 guidance $108B beats the
 *                      $104.2B street estimate. AWS committed to buy 2M NVDA GPUs plus NVDA's new 'Vera' CPU — the largest hyperscaler AI-compute order disclosed to date.)
 *   ~ MSFT updated    (FY26 Azure revenue crossed $100B; CFO guided Q1 FY27 Azure growth to ~45% constant currency. Nadella confirmed early enterprise use of OpenAI's GPT-6 Astra on Azure; OpenAI
 *                      has committed to an incremental $250B of Azure purchases, with Microsoft holding Azure exclusivity until AGI.)
 *   ~ GOOGL updated   (Launched Gemini 3.8 Flash (Sep 2), its third Flash model in six weeks; Cloud CEO Kurian says ~75% of Cloud customers already use its AI products. A federal judge rejected
 *                      the DOJ's push to force ad-exchange divestiture. Stock recovering in September after its longest monthly losing streak in over a decade.)
 *   ~ META updated    (Agreed Aug 26 to pay ~$18B — including a $10B Q3 charge — settling a 29-state youth-safety lawsuit; Morgan Stanley called it a net positive that clears the way for new AI
 *                      product launches. Network-effect moat unaffected. New compute deals (Google Cloud, CoreWeave, talks with Oracle) stack on top of the already-raised FY26 capex guidance.)
 *   ~ AMZN updated    (AWS's 2M-GPU + 'Vera' CPU order from NVIDIA is the largest disclosed hyperscaler AI-compute commitment this cycle; new Graviton5 EC2 instances extend the custom-silicon edge.)
 *   ~ CRWD updated    (Q2 FY2027 actual, reported Aug 26: $1.47B revenue +26% YoY beat; non-GAAP EPS $0.31 beat; net-new ARR $333M accelerating to +51% YoY. CEO called it the best quarter in
 *                      company history; stock popped >11% after hours.)
 *   ~ AVGO updated    (Q3 FY2026 actual, reported Sep 2: $29.6B revenue +86% YoY beat; AI semiconductor revenue $16.7B +221% YoY; record FCF $13.7B. FY2027/28 AI semi revenue now guided ~$115B/
 *                      ~$230B. Stock reaction was muted — much of the beat already priced in after +51% YTD.)
 *   ~ PLTR updated    (PwC collaboration expansion (Sep 3) and the Army's TITAN contract extend the growth story, but the stock also touched ~150x trailing earnings against a ~40x software-sector
 *                      median — a valuation risk worth flagging even at this Roth account's smaller 3% sizing.)
 *
 * September 27, 2026 market refresh (research update — current intelligence; no allocation changes):
 *   ~ MACRO           (The Fed hiked 25bp to 3.75–4.00% on Sep 16 — first hike since 2023, 12-0 vote — with more possibly ahead per the dot plot. Anthropic CEO Dario Amodei's Sep 14 essay urging
 *                      an AI-buildout slowdown briefly hit AI-infrastructure sentiment sector-wide, though not every desk agreed — JPMorgan upgraded CoreWeave the same week.)
 *   ~ NVDA updated    (No new earnings this cycle; sector sentiment wobbled on the Amodei essay above, but hyperscaler capex commitments (MSFT, GOOGL, AMZN, META) all still climbing regardless.)
 *   ~ MSFT updated    (Shipped a major Copilot upgrade unifying chat/coding/agents; raised its dividend 8% to $0.98/share. Two real counter-signals: Raymond James downgraded to 'Strong Sell' while
 *                      Oppenheimer warned of a possible 2026 IT-spend pull-forward; FY26 capex is running past $175B and quarterly FCF fell 23.2%.)
 *   ~ GOOGL updated   (Launched Gemini 3.8 Live + Extended Thinking; committed €13B to a Finland AI-datacenter buildout for 2027–28. Stock rangebound $330–350 this cycle.)
 *   ~ META updated    (Muse, its new AI assistant, became a viral hit — shares +36% in September, nearing a $2T market cap. A New Mexico jury separately found Meta misled users on data-safety
 *                      rules, a fresh legal matter distinct from the Aug settlement.)
 *   ~ AMZN updated    (AWS backlog swelled to ~$496B from ~$195B a year ago; Wells Fargo upgraded to Overweight (Sep 24) on Project Rainier capacity — yet the stock sits ~12% below its August
 *                      high, a real price/fundamentals disconnect.)
 *   ~ CRWD updated    (Baird raised its target to $235 but kept a Neutral rating — the stock has run further than the rating has.)
 *   ~ AVGO updated    (Cantor Fitzgerald raised its target to $600 (from $525); board approved a $0.65/share dividend. Increasingly framed as a broader AI-infrastructure platform, with some
 *                      knock-on exposure to the sector-wide sentiment wobble above.)
 *   ~ PLTR updated    (UBS raised its target to $250 (from $220) on a record $2.1B in US commercial bookings — the valuation flag from last cycle stands unchanged, not resolved.)
 */

import { PortfolioDefinition } from "@/types/portfolio";

export const PORTFOLIO_ROTH_IRA: PortfolioDefinition = {
  id: "roth-ira",
  name: "Tax-Free Growth",
  accountType: "Tax-Advantaged Retirement",
  timeHorizon: "5–10 years",
  riskLevel: "Mod. Aggressive",
  riskColor: "text-green-400",
  accentColor: "border-green-500/40",
  cardGradient: "from-green-500/10 to-transparent",
  description:
    "Rebuilt from scratch on Nov 25, 2026. A tax-free account is the best place to buy long-duration growth on sale, " +
    "because any recovery compounds untaxed — so this portfolio leans into the AI-led correction, but through a 30% " +
    "broad-index core (VOO + QQQ, both meaningfully off their highs) rather than concentrated single names. Individual " +
    "holdings are the subset of the Aggressive Growth rebuild with the longest compounding runway; AI chip exposure is " +
    "held through TSM, NVDA and AVGO at moderate sizes, with no memory or high-multiple software.",
  promptsUsed: [
    "Prompt #17 — Moat Destroyer / 7 Powers (every single-stock holding ≥ 3/7)",
    "Prompt #5  — BlackRock Portfolio Builder (index core vs. single-name satellite split)",
    "Prompt #18 — Behavioral Finance Bias Auditor (buying fear vs. catching falling knives)",
    "Prompt #13 — Forensic Accounting Auditor (free cash flow checks on every name)",
    "Prompt #11 — Peter Lynch GARP (forward P/E vs. growth at reset prices)",
  ],
  holdings: [
    {
      ticker: "VOO",
      name: "Vanguard S&P 500 ETF",
      type: "etf",
      sector: "ETF — S&P 500",
      allocation: 16,
      rationale:
        "The core. ~8% off its high at ~22x trailing earnings, it owns the whole market — including the healthcare, financial and " +
        "defensive sectors money is rotating into — so a broad recovery is captured even if the AI names stay volatile. In a Roth, " +
        "low-turnover index exposure bought during a correction is about as efficient as tax-free compounding gets.",
      color: "#22c55e",
      risk: "Low",
    },
    {
      ticker: "QQQ",
      name: "Invesco QQQ Trust",
      type: "etf",
      sector: "ETF — Nasdaq 100",
      allocation: 14,
      rationale:
        "Growth-tilted index exposure ~17% off its high — a larger discount than the S&P because the correction is concentrated in tech. " +
        "It does overlap with the single-name holdings below (MSFT, NVDA, GOOGL, AMZN, AVGO are top weights), which is intentional: it " +
        "spreads the AI bet across 100 names instead of relying on picking the right three.",
      color: "#8884d8",
      risk: "Medium",
    },
    {
      ticker: "MSFT",
      name: "Microsoft Corporation",
      type: "stock",
      sector: "Cloud & AI",
      allocation: 12,
      rationale:
        "7 Powers 7/7 and the only major AI spender still free-cash-flow positive ($18.6B last quarter; expects to stay positive for FY27). " +
        "Azure +48%, guided to 49–50%. Only ~12% off its high at ~20x forward, so it is the quality anchor rather than a bargain — the " +
        "name most likely to keep compounding through a long, credit-tight AI cycle.",
      color: "#00a4ef",
      risk: "Low",
    },
    {
      ticker: "TSM",
      name: "Taiwan Semiconductor (ADR)",
      type: "stock",
      sector: "Semiconductor Foundry",
      allocation: 10,
      rationale:
        "7 Powers 6/7. Makes the leading-edge chips for NVDA, AMD, Broadcom's custom ASICs and Apple, so it wins whichever AI chip design " +
        "wins, and it is reportedly raising prices ~10% next year. ~30% off its high at ~14.6x forward. A 5–10 year Roth horizon is the " +
        "right place to hold through its main risk (Taiwan geopolitics) and through any capex digestion phase.",
      color: "#9333ea",
      risk: "Medium",
    },
    {
      ticker: "GOOGL",
      name: "Alphabet Inc.",
      type: "stock",
      sector: "Internet & AI",
      allocation: 10,
      rationale:
        "7 Powers 6/7 at ~14x trailing earnings, ~33% off its high. Google Cloud roughly doubled to $30.7B with a ~$561B backlog, and TPUs " +
        "are becoming a product line. The trade-off is real: Q3 free cash flow was −$9.1B and debt has grown ~6x in a year to fund capex. " +
        "Over ten years the moat should matter more than the cash-burn phase; that is why it fits the Roth.",
      color: "#4285f4",
      risk: "Medium",
    },
    {
      ticker: "NVDA",
      name: "NVIDIA Corporation",
      type: "stock",
      sector: "AI Semiconductors",
      allocation: 8,
      rationale:
        "7 Powers 6/7. Record Q3 FY27 ($115.8B, +103%) and a $130B Q4 guide, yet ~39% off its high at ~9x forward because of the Huang " +
        "resignation/reinstatement, an open board investigation and S&P CreditWatch Negative. A long horizon can absorb that governance " +
        "noise better than a taxable account can, but it is still sized well below its old 18% weight.",
      color: "#76b900",
      risk: "High",
    },
    {
      ticker: "AMZN",
      name: "Amazon.com Inc.",
      type: "stock",
      sector: "Cloud & E-Commerce",
      allocation: 8,
      rationale:
        "7 Powers 6/7. AWS ~+39% and accelerating for six quarters, ~$578B backlog, 40%+ growth guided for 2027 and 2028. ~15% off its " +
        "high. Trailing free cash flow is about −$42B on ~$220B of capex — a known cost of the buildout, sized accordingly. No dividend, " +
        "so all of the return compounds inside the Roth.",
      color: "#ff9900",
      risk: "Medium",
    },
    {
      ticker: "AVGO",
      name: "Broadcom Inc.",
      type: "stock",
      sector: "Semiconductors & Software",
      allocation: 6,
      rationale:
        "7 Powers 5/7. ~39% off its high (bear-market territory) at ~15.5x forward after AI semiconductor revenue grew 221% last quarter. " +
        "Earnings on Dec 9 coincide with the Fed decision, so this is a position to build in stages, not in one buy.",
      color: "#cc0000",
      risk: "High",
    },
    {
      ticker: "ETN",
      name: "Eaton Corporation",
      type: "stock",
      sector: "Electrical & Power Infrastructure",
      allocation: 6,
      rationale:
        "7 Powers 4/7. The electricity bottleneck is a decade-long theme, and Eaton is the diversified way to own it: ~33% off its high at " +
        "~19x forward after a midterm-driven sell-off, while Q3 beat and raised with orders +39% and backlog +33%. Sells to utilities, " +
        "aerospace and industry as well as data centers.",
      color: "#14b8a6",
      risk: "Medium",
    },
    {
      ticker: "NFLX",
      name: "Netflix Inc.",
      type: "stock",
      sector: "Streaming & Media",
      allocation: 5,
      rationale:
        "7 Powers 5/7, and uncorrelated with AI capex. ~46% off its high at ~16x forward — its cheapest in years — after a cut to its " +
        "2026 ad-revenue forecast. Management bought back a record ~$4.8B of stock in Q3. A long holding period gives the ad business " +
        "time to mature.",
      color: "#f43f5e",
      risk: "Medium",
    },
    {
      ticker: "UNH",
      name: "UnitedHealth Group",
      type: "stock",
      sector: "Managed Healthcare",
      allocation: 5,
      rationale:
        "7 Powers 4/7. ~25% off its high at ~14.7x forward after CMS proposed the CRUSH Medicare Advantage audit rule (Nov 16). The rule " +
        "is a proposal with a Jan 19 comment deadline and real litigation risk for CMS; healthcare is also where defensive money is " +
        "rotating. Smaller than in Aggressive Growth because the 2027 guidance (due before year-end) is a binary event.",
      color: "#6366f1",
      risk: "High",
    },
  ],
};

export const TICKERS_ROTH_IRA = PORTFOLIO_ROTH_IRA.holdings.map((h) => h.ticker);
