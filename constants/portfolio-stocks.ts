/**
 * Aggressive Stocks Portfolio — Large Cap + Select Mid Cap
 *
 * Research methodology — backtested prompt sequence (see PROMPT_ACCURACY_REPORT.md):
 *   TIER 1 (Structural Foundation — highest accuracy):
 *   - Prompt #17 Moat Destroyer (7 Powers) → 92/100 accuracy — every holding must score ≥ 3/7
 *   - Prompt #8  Bain Competitive Analysis → 87/100 — sector winner confirmation
 *   - Prompt #18 Behavioral Finance Bias Auditor → 84/100 — contrarian opportunity ID
 *   TIER 2 (Signal Confirmation):
 *   - Prompt #6  Citadel Technical Analysis → 82/100 — RSI + entry timing validation
 *   - Prompt #19 Options Flow Intelligence → 80/100 — institutional accumulation check
 *   TIER 3 (Valuation):
 *   - Prompt #11 Peter Lynch GARP → 73/100 — PEG check for profitable names
 *   - Prompt #15 Greenblatt Magic Formula → 72/100 — ROIC + earnings yield
 *   TIER 4 (Macro / Theme):
 *   - Prompt #10 McKinsey Macro Report → 70/100 — megatrend alignment
 *   TIER 5 (Risk — mandatory):
 *   - Prompt #13 Forensic Accounting Auditor → run on every holding; all pass
 *   - Prompt #3  Bridgewater Risk Assessment → concentration + correlation check
 *
 * Strategy: Maximum growth with guardrails. Only large-cap and well-established
 * mid-cap companies — no speculative names, no penny stocks, no pre-revenue plays.
 * Every holding must have positive operating income, $10B+ market cap, and a
 * defensible competitive moat (min 3 of Hamilton Helmer's 7 Powers).
 * Concentrated in AI infrastructure, cloud, and platform businesses that compound
 * best over a 3–7 year horizon.
 *
 * March 2026 rebuild changes vs original:
 *   + AVGO increased 8→10%  (custom ASIC moat accelerating for Google/Meta)
 *   + COIN added 3%          (S&P 500 member, GAAP profitable, BTC ETF volume)
 *   − TSLA reduced 7→5%     (weakest 7 Powers score; no scale/switching-cost moat)
 *   − NET reduced 6→4%      (valid edge moat but lower conviction vs core names)
 *   − PLTR reduced 5→4%     (speculative; thin GAAP margin; government moat intact)
 *
 * March 2026 market refresh (research update — current intelligence):
 *   + PLTR increased 4→5%   (US commercial +137% YoY Q4; $7.2B FY26 revenue guidance +61%; AIP executing)
 *   − NET reduced 4→3%      (funded PLTR increase; NET still quality but PLTR revenue growth > edge)
 *   ~ NVDA updated           (Blackwell B200 extending moat; +73% revenue to $68.1B Q4 FY26)
 *   ~ META updated           ($27B Nebius AI infrastructure deal; CapEx raised to $115–135B 2026)
 *   ~ TSLA updated           (Cybercab production April 2026; Optimus 1M/yr target; stock ~$405 at 210x)
 *   ~ GOOGL updated          (Gemini 2.0 competitive with GPT-4o; Waymo scaling; Cloud +28%)
 *
 * April 22, 2026 market refresh (research update — current intelligence):
 *   ~ NVDA updated           (Stock ~$202, forward P/E ~24x — cheapest in 3 yrs; May 20 earnings; hyperscaler capex ~$700B 2026 ~60% YoY increase — $450B AI-specific)
 *   ~ META updated           (3.58B DAU +7% YoY; Advantage+ AI ads $60B run-rate; MTIA 1GW chip deployment Apr 14; CapEx $115–135B 2026)
 *   ~ MSFT updated           (Stock ~$420, -20% YTD = textbook Prompt #18 contrarian signal; Q1 2026 earnings Apr 29; Powell term ends May 15 — Fed Chair change adds macro uncertainty)
 *   ~ GOOGL updated          (Stock ~$336; Q1 2026 earnings Apr 29, $106.9B rev expected +18% YoY; Google Cloud >50% growth; $243B backlog; KeyBanc Cloud $91.8B 2026 target)
 *   ~ AMZN updated           (AWS +24% Q4 2025, fastest in 13 qtrs; AI revenue >$15B annual run-rate; $200B 2026 CapEx; Q1 earnings Apr 29)
 *   ~ AVGO updated           (Q1 FY2026: $19.3B rev +29% YoY; AI semiconductor $8.4B +106% YoY — mega AI ASIC cycle confirmed; EPS beat $2.05 vs $1.88; custom ASIC for Google/Meta accelerating)
 *   ~ TSLA updated           (Q1 2026 earnings reported Apr 22 after close; 358K deliveries vs 365K consensus miss; 50K-unit inventory overhang; energy storage headwinds; $0.33–0.37 EPS consensus)
 *   ~ PLTR updated           (Q4 2025 US commercial +137% YoY; FY2025 rev $4.475B +56%; FY2026 guidance $7.2B +61%; GAAP net income $1.625B; Q1 earnings May 4)
 *   ~ NET updated            (Q1 2026 earnings Apr 30; Q1 guidance $620–621M; FY2026 guidance $2.785–$2.795B)
 *
 * NEW CANDIDATE SCREENING — April 22, 2026 (7 Powers ≥ 3/7 required; $10B+ market cap):
 *   ★ AAPL  WATCH       (7 Powers 6/7; Q1 FY26 $143.8B +16% YoY; Services $30B +14%; Siri 2.0 @ WWDC June 8;
 *                        stock -9% YTD = mild contrarian; foldable iPhone Fall 2026; Q2 earnings Apr 30; BofA Buy $300 target +18% upside)
 *   ★ MELI  WATCH       (7 Powers 5/7; Rev +39% 2025; Fintech +46% YoY — fintech now 43% of revenue at higher margins;
 *                        $10.5B operating cash flow; operating margins 6→10-11%; 23/26 analysts Buy; price target $2,848 +41% upside)
 *   ★ MU    WATCH       (Micron — AI HBM winner; revenue +111% FY2026 expected; forward P/E 12x — cheapest in AI supply chain;
 *                        HBM3E moat tied to NVDA/AVGO; beneficiary of same $700B hyperscaler capex cycle)
 *   ★ PANW  WATCH       (Palo Alto Networks — Morningstar wide moat; 28% undervalued vs $225 fair value;
 *                        platform consolidation eating NET/CRWD adjacent market; potential to replace or complement NET at 3%)
 *   ~ DDOG  ON RADAR    (Datadog +29% YoY; AI observability moat building; BofA bullish on AI tailwinds; watch for entry)
 *
 * ALLOCATION VERDICT — April 22, 2026 (IMPLEMENTED):
 *   + AAPL added    3%  (replaces COIN — AAPL 6/7 vs COIN 3/7; Services flywheel > crypto regulatory moat)
 *   + MELI added    2%  (new position — LatAm fintech+ecommerce flywheel; 5/7 powers; funded by TSLA trim)
 *   − COIN removed  3%  (3/7 powers; S&P 500 inclusion already priced in; regulatory upside fully baked)
 *   ~ TSLA reduced  5→3% (3/7 powers; Q1 delivery miss; keeps optionality at lower conviction size)
 *   ~ MU on radar   —   (hold; NVDA+AVGO already 30% semi exposure; revisit if HBM standalone moat strengthens)
 *   ~ PANW on radar —   (hold; CRWD at 7% covers cybersecurity; revisit if NET conviction weakens further)
 *
 * August 1, 2026 market refresh (research update — current intelligence):
 *   ~ NVDA updated    (Q1 FY27 actual: $81.6B rev +85% YoY; GAAP EPS $2.39; stock ~$199, P/E ~30x — cheapest since 2023; Q2 FY27 earnings Aug 26, guided ~$91.0B; China H200 exports approved but shipments "trivial" vs 2M chips ordered — Blackwell still unlicensed)
 *   ~ MSFT updated    (Q4 FY26 actual: $90B rev +18% YoY, EPS $4.81 +31%; Azure +43% YoY accelerating, crossed $100B FY26 revenue; FY27 capex guided $255-260B; forward P/E ~21x cheapest since 2023; RBC/Bernstein targets raised to $640-647)
 *   ~ META updated    (Q2 2026: $60.8B rev +28% YoY beat, but adj. EPS $6.18 MISSED $7.14 on $2.4B legal + $1.2B severance charges; stock -8% on print; capex raised to $125-135B; 57/63 analysts still Buy)
 *   ~ GOOGL updated   (Q2 2026: $119.8B rev +24% YoY beat; Cloud +82% YoY to $24.8B, backlog $514B; FY26 capex raised to $195-205B — stock dipped on capex hike despite beat; Gemini 750M+ MAU)
 *   ~ AMZN updated    (Q2 2026: $200.6B rev +20% YoY, first $200B quarter, beat; AWS +37% YoY to $42.2B — fastest in 18 qtrs; AI/chips run-rate >$25B; FY26 capex ~$220B)
 *   ~ AVGO updated    (Q2 FY26: $22.2B rev +48% YoY; AI semi revenue $10.8B +143% YoY; Q3 FY26 guidance $29.4B (+84%), AI semi ~$16.0B; FY26 AI semi guided ~$56B; stock +51% YTD)
 *   ~ TSLA updated    (Q2 2026: record $28.2B rev +26% YoY on record 480K deliveries, but EPS $0.33 MISSED $0.53 — op margin fell to 1.4%; stock -14.5% post-earnings, erased >$140B market cap; robotaxi now live in 5 markets)
 *   ~ PLTR updated    (Q1 2026: $1.633B rev +85% YoY — fastest since IPO; US commercial +133%; raised FY26 guidance to $7.65-7.66B; stock down ~30% YTD despite fundamentals; Q2 earnings Aug 3)
 *   ~ NET updated     (Q1 2026: $639.8M rev +34% YoY beat, but stock fell 24% same-day on 1,100 layoffs (~20% workforce) "AI-first" restructuring; launched agentic-internet product suite; Q2 earnings Aug 6)
 *   ~ AAPL updated    (fiscal Q3 2026: $109.4B rev +16% YoY beat; weak Q4 guidance on supply constraints, stock -6% after-hours; Gemini-powered Siri 2.0 shipping with iOS 27 Sept 2026; fresh antitrust scrutiny)
 *   ~ MELI updated    (Q1 2026: $8.85B rev +49% YoY — fastest in ~4 yrs, but EPS $8.23 missed $8.75 on margin compression from credit/logistics investment; digital banks launching in Mexico/Argentina)
 *   ~ FED             (Kevin Warsh sworn in as Fed Chair May 22, 2026, replacing Powell; rate held 3.50–3.75% through July; Warsh dropped forward guidance, struck hawkish tone — inflation at 3-yr high, 9/18 FOMC favor hikes)
 *
 * NEW CANDIDATE SCREENING — August 1, 2026 (7 Powers ≥ 3/7 required; $10B+ market cap):
 *   ★ ANET  STRONG WATCH (Arista Networks — 7 Powers 5/7: EOS software switching cost embedded in hyperscaler networks + scale from Meta/Microsoft-class deployments;
 *                         Strong Buy 84%, targets $190–210 raised by TD Cowen; earnings Aug 3; scores higher than NET (4/7) on moat and thematically fits AI-infra core — top swap candidate for NET pending Q2 results)
 *   ★ PANW  STRONG WATCH (Palo Alto Networks — 7 Powers 5/7: platformization creates switching cost + network effects; Morningstar wide-moat, 17% undervalued vs $225 fair value;
 *                         Q3 FY26 rev +31.1%, raised FY26 guidance to $11.41–11.42B; scores higher than NET on moat and valuation)
 *   ~ MU    WATCH        (Micron — sold out HBM supply through 2026, $100B+ binding multi-year contracts; targets lifted to ~$1,507 avg; moat is supply-lock not durable platform — memory remains cyclical)
 *   ~ DDOG  WATCH        (Datadog — 4/7 powers; Jefferies downgraded to Hold on valuation even while raising target; earnings Aug 6; not clearly better than NET right now)
 *   ~ SNOW  WATCH        (Snowflake — 4/7 powers; earnings Aug 25; in line with NET, not a clear upgrade)
 *   ~ UBER  WATCH        (4/7 powers; strong network-effect moat but AV disruption risk from Waymo/Tesla; $10B+ AV commitment; consensus targets flat to current price — fully priced)
 *   ~ F5    ON RADAR     (repositioning from legacy ADC hardware to AI-native security platform; too early-stage to score)
 *
 * ALLOCATION VERDICT — August 1, 2026:
 *   ~ NET hold at 3%     (ANET and PANW both screen stronger on 7 Powers + valuation, but NET's Q2 earnings (Aug 6) and ANET's Q2 earnings (Aug 3) are both unreported as of this refresh —
 *                         premature to swap ahead of results; revisit as top candidate for NET replacement next cycle)
 *   ~ TSLA hold at 3%    (2nd consecutive EPS miss, stock -14.5% post-earnings; weakest 7 Powers (3/7) in portfolio; no clean thematic substitute identified this cycle — remains the position most at risk of further trims)
 *   ~ all other holdings confirmed — Q1/Q2 2026 earnings broadly beat on revenue across the portfolio (NVDA, MSFT, GOOGL, AMZN, AVGO, CRWD, PLTR all beat); META, TSLA, AAPL, MELI missed EPS/guidance
 *     on one-time items or near-term softness without structural moat impairment
 *
 * August 10, 2026 market refresh (research update — pending items from Aug 1 now resolved):
 *   ~ NET updated     (Q2 2026 actual, reported Aug 6: $696.1M revenue +36% YoY, beat its own $664–665M guide; non-GAAP EPS $0.29 beat by 7.5%; stock jumped +14.9% on the print despite $150.7M
 *                      restructuring charge tied to the 20% workforce cut; Q3 guidance $736–737M — the bear case flagged Aug 1 did not materialize this quarter)
 *   ~ ANET updated    (Q2 2026 actual, reported Aug 4: first-ever $3.04B quarter, +37.7% YoY, beat estimates by $162M; EPS $1.02 beat by $0.12; raised FY26 revenue guidance to $12.6B (+40%);
 *                      non-GAAP operating margin expanded to 49.9%; extends 5-quarter EPS-beat streak — moat and growth both confirmed, but NET's own beat removes the urgency to swap)
 *   ~ PLTR updated    (Q2 2026 actual, reported Aug 3: $1.935B revenue +93% YoY — growth accelerated from Q1's 85%; EPS $0.41 beat by 24%; US commercial +149% YoY; raised FY26 guidance to
 *                      $8.15B from $7.65B; stock surged +29.5%, erasing ~$2.7B in short-seller mark-to-market gains in a single session — strongest print in the portfolio this cycle)
 *   ~ MELI updated    (Q2 2026 actual, reported Aug 5: $10.17B revenue +50% YoY; EPS $9.19 beat; GMV +36% FX-neutral, TPV +56%; credit portfolio +75% to $16.4B; but EBIT margin compressed
 *                      550bps YoY to 6.7% on AI/logistics/credit investment — stock fell ~4.6% on margin concern despite the growth beat; margin trajectory remains the thing to watch)
 *   ~ NVDA updated    (China H200 shipments still described as "trivial" by US Commerce officials despite $10B in approved licenses; separately, a Blackwell export loophole routing chips to
 *                      China through non-China-HQ subsidiaries was uncovered — Commerce closed it May 31 by extending license rules to any company with a China-HQ ultimate parent; core
 *                      US/hyperscaler demand and Q2 FY27 earnings (Aug 26) unaffected)
 *   ~ AVGO updated    (Mizuho reiterated Buy, $480 target, citing expanding ASIC pipeline and a new multi-gigawatt Anthropic compute deal; Aug 6 VMware vDefend/Avi Load Balancer release extends
 *                      the software moat; next earnings ~Sep 3)
 *   ~ HAL (India)      not yet reported — board meeting confirmed for Aug 12, 2026; still pending into next cycle
 *
 * NEW CANDIDATE SCREENING — August 10, 2026 (7 Powers ≥ 3/7 required; $10B+ market cap):
 *   ★ ALAB  STRONG WATCH (Astera Labs — AI-fabric connectivity chips (Scorpio-X switches, Aries retimers); Q2 2026 revenue $392.4M +104% YoY, beat by $31M; non-GAAP EPS $0.80 beat by 15.6%,
 *                          8th consecutive beat; Q3 guidance $540–560M (+40% QoQ) as Scorpio-X enters volume production and becomes the largest product line a quarter early; PCIe 6 now >50%
 *                          of revenue. Cornered-resource + switching-cost moat in the AI-rack interconnect layer that NVDA/AVGO/ANET all depend on — highest-growth name screened this cycle,
 *                          but richly valued after the beat; watch for an entry point rather than chasing)
 *   ~ MU    WATCH        (unchanged from Aug 1 — sold-out HBM supply through 2026, $100B+ contracts; Morgan Stanley's top 2026 semis pick; moat remains supply-lock, not durable platform)
 *   ~ PANW  STRONG WATCH (unchanged from Aug 1 — 7 Powers 5/7, Q3 FY26 revenue +31.1%, FY26 guidance raised to $11.41–11.42B)
 *
 * ALLOCATION VERDICT — August 10, 2026 (no changes this cycle):
 *   ~ NET hold at 3%     (Q2 print resolved the Aug-1 bear case — beat guidance and jumped +14.9% despite the restructuring charge; ANET is still the stronger long-term 7-Powers score (5/7 vs 4/7)
 *                         and remains the top swap candidate, but a fresh beat is the wrong moment to replace it — revisit if NET's Q3 guidance execution slips)
 *   ~ ALAB on radar  —   (highest-conviction new name screened this cycle; no clean funding source without cutting an already-thin position — revisit sizing next cycle)
 *   ~ all other holdings confirmed — PLTR (+93% rev growth, guidance raised) and MELI (+50% rev, margin watch) both delivered the strongest and most nuanced prints of the cycle respectively
 */

import { PortfolioDefinition } from "@/types/portfolio";

export const PORTFOLIO_STOCKS: PortfolioDefinition = {
  id: "stocks",
  name: "Aggressive Growth",
  accountType: "Taxable Brokerage",
  timeHorizon: "3–7 years",
  riskLevel: "Aggressive",
  riskColor: "text-red-400",
  accentColor: "border-red-500/40",
  cardGradient: "from-red-500/10 to-transparent",
  description:
    "An aggressive growth portfolio restricted to large-cap and established mid-cap " +
    "companies — no penny stocks, no pre-revenue speculation. Every holding must score " +
    "≥ 3/7 on Hamilton Helmer's 7 Powers framework (Prompt #17). " +
    "Concentrated in AI infrastructure (NVDA, AVGO), hyperscale cloud (MSFT, AMZN, GOOGL), " +
    "high-growth platforms (META, AAPL, MELI), and mission-critical software (CRWD, NET, PLTR). " +
    "April 2026: COIN replaced by AAPL (6/7 vs 3/7 powers); MELI added (LatAm fintech flywheel) funded by TSLA trim.",
  promptsUsed: [
    "Prompt #17 — Moat Destroyer / 7 Powers (primary structural filter)",
    "Prompt #8  — Bain Competitive Analysis (sector winner selection)",
    "Prompt #18 — Behavioral Finance Bias Auditor (contrarian ID)",
    "Prompt #6  — Citadel Technical Analysis (entry timing)",
    "Prompt #11 — Peter Lynch GARP (PEG validation)",
    "Prompt #13 — Forensic Accounting Auditor (mandatory risk filter — all clear)",
  ],
  holdings: [
    {
      ticker: "NVDA",
      name: "NVIDIA Corporation",
      type: "stock",
      sector: "AI Semiconductors",
      allocation: 20,
      rationale:
        "7 Powers score: 6/7. CUDA ecosystem = switching cost (every AI model trained deepens lock-in) + " +
        "cornered resource (GPU talent + CUDA library monopoly) + scale economies + process power. " +
        "Q1 FY27 actual (reported May 20): $81.6B revenue +85% YoY, +20% QoQ; GAAP EPS $2.39. Q2 FY27 earnings due Aug 26, guided to ~$91.0B. " +
        "Stock ~$199, trailing P/E ~30x — cheapest since 2023, well below the 3-yr average of 69x (earnings growing faster than multiple). " +
        "Blackwell B200/GB200 NVL72 architecture deepens CUDA switching cost into 2027–28. " +
        "China remains a wildcard: H200 exports approved for ~10 Chinese firms but actual shipments still called 'trivial' by US Commerce officials despite $10B in licenses; a Blackwell export " +
        "loophole (chips routed via non-China-HQ subsidiaries) was uncovered and closed by Commerce on May 31 — Blackwell remains formally unlicensed for China. " +
        "Hyperscaler capex commitments keep rising — MSFT FY27 capex guided $255–260B, GOOGL FY26 capex raised to $195–205B, AMZN FY26 ~$220B, META FY26 $125–145B — NVDA captures the largest share of all of it.",
      color: "#76b900",
      risk: "High",
    },
    {
      ticker: "MSFT",
      name: "Microsoft Corporation",
      type: "stock",
      sector: "Cloud & Enterprise AI",
      allocation: 15,
      rationale:
        "7 Powers score: 7/7 (rare perfect score). Azure + Office 365 = switching cost (enterprise data lock-in) + " +
        "network effects (Teams/LinkedIn) + scale economies + process power (OpenAI partnership moat). " +
        "Q4 FY26 actual (reported Jul 29): $90B revenue +18% YoY; GAAP EPS $4.81 +31% YoY. Azure +43% YoY — accelerating — and FY26 Azure revenue crossed $100B for the first time (+41% FY), " +
        "still trailing AWS but now ahead of Google Cloud. FY27 guidance: Q1 revenue $89.85–90.95B (+16% midpoint); Azure growth guided ~45% constant currency; FY27 capex guided $255–260B. " +
        "Stock ~$451, forward P/E ~21–22x — cheapest since 2023. RBC raised target to $640, Bernstein to $647; consensus avg target ~$561. " +
        "New Fed Chair Kevin Warsh (sworn in May 22, replacing Powell) has struck a hawkish tone, but Microsoft's government-cloud and enterprise moat is Fed-independent. " +
        "Government cloud (JEDI/JWCC), gaming (Activision synergies), LinkedIn, and record capex signal long-term AI infrastructure commitment.",
      color: "#00a4ef",
      risk: "Low",
    },
    {
      ticker: "META",
      name: "Meta Platforms Inc.",
      type: "stock",
      sector: "Social Media & AI",
      allocation: 12,
      rationale:
        "7 Powers score: 5/7. Network effects on 3.58B DAU (+7% YoY) = the strongest single moat in consumer tech. " +
        "WhatsApp/Instagram/FB form a closed social graph that is structurally impossible to replicate. " +
        "Q2 2026 (reported Jul 29–30): $60.8B revenue +28% YoY, beat estimates — but adjusted EPS $6.18 MISSED $7.14 consensus on $2.4B legal contingencies + $1.2B severance charges; " +
        "GAAP EPS $10.44 was boosted by an $8.0B one-time tax benefit. Stock fell ~8% on the print despite the revenue beat — a one-time-charge miss, not a moat impairment. " +
        "CapEx raised to $125–145B for FY2026 (Q2 capex $31.1B, nearly double Q2 2025) — almost entirely AI datacenters/custom silicon (MTIA). " +
        "57 of 63 analysts still rate Buy/Strong Buy despite target cuts (Baird to $750 from $830); avg target ~$769–843. Llama open-source cuts inference costs $3B+/yr.",
      color: "#0866ff",
      risk: "Medium",
    },
    {
      ticker: "GOOGL",
      name: "Alphabet Inc.",
      type: "stock",
      sector: "Internet & AI",
      allocation: 10,
      rationale:
        "7 Powers score: 6/7. 92% search share = unassailable scale economy + counter-positioning vs ChatGPT " +
        "(Search has real-time indexing no LLM can match). Q2 2026 (reported Jul 22): $119.8B revenue +24% YoY, beat $116.93B estimate; operating income $40.8B (34% margin). " +
        "Google Cloud revenue +82% YoY to $24.8B; cloud backlog swelled to $514B — unprecedented revenue visibility. " +
        "FY2026 capex guidance raised to $195–205B (from $180–190B) — stock initially sank on the capex hike despite the beat, a near-term sentiment overhang rather than a moat concern. " +
        "Gemini AI crossed 750M+ monthly active users. Stock ~$359, P/E ~17.7x. Waymo commercially deployed and scaling. Greenblatt: highest ROIC in mega-cap internet (~28%).",
      color: "#4285f4",
      risk: "Medium",
    },
    {
      ticker: "AMZN",
      name: "Amazon.com Inc.",
      type: "stock",
      sector: "Cloud & E-Commerce",
      allocation: 10,
      rationale:
        "7 Powers score: 6/7. AWS scale economy (32%+ cloud market share) + logistics flywheel switching cost (Prime ecosystem). " +
        "Q2 2026 (reported Jul 30): net sales $200.6B +20% YoY — first time crossing $200B in a single quarter, beat $196.47B estimate; operating income $27.5B +43% YoY. " +
        "AWS revenue $42.2B +37% YoY — fastest growth in 18 quarters, beat consensus — with AI/chips business run-rate now exceeding $25B and growing triple-digits. AWS operating margin 39.4%. " +
        "Advertising segment continues to rival Google Ads as a standalone business. FY2026 CapEx guided to ~$220B — largest absolute AI infrastructure commitment of any hyperscaler. " +
        "Operating margins continue expanding as high-margin AWS/Ads overtake low-margin retail.",
      color: "#ff9900",
      risk: "Medium",
    },
    {
      ticker: "AVGO",
      name: "Broadcom Inc.",
      type: "stock",
      sector: "Semiconductors & Software",
      allocation: 10,
      rationale:
        "7 Powers score: 5/7. Custom AI ASIC chips for Google (TPU) and Meta (MTIA) = switching cost moat " +
        "(multi-year design partnerships lock hyperscalers in for 3–5 year silicon cycles). " +
        "Q2 FY2026 results: $22.2B revenue +48% YoY; AI semiconductor revenue $10.8B +143% YoY — custom ASIC cycle accelerating even faster than the prior quarter. GAAP EPS $1.91, non-GAAP EPS $2.44. " +
        "Q3 FY2026 guidance: ~$29.4B revenue (+84% YoY); AI semiconductor revenue guided ~$16.0B (+200%+ YoY); full-year 2026 AI semi revenue guided ~$56B (+~180%); 2027 AI revenue reiterated >$100B. Next earnings ~Sep 3. " +
        "Mizuho reiterated Buy with a $480 target, citing an expanding ASIC pipeline and a new multi-gigawatt Anthropic compute deal; Aug 6 VMware vDefend/Avi Load Balancer release extends the software moat. " +
        "VMware adds recurring software revenue; 50%+ EBITDA margins intact. Stock +51% YTD; P/E ~62x, down from ~79x average as earnings catch up to the multiple. " +
        "Increased to 10% (was 8%) — ASIC demand is the biggest structural shift in AI chips beyond NVDA.",
      color: "#cc0000",
      risk: "Medium",
    },
    {
      ticker: "CRWD",
      name: "CrowdStrike Holdings",
      type: "stock",
      sector: "Cybersecurity",
      allocation: 7,
      rationale:
        "7 Powers score: 5/7. Falcon platform = switching cost (single-agent security consolidation) + process power " +
        "(threat graph trained on 3T+ events/week, impossible to replicate from scratch). " +
        "Q1 FY2027 (reported Jun 3): $1.39B revenue +26% YoY, beat estimate; non-GAAP EPS $1.10 vs $0.88 estimate — 25% beat. Record net-new ARR $256M +32% YoY; ending ARR $5.51B +24% YoY. Record FCF $468M. " +
        "Raised FY27 net-new-ARR growth guidance by 520bps to ~27.7%. Executed a 4-for-1 stock split (Jul 2); hit a split-adjusted all-time high $217.50 on Jul 15. Q2 FY2027 earnings due ~Aug 26. " +
        "130%+ net revenue retention confirms customers expand rather than churn. Cybersecurity spend is non-discretionary — grows with AI threat surface expansion.",
      color: "#f97316",
      risk: "Medium",
    },
    {
      ticker: "TSLA",
      name: "Tesla Inc.",
      type: "stock",
      sector: "EV & Autonomous / Robotics",
      allocation: 3,
      rationale:
        "7 Powers score: 3/7. Weakest moat in this portfolio — EV is becoming a commoditised market with BYD/Chinese " +
        "OEMs compressing margins. Q2 2026 (reported Jul 22): record $28.2B revenue +26% YoY on record 480,126 deliveries, but non-GAAP EPS $0.33 MISSED $0.53 consensus — " +
        "operating income fell 57% to $398M (1.4% margin) as gross margin slid to 16.8%. Stock plunged ~14.5% post-earnings to ~$320, erasing over $140B in market cap; trading ~$311 as of Aug 1. " +
        "Robotaxi now live in 5 markets (Austin, Dallas, Houston, Miami expansion through 2026); Musk targets 'widespread' US robotaxi by year-end and Optimus enterprise leasing late 2026 — " +
        "his new pay package is tied to these milestones. Analysts split 23 buy/6 sell; Stifel cut target to $450. " +
        "Held at 3% — 2nd consecutive earnings disappointment confirms the weakest-moat thesis, but robotics/autonomy optionality (Cybercab, Optimus) keeps it in the portfolio at reduced conviction.",
      color: "#e82127",
      risk: "High",
    },
    {
      ticker: "NET",
      name: "Cloudflare Inc.",
      type: "stock",
      sector: "Edge Computing & AI",
      allocation: 3,
      rationale:
        "7 Powers score: 4/7. Global edge network in 330+ cities processes 20% of all internet traffic — " +
        "a scale economy with network effects (every node makes the whole network faster). " +
        "Q2 2026 actual (reported Aug 6): $696.1M revenue +36% YoY, beat its own $664–665M guidance; non-GAAP EPS $0.29 beat consensus by 7.5%. Stock jumped +14.9% on the print even after a " +
        "$150.7M restructuring charge tied to the prior quarter's 1,100-person (~20%) layoff. Q3 guidance $736–737M, +0.34 non-GAAP EPS. " +
        "Launched an 'agentic internet' product suite (Agents Week 2026) — model-inference platform and AI-bot classification/monetization tools for publishers. " +
        "7 Powers score (4/7) still trails ANET (5/7), but the Q2 beat resolves the bear case flagged last cycle — held at 3%; ANET remains the top swap candidate if execution slips again.",
      color: "#f6821f",
      risk: "High",
    },
    {
      ticker: "PLTR",
      name: "Palantir Technologies",
      type: "stock",
      sector: "AI & Government Analytics",
      allocation: 5,
      rationale:
        "7 Powers score: 4/7. Cornered resource (classified government intelligence data partnerships) + " +
        "switching cost (AIP deeply embedded in enterprise and government workflows). " +
        "Q2 2026 actual (reported Aug 3): $1.935B revenue +93% YoY — growth accelerated from Q1's 85%, fastest since the 2020 IPO. US commercial +149% YoY. Adjusted EPS $0.41 beat consensus by 24%. " +
        "Raised FY2026 guidance to $8.15B (from $7.65B) — US commercial guidance raised to >$3.42B. Stock surged +29.5% on the print, erasing ~$2.7B in short-seller mark-to-market gains in a single session; " +
        "CEO Alex Karp called the quarter 'otherworldly.' The strongest print in the portfolio this cycle — AIP execution continues to justify the 5% sizing.",
      color: "#6366f1",
      risk: "High",
    },
    {
      ticker: "AAPL",
      name: "Apple Inc.",
      type: "stock",
      sector: "Consumer Tech & Services",
      allocation: 3,
      rationale:
        "7 Powers score: 6/7. iOS ecosystem = switching cost (app purchases, iCloud, FaceTime lock-in) + " +
        "brand (premium pricing power — iPhone ASP rising vs Android) + scale economy (750M+ paying services subscribers). " +
        "Fiscal Q3 2026 (reported Jul 30): $109.4B revenue +16% YoY, beat estimate; adjusted EPS $1.91 vs $1.89 estimate; net profit $29.8B, diluted EPS +29% YoY. iPhone sales +22%. " +
        "Weak fiscal Q4 guidance on supply constraints sent the stock down >6% after-hours; Greater China revenue $18.8B missed estimate. Stock ~$309, still +20% YTD despite the pullback. " +
        "Siri 2.0, rebuilt on a custom Google Gemini model (~$1B/yr deal), unveiled at WWDC June 8 and ships with iOS 27 in September 2026 — drawing fresh antitrust scrutiny alongside the existing ~$20B Google search-default deal. " +
        "BofA/Goldman Buy consensus, avg target $321.66. Fiscal Q4 2026 earnings due late October. Services flywheel remains the core structural moat.",
      color: "#555555",
      risk: "Low",
    },
    {
      ticker: "MELI",
      name: "MercadoLibre Inc.",
      type: "stock",
      sector: "LatAm E-Commerce & Fintech",
      allocation: 2,
      rationale:
        "7 Powers score: 5/7. Network effects (LatAm e-commerce + MercadoPago fintech flywheel — GMV and payments volume in self-reinforcing loop) + " +
        "scale economy (largest e-commerce platform in 18 Latin American countries, ~5.5% market share expanding). " +
        "Q2 2026 actual (reported Aug 5): $10.17B revenue +50% YoY, beat estimate; EPS $9.19 beat $8.95 consensus. GMV +36% FX-neutral to $22B; TPV +56% to $101B; added 18M unique active buyers (+25.4% YoY). " +
        "Credit portfolio expanded 75% YoY to $16.4B with NPL ratios near historical lows; advertising revenue +70%+. But EBIT margin compressed 550bps YoY to 6.7% on AI/logistics/credit investment — " +
        "stock fell ~4.6% on the print despite the growth beat, the same margin-pressure dynamic flagged last cycle. Digital banks now live in Mexico and Argentina. " +
        "LatAm remains structurally under-penetrated: formal credit penetration <30%, e-commerce <10% of retail — geographic diversifier uncorrelated to US tech regulatory risk.",
      color: "#ffe600",
      risk: "High",
    },
  ],
};

export const TICKERS_STOCKS = PORTFOLIO_STOCKS.holdings.map((h) => h.ticker);
