/**
 * Risk classification for US-market tickers suggested by the Advisor tool
 * (SectorTarget.suggestedBuys in constants/portfolio-targets.ts).
 *
 * Only covers tickers suggested by the US targets (conservative/aggressive) —
 * India already has its own dedicated risk system on the India stock table.
 * Unmapped tickers (e.g. India suggestions, or arbitrary tickers detected from
 * a user's uploaded portfolio) simply render without a risk badge.
 */

import { HoldingRisk } from "@/types/portfolio";

export const TICKER_RISK: Record<string, HoldingRisk> = {
  // Bonds / fixed income
  BND: "Low", AGG: "Low", VGSH: "Low", SGOV: "Low",
  // Dividend / value ETFs & blue-chip dividend stocks
  SCHD: "Low", VYM: "Low", KO: "Low", PG: "Low", JNJ: "Low",
  // Broad market ETFs
  VTI: "Low", VOO: "Low", SPY: "Low",
  // International developed / emerging market ETFs
  VXUS: "Medium", VEA: "Medium", EFA: "Medium", EEM: "Medium", INDA: "Medium",
  // REITs
  VNQ: "Medium", O: "Medium", WELL: "Medium",
  // Healthcare
  VHT: "Low", UNH: "Medium", ISRG: "Medium", DXCM: "High", ABBV: "Low",
  // Steadiest mega-caps
  MSFT: "Low", AAPL: "Low",
  // Large caps with real but non-extreme volatility
  GOOGL: "Medium", AMZN: "Medium", META: "Medium", AVGO: "Medium",
  // Cybersecurity / networking
  CRWD: "Medium", PANW: "Medium", ANET: "Medium",
  // Highest-volatility / most speculative names
  NVDA: "High", NET: "High", PLTR: "High", MELI: "High",
  // Semiconductors (cyclical)
  AMD: "High", QCOM: "Medium", MU: "High",
  // Consumer growth
  CMG: "Medium", SHOP: "High",
  // Financials / fintech
  COIN: "High", V: "Low", MA: "Low", HOOD: "High",
  // Broad tech ETFs
  QQQ: "Medium", VGT: "Medium",
};
