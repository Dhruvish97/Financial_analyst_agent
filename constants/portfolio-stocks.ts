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
 *
 * September 5, 2026 market refresh (research update — current intelligence):
 *   ~ NVDA updated    (Q2 FY27 actual, reported Aug 26: $96.2B revenue +106% YoY beat $92.07B est; GAAP EPS $2.22 beat $2.09 est; data center revenue $89B +117% YoY, now 92% of total revenue;
 *                      Q3 FY27 guidance $108B (±2%) vs $104.2B street est. AWS separately committed to buy 2M NVDA GPUs plus its new "Vera" CPU — the largest single hyperscaler GPU order disclosed
 *                      to date. Stock ~$230, well off the ~$199 August low. China licensing status unchanged since the May 31 loophole closure)
 *   ~ AVGO updated    (Q3 FY2026 actual, reported Sep 2: $29.6B revenue +86% YoY beat $29.25B est; EPS $3.32 beat $3.21 est; AI semiconductor revenue $16.7B +221% YoY; record FCF $13.7B (46% of
 *                      revenue); operating margin expanded to 67.9%. Q4 guidance $34.8B revenue (+93% YoY), AI chip sales guided $21.7B (+236%); management now projects FY2027 AI semi revenue
 *                      ~$115B and FY2028 ~$230B — demand still outstripping supply. Stock reaction was muted on the print — the beat now looks largely priced in after +51% YTD)
 *   ~ CRWD updated    (Q2 FY2027 actual, reported Aug 26: $1.47B revenue +26% YoY beat $1.44B est; non-GAAP EPS $0.31 beat $0.29 est; net-new ARR $333M, accelerating to +51% YoY on AI-security
 *                      demand; record operating cash flow $530M, record FCF $377M. CEO Kurtz called it "the best quarter in CrowdStrike's history." Stock popped >11% after hours)
 *   ~ META updated    (Agreed Aug 26 to pay ~$18B — including a $10B Q3 legal charge — settling a 29-state lawsuit alleging Instagram/Facebook were designed to be addictive to minors; platform
 *                      changes include a 2-hour daily cap, cosmetic-filter removal, and tighter age verification, paid out over 10 years. Morgan Stanley (Sep 2) called the settlement a net positive —
 *                      it removes a legal overhang and clears the path for new AI product launches. A real one-time accounting hit (Prompt #13 flag), not a moat impairment: the WhatsApp/Instagram/
 *                      Facebook network effect is unaffected. Separately signed a $14.2B CoreWeave compute deal in September and is in talks with Oracle for ~$20B more, on top of an August $10B+
 *                      Google Cloud deal — capex still climbing past the $125–145B FY26 guide as external compute supplements in-house buildout)
 *   ~ GOOGL updated   (Launched Gemini 3.8 Flash Sep 2 — its third Flash model in six weeks — plus a Gemini 3.8 Flash Cyber variant for government/enterprise vulnerability detection. Google Cloud
 *                      CEO Kurian: ~75% of Cloud customers now use its AI products, spending ~50% above original commitments. A federal judge rejected the DOJ's push to force divestiture of Google's
 *                      ad exchange (Sep). Stock had its longest monthly losing streak in over a decade through August but is recovering in September on the AI-momentum + antitrust-win combination —
 *                      a textbook Prompt #18 contrarian setup. Q3 earnings due late October)
 *   ~ AMZN updated    (AWS's 2M-GPU + "Vera" CPU order from NVIDIA (above) is the largest disclosed hyperscaler AI-compute commitment this cycle. New Graviton5-powered EC2 R9g/R9gd instances
 *                      (up to 25% better compute than R8g) extend AWS's custom-silicon cost advantage. Q3 earnings due late October)
 *   ~ TSLA updated    (Cybercab robotaxi production event held Sep 3 in Austin, invite-only, Musk did not appear — investors called it underwhelming; Wells Fargo headline: "TSLA Cybercab Launch
 *                      Event Underwhelms," flagging "early execution issues" in the Austin robotaxi service. Stock fell ~6% the following session. NHTSA separately opened an audit query into whether
 *                      the steering-wheel-and-pedal-free Cybercab meets federal motor vehicle safety standards. Third soft catalyst in a row after the Q2 EPS miss and the Aug-1 flag as the
 *                      portfolio's weakest-moat holding — see Allocation Verdict)
 *   ~ NET updated     (No new earnings since the Aug 6 beat; stock roughly flat over the trailing month (+0.03%), lagging both the sector (+2.81%) and S&P 500 (+2.08%). Sep 15 deadline to finalize
 *                      new AI-bot traffic classifications under the "agentic internet" initiative announced last cycle. Next earnings ~early November)
 *   ~ PLTR updated    (Expanded PwC strategic collaboration announced Sep 3 — stock jumped ~9%; US Army awarded Palantir's USG unit the TITAN ground-station contract; hired former AIG chief Peter
 *                      Zaffino as global head of financial services, signaling a push into a new commercial vertical. Stock separately fell ~5–6% Sep 2 on profit-taking after touching ~150x trailing
 *                      earnings — versus a ~39.5x software-industry median, by far the richest multiple in the portfolio. Strongest fundamental momentum in the portfolio, but valuation is now the
 *                      dominant risk factor — a Prompt #18 caution flag, not a moat concern)
 *   ~ AAPL updated    (Leadership change: John Ternus became CEO Sep 1, succeeding Tim Cook — Apple's first CEO transition in over a decade — and will host his first product event. That event,
 *                      "Surprise and shine" on Sep 9, unveiled the iPhone 18 Pro/Pro Max plus Apple's first foldable phone, the iPhone Ultra (availability ~Sep 18); the standard iPhone 18/18e and
 *                      iPhone Air 2 are being pushed to spring 2027 — a launch-cadence change. Ecosystem switching cost and the Services flywheel are structural and management-independent, but a
 *                      first-ever CEO transition is a leadership-moat item worth watching, not dismissing)
 *   ~ MELI updated    (Stock ~$1,991, within its $1,495–$2,548 52-week range. JPMorgan reiterated Neutral; Wedbush flagged MELI as "well-positioned going into Q4" despite recent underperformance
 *                      vs the S&P 500. No new earnings since Aug 5 — the margin-compression question flagged last cycle remains open into the next print (~November))
 *
 * NEW CANDIDATE SCREENING — September 5, 2026 (7 Powers ≥ 3/7 required; $10B+ market cap):
 *   ★ CRDO  WATCH        (Credo Technology — new this cycle. FY2026 revenue $1.3B, +206% YoY; Q4 FY26 revenue $437.0M +157% YoY; non-GAAP net income +5x YoY to $662M. Active Electrical Cables
 *                          (AECs) have become the intra-rack AI-connectivity standard for hyperscalers/neoclouds; PILOT diagnostic software embeds Credo into customers' network architecture —
 *                          a telemetry-first switching-cost moat similar in shape to ALAB's, but smaller-cap and less proven at scale. Complements rather than duplicates the ALAB thesis)
 *   ~ ALAB  STRONG WATCH (unchanged thesis, momentum accelerating — stock $312 as of Sep 4, +10.6% in a single session; Citi raised its target to $430 (from $315), Jefferies to $450 (from $270),
 *                          both still rated Buy. Getting more expensive to initiate, not less — the "watch for an entry point" caveat from Aug 10 is now more urgent)
 *   ~ PANW  STRONG WATCH (fiscal Q4 FY26 actual, reported Sep 1, closes out the fiscal year: $3.41B revenue +34% YoY beat $3.35B est; adjusted EPS $1.02 beat $0.98 est; GAAP net loss of $282M
 *                          driven by one-time acquisition/stock-comp items, not core operations. Stock round-tripped a 5% pop into a 2% after-hours loss — full-year results confirm the moat and
 *                          growth thesis, but the market's muted reaction suggests the swap case still needs a NET-side catalyst, not just a PANW-side one)
 *   ~ MU    WATCH        (unchanged from Aug 10 — sold-out HBM supply through 2026, Morgan Stanley's top 2026 semis pick; moat remains supply-lock, not a durable platform)
 *
 * ALLOCATION VERDICT — September 5, 2026 (no changes this cycle):
 *   ~ TSLA flagged for human review (hold at 3%)   — three consecutive soft catalysts now (Q2 EPS miss, an underwhelming Cybercab launch event, and a new NHTSA safety audit query). Still the
 *                                                     weakest 7-Powers score (3/7) in the portfolio and the position most exposed to a trim or swap if Q3 delivers a fourth. No clean thematic
 *                                                     substitute identified yet — this is a call for a human to make, not an automatic cut.
 *   ~ PLTR flagged for human review (hold at 5%)   — fundamentals remain the strongest in the portfolio (PwC deal, Army contract, new commercial-finance hire), but the stock now trades at ~150x
 *                                                     trailing earnings against a ~40x software-sector median. Not a moat problem — a valuation problem. Worth a human sizing decision, not an
 *                                                     automatic trim.
 *   ~ NET hold at 3%                                — ANET's and PANW's full-year/full-quarter results are both now in without NET having reported since Aug 6; nothing new to justify a swap
 *                                                     this cycle. Revisit when NET next reports (~early November).
 *   ~ all other holdings confirmed — NVDA, AVGO, and CRWD all beat and raised guidance this cycle; META's settlement and GOOGL's antitrust win both resolved overhangs rather than opened new ones;
 *     AAPL's CEO transition is a watch item, not a red flag, this early.
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
    "April 2026: COIN replaced by AAPL (6/7 vs 3/7 powers); MELI added (LatAm fintech flywheel) funded by TSLA trim. " +
    "September 2026: no allocation changes, but TSLA and PLTR are both flagged for a human sizing review — TSLA on a third " +
    "straight soft catalyst, PLTR on valuation (~150x earnings) rather than fundamentals.",
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
        "Q2 FY27 actual (reported Aug 26): $96.2B revenue +106% YoY, beat $92.07B estimate; GAAP EPS $2.22 beat $2.09 estimate. Data center revenue $89B +117% YoY — now 92% of total revenue. " +
        "Q3 FY27 guidance $108B (±2%), ahead of the $104.2B street estimate. AWS separately committed to buy 2M NVDA GPUs plus NVDA's new 'Vera' CPU — the largest hyperscaler AI-compute order " +
        "disclosed to date. Stock ~$230, up from the ~$199 August low; trailing P/E ~29x, still well below the 3-yr average of 69x. " +
        "Blackwell B200/GB200 NVL72 architecture deepens CUDA switching cost into 2027–28. " +
        "China remains a wildcard: the Blackwell export loophole (chips routed via non-China-HQ subsidiaries) closed by Commerce on May 31 is unchanged, and Blackwell remains formally unlicensed for China. " +
        "Hyperscaler capex commitments keep rising — MSFT FY27 capex guided $255–260B, GOOGL FY26 capex raised to $195–205B, AMZN FY26 ~$220B, META FY26 raised again to $135–145B — NVDA captures the largest share of all of it.",
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
        "Q4 FY26 actual (reported Jul 29): $90B revenue +18% YoY; GAAP EPS $4.81 +31% YoY. FY26 Azure revenue crossed $100B for the first time (+41% FY). " +
        "CFO Amy Hood has guided Q1 FY27 Azure growth to ~45% constant currency — accelerating further. CEO Nadella confirmed (Sep) that early enterprise customers are already using OpenAI's new " +
        "GPT-6 Astra model on Azure; the Microsoft–OpenAI partnership now has OpenAI committed to an incremental $250B of Azure purchases, with Microsoft holding exclusive IP rights and Azure API " +
        "exclusivity until AGI. Stock ~$500, off its recent highs on a run of weekly softness despite the fundamentals; forward P/E still cheap relative to the AI-capex growth rate. " +
        "Fed Chair Kevin Warsh has turned more hawkish since Jackson Hole (see macro note), but Microsoft's government-cloud and enterprise moat is largely Fed-independent. " +
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
        "Q2 2026 (reported Jul 29–30): $60.8B revenue +28% YoY, beat estimates — but adjusted EPS $6.18 MISSED $7.14 consensus on $2.4B legal contingencies + $1.2B severance charges. " +
        "That legal contingency became concrete on Aug 26: Meta agreed to pay ~$18B (a $10B Q3 charge, paid out over 10 years) settling a 29-state lawsuit alleging Instagram/Facebook were designed " +
        "to be addictive to minors, with platform changes including a 2-hour daily cap and tighter age verification. Morgan Stanley (Sep 2) called it a net positive — it removes a legal overhang and " +
        "clears the way for new AI product launches; the network-effect moat itself is unaffected, and forensic accounting confirms this is a disclosed one-time charge, not an earnings-quality problem. " +
        "CapEx guidance keeps climbing — raised again toward $135–145B for FY2026 — as new external compute deals stack on top of in-house buildout: $10B+ with Google Cloud (Aug), $14.2B with " +
        "CoreWeave (Sep), and talks with Oracle for ~$20B more. Llama open-source cuts inference costs $3B+/yr.",
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
        "Google Cloud revenue +82% YoY to $24.8B; cloud backlog swelled to $514B — unprecedented revenue visibility; Cloud CEO Kurian says ~75% of Cloud customers now use its AI products, spending " +
        "~50% above original commitments. Launched Gemini 3.8 Flash on Sep 2 — its third Flash model in six weeks — plus a Cyber variant for government/enterprise vulnerability detection; Gemini " +
        "overall has crossed 750M+ monthly active users. A federal judge rejected the DOJ's push to force divestiture of Google's ad exchange (Sep), removing a standing antitrust overhang. " +
        "Stock had its longest monthly losing streak in over a decade through August but is recovering in September on the AI-momentum plus antitrust-win combination — a textbook Prompt #18 " +
        "contrarian setup. Waymo commercially deployed and scaling. Greenblatt: highest ROIC in mega-cap internet (~28%). Q3 earnings due late October.",
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
        "AWS committed (alongside NVDA's Q2 FY27 print, Aug 26) to buy 2M NVIDIA GPUs plus NVDA's new 'Vera' CPU — the largest disclosed hyperscaler AI-compute order this cycle. New Graviton5-powered " +
        "EC2 R9g/R9gd instances (up to 25% better compute than R8g) extend AWS's custom-silicon cost advantage further. FY2026 CapEx guided to ~$220B — largest absolute AI infrastructure commitment " +
        "of any hyperscaler. Operating margins continue expanding as high-margin AWS/Ads overtake low-margin retail. Q3 earnings due late October.",
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
        "Q3 FY2026 actual (reported Sep 2): $29.6B revenue +86% YoY, beat $29.25B estimate; EPS $3.32 beat $3.21 estimate. AI semiconductor revenue $16.7B +221% YoY. Record free cash flow $13.7B " +
        "(46% of revenue); operating margin expanded to 67.9%. Q4 FY2026 guidance: $34.8B revenue (+93% YoY); AI chip sales guided ~$21.7B (+236% YoY). Management now projects AI semiconductor " +
        "revenue of ~$115B in FY2027 and ~$230B in FY2028 — demand still outstripping supply. Stock reaction to the beat was muted; up +51% YTD already, much of this quarter's strength looks priced in. " +
        "VMware vDefend/Avi Load Balancer (Aug 6) extends the software moat; VMware adds recurring software revenue on top of 50%+ EBITDA margins. " +
        "Held at 10% — ASIC demand remains the biggest structural shift in AI chips beyond NVDA, but valuation now leaves less margin for error than earlier in the cycle.",
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
        "Q2 FY2027 actual (reported Aug 26): $1.47B revenue +26% YoY, beat $1.44B estimate; non-GAAP EPS $0.31 beat $0.29 estimate. Net-new ARR $333M, accelerating to +51% YoY on AI-security demand. " +
        "Record operating cash flow $530M and record free cash flow $377M for the quarter. CEO George Kurtz called it 'the best quarter in CrowdStrike's history.' Stock popped more than 11% in " +
        "extended trading on the print. Comes on top of the 4-for-1 stock split (Jul 2) and the split-adjusted all-time high hit in July. " +
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
        "operating income fell 57% to $398M (1.4% margin) as gross margin slid to 16.8%. Stock plunged ~14.5% post-earnings, erasing over $140B in market cap. " +
        "The Cybercab robotaxi production event (Sep 3, Austin, invite-only, Musk absent) landed as a third soft catalyst: Wells Fargo's headline read 'TSLA Cybercab Launch Event Underwhelms,' " +
        "flagging 'early execution issues' in the Austin service, and stock fell another ~6% the next session. NHTSA has separately opened an audit query into whether the steering-wheel-and-pedal-" +
        "free Cybercab meets federal safety standards. Musk still targets 'widespread' US robotaxi by year-end and Optimus enterprise leasing in late 2026, with his pay package tied to these milestones. " +
        "Held at 3% but flagged for human review this cycle — three consecutive disappointments (EPS miss, launch-event reception, regulatory scrutiny) with no clean thematic substitute yet identified.",
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
        "Launched an 'agentic internet' product suite (Agents Week 2026) — model-inference platform and AI-bot classification/monetization tools for publishers, with a Sep 15 deadline to finalize " +
        "the new AI-bot traffic classifications. No new earnings since Aug 6; stock roughly flat over the trailing month, lagging both its sector and the S&P 500. " +
        "7 Powers score (4/7) still trails ANET (5/7) and now PANW (5/7, fiscal-year results also confirmed this cycle), but neither has produced a fresh NET-side catalyst to force a swap — " +
        "held at 3%; revisit when NET next reports (~early November).",
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
        "CEO Alex Karp called the quarter 'otherworldly.' Since then: an expanded PwC strategic collaboration (Sep 3) sent the stock up ~9%, the US Army awarded Palantir's USG unit the TITAN " +
        "ground-station contract, and former AIG chief Peter Zaffino joined as global head of financial services — a push into a new commercial vertical. But the stock also fell ~5–6% (Sep 2) on " +
        "profit-taking after touching ~150x trailing earnings against a ~40x software-industry median — by far the richest multiple in the portfolio. Fundamentals remain the strongest in the " +
        "portfolio, but valuation is now the dominant risk, flagged for a human sizing review rather than an automatic trim.",
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
        "Leadership change since: John Ternus became CEO on Sep 1, succeeding Tim Cook — Apple's first CEO transition in over a decade. Ternus hosted his first product event, 'Surprise and shine,' " +
        "on Sep 9, unveiling the iPhone 18 Pro/Pro Max plus Apple's first foldable phone, the iPhone Ultra (availability ~Sep 18); the standard iPhone 18/18e and iPhone Air 2 are being pushed to " +
        "spring 2027 — a launch-cadence change from the usual single September drop. Siri 2.0, rebuilt on a custom Google Gemini model (~$1B/yr deal), ships with this cycle alongside the new hardware, " +
        "drawing continued antitrust scrutiny next to the existing ~$20B Google search-default deal. Services flywheel and iOS switching cost are structural and management-independent, but a first " +
        "CEO transition since 2011 is a leadership-moat item worth watching over the next few quarters, not a reason to change the thesis today. Fiscal Q4 2026 earnings due late October.",
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
        "No new earnings since Aug 5; stock ~$1,991 within its $1,495–$2,548 52-week range. JPMorgan reiterated Neutral, while Wedbush flagged MELI as 'well-positioned going into Q4' despite recent " +
        "underperformance vs the S&P 500 — the margin-compression question stays open into the next print (~November). " +
        "LatAm remains structurally under-penetrated: formal credit penetration <30%, e-commerce <10% of retail — geographic diversifier uncorrelated to US tech regulatory risk.",
      color: "#ffe600",
      risk: "High",
    },
  ],
};

export const TICKERS_STOCKS = PORTFOLIO_STOCKS.holdings.map((h) => h.ticker);
