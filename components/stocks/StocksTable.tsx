"use client";
import { useStockPrices } from "@/hooks/useStockPrices";
import { STOCK_PORTFOLIO } from "@/constants/stocks-data";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { ChangeIndicator } from "@/components/ui/ChangeIndicator";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { formatMarketCap } from "@/lib/formatters";

const MAX_ALLOCATION = Math.max(...STOCK_PORTFOLIO.map((s) => s.allocation));

export function StocksTable() {
  const { prices, loading, lastUpdated } = useStockPrices();

  return (
    <div>
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-500 text-sm">
          Moderately aggressive growth portfolio · 10 holdings
        </p>
        {lastUpdated && (
          <p className="text-gray-600 text-xs font-mono">
            Updated {lastUpdated.toLocaleTimeString()}
          </p>
        )}
      </div>

      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" aria-label="Stock portfolio holdings with live prices">
            <thead>
              <tr className="border-b border-gray-800">
                <th scope="col" className="text-left px-4 py-3 text-gray-500 font-medium text-xs uppercase tracking-wider w-8">#</th>
                <th scope="col" className="text-left px-4 py-3 text-gray-500 font-medium text-xs uppercase tracking-wider">Ticker</th>
                <th scope="col" className="text-left px-4 py-3 text-gray-500 font-medium text-xs uppercase tracking-wider">Company</th>
                <th scope="col" className="text-left px-4 py-3 text-gray-500 font-medium text-xs uppercase tracking-wider hidden md:table-cell">Sector</th>
                <th scope="col" className="text-right px-4 py-3 text-gray-500 font-medium text-xs uppercase tracking-wider">Alloc.</th>
                <th scope="col" className="text-right px-4 py-3 text-gray-500 font-medium text-xs uppercase tracking-wider">Price</th>
                <th scope="col" className="text-right px-4 py-3 text-gray-500 font-medium text-xs uppercase tracking-wider">24h Change</th>
                <th scope="col" className="text-right px-4 py-3 text-gray-500 font-medium text-xs uppercase tracking-wider hidden lg:table-cell">Mkt Cap</th>
              </tr>
            </thead>
            <tbody>
              {STOCK_PORTFOLIO.map((stock, idx) => {
                const liveData = prices[stock.ticker];
                return (
                  <tr
                    key={stock.ticker}
                    className="border-b border-gray-800/50 hover:bg-gray-800/40 transition-colors group"
                  >
                    <td className="px-4 py-4 text-gray-600 font-mono text-xs">{idx + 1}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: stock.color }}
                        />
                        <span className="font-mono font-bold text-blue-400">{stock.ticker}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <p className="text-white font-medium">{stock.company}</p>
                        <p className="text-gray-500 text-xs mt-0.5 max-w-xs line-clamp-1 hidden sm:block">
                          {stock.rationale}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="text-gray-400 text-xs">{stock.sector}</span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-white font-mono font-semibold">{stock.allocation}%</span>
                        <div className="w-16 h-1 bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${(stock.allocation / MAX_ALLOCATION) * 100}%`,
                              backgroundColor: stock.color,
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      {loading ? (
                        <LoadingSkeleton className="h-4 w-20 ml-auto" />
                      ) : (
                        <PriceDisplay price={liveData?.price ?? null} />
                      )}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <ChangeIndicator
                        changePercent={liveData?.changePercent ?? null}
                        loading={loading}
                      />
                    </td>
                    <td className="px-4 py-4 text-right hidden lg:table-cell">
                      <span className="text-gray-400 font-mono text-xs">
                        {loading ? (
                          <LoadingSkeleton className="h-4 w-16 ml-auto" />
                        ) : (
                          formatMarketCap(liveData?.marketCap ?? null)
                        )}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-gray-600 text-xs mt-3 text-center">
        Prices refresh every 60 seconds · Off-hours prices reflect last market session
      </p>
    </div>
  );
}
