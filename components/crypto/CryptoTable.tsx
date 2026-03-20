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
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          Moderately aggressive · <span className="font-mono">{CRYPTO_PORTFOLIO.length}</span> holdings
        </p>
        {lastUpdated && (
          <p className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>
            Updated {lastUpdated.toLocaleTimeString()}
          </p>
        )}
      </div>

      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm" aria-label="Crypto portfolio holdings with live prices">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.025)" }}>
                {["#", "Asset", "Name", "Allocation", "Price", "24h", "Mkt Cap"].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-[0.12em] whitespace-nowrap"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CRYPTO_PORTFOLIO.map((coin, idx) => {
                const liveData = prices[coin.ticker];
                return (
                  <tr
                    key={coin.ticker}
                    className="transition-colors"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "";
                    }}
                  >
                    {/* # */}
                    <td className="px-4 py-4 font-mono text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
                      {idx + 1}
                    </td>

                    {/* Asset ticker with left color stripe */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-1 h-8 rounded-full shrink-0"
                          style={{ backgroundColor: coin.color }}
                        />
                        <span
                          className="font-mono font-bold text-sm"
                          style={{ color: coin.color }}
                        >
                          {coin.displayTicker}
                        </span>
                      </div>
                    </td>

                    {/* Name + rationale */}
                    <td className="px-4 py-4">
                      <p className="text-white font-semibold text-sm">{coin.name}</p>
                      <p
                        className="text-xs mt-0.5 max-w-xs line-clamp-1 hidden sm:block"
                        style={{ color: "rgba(255,255,255,0.35)" }}
                      >
                        {coin.rationale}
                      </p>
                    </td>

                    {/* Allocation with vivid gradient bar */}
                    <td className="px-4 py-4">
                      <div className="flex flex-col items-start gap-1.5">
                        <span className="font-mono font-bold text-white text-sm">{coin.allocation}%</span>
                        <div
                          className="h-1.5 rounded-full overflow-hidden"
                          style={{ width: "64px", background: "rgba(255,255,255,0.07)" }}
                        >
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${(coin.allocation / MAX_ALLOCATION) * 100}%`,
                              background: `linear-gradient(90deg, ${coin.color}cc, ${coin.color})`,
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="px-4 py-4 text-right">
                      {loading ? (
                        <LoadingSkeleton className="h-5 w-24 ml-auto" />
                      ) : (
                        <PriceDisplay price={liveData?.price ?? null} isCrypto />
                      )}
                    </td>

                    {/* 24h change */}
                    <td className="px-4 py-4 text-right">
                      <ChangeIndicator changePercent={liveData?.changePercent ?? null} loading={loading} />
                    </td>

                    {/* Mkt cap */}
                    <td className="px-4 py-4 text-right hidden lg:table-cell">
                      <span className="font-mono text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
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

      <p className="text-[11px] mt-3 text-center" style={{ color: "rgba(255,255,255,0.2)" }}>
        Prices refresh every 60 seconds · Crypto markets trade 24/7
      </p>
    </div>
  );
}
