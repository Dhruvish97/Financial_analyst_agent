"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ALL_PORTFOLIOS } from "@/constants/all-portfolios";
import { CRYPTO_PORTFOLIO } from "@/constants/crypto-data";
import { useFearGreed } from "@/hooks/useFearGreed";
import { useStockPrices } from "@/hooks/useStockPrices";

const FearGreedGauge = dynamic(
  () => import("@/components/widgets/FearGreedGauge").then((m) => m.FearGreedGauge),
  { ssr: false }
);

const MARKET_TICKERS = ["^GSPC", "^IXIC", "^DJI", "^VIX"];
const MARKET_LABELS: Record<string, string> = {
  "^GSPC": "S&P 500",
  "^IXIC": "NASDAQ",
  "^DJI": "DOW",
  "^VIX": "VIX",
};

export default function DashboardPage() {
  const { fearGreed, loadingFearGreed } = useFearGreed();
  const { prices, loading: loadingMarket } = useStockPrices();

  const totalStockHoldings = ALL_PORTFOLIOS.reduce((s, p) => s + p.holdings.length, 0);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Hero */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-green-400 text-xs font-mono font-semibold uppercase tracking-widest">
            Analyst Research
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          Financial Analyst Agent
        </h1>
        <p className="text-gray-400 max-w-2xl text-base leading-relaxed">
          Four distinct stock portfolios and a crypto portfolio, built with institutional-grade research frameworks.
          Live prices, RSI, valuation metrics and market sentiment — all in one place.
        </p>
      </div>

      {/* Market Indices strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {MARKET_TICKERS.map((ticker) => {
          const lp = prices[ticker];
          const isUp = (lp?.changePercent ?? 0) >= 0;
          return (
            <div key={ticker} className="bg-gray-900 border border-gray-800 rounded-xl p-3">
              <p className="text-gray-500 text-xs font-medium">{MARKET_LABELS[ticker]}</p>
              {loadingMarket || !lp?.price ? (
                <p className="text-gray-700 font-mono text-lg animate-pulse mt-0.5">—</p>
              ) : (
                <>
                  <p className="text-white font-mono text-lg font-bold mt-0.5">
                    {lp.price.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                  </p>
                  <p className={`font-mono text-xs mt-0.5 ${isUp ? "text-green-400" : "text-red-400"}`}>
                    {isUp ? "+" : ""}{lp.changePercent?.toFixed(2)}%
                  </p>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Main grid: Fear & Greed + portfolio cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Fear & Greed — spans 1 col */}
        <FearGreedGauge data={fearGreed} loading={loadingFearGreed} />

        {/* Stocks card */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wider font-medium">Equities</p>
              <h2 className="text-white text-xl font-bold mt-1">4 Stock Portfolios</h2>
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <span className="text-blue-400 text-lg" aria-hidden="true">📈</span>
            </div>
          </div>
          <div className="space-y-2 mb-5">
            {ALL_PORTFOLIOS.map((p) => (
              <div key={p.id} className="flex items-center justify-between bg-gray-800/50 rounded-lg px-3 py-1.5">
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-1.5 py-0.5 rounded font-semibold ${p.riskColor}`}>{p.riskLevel}</span>
                  <span className="text-gray-300 text-xs font-medium">{p.name}</span>
                </div>
                <span className="text-gray-500 text-xs">{p.holdings.length} holdings</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-xs text-gray-600 mb-4">
            <span>{totalStockHoldings} total positions</span>
            <span>Live prices + RSI + P/E</span>
          </div>
          <Link
            href="/stocks"
            className="flex items-center justify-center w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
          >
            View Stock Portfolios →
          </Link>
        </div>

        {/* Crypto card */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wider font-medium">Digital Assets</p>
              <h2 className="text-white text-xl font-bold mt-1">Crypto Portfolio</h2>
            </div>
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
              <span className="text-orange-400 text-lg" aria-hidden="true">₿</span>
            </div>
          </div>
          <div className="space-y-2 mb-5">
            {CRYPTO_PORTFOLIO.slice(0, 5).map((c) => (
              <div key={c.ticker} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                  <span className="text-gray-300 font-mono text-sm">{c.displayTicker}</span>
                </div>
                <span className="text-gray-500 text-sm font-mono">{c.allocation}%</span>
              </div>
            ))}
            {CRYPTO_PORTFOLIO.length > 5 && (
              <p className="text-gray-600 text-xs pl-3.5">+{CRYPTO_PORTFOLIO.length - 5} more</p>
            )}
          </div>
          <Link
            href="/crypto"
            className="flex items-center justify-center w-full py-2.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-sm font-medium transition-colors"
          >
            View Crypto Portfolio →
          </Link>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border border-gray-800 rounded-xl p-5 bg-gray-900/50">
        <p className="text-gray-600 text-xs leading-relaxed">
          <span className="text-gray-400 font-semibold">Disclaimer: </span>
          This is for informational purposes only and does not constitute financial advice.
          Past performance is not indicative of future results. Investing involves risk,
          including possible loss of principal. Always conduct your own research before investing.
        </p>
      </div>
    </div>
  );
}
