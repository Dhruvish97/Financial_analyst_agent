// ── Multi-portfolio types ──────────────────────────────────────────────────

export type AssetType = "etf" | "stock" | "bond";
export type RiskLevel =
  | "Conservative"
  | "Mod. Conservative"
  | "Moderate"
  | "Mod. Aggressive"
  | "Aggressive";
export type HoldingRisk = "Low" | "Medium" | "High";

export interface PortfolioHolding {
  ticker: string;
  name: string;
  type: AssetType;
  sector: string;
  allocation: number;
  rationale: string;
  color: string;
  risk: HoldingRisk;
}

export interface PortfolioDefinition {
  id: string;
  name: string;
  accountType: string;
  timeHorizon: string;
  riskLevel: RiskLevel;
  riskColor: string;
  accentColor: string;
  cardGradient: string;
  description: string;
  promptsUsed: string[];
  holdings: PortfolioHolding[];
}

export interface CryptoHolding {
  ticker: string;
  displayTicker: string;
  name: string;
  allocation: number;
  rationale: string;
  color: string;
  risk: HoldingRisk;
}

export interface LivePrice {
  ticker: string;
  price: number | null;
  change: number | null;
  changePercent: number | null;
  marketCap: number | null;
  volume: number | null;
  // Valuation & range fields (from quote)
  trailingPE: number | null;
  forwardPE: number | null;
  beta: number | null;
  fiftyTwoWeekLow: number | null;
  fiftyTwoWeekHigh: number | null;
  earningsDate: string | null; // ISO date "YYYY-MM-DD", null if unavailable
  error?: string;
}

export interface RSIMap {
  [ticker: string]: number | null;
}

export interface FearGreedData {
  score: number;
  rating: string;
  previousClose: number;
  previousWeek: number;
  previousMonth: number;
  previousYear: number;
  lastUpdated: string;
}

export interface PriceMap {
  [ticker: string]: LivePrice;
}
