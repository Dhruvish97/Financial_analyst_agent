"use client";

import { useState } from "react";
import { useIndiaPrices } from "@/hooks/useIndiaPrices";
import { useRSI } from "@/hooks/useRSI";
import { INDIA_STOCKS, INDIA_SECTORS, INDIA_TICKERS } from "@/constants/india-stocks";
import { StockPriceChart } from "@/components/ui/StockPriceChart";

// ── Formatters ────────────────────────────────────────────────────────────────

function fmtINR(v: number | null): string {
  if (v === null || v === undefined) return "—";
  return `₹${v.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}

function fmtPct(v: number | null): string {
  if (v === null || v === undefined) return "—";
  return `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`;
}

function fmtCap(v: number | null): string {
  if (v === null) return "—";
  // Yahoo returns INR values in rupees
  if (v >= 1e12) return `₹${(v / 1e12).toFixed(2)} LCr`; // lakh crore
  if (v >= 1e9)  return `₹${(v / 1e9).toFixed(0)} KCr`;   // thousand crore
  if (v >= 1e7)  return `₹${(v / 1e7).toFixed(0)} Cr`;
  return `₹${v.toFixed(0)}`;
}

function fmtPE(v: number | null): string {
  if (v === null || v === undefined) return "—";
  return `${v.toFixed(1)}x`;
}

// ── Earnings Badge ────────────────────────────────────────────────────────────

function EarningsBadge({ earningsDate }: { earningsDate: string | null | undefined }) {
  if (!earningsDate) return null;
  const diffDays = Math.round((new Date(earningsDate + "T12:00:00Z").getTime() - Date.now()) / 86400000);
  if (diffDays < 0 || diffDays > 45) return null;
  const cls =
    diffDays <= 7  ? "bg-red-900/60 border-red-700 text-red-300" :
    diffDays <= 21 ? "bg-orange-900/60 border-orange-700 text-orange-300" :
                    "bg-yellow-900/60 border-yellow-800 text-yellow-300";
  return (
    <span className={`text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded border ${cls} block mt-0.5 whitespace-nowrap`}>
      📅 Earnings in {diffDays}d
    </span>
  );
}

// ── RSI Badge ─────────────────────────────────────────────────────────────────

function RSIBadge({ rsi }: { rsi: number | null | undefined }) {
  if (rsi == null) return <span className="text-gray-700 text-xs font-mono">—</span>;
  const label = rsi >= 70 ? "OB" : rsi <= 30 ? "OS" : "OK";
  const cls =
    rsi >= 70 ? "bg-red-900/60 text-red-300 border-red-700" :
    rsi <= 30 ? "bg-green-900/60 text-green-300 border-green-700" :
                "bg-gray-800 text-gray-400 border-gray-700";
  return (
    <span
      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${cls}`}
      title={`RSI: ${rsi} — ${rsi >= 70 ? "Overbought" : rsi <= 30 ? "Oversold" : "Neutral"}`}
    >
      {rsi} {label}
    </span>
  );
}

// ── 52-week range bar ─────────────────────────────────────────────────────────

function WeekBar({ low, high, price }: { low: number | null; high: number | null; price: number | null }) {
  if (!low || !high || !price) return <span className="text-gray-700 text-xs">—</span>;
  const pct = Math.min(100, Math.max(0, ((price - low) / (high - low)) * 100));
  return (
    <div className="flex items-center gap-1 min-w-0">
      <span className="text-gray-700 text-[9px] font-mono shrink-0">{low.toFixed(0)}</span>
      <div className="relative flex-1 bg-gray-800 rounded-full h-1.5 min-w-12">
        <div className="absolute top-0 left-0 h-1.5 rounded-full bg-orange-500" style={{ width: `${pct}%` }} />
        <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white border border-gray-900"
          style={{ left: `calc(${pct}% - 4px)` }} />
      </div>
      <span className="text-gray-700 text-[9px] font-mono shrink-0">{high.toFixed(0)}</span>
    </div>
  );
}

// ── Risk badge ────────────────────────────────────────────────────────────────

const RISK_STYLE: Record<string, string> = {
  Low:    "text-green-400 border-green-800 bg-green-900/20",
  Medium: "text-yellow-400 border-yellow-800 bg-yellow-900/20",
  High:   "text-red-400 border-red-800 bg-red-900/20",
};

// ── IST market hours helper ───────────────────────────────────────────────────

function MarketStatus() {
  const now = new Date();
  // NSE open: 09:15 IST, close: 15:30 IST — IST = UTC+5:30
  const istOffset = 5.5 * 60;
  const utcMin = now.getUTCHours() * 60 + now.getUTCMinutes();
  const istMin = (utcMin + istOffset) % (24 * 60);
  const day = (now.getUTCDay() + (utcMin + istOffset >= 24 * 60 ? 1 : 0)) % 7;
  const isWeekday = day >= 1 && day <= 5;
  const isOpen = isWeekday && istMin >= 555 && istMin < 930; // 09:15–15:30

  return (
    <div className="flex items-center gap-1.5">
      <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? "bg-green-500 motion-safe:animate-ping" : "bg-gray-600"}`} />
      <span className={`text-xs font-mono ${isOpen ? "text-green-400" : "text-gray-500"}`}>
        NSE {isOpen ? "OPEN" : "CLOSED"} · IST
      </span>
    </div>
  );
}

// ── Sector Card ───────────────────────────────────────────────────────────────

interface SectorCardProps {
  sector: typeof INDIA_SECTORS[0];
  active: boolean;
  onClick: () => void;
}

function SectorCard({ sector, active, onClick }: SectorCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        text-left w-full rounded-xl border bg-gradient-to-br ${sector.gradient}
        ${active ? "border-white/30 ring-1 ring-white/20" : sector.borderColor}
        p-4 transition-all duration-200 hover:border-white/20 hover:scale-[1.01]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30
      `}
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-2xl" aria-hidden="true">{sector.icon}</span>
        <span className={`text-[10px] font-semibold uppercase tracking-wider ${sector.textColor}`}>
          {sector.cagr}
        </span>
      </div>
      <h3 className="text-white font-bold text-sm leading-tight mb-1">{sector.name}</h3>
      <p className="text-gray-500 text-[10px] mb-2">Market: {sector.marketSize}</p>
      <div className="flex flex-wrap gap-1">
        {sector.keyStocks.map((s) => (
          <span key={s} className="text-[10px] font-mono bg-black/30 text-gray-400 px-1.5 py-0.5 rounded border border-white/5">
            {s}
          </span>
        ))}
      </div>
    </button>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function IndiaPage() {
  const { prices, loading, lastUpdated, error, refetch } = useIndiaPrices();
  const { rsi, loadingRSI } = useRSI(INDIA_TICKERS);
  const [activeSector, setActiveSector] = useState<string | null>(null);
  const [expandedStock, setExpandedStock] = useState<string | null>(null);

  const nifty   = prices["^NSEI"];
  const sensex  = prices["^BSESN"];

  const filteredStocks = activeSector
    ? INDIA_STOCKS.filter((s) => s.sectorId === activeSector)
    : INDIA_STOCKS;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 animate-fade-in-up relative">
          {/* Ambient glow */}
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl" aria-hidden="true">🇮🇳</span>
              <span className="w-5 h-px bg-gradient-to-r from-orange-400 to-orange-600" />
              <span className="text-orange-400 text-xs font-mono font-semibold uppercase tracking-widest">
                NSE · BSE · Indian Equities
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              <span className="text-white">India </span>
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">Market</span>
            </h1>
            <p className="text-gray-400 mt-1 text-sm max-w-xl">
              Top booming sectors and 10 high-conviction stocks for a 2–3 year holding period.
              Researched using Goldman Sachs, Morgan Stanley, Bain &amp; McKinsey frameworks.
            </p>
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            <MarketStatus />
            <div className="flex items-center gap-3 text-xs text-gray-500">
              {error && <span className="text-red-400 bg-red-900/20 border border-red-800 rounded px-2 py-1">{error}</span>}
              {lastUpdated && !error && <span className="text-gray-600">Updated {lastUpdated.toLocaleTimeString()}</span>}
              <button
                onClick={refetch}
                disabled={loading}
                className="bg-gray-800 hover:bg-gray-700 disabled:opacity-40 border border-gray-700 rounded-lg px-3 py-1.5 text-gray-300 transition-colors"
              >
                {loading ? "Loading…" : "Refresh"}
              </button>
            </div>
          </div>
        </div>

        {/* ── Index strip ─────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 animate-fade-in-up-1">
          {[
            { label: "NIFTY 50", lp: nifty },
            { label: "SENSEX", lp: sensex },
          ].map(({ label, lp }) => {
            const loaded = !loading && !!lp?.price;
            const isUp = (lp?.changePercent ?? 0) >= 0;
            return (
            <div key={label} className={`bg-gray-900 border border-gray-800 rounded-xl p-3 border-l-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
              !loaded ? "border-l-gray-700" : isUp ? "border-l-green-500 hover:shadow-green-950/60" : "border-l-red-500 hover:shadow-red-950/60"
            }`}>
              <p className="text-gray-500 text-xs font-medium">{label}</p>
              {loading || !lp?.price ? (
                <p className="text-gray-700 font-mono text-xl animate-pulse mt-0.5">—</p>
              ) : (
                <>
                  <p className="text-white font-mono text-xl font-bold mt-0.5">
                    {lp.price.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                  </p>
                  <p className={`text-xs font-mono mt-0.5 ${(lp.changePercent ?? 0) >= 0 ? "text-green-400" : "text-red-400"}`}>
                    {fmtPct(lp.changePercent ?? null)}
                  </p>
                </>
              )}
            </div>
          ); })}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-3 col-span-2 sm:col-span-2">
            <p className="text-gray-500 text-xs font-medium mb-2">Research Frameworks Applied</p>
            <div className="flex flex-wrap gap-1.5">
              {["Goldman Sachs Screener", "Morgan Stanley DCF", "Bain Competitive Analysis", "McKinsey Macro Report", "Bridgewater Risk"].map((p) => (
                <span key={p} className="text-[10px] bg-gray-800 border border-gray-700 text-gray-400 px-2 py-0.5 rounded-full">{p}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Sector Cards ─────────────────────────────────────────── */}
        <div className="mb-8 animate-fade-in-up-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Top Booming Sectors</h2>
            {activeSector && (
              <button
                onClick={() => setActiveSector(null)}
                className="text-xs text-gray-500 hover:text-white transition-colors border border-gray-700 rounded-lg px-3 py-1"
              >
                Show all stocks ✕
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
            {INDIA_SECTORS.map((sector) => (
              <SectorCard
                key={sector.id}
                sector={sector}
                active={activeSector === sector.id}
                onClick={() => setActiveSector(activeSector === sector.id ? null : sector.id)}
              />
            ))}
          </div>

          {/* Sector detail panel */}
          {activeSector && (() => {
            const s = INDIA_SECTORS.find((x) => x.id === activeSector)!;
            return (
              <div className={`mt-3 rounded-xl border ${s.borderColor} bg-gradient-to-br ${s.gradient} p-5`}>
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl" aria-hidden="true">{s.icon}</span>
                  <div>
                    <h3 className={`font-bold text-lg ${s.textColor}`}>{s.name}</h3>
                    <p className="text-gray-300 text-sm mt-1 leading-relaxed max-w-3xl">{s.outlook}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Key Growth Drivers</p>
                    <ul className="space-y-1.5">
                      {s.drivers.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-xs text-gray-300">
                          <span className={`mt-0.5 ${s.textColor}`}>▸</span>{d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="bg-black/20 rounded-lg p-3">
                      <p className="text-gray-500 text-xs">Market Size</p>
                      <p className={`text-xl font-bold font-mono ${s.textColor}`}>{s.marketSize}</p>
                    </div>
                    <div className="bg-black/20 rounded-lg p-3">
                      <p className="text-gray-500 text-xs">Growth Rate</p>
                      <p className={`text-xl font-bold font-mono ${s.textColor}`}>{s.cagr}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* ── Top 10 Stocks Table ──────────────────────────────────── */}
        <div className="animate-fade-in-up-3">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-white">
                Top {filteredStocks.length} Stocks — 2–3 Year Horizon
              </h2>
              <p className="text-gray-500 text-xs mt-0.5">
                {activeSector ? `Filtered by sector · ` : ""}Click any row to see thesis, catalysts &amp; price chart
              </p>
            </div>
            <div className="flex gap-2 text-xs text-gray-600">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" />Low Risk</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500" />Medium</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" />High</span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-800">
            <table className="w-full text-sm" aria-label="India top stocks">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-800/40">
                  {["#","Ticker","Name","Sector","Conviction","Price (₹)","24h %","RSI","P/E","52-Wk Range","Mkt Cap","Risk"].map((h) => (
                    <th key={h} scope="col" className="text-left text-[10px] text-gray-500 font-semibold uppercase tracking-wider px-3 py-3 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredStocks.map((stock, i) => {
                  const lp = prices[stock.ticker];
                  const isUp = (lp?.changePercent ?? 0) >= 0;
                  const isExpanded = expandedStock === stock.ticker;

                  return (
                    <>
                      <tr
                        key={stock.ticker}
                        onClick={() => setExpandedStock(isExpanded ? null : stock.ticker)}
                        className={`border-b border-gray-800/50 cursor-pointer transition-colors
                          ${i % 2 === 0 ? "bg-transparent" : "bg-gray-800/10"}
                          ${isExpanded ? "bg-gray-800/40" : "hover:bg-gray-800/30"}`}
                      >
                        {/* # */}
                        <td className="px-3 py-3 text-gray-600 text-xs font-mono">{i + 1}</td>

                        {/* Ticker */}
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: stock.color }} />
                            <div>
                              <span className="font-mono font-bold text-white text-xs">{stock.displayTicker}</span>
                              <EarningsBadge earningsDate={lp?.earningsDate} />
                            </div>
                          </div>
                        </td>

                        {/* Name */}
                        <td className="px-3 py-3 text-gray-300 text-xs max-w-32 truncate">{stock.name}</td>

                        {/* Sector */}
                        <td className="px-3 py-3">
                          <span className="text-[10px] text-gray-400 bg-gray-800 border border-gray-700 px-2 py-0.5 rounded-full whitespace-nowrap">
                            {stock.sector}
                          </span>
                        </td>

                        {/* Conviction */}
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1.5">
                            <div className="w-16 bg-gray-800 rounded-full h-1.5">
                              <div className="h-1.5 rounded-full" style={{ width: `${stock.allocation}%`, backgroundColor: stock.color }} />
                            </div>
                            <span className="text-gray-400 font-mono text-xs">{stock.allocation}%</span>
                          </div>
                        </td>

                        {/* Price */}
                        <td className="px-3 py-3 text-right font-mono text-xs text-white">
                          {loading ? <span className="animate-pulse text-gray-600">…</span> : fmtINR(lp?.price ?? null)}
                        </td>

                        {/* 24h */}
                        <td className="px-3 py-3 text-right font-mono text-xs">
                          {loading ? <span className="animate-pulse text-gray-600">…</span> : (
                            <span className={lp?.changePercent == null ? "text-gray-600" : isUp ? "text-green-400" : "text-red-400"}>
                              {fmtPct(lp?.changePercent ?? null)}
                            </span>
                          )}
                        </td>

                        {/* RSI */}
                        <td className="px-3 py-3">
                          {loadingRSI ? <span className="animate-pulse text-gray-600 text-xs">…</span> : <RSIBadge rsi={rsi[stock.ticker]} />}
                        </td>

                        {/* P/E */}
                        <td className="px-3 py-3 text-right font-mono text-xs text-gray-400">
                          {loading ? <span className="animate-pulse text-gray-600">…</span> : fmtPE(lp?.trailingPE ?? null)}
                        </td>

                        {/* 52-Wk Range */}
                        <td className="px-3 py-3 w-36">
                          {loading ? <span className="animate-pulse text-gray-600 text-xs">…</span> : (
                            <WeekBar low={lp?.fiftyTwoWeekLow ?? null} high={lp?.fiftyTwoWeekHigh ?? null} price={lp?.price ?? null} />
                          )}
                        </td>

                        {/* Mkt Cap */}
                        <td className="px-3 py-3 text-right font-mono text-xs text-gray-500">
                          {loading ? <span className="animate-pulse text-gray-600">…</span> : fmtCap(lp?.marketCap ?? null)}
                        </td>

                        {/* Risk */}
                        <td className="px-3 py-3">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${RISK_STYLE[stock.risk]}`}>
                            {stock.risk}
                          </span>
                        </td>
                      </tr>

                      {/* Expanded thesis row */}
                      {isExpanded && (
                        <tr key={`${stock.ticker}-detail`} className="border-b border-gray-800/50 bg-gray-800/20">
                          <td colSpan={12} className="px-6 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">
                                  2–3 Year Investment Thesis
                                </p>
                                <p className="text-gray-300 text-sm leading-relaxed">{stock.rationale}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">
                                  Key Catalysts to Watch
                                </p>
                                <ul className="space-y-1.5">
                                  {stock.catalysts.map((c) => (
                                    <li key={c} className="flex items-start gap-2 text-xs text-gray-300">
                                      <span className="text-orange-400 mt-0.5 shrink-0">▸</span>{c}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <StockPriceChart
                              ticker={stock.ticker}
                              name={stock.name}
                              color={stock.color}
                              currency="INR"
                            />
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table footer */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-600">
            <div className="flex gap-4">
              <span>OB = Overbought (RSI ≥ 70)</span>
              <span>OS = Oversold (RSI ≤ 30)</span>
              <span>LCr = Lakh Crore</span>
            </div>
            <span>Prices auto-refresh every 60s · All prices in INR (₹)</span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 border border-gray-800 rounded-xl p-5 bg-gray-900/50">
          <p className="text-gray-600 text-xs leading-relaxed">
            <span className="text-gray-400 font-semibold">Disclaimer: </span>
            This is for informational and research purposes only. It does not constitute financial advice or a
            solicitation to buy or sell securities. Indian stock markets carry significant risks including
            currency, regulatory, and market risks. Always consult a SEBI-registered advisor before investing.
            Past performance is not indicative of future results.
          </p>
        </div>
      </div>
    </div>
  );
}
