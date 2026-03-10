import YahooFinance from "yahoo-finance2";
import { PriceMap, RSIMap } from "@/types/portfolio";

const yf = new YahooFinance({ suppressNotices: ["yahooSurvey"] });

export async function fetchQuotes(tickers: string[]): Promise<PriceMap> {
  const results = await Promise.allSettled(
    tickers.map((ticker) => yf.quote(ticker))
  );

  return tickers.reduce((acc, ticker, idx) => {
    const result = results[idx];
    if (result.status === "fulfilled" && result.value) {
      const q = result.value;
      acc[ticker] = {
        ticker,
        price: q.regularMarketPrice ?? null,
        change: q.regularMarketChange ?? null,
        changePercent: q.regularMarketChangePercent ?? null,
        marketCap: q.marketCap ?? null,
        volume: q.regularMarketVolume ?? null,
        trailingPE: q.trailingPE ?? null,
        forwardPE: q.forwardPE ?? null,
        beta: q.beta ?? null,
        fiftyTwoWeekLow: q.fiftyTwoWeekLow ?? null,
        fiftyTwoWeekHigh: q.fiftyTwoWeekHigh ?? null,
      };
    } else {
      acc[ticker] = {
        ticker,
        price: null,
        change: null,
        changePercent: null,
        marketCap: null,
        volume: null,
        trailingPE: null,
        forwardPE: null,
        beta: null,
        fiftyTwoWeekLow: null,
        fiftyTwoWeekHigh: null,
        error: "fetch_failed",
      };
    }
    return acc;
  }, {} as PriceMap);
}

// ── RSI calculation ──────────────────────────────────────────────────────────

function calcRSI(closes: number[], period = 14): number | null {
  if (closes.length < period + 1) return null;
  let gains = 0;
  let losses = 0;
  for (let i = 1; i <= period; i++) {
    const diff = closes[i] - closes[i - 1];
    if (diff >= 0) gains += diff;
    else losses += Math.abs(diff);
  }
  let avgGain = gains / period;
  let avgLoss = losses / period;
  for (let i = period + 1; i < closes.length; i++) {
    const diff = closes[i] - closes[i - 1];
    avgGain = (avgGain * (period - 1) + Math.max(diff, 0)) / period;
    avgLoss = (avgLoss * (period - 1) + Math.max(-diff, 0)) / period;
  }
  if (avgLoss === 0) return 100;
  const rs = avgGain / avgLoss;
  return Math.round(100 - 100 / (1 + rs));
}

export async function fetchRSI(tickers: string[]): Promise<RSIMap> {
  const period1 = new Date(Date.now() - 45 * 24 * 60 * 60 * 1000);
  const period2 = new Date();

  const results = await Promise.allSettled(
    tickers.map((ticker) =>
      yf.chart(ticker, { period1, period2, interval: "1d" })
    )
  );

  return tickers.reduce((acc, ticker, idx) => {
    const result = results[idx];
    if (result.status === "fulfilled" && result.value?.quotes) {
      const closes = result.value.quotes
        .map((q) => q.close)
        .filter((c): c is number => c !== null && c !== undefined);
      acc[ticker] = calcRSI(closes);
    } else {
      acc[ticker] = null;
    }
    return acc;
  }, {} as RSIMap);
}
