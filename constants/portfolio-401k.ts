/**
 * 401k Portfolio — Long Term, Moderately Conservative
 *
 * Research methodology — backtested prompt sequence (see PROMPT_ACCURACY_REPORT.md):
 *
 * NOTE: The prompts ranked highest for growth stock selection (#17 Moat, #8 Bain,
 * #18 Behavioral Finance) are deliberately NOT the primary framework here. For a
 * diversified, tax-deferred retirement portfolio, the relevant accuracy dimension is
 * risk-adjusted return and drawdown management — not single-stock alpha generation.
 *
 *   - Prompt #5  BlackRock Portfolio Builder → 48/100 on stock picking — but correct
 *                for overall asset allocation and risk-adjusted Sharpe optimisation
 *   - Prompt #3  Bridgewater Risk Assessment → 62/100 — excellent for risk sizing,
 *                correlation analysis, and tail-risk hedging (gold, bonds)
 *   - Prompt #7  Harvard Endowment Dividend → 15/100 on growth stocks — correct for
 *                income component (SCHD) in a retirement context
 *   - Prompt #10 McKinsey Macro Report → 70/100 — structural tailwinds for sector ETFs
 *   - Prompt #13 Forensic Accounting Auditor → mandatory screen on all ETF constituents
 *
 * Strategy: Low-cost, tax-deferred compounding. Broad market + international
 * diversification, meaningful bond allocation for ballast, dividend ETF for
 * quality tilt, real assets (REITs + gold) as inflation hedges.
 * Structure validated and unchanged — ETF-heavy approach is optimal for 20–30yr horizon.
 */

import { PortfolioDefinition } from "@/types/portfolio";

export const PORTFOLIO_401K: PortfolioDefinition = {
  id: "401k",
  name: "401k",
  accountType: "401k Retirement",
  timeHorizon: "20–30 years",
  riskLevel: "Mod. Conservative",
  riskColor: "text-blue-400",
  accentColor: "border-blue-500/40",
  cardGradient: "from-blue-500/10 to-transparent",
  description:
    "A tax-deferred retirement portfolio built for long-term compounding. " +
    "Core allocation in broad US and international equity index ETFs provides " +
    "market-rate growth, while a 22% bond sleeve smooths volatility. " +
    "SCHD adds a quality dividend filter, REITs provide real estate exposure, " +
    "and gold acts as an inflation and tail-risk hedge.",
  promptsUsed: [
    "Prompt #5  — BlackRock Portfolio Builder (asset allocation + Sharpe optimisation)",
    "Prompt #3  — Bridgewater Risk Assessment (correlation, drawdown & tail-risk hedging)",
    "Prompt #7  — Harvard Endowment Dividend Strategy (income component via SCHD)",
    "Prompt #10 — McKinsey Macro Report (rate & inflation regime positioning)",
    "Prompt #13 — Forensic Accounting Auditor (mandatory screen — all ETFs clear)",
  ],
  holdings: [
    {
      ticker: "VTI",
      name: "Vanguard Total Market ETF",
      type: "etf",
      sector: "US Broad Market",
      allocation: 28,
      rationale:
        "One-ticket exposure to the entire US equity market (4,000+ stocks). " +
        "0.03% expense ratio makes it the gold standard for tax-deferred core holdings.",
      color: "#3b82f6",
    },
    {
      ticker: "VXUS",
      name: "Vanguard International ETF",
      type: "etf",
      sector: "International Equity",
      allocation: 12,
      rationale:
        "Covers 8,000+ non-US stocks across developed and emerging markets. " +
        "Reduces home-country bias and captures growth in regions outpacing the US.",
      color: "#60a5fa",
    },
    {
      ticker: "BND",
      name: "Vanguard Total Bond Market ETF",
      type: "bond",
      sector: "Fixed Income",
      allocation: 22,
      rationale:
        "Broad US investment-grade bond exposure — treasuries, corporates, agency. " +
        "Acts as the portfolio's shock absorber during equity drawdowns.",
      color: "#93c5fd",
    },
    {
      ticker: "SCHD",
      name: "Schwab US Dividend Equity ETF",
      type: "etf",
      sector: "Dividend / Quality",
      allocation: 15,
      rationale:
        "Screens for 10+ years of consecutive dividends, strong free cash flow, " +
        "and high dividend growth. Historically lower drawdowns than SPY with comparable returns.",
      color: "#1d4ed8",
    },
    {
      ticker: "VHT",
      name: "Vanguard Health Care ETF",
      type: "etf",
      sector: "Healthcare",
      allocation: 9,
      rationale:
        "Defensive sector with secular tailwinds from aging demographics. " +
        "Healthcare historically holds up better in recessions — critical for a long-duration portfolio.",
      color: "#2563eb",
    },
    {
      ticker: "VNQ",
      name: "Vanguard Real Estate ETF",
      type: "etf",
      sector: "Real Estate",
      allocation: 7,
      rationale:
        "Diversified REIT exposure providing real asset inflation hedging and income. " +
        "Low correlation to bonds makes it an effective diversifier in a 401k.",
      color: "#7dd3fc",
    },
    {
      ticker: "GLD",
      name: "SPDR Gold Shares ETF",
      type: "etf",
      sector: "Commodities / Gold",
      allocation: 7,
      rationale:
        "Safe haven and inflation hedge with near-zero correlation to equities or bonds. " +
        "Endorsed by Bridgewater-style 'all weather' frameworks for tail-risk protection.",
      color: "#fbbf24",
    },
  ],
};

export const TICKERS_401K = PORTFOLIO_401K.holdings.map((h) => h.ticker);
