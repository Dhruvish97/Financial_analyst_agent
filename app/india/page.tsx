"use client";

import { useState, useEffect, Fragment } from "react";
import { useIndiaPrices } from "@/hooks/useIndiaPrices";
import { useRSI } from "@/hooks/useRSI";
import { INDIA_STOCKS, INDIA_SECTORS, INDIA_TICKERS } from "@/constants/india-stocks";
import { StockPriceChart } from "@/components/ui/StockPriceChart";
import { RiskBadge } from "@/components/ui/RiskBadge";

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
  if (v >= 1e12) return `₹${(v / 1e12).toFixed(2)} LCr`;
  if (v >= 1e9)  return `₹${(v / 1e9).toFixed(0)} KCr`;
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
  const style =
    diffDays <= 7  ? { color: "#ff4d6a", background: "rgba(255,77,106,0.1)", border: "1px solid rgba(255,77,106,0.25)" } :
    diffDays <= 21 ? { color: "#fb923c", background: "rgba(251,146,60,0.1)", border: "1px solid rgba(251,146,60,0.25)" } :
                    { color: "#fbbf24", background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.25)" };
  return (
    <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded block mt-0.5 whitespace-nowrap" style={style}>
      📅 {diffDays}d
    </span>
  );
}

// ── RSI Badge ─────────────────────────────────────────────────────────────────

function RSIBadge({ rsi }: { rsi: number | null | undefined }) {
  if (rsi == null) return <span className="font-mono text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>—</span>;
  const label = rsi >= 70 ? "OB" : rsi <= 30 ? "OS" : "OK";
  const style =
    rsi >= 70 ? { color: "#ff4d6a", background: "rgba(255,77,106,0.1)", border: "1px solid rgba(255,77,106,0.2)" } :
    rsi <= 30 ? { color: "#00e5a0", background: "rgba(0,229,160,0.1)", border: "1px solid rgba(0,229,160,0.2)" } :
               { color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" };
  return (
    <span
      className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded"
      style={style}
      title={`RSI: ${rsi} — ${rsi >= 70 ? "Overbought" : rsi <= 30 ? "Oversold" : "Neutral"}`}
    >
      {rsi} {label}
    </span>
  );
}

// ── 52-week range bar ─────────────────────────────────────────────────────────

function WeekBar({ low, high, price }: { low: number | null; high: number | null; price: number | null }) {
  if (!low || !high || !price) return <span className="text-xs" style={{ color: "rgba(255,255,255,0.15)" }}>—</span>;
  const pct = Math.min(100, Math.max(0, ((price - low) / (high - low)) * 100));
  return (
    <div className="flex items-center gap-1 min-w-0">
      <span className="text-[9px] font-mono shrink-0" style={{ color: "rgba(255,255,255,0.2)" }}>{low.toFixed(0)}</span>
      <div className="relative flex-1 rounded-full h-1.5 min-w-12" style={{ background: "rgba(255,255,255,0.08)" }}>
        <div className="absolute top-0 left-0 h-1.5 rounded-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg, #fb923c, #fbbf24)" }} />
        <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white"
          style={{ left: `calc(${pct}% - 4px)`, boxShadow: "0 0 4px rgba(251,146,60,0.8)" }} />
      </div>
      <span className="text-[9px] font-mono shrink-0" style={{ color: "rgba(255,255,255,0.2)" }}>{high.toFixed(0)}</span>
    </div>
  );
}

// ── IST market hours helper ───────────────────────────────────────────────────

function isNseOpen(now: Date): boolean {
  const istOffset = 5.5 * 60;
  const utcMin = now.getUTCHours() * 60 + now.getUTCMinutes();
  const istMin = (utcMin + istOffset) % (24 * 60);
  const day = (now.getUTCDay() + (utcMin + istOffset >= 24 * 60 ? 1 : 0)) % 7;
  const isWeekday = day >= 1 && day <= 5;
  return isWeekday && istMin >= 555 && istMin < 930;
}

function MarketStatus() {
  // Computed after mount only — reading the clock during render makes the
  // server-rendered markup disagree with the client and trips hydration.
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const update = () => setIsOpen(isNseOpen(new Date()));
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  if (isOpen === null) return null;

  return (
    <div className="flex items-center gap-1.5">
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{
          backgroundColor: isOpen ? "#00e5a0" : "rgba(255,255,255,0.2)",
          boxShadow: isOpen ? "0 0 6px #00e5a0" : "none",
        }}
      />
      <span className="text-xs font-mono" style={{ color: isOpen ? "#00e5a0" : "rgba(255,255,255,0.3)" }}>
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
      className="text-left w-full rounded-xl p-4 transition-all duration-200 hover:scale-[1.02] focus-visible:outline-none relative overflow-hidden"
      style={{
        background: active
          ? `linear-gradient(135deg, rgba(251,146,60,0.15), rgba(251,191,36,0.08))`
          : "rgba(255,255,255,0.03)",
        border: active ? "1px solid rgba(251,146,60,0.4)" : "1px solid rgba(255,255,255,0.07)",
        boxShadow: active ? "0 0 20px rgba(251,146,60,0.12)" : "none",
      }}
    >
      {active && (
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, #fb923c, transparent)" }} />
      )}
      <div className="flex items-start justify-between mb-2">
        <span className="text-2xl" aria-hidden="true">{sector.icon}</span>
        <span className="text-[10px] font-mono font-bold" style={{ color: active ? "#fb923c" : "rgba(255,255,255,0.3)" }}>
          {sector.cagr}
        </span>
      </div>
      <h3 className="font-bold text-sm leading-tight mb-1" style={{ color: active ? "#fb923c" : "rgba(255,255,255,0.85)" }}>
        {sector.name}
      </h3>
      <p className="text-[10px] mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>Mkt: {sector.marketSize}</p>
      <div className="flex flex-wrap gap-1">
        {sector.keyStocks.map((s) => (
          <span key={s} className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.06)" }}>
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

  const nifty  = prices["^NSEI"];
  const sensex = prices["^BSESN"];

  const filteredStocks = activeSector
    ? INDIA_STOCKS.filter((s) => s.sectorId === activeSector)
    : INDIA_STOCKS;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 animate-fade-in-up">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-1 h-5 rounded-full" style={{ background: "linear-gradient(180deg, #fb923c, #fbbf24)" }} />
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em]" style={{ color: "#fb923c" }}>
              NSE · BSE · Indian Equities
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
            <span className="text-white">India </span>
            <span className="text-gradient-saffron">Market</span>
          </h1>
          <p className="text-sm max-w-2xl" style={{ color: "rgba(255,255,255,0.4)" }}>
            Top booming sectors and 10 high-conviction stocks for a 2–3 year holding period.
            Researched using Goldman Sachs, Morgan Stanley, Bain &amp; McKinsey frameworks.
          </p>
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          <MarketStatus />
          <div className="flex items-center gap-3">
            {error && (
              <span className="rounded-lg px-3 py-1.5 text-xs" style={{ color: "#ff4d6a", background: "rgba(255,77,106,0.1)", border: "1px solid rgba(255,77,106,0.2)" }}>
                {error}
              </span>
            )}
            {lastUpdated && !error && (
              <span className="font-mono text-[11px]" style={{ color: "rgba(255,255,255,0.25)" }}>
                {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            <button
              onClick={refetch}
              disabled={loading}
              className="rounded-lg px-3 py-1.5 text-xs font-medium transition-all disabled:opacity-40"
              style={{ background: "rgba(251,146,60,0.08)", border: "1px solid rgba(251,146,60,0.22)", color: "#fb923c" }}
            >
              {loading ? "Refreshing…" : "↻ Refresh"}
            </button>
          </div>
        </div>
      </div>

      {/* ── Index strip ─────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 animate-fade-in-up-1">
        {[
          { label: "NIFTY 50", lp: nifty,  color: "#fb923c" },
          { label: "SENSEX",   lp: sensex, color: "#fbbf24" },
        ].map(({ label, lp, color }) => {
          const loaded = !loading && !!lp?.price;
          const isUp = (lp?.changePercent ?? 0) >= 0;
          const changeColor = !loaded ? "rgba(255,255,255,0.2)" : isUp ? "#00e5a0" : "#ff4d6a";
          return (
            <div
              key={label}
              className="rounded-xl p-4 relative overflow-hidden glass glass-hover transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${color}80, transparent)` }} />
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.12em] mb-1.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                {label}
              </p>
              {!loaded ? (
                <p className="font-mono text-2xl font-bold animate-pulse" style={{ color: "rgba(255,255,255,0.15)" }}>—</p>
              ) : (
                <>
                  <p className="text-white font-mono text-2xl font-black tabular-nums leading-none">
                    {lp!.price!.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                  </p>
                  <p className="font-mono text-xs font-bold mt-1.5 tabular-nums" style={{ color: changeColor }}>
                    {isUp ? "▲ " : "▼ "}{fmtPct(lp!.changePercent ?? null)}
                  </p>
                </>
              )}
            </div>
          );
        })}

        <div
          className="rounded-xl p-4 col-span-2 relative overflow-hidden"
          style={{ background: "rgba(251,146,60,0.04)", border: "1px solid rgba(251,146,60,0.12)" }}
        >
          <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, rgba(251,146,60,0.5), transparent)" }} />
          <p className="text-[10px] font-mono font-bold uppercase tracking-[0.12em] mb-2" style={{ color: "rgba(251,146,60,0.6)" }}>
            Research Frameworks
          </p>
          <div className="flex flex-wrap gap-1.5">
            {["Goldman Sachs", "Morgan Stanley", "Bain", "McKinsey", "Bridgewater"].map((p) => (
              <span key={p} className="text-[10px] px-2 py-0.5 rounded-full font-mono" style={{ background: "rgba(251,146,60,0.08)", border: "1px solid rgba(251,146,60,0.15)", color: "rgba(251,146,60,0.7)" }}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Sector Cards ─────────────────────────────────────────── */}
      <div className="mb-8 animate-fade-in-up-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-1 h-4 rounded-full" style={{ background: "linear-gradient(180deg, #fb923c, #fbbf24)" }} />
            <h2 className="text-base font-bold text-white">Top Booming Sectors</h2>
          </div>
          {activeSector && (
            <button
              onClick={() => setActiveSector(null)}
              className="text-xs font-medium rounded-lg px-3 py-1.5 transition-all"
              style={{ color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}
            >
              Show all ✕
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
            <div
              className="mt-3 rounded-xl p-5 relative overflow-hidden"
              style={{ background: "rgba(251,146,60,0.06)", border: "1px solid rgba(251,146,60,0.2)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, #fb923c, transparent)" }} />
              <div className="flex items-start gap-4 mb-4">
                <span className="text-3xl" aria-hidden="true">{s.icon}</span>
                <div>
                  <h3 className="font-bold text-lg mb-1" style={{ color: "#fb923c" }}>{s.name}</h3>
                  <p className="text-sm leading-relaxed max-w-3xl" style={{ color: "rgba(255,255,255,0.6)" }}>{s.outlook}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-bold mb-2" style={{ color: "rgba(251,146,60,0.6)" }}>Growth Drivers</p>
                  <ul className="space-y-1.5">
                    {s.drivers.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                        <span style={{ color: "#fb923c" }} className="mt-0.5 shrink-0">▸</span>{d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="rounded-lg p-3" style={{ background: "rgba(0,0,0,0.2)" }}>
                    <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>Market Size</p>
                    <p className="text-xl font-black font-mono" style={{ color: "#fb923c" }}>{s.marketSize}</p>
                  </div>
                  <div className="rounded-lg p-3" style={{ background: "rgba(0,0,0,0.2)" }}>
                    <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>Growth Rate</p>
                    <p className="text-xl font-black font-mono" style={{ color: "#fbbf24" }}>{s.cagr}</p>
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
            <div className="flex items-center gap-2.5 mb-1">
              <div className="w-1 h-4 rounded-full" style={{ background: "linear-gradient(180deg, #fb923c, #fbbf24)" }} />
              <h2 className="text-base font-bold text-white">
                Top {filteredStocks.length} Stocks — 2–3 Year Horizon
              </h2>
            </div>
            <p className="text-xs pl-3.5" style={{ color: "rgba(255,255,255,0.3)" }}>
              {activeSector ? "Filtered by sector · " : ""}Click any row to see thesis, catalysts &amp; price chart
            </p>
          </div>
          <div className="flex gap-3 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            {[
              { color: "#00e5a0", label: "Low" },
              { color: "#fbbf24", label: "Med" },
              { color: "#ff4d6a", label: "High" },
            ].map(({ color, label }) => (
              <span key={label} className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
          <table className="w-full text-sm" aria-label="India top stocks">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}>
                {["#", "Ticker", "Name", "Sector", "Conviction", "Price (₹)", "24h %", "RSI", "P/E", "52-Wk Range", "Mkt Cap", "Risk"].map((h) => (
                  <th key={h} scope="col" className="text-left text-[10px] font-bold uppercase tracking-wider px-3 py-3 whitespace-nowrap" style={{ color: "rgba(255,255,255,0.3)" }}>
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
                  <Fragment key={stock.ticker}>
                    <tr
                      onClick={() => setExpandedStock(isExpanded ? null : stock.ticker)}
                      className="cursor-pointer transition-all duration-200"
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        background: isExpanded ? "rgba(251,146,60,0.06)" : i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                      }}
                      onMouseEnter={(e) => {
                        if (!isExpanded) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                      }}
                      onMouseLeave={(e) => {
                        if (!isExpanded) (e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)";
                      }}
                    >
                      {/* # */}
                      <td className="px-3 py-3 text-xs font-mono" style={{ color: "rgba(255,255,255,0.2)" }}>{i + 1}</td>

                      {/* Ticker */}
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-8 rounded-full shrink-0" style={{ backgroundColor: stock.color }} />
                          <div>
                            <span className="font-mono font-bold text-xs" style={{ color: stock.color }}>{stock.displayTicker}</span>
                            <EarningsBadge earningsDate={lp?.earningsDate} />
                          </div>
                        </div>
                      </td>

                      {/* Name */}
                      <td className="px-3 py-3 text-xs max-w-32 truncate" style={{ color: "rgba(255,255,255,0.6)" }}>{stock.name}</td>

                      {/* Sector */}
                      <td className="px-3 py-3">
                        <span className="text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap" style={{ color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                          {stock.sector}
                        </span>
                      </td>

                      {/* Conviction */}
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 rounded-full h-1.5" style={{ background: "rgba(255,255,255,0.08)" }}>
                            <div className="h-1.5 rounded-full" style={{ width: `${stock.allocation}%`, backgroundColor: stock.color }} />
                          </div>
                          <span className="font-mono text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{stock.allocation}%</span>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-3 py-3 text-right font-mono text-xs text-white">
                        {loading ? <span className="animate-pulse" style={{ color: "rgba(255,255,255,0.2)" }}>…</span> : fmtINR(lp?.price ?? null)}
                      </td>

                      {/* 24h % */}
                      <td className="px-3 py-3 text-right font-mono text-xs">
                        {loading ? (
                          <span className="animate-pulse" style={{ color: "rgba(255,255,255,0.2)" }}>…</span>
                        ) : (
                          <span style={{ color: lp?.changePercent == null ? "rgba(255,255,255,0.2)" : isUp ? "#00e5a0" : "#ff4d6a" }}>
                            {fmtPct(lp?.changePercent ?? null)}
                          </span>
                        )}
                      </td>

                      {/* RSI */}
                      <td className="px-3 py-3">
                        {loadingRSI ? <span className="animate-pulse text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>…</span> : <RSIBadge rsi={rsi[stock.ticker]} />}
                      </td>

                      {/* P/E */}
                      <td className="px-3 py-3 text-right font-mono text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {loading ? <span className="animate-pulse" style={{ color: "rgba(255,255,255,0.2)" }}>…</span> : fmtPE(lp?.trailingPE ?? null)}
                      </td>

                      {/* 52-Wk Range */}
                      <td className="px-3 py-3 w-36">
                        {loading ? <span className="animate-pulse text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>…</span> : (
                          <WeekBar low={lp?.fiftyTwoWeekLow ?? null} high={lp?.fiftyTwoWeekHigh ?? null} price={lp?.price ?? null} />
                        )}
                      </td>

                      {/* Mkt Cap */}
                      <td className="px-3 py-3 text-right font-mono text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                        {loading ? <span className="animate-pulse" style={{ color: "rgba(255,255,255,0.2)" }}>…</span> : fmtCap(lp?.marketCap ?? null)}
                      </td>

                      {/* Risk */}
                      <td className="px-3 py-3">
                        <RiskBadge risk={stock.risk} />
                      </td>
                    </tr>

                    {/* Expanded thesis row */}
                    {isExpanded && (
                      <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(251,146,60,0.04)" }}>
                        <td colSpan={12} className="px-6 py-5">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
                            <div>
                              <p className="text-[10px] uppercase tracking-wider font-bold mb-2" style={{ color: "rgba(251,146,60,0.7)" }}>
                                2–3 Year Investment Thesis
                              </p>
                              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{stock.rationale}</p>
                            </div>
                            <div>
                              <p className="text-[10px] uppercase tracking-wider font-bold mb-2" style={{ color: "rgba(251,146,60,0.7)" }}>
                                Key Catalysts
                              </p>
                              <ul className="space-y-1.5">
                                {stock.catalysts.map((c) => (
                                  <li key={c} className="flex items-start gap-2 text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                                    <span style={{ color: "#fb923c" }} className="mt-0.5 shrink-0">▸</span>{c}
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
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table footer */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
          <div className="flex gap-4">
            <span>OB = Overbought (RSI ≥ 70)</span>
            <span>OS = Oversold (RSI ≤ 30)</span>
            <span>LCr = Lakh Crore</span>
          </div>
          <span>Prices auto-refresh every 60s · All prices in INR (₹)</span>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 rounded-xl p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.28)" }}>
          <span className="font-semibold" style={{ color: "rgba(255,255,255,0.45)" }}>Disclaimer: </span>
          This is for informational and research purposes only. It does not constitute financial advice or a
          solicitation to buy or sell securities. Indian stock markets carry significant risks including
          currency, regulatory, and market risks. Always consult a SEBI-registered advisor before investing.
          Past performance is not indicative of future results.
        </p>
      </div>
    </div>
  );
}
