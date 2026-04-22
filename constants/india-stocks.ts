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
// April 2026 market refresh (current intelligence — research update):
//   ~ HCLTECH updated   (FY26 revenue $14.66B +3.9% YoY; Q4 rev $3.68B +5.3%; AI revenue $620M annual;
//                        FY27 guidance cut to 1–4% CC amid client-specific issues — cautious but AI pipeline intact)
//   ~ HDFCBANK updated  (Q4FY26 profit ₹19,221 cr +9% YoY; NIM 3.38% flat; NII +3.2% despite 12% loan growth;
//                        NIM compression ongoing as deposit costs remain elevated; contrarian position maintained)
//   ~ BAJFINANCE updated (RBI held repo at 5.25% in April 2026 MPC; AUM ₹5.1L cr +22% YoY; new loans +20.5%;
//                        rate cycle has turned — funding cost relief expected in H2 FY27)
//   ~ RELIANCE updated  (Q3 FY26 profit ₹18,645 cr +0.57% YoY — muted; Jio Financial + New Energy still long-term)
//   ~ ADANIGREEN noted  (Q3 FY26 net loss ₹-41 cr — near-term headwinds; long-term capacity build intact)
//   ~ IT sector card    (FY27 guidance cautious across sector; TCS TCV $40.7B FY26; AI deal pipeline building)

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
    outlook: "India added a record 44.5 GW of renewable capacity in 2025, pushing total non-fossil fuel capacity past 253 GW vs the 500 GW 2030 target. PLI beneficiaries installed 11 GW solar PV modules and 5 GW cells in 2025. Green Hydrogen Mission ₹19,744 Cr outlay. Fastest RE capacity build in the world.",
    drivers: [
      "500 GW renewable target by 2030",
      "₹19,744 Cr Green Hydrogen Mission",
      "PM Surya Ghar: 1 Cr rooftop solar homes",
      "India's power demand growing 6–7% annually",
      "Falling solar+wind tariffs making RE cheaper than coal",
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
    outlook: "India IT sector faces a muted FY27: HCLTech guided 1–4% CC growth; sector-wide discretionary spending under pressure from West Asia conflict uncertainty. However, deal quality is improving — TCS closed FY26 with record TCV $40.7B ($12B in Q4 alone); AI is embedded in virtually every new mandate. India IT revenues $250B+ growing to $500B by 2030 — the structural case is intact even as near-term guidance disappoints.",
    drivers: [
      "TCS FY26 TCV $40.7B (record) — deal pipeline strongest in years",
      "HCLTech AI revenue $620M annually; AI in virtually every new deal signed",
      "IT FY27 guidance cautious but improving — client budget decisions accelerating",
      "85% of global workloads still on-prem — decade-long cloud migration runway",
      "USD revenue = natural INR depreciation hedge for India investors",
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
      "Q3 FY26 profit ₹18,645 cr (+0.57% YoY) — muted near-term growth reflecting retail normalization and telecom ARPU pressure. Share price ~₹1,353. " +
      "CLSA has de-emphasised RELIANCE in favour of consumer growth names for 2026. Jio IPO timeline and New Energy 100 GW capacity ramp remain the key long-term re-rating catalysts. 12% allocation reflects quality moat but limited near-term catalysts vs peers.",
    catalysts: ["Jio Financial Services growth", "New Energy 100 GW capacity ramp", "Jio IPO listing timeline"],
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
      "Deposit growth 14.4% outpacing loan growth 12% — structurally healthy, reduces reliance on expensive borrowings. GNPA 1.24% — best asset quality in large-cap Indian banking. " +
      "Prompt #18: Analyst consensus still anchored to NIM compression — same herding bias that preceded META's +194% re-rating. RBI rate hold may delay NIM recovery to FY27-end. " +
      "Trading at ~2.2x P/B (multi-year low vs historical 3.5–4x). Highest conviction India contrarian position; patience required.",
    catalysts: ["NIM recovery in H2 FY27 as high-cost merger deposits mature and RBI begins cutting", "Loan growth acceleration as LDR stabilises at 96%", "GNPA 1.24% — best-in-class asset quality driving P/B re-rating"],
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
      "FY26 results: revenue $14.66B +3.9% YoY; Q4 FY26 revenue $3.68B +5.3%. AI-related revenue $620M annually, with advanced AI in nearly every new deal signed. " +
      "FY27 guidance: 1–4% constant-currency growth — management flagged client-specific delays and macro uncertainty (West Asia conflict). Below prior expectations, but deal TCV $9.3B FY26 confirms long-term pipeline. " +
      "Prompt #18: IT sector valuation has de-rated sharply — same sentiment dynamics that preceded re-ratings in prior cycles. " +
      "Cheaper than TCS/Infosys on P/E — same ER&D engineering moat at a discount; AI pipeline conversion is the FY27 key watch.",
    catalysts: ["AI deal TCV conversion in FY27 (TCV $9.3B FY26 = strong backlog)", "ER&D market share gains in semiconductor + auto verticals", "IT sector P/E re-rating as FY27 guidance uncertainty resolves"],
    risk: "Low",
    color: "#8b5cf6",
  },
  {
    ticker: "DIXON.NS",
    displayTicker: "DIXON",
    name: "Dixon Technologies",
    sector: "Electronics Mfg",
    sectorId: "electronics",
    allocation: 8,
    rationale:
      "7 Powers score 3/7: Scale economy (India's largest contract electronics manufacturer) + counter-positioning (vs Chinese EMS — China+1 structural shift). Assembling iPhones for Apple. PLI incentives drive 40%+ revenue CAGR. Operating leverage accelerates as volume scales — gross margin expansion of 150–200 bps expected annually. Higher risk (3/7 Powers) justifies 8% cap.",
    catalysts: ["iPhone production ramp expansion", "IT hardware PLI scheme wins", "Semiconductor assembly JV announcement"],
    risk: "High",
    color: "#06b6d4",
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
