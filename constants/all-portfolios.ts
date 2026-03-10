import { PORTFOLIO_401K, TICKERS_401K } from "./portfolio-401k";
import { PORTFOLIO_ROTH_IRA, TICKERS_ROTH_IRA } from "./portfolio-roth-ira";
import { PORTFOLIO_HOUSE, TICKERS_HOUSE } from "./portfolio-house";
import { PORTFOLIO_STOCKS, TICKERS_STOCKS } from "./portfolio-stocks";

export { PORTFOLIO_401K, PORTFOLIO_ROTH_IRA, PORTFOLIO_HOUSE, PORTFOLIO_STOCKS };

export const ALL_PORTFOLIOS = [
  PORTFOLIO_401K,
  PORTFOLIO_ROTH_IRA,
  PORTFOLIO_HOUSE,
  PORTFOLIO_STOCKS,
];

// Deduplicated list of all unique tickers across all 4 portfolios
export const ALL_STOCK_TICKERS = Array.from(
  new Set([
    ...TICKERS_401K,
    ...TICKERS_ROTH_IRA,
    ...TICKERS_HOUSE,
    ...TICKERS_STOCKS,
  ])
);
