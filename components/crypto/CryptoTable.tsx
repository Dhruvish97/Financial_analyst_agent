"use client";
import { useCryptoPrices } from "@/hooks/useCryptoPrices";
import { CRYPTO_PORTFOLIO } from "@/constants/crypto-data";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { ChangeIndicator } from "@/components/ui/ChangeIndicator";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { formatMarketCap } from "@/lib/formatters";

const MAX_ALLOCATION = Math.max(...CRYPTO_PORTFOLIO.map((c) => c.allocation));

export function CryptoTable() {
  const { prices, loading, lastUpdated } = useCryptoPrices();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-500 text-sm">
          Moderately aggressive crypto portfolio · 6 holdings
        </p>
        {lastUpdated && (
          <p className="text-gray-600 text-xs font-mono">
            Updated {lastUpdated.toLocaleTimeString()}
          </p>
        )}
      </div>

      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" aria-label="Crypto portfolio holdings with live prices">
            <thead>
              <tr className="border-b border-gray-800">
                <th scope="col" className="text-left px-4 py-3 text-gray-500 font-medium text-xs uppercase tracking-wider w-8">#</th>
                <th scope="col" className="text-left px-4 py-3 text-gray-500 font-medium text-xs uppercase tracking-wider">Asset</th>
                <th scope="col" className="text-left px-4 py-3 text-gray-500 font-medium text-xs uppercase tracking-wider">Name</th>
                <th scope="col" className="text-right px-4 py-3 text-gray-500 font-medium text-xs uppercase tracking-wider">Alloc.</th>
                <th scope="col" className="text-right px-4 py-3 text-gray-500 font-medium text-xs uppercase tracking-wider">Price</th>
                <th scope="col" className="text-right px-4 py-3 text-gray-500 font-medium text-xs uppercase tracking-wider">24h Change</th>
                <th scope="col" className="text-right px-4 py-3 text-gray-500 font-medium text-xs uppercase tracking-wider hidden lg:table-cell">Mkt Cap</th>
              </tr>
            </thead>
            <tbody>
              {CRYPTO_PORTFOLIO.map((coin, idx) => {
                const liveData = prices[coin.ticker];
                return (
                  <tr
                    key={coin.ticker}
                    className="border-b border-gray-800/50 hover:bg-gray-800/40 transition-colors"
                  >
                    <td className="px-4 py-4 text-gray-600 font-mono text-xs">{idx + 1}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: coin.color }}
                        />
                        <span className="font-mono font-bold text-blue-400">{coin.displayTicker}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <p className="text-white font-medium">{coin.name}</p>
                        <p className="text-gray-500 text-xs mt-0.5 max-w-xs line-clamp-1 hidden sm:block">
                          {coin.rationale}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-white font-mono font-semibold">{coin.allocation}%</span>
                        <div className="w-16 h-1 bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${(coin.allocation / MAX_ALLOCATION) * 100}%`,
                              backgroundColor: coin.color,
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      {loading ? (
                        <LoadingSkeleton className="h-4 w-24 ml-auto" />
                      ) : (
                        <PriceDisplay price={liveData?.price ?? null} isCrypto />
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
        Prices refresh every 60 seconds · Crypto markets trade 24/7
      </p>
    </div>
  );
}
