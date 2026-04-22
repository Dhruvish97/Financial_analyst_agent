// ── India Market Constants ────────────────────────────────────────────────────
// Rebuilt March 2026 using backtested prompt accuracy sequence (PROMPT_ACCURACY_REPORT.md):
//
//   TIER 1 — Structural Foundation (highest accuracy for India):
//   #17 Moat Destroyer (7 Powers)        → 92/100  primary filter; all holdings score ≥ 3/7
//   #8  Bain Competitive Analysis         → 87/100  India sector-winner selection
//   #18 Behavioral Finance Bias Auditor   → 84/100  contrarian ID (e.g. HDFCBANK NIM pessimism)
//
//   TIER 4 — Macro / Theme (critical for India-specific analysis):
//   #10 McKinsey Macro Report             → 70/100  India structural megatrends (defence, infra, IT)
//   #16 Macro Regime & Sector Rotation    → 67/100  India capex supercycle positioning
//
//   TIER 3 — Valuation:
//   #11 Peter Lynch GARP                  → 73/100  PEG check — key for India growth stocks
//   #15 Greenblatt Magic Formula          → 72/100  ROIC + earnings yield ranking
//
//   TIER 5 — Risk (mandatory):
//   #13 Forensic Accounting Auditor       → all 10 holdings screened; all clear
//   #3  Bridgewater Risk Assessment       → INR/USD, geopolitical, concentration risk check
//
// March 2026 portfolio changes:
//   + HDFCBANK increased 12→14%   (#18: analyst NIM pessimism = anchoring bias; GARP at multi-yr lows)
//   + BAJFINANCE increased 8→10%  (#18: NPA cycle concerns overextrapolated; #11: P/E compressed)
//   + HCLTECH.NS added at 10%     (replaces TATAMOTORS — stronger 7 Powers: IT switching cost + AI)
//   − TATAMOTORS removed          (weakest 7 Powers in prior list: commodity auto, JLR execution risk)
//   − RELIANCE reduced 14→12%    (fair value after modest 2023–24 returns; free allocation to HDFC)
//   − ZOMATO reduced 8→6%        (network effects moat intact but no GAAP profit; size reflects risk)
//
// April 22, 2026 market refresh (current intelligence — research update):
//   ~ HCLTECH updated   (Q4 FY26 ACTUAL: revenue ₹33,981 cr +12.3% YoY; PAT ₹4,488 cr +4.2%; EBIT margin 16.5%;
//                        dollar rev $3,682M +5.3% YoY; ₹24 dividend declared; FY27 guidance 4.5–5% CC; AI pipeline strong)
//   ~ HDFCBANK updated  (Q4FY26 profit ₹19,221 cr +9% YoY; NIM 3.38% flat; NII +3.2% despite 12% loan growth;
//                        GNPA improved to 1.15% — best-in-class; contrarian position maintained; NIM recovery H2 FY27)
//   ~ BAJFINANCE updated (RBI held repo at 5.25% in April 2026 MPC; AUM ₹5.1L cr +22% YoY; new loans +20.5%;
//                        rate cycle has turned — funding cost relief expected in H2 FY27)
//   ~ RELIANCE updated  (Q4 FY26 board meeting Apr 24; PAT expected ₹19,200–21,000 cr; revenue ~₹2.82L cr +8% YoY;
//                        dividend ₹6–7/share expected; Jio Financial + New Energy remain long-term re-rating catalysts)
//   ~ ADANIGREEN updated (15,000 MW installed capacity milestone; 37% YoY energy sales growth in 9M FY26;
//                        307.4 MW commissioned Jan 2026; BESS 1126 MW / 3530 MWh project — largest in India)
//   ~ IT sector card    (HCLTech Q4 actual ₹33,981 cr +12.3%; TCS FY26 TCV $40.7B; Infosys Q4 results Apr 23;
//                        FY27 guidance range 1.5–5% CC across tier-1; AI revenue embedded in every major deal)
//
// NEW CANDIDATE SCREENING — April 22, 2026 (7 Powers ≥ 3/7 required):
//   ★ BEL   STRONG WATCH (Bharat Electronics — 7 Powers 5/7: cornered resource + switching cost; order book ₹75,000 cr (3.1x FY25 rev);
//                          QRSAM orders ₹30,000–32,000 cr pipeline; Axis Securities & Choice Broking top defence pick;
//                          potential to ADD at 6–8% funded from partial HAL trim or new allocation)
//   ★ ITC   WATCH         (7 Powers 4/7: brand moat + distribution network; FMCG+hotels+agri; 12–15% upside expected FY26;
//                          rural volumes +8.4% vs urban +2.6% — ITC has strongest rural footprint; GST tailwind; target ₹380)
//   ★ ICICIBANK WATCH     (7 Powers 5/7: strong CASA ratio, digital moat — faster growing than HDFCBANK; already in suggestedBuys;
//                          Q4 FY26 results upcoming; ROE expanding; consider as alternative/complement to HDFCBANK)
//   ~ DATA PATTERNS ON RADAR (Defence electronics niche; high moat but small-cap; watch for liquidity improvement)
//
// ALLOCATION VERDICT — April 22, 2026 (IMPLEMENTED):
//   + BEL added   8%  (replaces DIXON — BEL 5/7 vs DIXON 3/7; govt contract moat vs commodity manufacturing)
//   − DIXON removed  (3/7 powers; contract electronics is commodity play; no durable switching-cost moat)
//   ~ ITC on radar   (4/7 powers; rural FMCG; 12-15% upside; consider replacing ZOMATO if GAAP profits stall in FY27)
//   ~ ICICIBANK on radar (5/7; faster growth than HDFCBANK; consider as 2nd banking position in future cycle)

export interface IndiaStock {
  ticker: string;        // Yahoo Finance NSE ticker (e.g. "RELIANCE.NS")
  displayTicker: string; // Clean display (e.g. "RELIANCE")
  name: string;
  sector: string;
  sectorId: string;
  allocation: number;    // Conviction-weighted notional %
  rationale: string;     // 2–3 year investment thesis
  catalysts: string[];   // Key near-term catalysts
  risk: "Low" | "Medium" | "High";
  color: string;
}

export interface IndiaSector {
  id: string;
  name: string;
  icon: string;
  gradient: string;
  borderColor: string;
  textColor: string;
  outlook: string;
  drivers: string[];
  marketSize: string;
  cagr: string;
  keyStocks: string[];
}

// ── Top 7 Booming Sectors ────────────────────────────────────────────────────

export const INDIA_SECTORS: IndiaSector[] = [
  {
    id: "defence",
    name: "Defence & Aerospace",
    icon: "🛡️",
    gradient: "from-orange-950/80 to-amber-950/60",
    borderColor: "border-orange-800/50",
    textColor: "text-orange-400",
    outlook: "FY2026–27 defence budget ₹7.85 lakh crore — India's largest-ever. DAC approvals worth ₹6.73 lakh crore. Domestic defence production reached ₹1.27 lakh crore in FY24. India targeting $5B+ annual defence exports, with HAL, BEL, and DRDO pipelines scaling rapidly.",
    drivers: [
      "Record ₹7.85L Cr defence budget FY27 — highest ever",
      "75% indigenisation procurement policy",
      "Atmanirbhar Bharat defence push",
      "₹1.4L Cr HAL order book (10-yr visibility)",
      "Drone, missile & aerospace exports surging",
    ],
    marketSize: "₹2.0L Cr",
    cagr: "12–15% CAGR",
    keyStocks: ["HAL", "BEL", "L&T"],
  },
  {
    id: "electronics",
    name: "Electronics Manufacturing",
    icon: "🔌",
    gradient: "from-blue-950/80 to-cyan-950/60",
    borderColor: "border-blue-800/50",
    textColor: "text-blue-400",
    outlook: "PLI schemes worth ₹2.75L Cr incentivising domestic production. Apple has shifted 15%+ of global iPhone production to India. India targets $300B electronics exports by 2026.",
    drivers: [
      "₹76,000 Cr PLI for mobile + IT hardware",
      "Apple, Samsung, Foxconn expanding India capacity",
      "India Semiconductor Mission ($10B fund)",
      "China+1 supply chain diversification",
      "Consumer electronics demand doubling by 2027",
    ],
    marketSize: "₹9.5L Cr",
    cagr: "20–25% CAGR",
    keyStocks: ["DIXON", "KAYNES", "TATAELXSI"],
  },
  {
    id: "renewable",
    name: "Renewable Energy",
    icon: "☀️",
    gradient: "from-green-950/80 to-emerald-950/60",
    borderColor: "border-green-800/50",
    textColor: "text-green-400",
    outlook: "India added a record 44.5 GW of renewable capacity in 2025, pushing non-fossil fuel capacity past 253 GW vs 500 GW 2030 target. Adani Green reached 15,000 MW installed milestone; 37% YoY energy sales growth in 9M FY26; launched India's largest BESS project (1126 MW / 3530 MWh). PLI beneficiaries installing 11 GW solar PV modules. Green Hydrogen Mission ₹19,744 Cr underway. Fastest RE capacity build in the world.",
    drivers: [
      "500 GW renewable target by 2030 — Adani Green at 15,000 MW installed",
      "Adani Green BESS 1126 MW / 3530 MWh — largest single-location BESS in India",
      "₹19,744 Cr Green Hydrogen Mission; PM Surya Ghar 1 Cr rooftop solar",
      "India's power demand growing 6–7% annually — RE cheapest marginal power",
      "37% YoY energy sales growth (9M FY26) confirms RE absorption accelerating",
    ],
    marketSize: "₹3.2L Cr",
    cagr: "18–22% CAGR",
    keyStocks: ["NTPC", "TATAPOWER", "ADANIGREEN"],
  },
  {
    id: "fintech",
    name: "Digital Finance & Fintech",
    icon: "📱",
    gradient: "from-purple-950/80 to-violet-950/60",
    borderColor: "border-purple-800/50",
    textColor: "text-purple-400",
    outlook: "India's UPI processes 16B+ transactions/month. Only 27% of Indians have access to formal credit — massive runway. Digital lending, insurance, and wealth-tech seeing 30%+ growth.",
    drivers: [
      "UPI: 16B+ transactions/month, $3T+ annual flow",
      "27% formal credit penetration — 3x headroom",
      "India Stack (Aadhaar + UPI + DigiLocker) enablement",
      "DPDP Act creating data-led credit underwriting",
      "RBI digital rupee rollout expanding",
    ],
    marketSize: "₹4.8L Cr",
    cagr: "25–30% CAGR",
    keyStocks: ["BAJFINANCE", "ZOMATO", "POLICYBZR"],
  },
  {
    id: "infrastructure",
    name: "Infrastructure & Real Estate",
    icon: "🏗️",
    gradient: "from-slate-800/80 to-stone-900/60",
    borderColor: "border-slate-700/50",
    textColor: "text-slate-400",
    outlook: "National Infrastructure Pipeline: ₹111L Cr investment through 2025. PM Gati Shakti unifying logistics. Housing demand fuelled by urbanisation — 40M new urban households by 2030.",
    drivers: [
      "₹11.11L Cr National Infrastructure Pipeline",
      "PM Gati Shakti multi-modal logistics connectivity",
      "40M new urban housing units needed by 2030",
      "Road network: 50,000 km highways under development",
      "Port capacity doubling under Sagarmala",
    ],
    marketSize: "₹14.0L Cr",
    cagr: "12–16% CAGR",
    keyStocks: ["LT", "ADANIPORTS", "DLF"],
  },
  {
    id: "itservices",
    name: "IT Services & AI Engineering",
    icon: "💻",
    gradient: "from-indigo-950/80 to-blue-950/60",
    borderColor: "border-indigo-800/50",
    textColor: "text-indigo-400",
    outlook: "India IT sector Q4 FY26 results show recovery momentum: HCLTech Q4 revenue ₹33,981 cr +12.3% YoY (PAT +4.2%); FY27 CC guidance upgraded to 4.5–5%. TCS closed FY26 with record TCV $40.7B; Infosys Q4 results Apr 23 (FY27 guidance 1.5–4.5% CC expected). AI is embedded in virtually every new deal mandate — AI revenue becoming meaningful. India IT revenues $250B+ growing to $500B by 2030 — structural case intact as guidance uncertainty resolves.",
    drivers: [
      "TCS FY26 TCV $40.7B (record) — AI deal pipeline strongest in years",
      "HCLTech Q4 FY26 revenue ₹33,981 cr +12.3%; FY27 CC guidance upgraded to 4.5–5%",
      "AI revenue crossing $620M+ at HCLTech; AI embedded in every major new deal signed",
      "85% of global workloads still on-prem — decade-long cloud migration runway",
      "USD revenue = natural INR depreciation hedge; sector P/E de-rating creates selective entry",
    ],
    marketSize: "₹20.0L Cr",
    cagr: "12–18% CAGR",
    keyStocks: ["HCLTECH", "TCS", "INFOSYS"],
  },
  {
    id: "healthcare",
    name: "Healthcare & Pharma",
    icon: "💊",
    gradient: "from-rose-950/80 to-pink-950/60",
    borderColor: "border-rose-800/50",
    textColor: "text-rose-400",
    outlook: "India is the pharmacy of the world — 20% of global generic exports. US generics + specialty shift driving margin expansion. Medical tourism growing 22% p.a. Domestic health insurance penetration doubling.",
    drivers: [
      "20% of global generic drug exports by volume",
      "US FDA approvals accelerating — record in FY25",
      "Specialty pharma (oncology, derma) margin story",
      "Domestic health insurance: 70% still uninsured",
      "Medical tourism: $9B market, 22% CAGR",
    ],
    marketSize: "₹4.5L Cr",
    cagr: "11–14% CAGR",
    keyStocks: ["SUNPHARMA", "DRREDDY", "DIVISLAB"],
  },
];

// ── Top 10 Indian Stocks ──────────────────────────────────────────────────────

export const INDIA_STOCKS: IndiaStock[] = [
  {
    ticker: "RELIANCE.NS",
    displayTicker: "RELIANCE",
    name: "Reliance Industries",
    sector: "Conglomerate",
    sectorId: "fintech",
    allocation: 12,
    rationale:
      "7 Powers score 4/7: Jio scale economy + Retail switching cost (largest Asia retailer) + New Energy cornered resource. " +
      "Q4 FY26 results board meeting Apr 24, 2026: PAT expected ₹19,200–21,000 cr; revenue ~₹2.82L cr +8% YoY; dividend ₹6–7/share expected. " +
      "Q3 FY26 profit ₹18,645 cr (+0.57% YoY) — muted reflecting retail normalization and telecom ARPU pressure. " +
      "Jio IPO timeline and New Energy 100 GW capacity ramp remain key long-term re-rating catalysts. 12% allocation reflects quality moat but limited near-term earnings acceleration vs peers.",
    catalysts: ["Q4 FY26 results & dividend (Apr 24, 2026)", "Jio Financial Services growth + Jio IPO listing", "New Energy 100 GW capacity ramp"],
    risk: "Low",
    color: "#3b82f6",
  },
  {
    ticker: "HDFCBANK.NS",
    displayTicker: "HDFCBANK",
    name: "HDFC Bank",
    sector: "Banking",
    sectorId: "fintech",
    allocation: 14,
    rationale:
      "7 Powers score 5/7: Scale economy (India's largest private bank by assets) + switching cost (salary accounts + home loan ecosystem lock-in across 90M+ customers). " +
      "Q4 FY26 results (Apr 18, 2026): profit ₹19,221 cr +9% YoY on lower provisions. NIM 3.38% (flat QoQ) — NII grew only 3.2% YoY despite 12% loan growth, confirming NIM compression from elevated deposit costs. " +
      "Deposit growth 14.4% outpacing loan growth 12% — structurally healthy, reduces reliance on expensive borrowings. GNPA improved to 1.15% — best asset quality in large-cap Indian banking. " +
      "Prompt #18: Analyst consensus still anchored to NIM compression — same herding bias that preceded META's +194% re-rating. RBI rate hold may delay NIM recovery to FY27-end. " +
      "Trading at ~2.2x P/B (multi-year low vs historical 3.5–4x). Highest conviction India contrarian position; patience required.",
    catalysts: ["NIM recovery in H2 FY27 as high-cost merger deposits mature and RBI begins cutting", "Loan growth acceleration as LDR stabilises at 96%", "GNPA 1.15% — best-in-class asset quality driving P/B re-rating from multi-year low ~2.2x P/B"],
    risk: "Low",
    color: "#10b981",
  },
  {
    ticker: "LT.NS",
    displayTicker: "LT",
    name: "Larsen & Toubro",
    sector: "Infrastructure",
    sectorId: "infrastructure",
    allocation: 12,
    rationale:
      "7 Powers score 5/7: Scale economy (India's largest engineering conglomerate — 70+ years of project delivery expertise) + process power (proprietary EPC execution systems impossible to replicate quickly). ₹5.8L Cr order book = 3-year revenue visibility. Diversifying into defence electronics, semiconductor fabs, and green energy EPC. #10 McKinsey: single best proxy for India's ₹111L Cr National Infrastructure Pipeline.",
    catalysts: ["Record order inflows FY26", "Defence electronics EBIT margin expansion", "Semiconductor fab project clearance"],
    risk: "Low",
    color: "#f59e0b",
  },
  {
    ticker: "HAL.NS",
    displayTicker: "HAL",
    name: "Hindustan Aeronautics",
    sector: "Defence",
    sectorId: "defence",
    allocation: 10,
    rationale:
      "7 Powers score 6/7: Cornered resource (only listed pure-play aerospace OEM in India — government mandate for indigenous procurement cannot be transferred) + scale economy + process power. ₹1.4L Cr order book = 10+ year revenue visibility. Backtested: #10 McKinsey macro prompt correctly identified HAL as structural buy — returned +50–80% in 2023 and +40–60% in 2024. Still runway via Tejas Mk2, LCH exports, and GE engine JV.",
    catalysts: ["Tejas Mk2 serial production clearance", "LCH Prachand export orders", "Kaveri engine JV with GE finalisation"],
    risk: "Medium",
    color: "#f97316",
  },
  {
    ticker: "HCLTECH.NS",
    displayTicker: "HCLTECH",
    name: "HCL Technologies",
    sector: "IT Services & AI",
    sectorId: "itservices",
    allocation: 10,
    rationale:
      "7 Powers score 5/7: Switching cost (multi-year enterprise IT contracts average 5+ years) + process power (ER&D engineering services moat — 60,000+ engineers in product engineering). " +
      "Q4 FY26 ACTUAL (Apr 21, 2026): revenue ₹33,981 cr +12.3% YoY; PAT ₹4,488 cr +4.2% YoY; EBIT margin 16.5%; dollar revenue $3,682M +5.3% YoY. Declared ₹24 dividend. " +
      "FY26 full-year: $14.66B revenue +3.9% YoY. AI-related revenue $620M annually, embedded in virtually every new deal. Deal TCV $9.3B FY26 confirms long-term pipeline. " +
      "FY27 guidance: 4.5–5% constant-currency — upgrade vs prior 1–4% cautious signal; management confidence improving as macro uncertainty eases. " +
      "Prompt #18: IT sector valuation has de-rated sharply — same sentiment dynamics that preceded re-ratings in prior cycles. " +
      "Cheaper than TCS/Infosys on P/E — same ER&D engineering moat at a discount; AI pipeline conversion is the FY27 key watch.",
    catalysts: ["FY27 CC guidance upgraded to 4.5–5% — confidence improving on AI deal ramp", "ER&D market share gains in semiconductor + auto verticals", "IT sector P/E re-rating as FY27 guidance uncertainty resolves; ₹24 dividend signals confidence"],
    risk: "Low",
    color: "#8b5cf6",
  },
  {
    ticker: "BEL.NS",
    displayTicker: "BEL",
    name: "Bharat Electronics",
    sector: "Defence Electronics",
    sectorId: "defence",
    allocation: 8,
    rationale:
      "7 Powers score 5/7: Cornered resource (government-mandated defence electronics supplier — 75% indigenisation policy cannot be bypassed) + switching cost (multi-year system integration contracts lock in MOD for 7–10 years per programme) + scale economy (only listed pure-play defence electronics OEM at scale). " +
      "Order book ~₹75,000 crore = 3.1× FY25 revenue — providing >3 years of forward revenue visibility. " +
      "QRSAM (Quick Reaction Surface to Air Missile) orders ₹30,000–32,000 crore in pipeline; BEL is prime contractor. " +
      "FY27 defence budget ₹7.85L Cr (+record) + Defence Acquisition Council approvals worth ₹3.3L Cr across Army/Navy/Air Force. " +
      "Axis Securities and Choice Broking top defence pick. Replaces DIXON (3/7 powers) — BEL is structurally superior: government moat vs commodity contract manufacturing.",
    catalysts: ["QRSAM prime contract award (₹30,000–32,000 cr expected FY27)", "Defence budget execution — ₹7.85L Cr FY27 capital outlay", "Export order wins as India targets $5B+ annual defence exports"],
    risk: "Low",
    color: "#f97316",
  },
  {
    ticker: "NTPC.NS",
    displayTicker: "NTPC",
    name: "NTPC",
    sector: "Renewable Energy",
    sectorId: "renewable",
    allocation: 10,
    rationale:
      "7 Powers score 4/7: Scale economy (India's largest power utility) + counter-positioning (renewable pivot vs coal — first-mover at scale in green power). Regulated returns provide earnings floor while 60 GW RE target by 2032 provides growth ceiling. #10 McKinsey: India's 500 GW renewable target = decade-long structural tailwind. NTPC Green Energy sub-listing provides additional re-rating catalyst.",
    catalysts: ["NTPC Green Energy IPO/listing", "60 GW RE capacity milestones", "Pumped hydro + battery storage projects"],
    risk: "Low",
    color: "#22c55e",
  },
  {
    ticker: "ZOMATO.NS",
    displayTicker: "ZOMATO",
    name: "Zomato",
    sector: "Consumer Tech",
    sectorId: "fintech",
    allocation: 6,
    rationale:
      "7 Powers score 4/7: Network effects (food delivery + Blinkit quick commerce duopoly) + switching cost (restaurant/dark-store onboarding lock-in). Reduced to 6% (was 8%) — no GAAP profits yet and high valuation limit sizing. Blinkit dark stores now profitable and growing 90%+ YoY. India food services ₹5.5L Cr market, organised delivery <5% penetration — long runway remains.",
    catalysts: ["Blinkit dark store expansion to 2,000+", "District events platform launch", "GAAP profitability milestone"],
    risk: "High",
    color: "#ef4444",
  },
  {
    ticker: "SUNPHARMA.NS",
    displayTicker: "SUNPHARMA",
    name: "Sun Pharma",
    sector: "Healthcare",
    sectorId: "healthcare",
    allocation: 8,
    rationale:
      "7 Powers score 5/7: Process power (specialty pharma manufacturing — FDA-approved complex generics & biologics) + branding (Ilumya, Winlevi, Cequa — specialty brand moat in dermatology/ophthalmology) + scale economy (India's largest pharma by revenue). US specialty revenue growing 25%+ as complex generics face less competition. #10 McKinsey: India pharma = 20% of global generic exports — secular structural position.",
    catalysts: ["Leqselvi NDA approval (US dermatology)", "Specialty revenue crossing 25% of US sales", "India chronic disease portfolio re-rating"],
    risk: "Low",
    color: "#ec4899",
  },
  {
    ticker: "BAJFINANCE.NS",
    displayTicker: "BAJFINANCE",
    name: "Bajaj Finance",
    sector: "NBFC / Fintech",
    sectorId: "fintech",
    allocation: 10,
    rationale:
      "7 Powers score 5/7: Scale economy (India's largest NBFC) + switching cost (80M+ customers cross-sold 10+ products — deposits, loans, insurance, EMI cards). " +
      "Q4 FY26: AUM ₹5.1 lakh cr (+22% YoY), new loans 12.89M (+20.5%) — rural/semi-urban expansion executing strongly. Share price ~₹906. " +
      "Prompt #18 + #11: Analyst consensus overly pessimistic on NPA cycle (anchoring to 2022–23 stress). P/E compressed from 50x+ to ~25x while 25%+ ROE intact. " +
      "April 2026 MPC: RBI held repo at 5.25% — confirming the pause. Funding cost relief expected in H2 FY27 as RBI begins next cuts; credit demand already recovering. " +
      "Rate hold ≠ rate risk; the rate cycle has already turned — NIM improvement is a matter of timing, not direction.",
    catalysts: ["RBI rate cuts in H2 FY27 reducing NBFC funding costs and expanding NIM", "AUM growth sustaining 22%+ as rural/semi-urban expansion continues", "Credit cost normalisation as NPA cycle peaks and provisioning eases"],
    risk: "Medium",
    color: "#a855f7",
  },
];

export const INDIA_TICKERS = INDIA_STOCKS.map((s) => s.ticker);
