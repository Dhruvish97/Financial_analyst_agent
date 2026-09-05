/**
 * Roth IRA Portfolio — Semi Short Term, Moderately Aggressive
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
    "A tax-free growth portfolio concentrated in AI and technology leaders with the " +
    "highest moat scores (Prompt #17). The Roth structure " +
    "maximises the benefit of high-growth assets — all gains compound tax-free. " +
    "Core positions in mega-cap compounders with perfect or near-perfect 7 Powers scores, " +
    "supported by AVGO (custom ASIC moat) and CRWD (Falcon switching cost). " +
    "QQQ and VGT provide diversified tech breadth. Rebuilt March 2026.",
  promptsUsed: [
    "Prompt #17 — Moat Destroyer / 7 Powers (primary filter for every holding)",
    "Prompt #8  — Bain Competitive Analysis (sector winner confirmation)",
    "Prompt #18 — Behavioral Finance Bias Auditor (contrarian check)",
    "Prompt #6  — Citadel Technical Analysis (RSI entry timing)",
    "Prompt #11 — Peter Lynch GARP (PEG validation on profitable names)",
    "Prompt #13 — Forensic Accounting Auditor (mandatory risk filter — all clear)",
  ],
  holdings: [
    {
      ticker: "NVDA",
      name: "NVIDIA Corporation",
      type: "stock",
      sector: "AI Semiconductors",
      allocation: 18,
      rationale:
        "7 Powers score: 6/7. CUDA ecosystem = switching cost + cornered resource. " +
        "Q2 FY27 actual (reported Aug 26): $96.2B revenue +106% YoY beat; GAAP EPS $2.22 beat; data center revenue $89B +117% YoY, now 92% of total. Q3 FY27 guidance $108B beats the $104.2B " +
        "street estimate. AWS separately committed to buy 2M NVDA GPUs plus NVDA's new 'Vera' CPU — the largest hyperscaler AI-compute order disclosed to date. " +
        "Hyperscaler combined CapEx keeps climbing past $520B for 2026 across Google, MSFT, Amazon, and Meta. " +
        "Roth structure makes this ideal: tax-free exit on a stock with multi-year compounding ahead.",
      color: "#76b900",
      risk: "High",
    },
    {
      ticker: "MSFT",
      name: "Microsoft Corporation",
      type: "stock",
      sector: "Cloud & AI",
      allocation: 14,
      rationale:
        "7 Powers score: 7/7 (perfect score). Azure + Office 365 enterprise lock-in. " +
        "FY26 Azure revenue crossed $100B for the first time; CFO Amy Hood guided Q1 FY27 Azure growth to ~45% constant currency — accelerating further. " +
        "The Microsoft–OpenAI partnership evolved this cycle: OpenAI has committed to an incremental $250B of Azure purchases, with Microsoft holding exclusive IP rights and Azure API exclusivity " +
        "until AGI; Nadella confirmed early enterprise customers are already using OpenAI's new GPT-6 Astra model on Azure. Copilot monetisation adds per-seat revenue on top. " +
        "GARP check: forward earnings multiple remains reasonable for a business growing Azure at an accelerating rate with high revenue visibility.",
      color: "#00a4ef",
      risk: "Low",
    },
    {
      ticker: "GOOGL",
      name: "Alphabet Inc.",
      type: "stock",
      sector: "Internet & AI",
      allocation: 11,
      rationale:
        "7 Powers score: 6/7. 92% search moat + YouTube flywheel + Google Cloud, whose customers (per Cloud CEO Kurian) now spend ~50% above original commitments. " +
        "Gemini 3.8 Flash launched Sep 2 — the third Flash model in six weeks, plus a Cyber variant for enterprise/government use — keeping Gemini competitive at the frontier. " +
        "A federal judge rejected the DOJ's push to force divestiture of Google's ad exchange (Sep), removing a standing antitrust overhang; the stock is recovering in September after its longest " +
        "monthly losing streak in over a decade — a contrarian setup. Waymo robotaxi commercially deployed in multiple cities. " +
        "Greenblatt screen: highest ROIC (~28%) among mega-cap internet at a discount to MSFT/META multiples.",
      color: "#4285f4",
      risk: "Medium",
    },
    {
      ticker: "META",
      name: "Meta Platforms Inc.",
      type: "stock",
      sector: "Social Media & AI",
      allocation: 9,
      rationale:
        "7 Powers score: 5/7. Network effects on 3.58B DAU = strongest consumer tech moat. " +
        "Prompt #18 (Behavioral Finance): In Jan 2023, META had 55% sell ratings → returned +194%. " +
        "Agreed Aug 26 to pay ~$18B (a $10B Q3 charge, paid over 10 years) settling a 29-state youth-safety lawsuit; Morgan Stanley (Sep 2) called it a net positive that removes a legal overhang " +
        "and clears the way for new AI product launches — the network-effect moat itself is unaffected. CapEx guidance keeps climbing toward $135–145B for FY2026 as new external compute deals " +
        "(Google Cloud, CoreWeave, talks with Oracle) stack on top of in-house buildout. Llama open-source cuts inference costs $3B+/yr. Roth ideal: no dividend, pure capital appreciation.",
      color: "#0866ff",
      risk: "Medium",
    },
    {
      ticker: "AMZN",
      name: "Amazon.com Inc.",
      type: "stock",
      sector: "Cloud & E-Commerce",
      allocation: 9,
      rationale:
        "7 Powers score: 6/7. AWS scale leader with 32%+ cloud share; advertising at $60B+ run-rate. " +
        "AWS committed to buy 2M NVIDIA GPUs plus NVDA's new 'Vera' CPU — the largest disclosed hyperscaler AI-compute order this cycle — and rolled out new Graviton5-powered EC2 instances (up " +
        "to 25% better compute than the prior generation), extending its custom-silicon cost edge. Operating margin expanding as high-margin AWS/Ads become dominant. " +
        "Roth is ideal for AMZN: zero dividends (no tax drag) and all return expected via capital appreciation.",
      color: "#ff9900",
      risk: "Medium",
    },
    {
      ticker: "QQQ",
      name: "Invesco QQQ Trust",
      type: "etf",
      sector: "ETF — Nasdaq 100",
      allocation: 12,
      rationale:
        "Broad Nasdaq-100 exposure captures tech beta without single-stock risk. " +
        "Trimmed to 12% (was 15%) — freed allocation moved to AVGO and CRWD " +
        "where moat analysis gives higher conviction than broad-index exposure.",
      color: "#8884d8",
      risk: "Medium",
    },
    {
      ticker: "VGT",
      name: "Vanguard Info Technology ETF",
      type: "etf",
      sector: "ETF — Technology",
      allocation: 7,
      rationale:
        "Pure-play technology sector ETF at 0.10% fee. Provides exposure to mid-cap tech " +
        "names not fully represented in QQQ. Trimmed to 8% (was 10%) — same rationale as QQQ trim; " +
        "backtesting shows concentrated moat-quality names outperform broad-tech ETFs.",
      color: "#a78bfa",
      risk: "Medium",
    },
    {
      ticker: "CRWD",
      name: "CrowdStrike Holdings",
      type: "stock",
      sector: "Cybersecurity",
      allocation: 10,
      rationale:
        "7 Powers score: 5/7. Falcon platform = switching cost (single-agent consolidation) + " +
        "process power (3T+ events/week threat graph). Q2 FY2027 actual (reported Aug 26): $1.47B revenue +26% YoY beat; non-GAAP EPS $0.31 beat; net-new ARR $333M accelerating to +51% YoY on " +
        "AI-security demand. CEO called it the best quarter in company history; stock popped more than 11% after hours. 130%+ net revenue retention confirms customers expand rather than churn. " +
        "Held at 10% — cybersecurity + platform consolidation thesis is durable regardless of macro regime. Strongest moat score in cybersecurity sector.",
      color: "#f97316",
      risk: "Medium",
    },
    {
      ticker: "AVGO",
      name: "Broadcom Inc.",
      type: "stock",
      sector: "Semiconductors & Software",
      allocation: 7,
      rationale:
        "7 Powers score: 5/7. Custom AI ASIC chips (Google TPU, Meta MTIA) = multi-year switching cost. " +
        "Q3 FY2026 actual (reported Sep 2): $29.6B revenue +86% YoY beat; AI semiconductor revenue $16.7B +221% YoY; record FCF $13.7B. Management now projects FY2027/28 AI semi revenue of " +
        "~$115B/~$230B. Stock reaction was muted — up +51% YTD already, this quarter's strength looks largely priced in. VMware acquisition adds high-margin recurring software revenue (50%+ EBITDA). " +
        "ASIC demand remains the biggest AI chip story beyond NVDA, and Broadcom is the only scaled competitor. Ideal Roth holding: no dividend.",
      color: "#cc0000",
      risk: "Medium",
    },
    {
      ticker: "PLTR",
      name: "Palantir Technologies",
      type: "stock",
      sector: "AI & Government Analytics",
      allocation: 3,
      rationale:
        "7 Powers score: 4/7. Cornered resource in government intelligence data + AIP switching cost. " +
        "Q2 2026 actual (reported Aug 3): $1.935B revenue +93% YoY, fastest since IPO; raised FY2026 guidance to $8.15B. Since then, an expanded PwC collaboration (Sep 3, stock +~9%) and the " +
        "Army's TITAN ground-station contract extend the growth story, but the stock has also touched ~150x trailing earnings against a ~40x software-sector median — a valuation risk worth " +
        "watching even at this account's smaller 3% sizing. AIP is now a production revenue engine — not a proof of concept. GAAP profitable 8+ consecutive quarters. " +
        "Roth ideal for PLTR: no dividend, and outsized capital gain potential in a tax-free account.",
      color: "#6366f1",
      risk: "High",
    },
  ],
};

export const TICKERS_ROTH_IRA = PORTFOLIO_ROTH_IRA.holdings.map((h) => h.ticker);
