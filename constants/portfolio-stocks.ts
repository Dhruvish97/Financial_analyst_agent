/**
 * Aggressive Stocks Portfolio — Large Cap + Select Mid Cap
 *
 * ═══════════════════════════════════════════════════════════════════════════════════════
 * NOVEMBER 25, 2026 — FROM-SCRATCH REBUILD (human-requested; supersedes the lineup below)
 * ═══════════════════════════════════════════════════════════════════════════════════════
 * The user asked for the existing list to be set aside and the portfolio rebuilt from new
 * research after the AI-led pullback. Normal refresh rules ("never change tickers or
 * allocations") were explicitly waived for this one rebuild. Everything dated before this
 * block describes the PRIOR lineup and is kept only as history.
 *
 * Market backdrop (Nov 25, 2026):
 *   - Nasdaq ~18% below its Oct 6 peak at the Nov 20 low; S&P 500 in/near correction.
 *   - NVDA: Jensen Huang resigned Nov 12 (affair with a woman US intelligence suspects of
 *     spying for China), reinstated Nov 23; board probe still open; S&P CreditWatch
 *     Negative; House interview Dec 1. Stock ~39% off its high despite a record quarter.
 *   - Q3 earnings: GOOGL (−$9.1B), META (−$2.1B) and AMZN (TTM −$42B) all FCF-negative;
 *     only MSFT stayed FCF-positive. AI capex is now being funded with debt and equity.
 *   - Credit stress: AI-linked CDS at record spreads; ORCL at BBB- with 5y CDS ~316bp;
 *     Anthropic IPO'd Nov 19 at $83 and traded below it, with ~$901B of compute
 *     commitments and expected junk-rated debt.
 *   - Fed: held at 3.75–4.00% Oct 28 (two dissents for a hike); October core PCE 3.3%;
 *     a December 9 hike is ~95% priced.
 *   - Politics: Nov 3 midterms brought state data-center moratorium proposals; BIS
 *     proposed "Remote Access to Advanced Semiconductors" rules Nov 16.
 *   - Memory: Samsung/SK Hynix fell ~10–11% in one session; MU ~52% off its high.
 *
 * Answer to "should we be cautious on AI chips and memory?":
 *   Yes on memory, selectively on chips. Chip demand is still real (NVDA Q3 +103% and a
 *   $130B Q4 guide; AMD data center +97%; MU 2027 HBM largely sold out). The risk has moved
 *   to the BUYERS: the companies paying for chips are now burning cash and borrowing, so
 *   future orders depend on credit markets and rates, not just AI demand. Memory is the
 *   most cyclical link and MU's ~3x forward P/E is the classic sign of peak earnings — the
 *   market is pricing a 2027 oversupply (CXMT capacity, slowing DRAM contract increases).
 *   So: own the chip companies that get paid and have pricing power (TSM, NVDA, AVGO) at
 *   reduced size; leave memory and high-multiple AI small caps on the watchlist; cap
 *   AI-capex exposure; add non-AI diversifiers.
 *
 * Re-qualification tests (every holding had to pass all four):
 *   1. Moat ≥ 3/7 on Hamilton Helmer's 7 Powers.
 *   2. A real price reset — meaningfully off the 52-week high and/or a below-normal
 *      forward P/E. (MSFT, ~12% off, is the one quality-anchor exception.)
 *   3. Balance-sheet resilience in a hiking, credit-stressed tape.
 *   4. No unsized binary event (known catalysts are sized down, not ignored).
 *
 * New lineup: MSFT 12 · TSM 12 · GOOGL 11 · NVDA 10 · AMZN 9 · JPM 9 · AVGO 7 · UNH 7 ·
 *             META 6 · ETN 6 · NFLX 6 · CRM 5
 *   Direct AI-chip/power suppliers (TSM, NVDA, AVGO, ETN) = 35% (was 30% in NVDA+AVGO alone
 *   plus AI-heavy software). Non-AI-capex diversifiers (JPM, UNH, NFLX) = 22% (was ~0%).
 *
 * Did NOT re-qualify (from the old list or the screen), and why:
 *   PLTR  ~64x forward earnings — still priced for perfection in a rate-hiking tape.
 *   TSLA  ~176x forward, weakest moat (3/7); three straight soft catalysts.
 *   NET / CRWD  ~150x / ~127x forward — great businesses, wrong price for this regime.
 *   AAPL  ~1.5% off its high at ~34x forward — no reset to buy.
 *   MELI  Margin compression plus EM/FX risk with the dollar at a 19-month high.
 *   AMD   Executing well, but ~23x forward vs NVDA's ~9x, plus OpenAI/Meta warrants for up
 *         to ~320M shares. Watchlist.
 *   MU    Memory at a peak-cycle ~3x forward P/E; earnings ~Dec 17. Watchlist.
 *   ORCL  BBB-, record CDS, ~half its backlog tied to OpenAI. Watchlist only.
 *   ALAB / CRDO / ARM  High multiples; small AI names fall hardest in a risk-off tape.
 *   INTU / ADBE  Cheap (~10x / ~8.5x forward) but AI is visibly cutting their guidance.
 *   BKNG  AI-agent disintermediation risk plus a soft Q4 room-night guide.
 *   VRT / GEV / CEG  Strong results, but more exposed to data-center/power politics than ETN.
 *
 * Known dates: Dec 1 Huang House interview · Dec 9 FOMC + AVGO earnings · ~Dec 17 MU
 * earnings · UNH 2027 guidance before year-end · Jan 19, 2027 CRUSH comment deadline.
 * ═══════════════════════════════════════════════════════════════════════════════════════
 *
 * HISTORY — prior lineup and refresh notes (superseded by the rebuild above):
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
 *
 * September 27, 2026 market refresh (research update — current intelligence):
 *   ~ MACRO           (The Fed hiked for the first time since 2023 on Sep 16 — 12-0 vote, 25bp to 3.75–4.00% — with Chair Warsh calling inflation "still too high"; the dot plot shows most
 *                      officials expecting at least one more hike, none currently penciled in for 2027. Separately, Anthropic CEO Dario Amodei published an essay urging the industry to slow AI
 *                      buildout (echoed by Musk and Altman) that sent AI-infrastructure-adjacent names like CoreWeave down as much as 8.4% on Sep 14 — a real sentiment risk across the whole AI
 *                      trade, though JPMorgan upgraded CoreWeave the same week on demand/pricing grounds. A genuine split in how the market is reading this, not a one-sided signal)
 *   ~ NET updated     (Major re-rate this cycle: launched 'Vulnerability Discovery and Remediation,' an automated security service built with OpenAI's Daybreak Defense Network (Sep 9, stock
 *                      +10%); hit a fresh all-time high $333.94 on Sep 17; analyst mean price targets have risen 38% over the trailing ten weeks, outrunning the stock's own 28% gain. This
 *                      meaningfully strengthens the hold thesis — NET is now winning on its own AI-security angle rather than needing a swap decision resolved in its favor)
 *   ~ MSFT updated    (Rolled out a major Copilot upgrade unifying chat, coding, and autonomous agents — framed by analysts as a shift toward an 'AI operating system.' Azure growth holding near
 *                      the mid-40% range; raised its quarterly dividend 8% to $0.98/share. Two real counter-signals: Raymond James downgraded to a rare 'Strong Sell,' and Oppenheimer warned that a
 *                      2026 enterprise-IT pull-forward could decelerate Azure/M365 growth into 2027. Capex is running >$175B for calendar 2026, and quarterly free cash flow fell 23.2% — the capex
 *                      bill is now visibly showing up in cash generation, not just guidance language)
 *   ~ META updated    (Muse, Meta's new personal AI assistant, became a surprise hit — shares +36% in September, the stock's best month since 2013 and within reach of a $2T market cap. Two
 *                      offsetting risks: a New Mexico jury found Meta misled Facebook users on data-safety rules (a fresh legal matter, separate from the Aug 26 youth-safety settlement), and
 *                      Goldman Sachs pushed back on some of the Muse-driven analyst enthusiasm. Net: the network-effect moat is now compounding a real product hit, but two distinct legal threads
 *                      are open at once)
 *   ~ GOOGL updated   (Launched Gemini 3.8 Live + Extended Thinking for real-time, voice-first AI, with Salesforce, Genspark, and Lumeris already deploying it; committed €13B (~$15.1B) to Finland
 *                      AI-datacenter and clean-energy buildout for 2027–28, its largest European investment. Stock rangebound $330–350 this cycle — capex and negative-FCF concerns still offsetting
 *                      the cloud-acceleration story despite a still-cheap ~17x P/E)
 *   ~ AMZN updated    (AWS backlog swelled to ~$496B, up from ~$195B a year ago; the AI business alone crossed a $25B annualized run-rate at triple-digit growth. Wells Fargo upgraded to Overweight
 *                      (Sep 24, $280 target) citing Project Rainier capacity additions; 56 of 59 tracked analysts now rate it Buy. Stock still ~12% below its August all-time high despite the
 *                      upgrade — a disconnect between fundamentals and price this cycle)
 *   ~ AVGO updated    (Cantor Fitzgerald raised its target to $600 (from $525); the board approved a $0.65/share quarterly dividend (paid Sep 30). Coverage increasingly frames AVGO as a broader AI
 *                      infrastructure platform rather than a pure chipmaker — but also flagged a 'China test' and knock-on exposure to the CoreWeave/AI-slowdown sentiment wobble above)
 *   ~ CRWD updated    (Baird raised its target to $235 (from $230) but kept a Neutral rating — a 'the stock has run, the rating hasn't' signal rather than a new catalyst. Stock ~$203, off its
 *                      post-earnings highs)
 *   ~ TSLA updated    (No new earnings this cycle — Q3 deliveries due Oct 2, Q3 earnings to follow, with consensus modeling a YoY EPS and revenue decline. Nevada Semi-truck factory scaling reported
 *                      Sep 24 as a new product angle distinct from Cybercab/robotaxi; the EU delayed its FSD vote to at least December. Stock recovered to ~$372, but nothing here resolves the
 *                      human-review flag from last cycle — still waiting on Q3 results)
 *   ~ PLTR updated    (UBS raised its target to $250 (from $220); the company disclosed record $2.1B in US commercial bookings. Momentum and fundamentals keep improving, but so does the multiple —
 *                      the valuation flag from last cycle stands unchanged, not resolved)
 *   ~ AAPL updated    (CEO John Ternus's debut product event, Sep 9, unveiled the iPhone Duo — Apple's first foldable, not the 'iPhone Ultra' name earlier rumored — plus iPhone 18 Pro/Pro Max, and
 *                      discontinued the baseline iPhone 18 tier entirely to steer buyers toward higher-margin Pro models, the biggest release-cadence change in seven years. Stock hit a record high
 *                      afterward — a strong start to the Ternus era that meaningfully de-risks last cycle's leadership-transition watch item)
 *   ~ MELI updated    (Stock pulled back ~7.75% over the trailing month to ~$1,754–1,756; Zacks assigned a #4 (Sell) rank even as one analyst raised its price target to $2,150 (Hold) — a
 *                      momentum/valuation split, not a fundamentals problem. Forward P/E (~46x) remains a large premium to the ~15.6x industry average. The Aug-5 margin-compression question is
 *                      still open into the next print)
 *
 * NEW CANDIDATE SCREENING — September 27, 2026 (7 Powers ≥ 3/7 required; $10B+ market cap):
 *   ★ AMD   STRONG WATCH (new — the single biggest AI story of the cycle. OpenAI committed to 6GW of AMD Instinct GPUs over multiple years (1GW starting 2026) and received a warrant for up to
 *                          160M AMD shares; Meta struck a parallel 6GW deal and warrant days later; both vest as AMD's stock price climbs toward $600. Oracle separately ordered 50,000 MI450 chips.
 *                          AMD crossed $1T market cap on Sep 21 (+5 straight sessions); Raymond James upgraded to Strong Buy, $641 target. Strategically, the warrants financially incentivize the
 *                          two largest AI labs to port models to AMD's ROCm stack — a structural chip at NVDA's CUDA-exclusivity moat, not just a revenue event. The strongest new candidate found
 *                          in any cycle so far; a plausible swap-in for TSLA's flagged slot if a human wants to act, though the first GPU shipments aren't until late 2026 and the bulk of revenue
 *                          lands later still)
 *   ★ ORCL  WATCH        (new — record Q1 FY27 cloud revenue +62% YoY to $11.6B, infrastructure revenue +121%, backlog swelled to $664B; raised FY27 guidance to $90B+ revenue. Real moat: hyperscaler-
 *                          tier growth with multi-year contracted visibility. Real risk, newly emerged: a force-majeure notice tied to its Project Jupiter, NM data-center campus raised execution
 *                          questions, and S&P cut Oracle's credit rating to BBB- — just above junk — citing heavy debt reliance to fund the AI buildout. Strong moat, real and freshly-downgraded
 *                          balance-sheet risk; watch rather than chase)
 *   ~ ALAB  STRONG WATCH (momentum still accelerating — stock $364.62 as of Sep 26, up from $312 on Sep 4; Q2 2026 net income $153.1M, +199% YoY, EPS beat estimates by 82%. Getting more expensive
 *                          by the cycle, not less)
 *   ~ PANW  STRONG WATCH (acquired Console Systems Sep 1 to deepen agentic capabilities in its Cortex platform — part of CEO Arora's aggressive dealmaking run that already includes the $25B
 *                          CyberArk and $3.4B Chronosphere acquisitions. The moat is now being extended by acquisition as much as by organic growth)
 *   ~ CRDO  WATCH        (first negative signal since being added: Mizuho cut its price target to $245 from $290 on Sep 21. Still a legitimate AI-interconnect name, just cooling off relative to
 *                          ALAB this cycle)
 *   ~ MU    WATCH        (unchanged — surfaced again in a CNBC 'Final Trade' segment alongside UBER/DDOG as an AI-capex beneficiary; no new fundamental data this cycle)
 *
 * ALLOCATION VERDICT — September 27, 2026 (no changes this cycle):
 *   ~ TSLA still flagged for human review (hold at 3%)  — no new catalyst resolves last cycle's flag; Q3 deliveries (Oct 2) and earnings are the next real data point. AMD's emergence as a
 *                                                          STRONG WATCH candidate gives a human a concrete swap option to weigh if they want to act on this flag before Q3 results land.
 *   ~ PLTR still flagged for human review (hold at 5%)  — fundamentals and price target both keep climbing; the valuation gap this flag exists for has not narrowed.
 *   ~ NET hold at 3%, thesis strengthened                — the OpenAI-security launch and 52-week high materially reduce the case for swapping into ANET/PANW this cycle; no action needed.
 *   ~ MELI hold at 2%, new valuation flag                — Zacks Sell rank + rich forward P/E added to the still-open margin-compression question; not urgent, but now has two open questions
 *                                                          instead of one.
 *   ~ all other holdings confirmed — MSFT's Strong-Sell/Strong-Buy analyst split and the sector-wide AI-slowdown sentiment wobble (Amodei essay, CoreWeave selloff) are both flagged as macro
 *     context to watch, not holding-specific problems this cycle.
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
    "Rebuilt from scratch on Nov 25, 2026, after the AI-led correction (Nasdaq ~18% off its October peak). " +
    "Every holding had to re-qualify on four tests: a durable moat (≥3/7 on Hamilton Helmer's 7 Powers), a real price reset " +
    "(meaningfully off its 52-week high or at a below-normal forward P/E), a balance sheet that holds up in a rate-hiking, " +
    "credit-stressed tape, and no unsized binary event. AI chip exposure is kept but deliberately smaller and tilted to the " +
    "companies that get paid (TSM, NVDA, AVGO) rather than the ones borrowing to pay. Memory, high-multiple software and " +
    "debt-funded AI names were left out; JPM, UNH, NFLX and ETN were added as non-AI-capex diversifiers.",
  promptsUsed: [
    "Prompt #17 — Moat Destroyer / 7 Powers (every holding ≥ 3/7)",
    "Prompt #18 — Behavioral Finance Bias Auditor (which drops are fear vs. fundamentals)",
    "Prompt #13 — Forensic Accounting Auditor (free cash flow vs. reported earnings)",
    "Prompt #3  — Bridgewater Risk Assessment (AI-capex concentration cap, credit stress)",
    "Prompt #11 — Peter Lynch GARP (forward P/E vs. growth at reset prices)",
    "Prompt #10 — McKinsey Macro Report (Fed hiking cycle, data-center politics)",
  ],
  holdings: [
    {
      ticker: "MSFT",
      name: "Microsoft Corporation",
      type: "stock",
      sector: "Cloud & Enterprise AI",
      allocation: 12,
      rationale:
        "7 Powers 7/7. The only one of the four big AI spenders still generating positive free cash flow ($18.6B in fiscal Q1 FY27, " +
        "down 27% but positive), and it says it expects to stay FCF-positive for all of FY27. Azure grew 48% (fastest in two years) " +
        "and is guided to 49–50% next quarter; Microsoft Cloud hit $63.9B (+30%). At ~$490 it is only ~12% off its high, so this is " +
        "a quality anchor rather than a deep-value buy — it re-qualified because it is the hyperscaler least dependent on debt " +
        "markets at a ~20x forward P/E.",
      color: "#00a4ef",
      risk: "Low",
    },
    {
      ticker: "TSM",
      name: "Taiwan Semiconductor (ADR)",
      type: "stock",
      sector: "Semiconductor Foundry",
      allocation: 12,
      rationale:
        "7 Powers 6/7 (scale, process power, cornered resource at the leading edge). The best way to own AI chips without betting " +
        "on which designer wins: NVDA, AMD, AVGO's custom ASICs and Apple all fab here, and TSMC is reportedly raising prices ~10% " +
        "next year. ~30% off its high at ~14.6x forward earnings. Main risks are geopolitical (Taiwan) and a capex digestion phase; " +
        "Arizona expansion breaks ground Dec 4.",
      color: "#9333ea",
      risk: "Medium",
    },
    {
      ticker: "GOOGL",
      name: "Alphabet Inc.",
      type: "stock",
      sector: "Internet & AI",
      allocation: 11,
      rationale:
        "7 Powers 6/7. Cheapest mega-cap at ~14x trailing earnings, ~33% off its high after a Q3 miss and capex shock. Google Cloud " +
        "revenue roughly doubled to $30.7B (36% margin) with a ~$561B backlog, and TPU system sales are now a real revenue line. " +
        "The honest risk: free cash flow was −$9.1B in Q3 (second negative quarter) and long-term debt rose from $21.6B to $125B in " +
        "a year, with 2027 capex guided to rise 'significantly'. Owned for the moat at a reset price, sized below MSFT because of the cash burn.",
      color: "#4285f4",
      risk: "Medium",
    },
    {
      ticker: "NVDA",
      name: "NVIDIA Corporation",
      type: "stock",
      sector: "AI Semiconductors",
      allocation: 10,
      rationale:
        "7 Powers 6/7. The fundamentals are the strongest they have ever been — Q3 FY27 revenue $115.8B (+103%), Q4 guided to $130B, " +
        "$28B returned to shareholders in one quarter — yet the stock is ~39% off its high at ~9x forward earnings. That discount is " +
        "about governance, not demand: Jensen Huang resigned Nov 12 over an affair with a suspected foreign intelligence asset, was " +
        "reinstated Nov 23 after government pressure, the board's investigation is still open, S&P put the company on CreditWatch " +
        "Negative, and Huang faces a closed-door House interview Dec 1. Sized at half its old 20% weight for exactly that reason.",
      color: "#76b900",
      risk: "High",
    },
    {
      ticker: "AMZN",
      name: "Amazon.com Inc.",
      type: "stock",
      sector: "Cloud & E-Commerce",
      allocation: 9,
      rationale:
        "7 Powers 6/7. AWS grew ~39% to ~$46B in Q3 — accelerating for a sixth straight quarter — with a ~$578B backlog and management " +
        "guiding to 40%+ growth in both 2027 and 2028. ~15% off its high at ~22x forward. Like GOOGL and META, it is now spending more " +
        "than it earns: trailing free cash flow swung to about −$42B on ~$220B of 2026 capex. Kept because AWS demand is visible and " +
        "contracted; sized to reflect the cash burn.",
      color: "#ff9900",
      risk: "Medium",
    },
    {
      ticker: "JPM",
      name: "JPMorgan Chase & Co.",
      type: "stock",
      sector: "Banking & Financials",
      allocation: 9,
      rationale:
        "7 Powers 4/7 (scale, switching cost, brand). New, and a deliberate diversifier away from AI capex. ~14% off its high at " +
        "~12x forward earnings with the strongest balance sheet in US banking. A rising-rate cycle (Fed held at 3.75–4.00% in October, " +
        "a December hike is ~95% priced) supports net interest income. Risk: an extended hiking cycle eventually means higher " +
        "unemployment and weaker consumer credit, which JPMorgan itself has flagged.",
      color: "#a67c52",
      risk: "Low",
    },
    {
      ticker: "AVGO",
      name: "Broadcom Inc.",
      type: "stock",
      sector: "Semiconductors & Software",
      allocation: 7,
      rationale:
        "7 Powers 5/7 (custom-ASIC switching cost with Google/Meta, plus VMware recurring software). ~39% off its June high — formally " +
        "a bear market — at ~15.5x forward earnings, after fiscal Q3 AI semiconductor revenue grew 221%. Analysts are trimming targets " +
        "on an AI 'digestion phase' and margin pressure. Earnings land Dec 9, the same day as the Fed decision, so this is sized smaller " +
        "and best built in stages rather than all at once.",
      color: "#cc0000",
      risk: "High",
    },
    {
      ticker: "UNH",
      name: "UnitedHealth Group",
      type: "stock",
      sector: "Managed Healthcare",
      allocation: 7,
      rationale:
        "7 Powers 4/7 (scale, Optum data, cornered provider network). New contrarian pick: ~25% off its high at ~14.7x forward after " +
        "CMS proposed the 'CRUSH' Medicare Advantage audit rule on Nov 16 (industry-wide clawback est. ~$9B per payment year). The rule " +
        "is only a proposal — comments run to Jan 19, 2027 and litigation killed a similar framework before — and TD Cowen upgraded to " +
        "Buy afterward. Healthcare is also where defensive money is rotating. Binary risk: the 2027 guidance due before year-end.",
      color: "#6366f1",
      risk: "High",
    },
    {
      ticker: "META",
      name: "Meta Platforms Inc.",
      type: "stock",
      sector: "Social Media & AI",
      allocation: 6,
      rationale:
        "7 Powers 5/7 — the strongest consumer network effect anywhere, and the Muse AI assistant is a genuine product hit. ~22% off its " +
        "high at ~17x forward. But it re-qualified only at a reduced size: Q3 free cash flow was about −$2.1B, it bought back no stock in " +
        "the first nine months of 2026, it booked a ~$9.9B legal charge, and its plan to fund AI with a $60B non-voting Class C share " +
        "program is reportedly being challenged in Delaware. Great business, shareholder-unfriendly financing.",
      color: "#0866ff",
      risk: "Medium",
    },
    {
      ticker: "ETN",
      name: "Eaton Corporation",
      type: "stock",
      sector: "Electrical & Power Infrastructure",
      allocation: 6,
      rationale:
        "7 Powers 4/7 (scale, switching cost in utility/data-center electrical gear). New. ~33% off its high at ~19x forward — the sell-off " +
        "came from the Nov 3 midterms and state data-center moratorium proposals, not results: Q3 beat on revenue and EPS, raised guidance, " +
        "rolling orders +39%, backlog +33%, data-center orders reportedly +101%. Chosen over Vertiv because Eaton also sells into utilities, " +
        "aerospace and industrial, so it is less exposed if data-center projects get cancelled (Q3 cancellations were reportedly the highest on record).",
      color: "#14b8a6",
      risk: "Medium",
    },
    {
      ticker: "NFLX",
      name: "Netflix Inc.",
      type: "stock",
      sector: "Streaming & Media",
      allocation: 6,
      rationale:
        "7 Powers 5/7 (scale economies in content, global subscriber network). New, and outside the AI-capex trade entirely. ~46% off its " +
        "high (~55% from the 2025 peak) at ~16x forward — the lowest multiple in years — after it trimmed its 2026 ad-revenue forecast " +
        "to $2.7B and lost Warner Bros. to Paramount. Management is leaning in: a record ~$4.8B buyback in Q3 with ~$22B still authorized. " +
        "Risk: the ad business keeps under-delivering and analysts keep cutting.",
      color: "#f43f5e",
      risk: "Medium",
    },
    {
      ticker: "CRM",
      name: "Salesforce Inc.",
      type: "stock",
      sector: "Enterprise Software",
      allocation: 5,
      rationale:
        "7 Powers 4/7 (switching cost, CRM data lock-in). The one contrarian software slot. The 'SaaS-pocalypse' fear — AI agents replacing " +
        "per-seat software — has pushed CRM ~27% off its high to ~12x forward earnings even though Agentforce passed $1.5B in annualized " +
        "revenue (+240%) and free cash flow jumped 81% last quarter. This is the highest-risk name here: if AI labs really do capture CRM " +
        "spending, the multiple is not a floor. Kept small on purpose.",
      color: "#38bdf8",
      risk: "High",
    },
  ],
};

export const TICKERS_STOCKS = PORTFOLIO_STOCKS.holdings.map((h) => h.ticker);
