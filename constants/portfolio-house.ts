/**
 * House Fund Portfolio — ~5 Year Horizon, Capital Preservation + Growth
 *
 * Research methodology (per STOCK_ANALYSIS_PROMPTS.md):
 *   - Prompt #5 BlackRock Portfolio Builder → allocation for specific timeline
 *   - Prompt #3 Bridgewater Risk Assessment → drawdown risk under 5yr constraint
 *   - Prompt #7 Harvard Endowment Dividend Strategy → income + stability component
 *   - Prompt #10 McKinsey Macro Report → rate environment for bond positioning
 *
 * Strategy: The goal is NOT maximum return — it's to preserve and modestly grow
 * a down-payment fund over 5 years with controlled maximum drawdown. Heavy fixed
 * income (37%) reduces sequence-of-returns risk, while dividend stalwarts
 * (JNJ, PG, KO, MCD) provide defensive equity exposure. VTI adds upside
 * participation without overconcentrating in volatile sectors.
 */

import { PortfolioDefinition } from "@/types/portfolio";

export const PORTFOLIO_HOUSE: PortfolioDefinition = {
  id: "house",
  name: "House Fund",
  accountType: "Taxable / Savings",
  timeHorizon: "3–5 years",
  riskLevel: "Moderate",
  riskColor: "text-amber-400",
  accentColor: "border-amber-500/40",
  cardGradient: "from-amber-500/10 to-transparent",
  description:
    "A capital preservation portfolio designed to protect and modestly grow a " +
    "house down-payment over 3–5 years. Fixed income (BND + VGSH) makes up 37% " +
    "to minimize drawdown risk near the target purchase date. Dividend aristocrats " +
    "JNJ, PG, KO, and MCD provide defensive equity exposure with low beta, " +
    "while VTI and SCHD capture broad market upside with quality filters.",
  promptsUsed: [
    "Prompt #5 — BlackRock Portfolio Builder (5-year allocation framework)",
    "Prompt #3 — Bridgewater Risk Assessment (drawdown & sequence-of-returns risk)",
    "Prompt #7 — Harvard Endowment Dividend Strategy (income stability)",
    "Prompt #10 — McKinsey Macro Report (bond positioning in rate environment)",
  ],
  holdings: [
    {
      ticker: "BND",
      name: "Vanguard Total Bond Market ETF",
      type: "bond",
      sector: "Fixed Income",
      allocation: 25,
      rationale:
        "Core fixed income allocation providing portfolio ballast and income. " +
        "With a 5-year horizon, this cushions against equity downturns in years 3-5 " +
        "when the purchase date approaches.",
      color: "#f59e0b",
    },
    {
      ticker: "VGSH",
      name: "Vanguard Short-Term Bond ETF",
      type: "bond",
      sector: "Short-Term Fixed Income",
      allocation: 12,
      rationale:
        "Short 1-3 year treasuries with minimal interest rate risk. " +
        "Acts as near-cash that still earns yield, crucial for capital you'll need access to soon.",
      color: "#fbbf24",
    },
    {
      ticker: "SCHD",
      name: "Schwab US Dividend Equity ETF",
      type: "etf",
      sector: "Dividend / Quality",
      allocation: 18,
      rationale:
        "Quality-screen ETF with 10+ year dividend growth track record. " +
        "Lower volatility than SPY, higher yield, and proven resilience in down markets " +
        "— ideal for capital you can't afford to see cut in half.",
      color: "#d97706",
    },
    {
      ticker: "VTI",
      name: "Vanguard Total Market ETF",
      type: "etf",
      sector: "US Broad Market",
      allocation: 15,
      rationale:
        "Broad market participation to capture upside if equities continue rallying " +
        "over the 5-year window. Low 0.03% fee ensures no drag on moderate returns.",
      color: "#b45309",
    },
    {
      ticker: "JNJ",
      name: "Johnson & Johnson",
      type: "stock",
      sector: "Healthcare / Defensive",
      allocation: 8,
      rationale:
        "62 consecutive years of dividend increases (Dividend King). Healthcare " +
        "is recession-proof and JNJ's Medtech + Pharmaceutical split provides " +
        "diversification within a single defensive holding.",
      color: "#ef4444",
    },
    {
      ticker: "PG",
      name: "Procter & Gamble",
      type: "stock",
      sector: "Consumer Staples",
      allocation: 8,
      rationale:
        "Consumer staples with unmatched brand pricing power (Tide, Gillette, Pampers). " +
        "67 years of consecutive dividend growth. In any economic environment, " +
        "people buy household essentials — minimal revenue risk.",
      color: "#3b82f6",
    },
    {
      ticker: "KO",
      name: "Coca-Cola Co.",
      type: "stock",
      sector: "Consumer Staples",
      allocation: 7,
      rationale:
        "61-year Dividend King with Warren Buffett's seal of approval. " +
        "Global distribution in 200+ countries, massive brand moat, and a " +
        "3.1% yield makes this one of the safest equity positions available.",
      color: "#dc2626",
    },
    {
      ticker: "MCD",
      name: "McDonald's Corporation",
      type: "stock",
      sector: "Consumer Discretionary",
      allocation: 7,
      rationale:
        "Franchised business model means 95%+ of revenue is recurring franchise fees " +
        "— not restaurant operating risk. 47 consecutive years of dividend growth " +
        "and recession-resistant 'affordable treat' consumer behavior.",
      color: "#fde047",
    },
  ],
};

export const TICKERS_HOUSE = PORTFOLIO_HOUSE.holdings.map((h) => h.ticker);
