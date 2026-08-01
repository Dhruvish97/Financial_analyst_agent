"use client";

import { useEffect, useRef, useMemo, useState } from "react";
import { PortfolioDefinition, PriceMap, RSIMap } from "@/types/portfolio";
// eslint-disable-next-line @typescript-eslint/no-deprecated
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { useRSI } from "@/hooks/useRSI";
import { StockPriceChart } from "@/components/ui/StockPriceChart";
import { RiskBadge } from "@/components/ui/RiskBadge";

// ── Formatters ────────────────────────────────────────────────────────────────

function fmt(v: number | null): string {
  if (v === null || v === undefined) return "—";
  return `$${v.toFixed(2)}`;
}
function fmtPct(v: number | null): string {
  if (v === null || v === undefined) return "—";
  return `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`;
}
function fmtPE(v: number | null): string {
  if (v === null || v === undefined) return "—";
  return v.toFixed(1) + "x";
}
function fmtCap(v: number | null): string {
  if (v === null) return "—";
  if (v >= 1e12) return `$${(v / 1e12).toFixed(2)}T`;
  if (v >= 1e9)  return `$${(v / 1e9).toFixed(2)}B`;
  if (v >= 1e6)  return `$${(v / 1e6).toFixed(2)}M`;
  return `$${v.toFixed(0)}`;
}

const TYPE_BADGE: Record<string, string> = {
  etf:   "bg-blue-900/60 text-blue-300 border-blue-700",
  stock: "bg-purple-900/60 text-purple-300 border-purple-700",
  bond:  "bg-amber-900/60 text-amber-300 border-amber-700",
};

// ── RSI badge ────────────────────────────────────────────────────────────────

function RSIBadge({ rsi }: { rsi: number | null | undefined }) {
  if (rsi === null || rsi === undefined) return <span className="text-gray-600 text-xs">—</span>;
  const label = rsi >= 70 ? "OB" : rsi <= 30 ? "OS" : "OK";
  const cls =
    rsi >= 70 ? "bg-red-900/60 text-red-300 border-red-700" :
    rsi <= 30 ? "bg-green-900/60 text-green-300 border-green-700" :
                "bg-gray-800 text-gray-400 border-gray-700";
  return (
    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${cls}`}
      title={`RSI: ${rsi} — ${rsi >= 70 ? "Overbought" : rsi <= 30 ? "Oversold" : "Neutral"}`}>
      {rsi} {label}
    </span>
  );
}

// ── Earnings badge ────────────────────────────────────────────────────────────

function EarningsBadge({ earningsDate }: { earningsDate: string | null | undefined }) {
  if (!earningsDate) return null;
  const diffDays = Math.ceil(
    (new Date(earningsDate + "T12:00:00Z").getTime() - Date.now()) / 86_400_000
  );
  if (diffDays < 0 || diffDays > 45) return null;

  const cls =
    diffDays <= 7  ? "bg-red-900/60 text-red-300 border-red-700" :
    diffDays <= 21 ? "bg-orange-900/60 text-orange-300 border-orange-700" :
                     "bg-yellow-900/60 text-yellow-300 border-yellow-700";
  const label =
    diffDays === 0 ? "Earnings today" :
    diffDays === 1 ? "Earnings tomorrow" :
                     `Earnings in ${diffDays}d`;

  return (
    <span
      className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${cls} whitespace-nowrap`}
      title={`Next earnings: ${earningsDate}`}
    >
      📅 {label}
    </span>
  );
}

// ── 52-week range bar ─────────────────────────────────────────────────────────

function WeekRangeBar({ low, high, price }: { low: number | null; high: number | null; price: number | null }) {
  if (!low || !high || !price) return <span className="text-gray-700 text-xs">—</span>;
  const pct = Math.min(100, Math.max(0, ((price - low) / (high - low)) * 100));
  return (
    <div className="flex items-center gap-1.5 min-w-0">
      <span className="text-gray-600 text-[10px] font-mono shrink-0">{low.toFixed(0)}</span>
      <div className="relative flex-1 bg-gray-800 rounded-full h-1.5 min-w-16">
        <div className="absolute top-0 left-0 h-1.5 rounded-full bg-blue-500" style={{ width: `${pct}%` }} />
        <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white border border-gray-900"
          style={{ left: `calc(${pct}% - 4px)` }} />
      </div>
      <span className="text-gray-600 text-[10px] font-mono shrink-0">{high.toFixed(0)}</span>
    </div>
  );
}

// ── Donut tooltip ─────────────────────────────────────────────────────────────

interface TooltipPayload { name: string; value: number; payload: { color: string; rationale: string } }
interface CustomTooltipProps { active?: boolean; payload?: TooltipPayload[] }

function ChartTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 text-xs max-w-56 shadow-xl">
      <p className="font-bold text-white mb-1">{item.name} — {item.value}%</p>
      <p className="text-gray-400 leading-snug">{item.payload.rationale}</p>
    </div>
  );
}

// ── Portfolio health summary ──────────────────────────────────────────────────

function generateHealthSummary(
  portfolio: PortfolioDefinition,
  prices: PriceMap,
  rsi: RSIMap
): { bullets: string[]; tone: "positive" | "neutral" | "warning" } {
  const bullets: string[] = [];
  let warnings = 0;

  // Sector concentration
  const sectorWeights: Record<string, number> = {};
  for (const h of portfolio.holdings) {
    sectorWeights[h.sector] = (sectorWeights[h.sector] ?? 0) + h.allocation;
  }
  const topSector = Object.entries(sectorWeights).sort((a, b) => b[1] - a[1])[0];
  if (topSector[1] > 45) {
    bullets.push(`High concentration in ${topSector[0]} (${topSector[1]}%) — consider if this aligns with your risk mandate.`);
    warnings++;
  } else {
    bullets.push(`Well-diversified across sectors — largest sector is ${topSector[0]} at ${topSector[1]}%.`);
  }

  // Overbought/oversold signals
  const overbought = portfolio.holdings.filter((h) => (rsi[h.ticker] ?? 50) >= 70);
  const oversold   = portfolio.holdings.filter((h) => (rsi[h.ticker] ?? 50) <= 30);
  if (overbought.length > 0) {
    bullets.push(`${overbought.map((h) => h.ticker).join(", ")} ${overbought.length === 1 ? "is" : "are"} overbought (RSI ≥ 70) — elevated near-term pullback risk.`);
    warnings++;
  }
  if (oversold.length > 0) {
    bullets.push(`${oversold.map((h) => h.ticker).join(", ")} ${oversold.length === 1 ? "is" : "are"} oversold (RSI ≤ 30) — potential value entry opportunity.`);
  }

  // Upcoming earnings warning
  const earningsImminent = portfolio.holdings.filter((h) => {
    const ed = prices[h.ticker]?.earningsDate;
    if (!ed) return false;
    const days = Math.ceil((new Date(ed + "T12:00:00Z").getTime() - Date.now()) / 86_400_000);
    return days >= 0 && days <= 14;
  });
  if (earningsImminent.length > 0) {
    bullets.push(`${earningsImminent.map((h) => h.ticker).join(", ")} ${earningsImminent.length === 1 ? "reports" : "report"} earnings within 14 days — expect elevated volatility.`);
  }

  // Daily performance
  let weightedChange = 0;
  let priceCount = 0;
  for (const h of portfolio.holdings) {
    const cp = prices[h.ticker]?.changePercent;
    if (cp !== null && cp !== undefined) { weightedChange += (h.allocation / 100) * cp; priceCount++; }
  }
  if (priceCount > 0) {
    const sign = weightedChange >= 0 ? "+" : "";
    bullets.push(`Portfolio is ${weightedChange >= 0 ? "up" : "down"} ${sign}${weightedChange.toFixed(2)}% today on a weighted basis.`);
    if (weightedChange < -2) warnings++;
  }

  // Beta warning for conservative portfolios
  const avgBeta = portfolio.holdings.reduce((s, h) => {
    const b = prices[h.ticker]?.beta ?? 1;
    return s + (h.allocation / 100) * b;
  }, 0);
  if (avgBeta > 1.2 && portfolio.riskLevel === "Mod. Conservative") {
    bullets.push(`Portfolio beta of ~${avgBeta.toFixed(2)} is high for a conservative mandate — consider adding defensive holdings.`);
    warnings++;
  } else if (avgBeta < 0.8 && portfolio.riskLevel === "Aggressive") {
    bullets.push(`Portfolio beta of ~${avgBeta.toFixed(2)} is low for an aggressive mandate — you may be underexposed to market upside.`);
  }

  const tone = warnings >= 2 ? "warning" : warnings === 1 ? "neutral" : "positive";
  return { bullets, tone };
}

// ── Sector bar chart ──────────────────────────────────────────────────────────

function SectorChart({ portfolio }: { portfolio: PortfolioDefinition }) {
  const sectorData = useMemo(() => {
    const map: Record<string, number> = {};
    for (const h of portfolio.holdings) {
      map[h.sector] = (map[h.sector] ?? 0) + h.allocation;
    }
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .map(([sector, value]) => ({ sector: sector.length > 14 ? sector.slice(0, 13) + "…" : sector, value }));
  }, [portfolio]);

  return (
    <div className="h-44">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={sectorData} layout="vertical" margin={{ left: 0, right: 20, top: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" horizontal={false} />
          <XAxis type="number" tick={{ fill: "#6b7280", fontSize: 10 }} tickFormatter={(v) => `${v}%`} />
          <YAxis type="category" dataKey="sector" tick={{ fill: "#9ca3af", fontSize: 10 }} width={90} />
          <Bar dataKey="value" fill="#3b82f6" radius={[0, 3, 3, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ── Main Modal ────────────────────────────────────────────────────────────────

interface Props {
  portfolio: PortfolioDefinition;
  prices: PriceMap;
  loadingPrices: boolean;
  onClose: () => void;
}

export function PortfolioDetailModal({ portfolio, prices, loadingPrices, onClose }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const tickers = useMemo(() => portfolio.holdings.map((h) => h.ticker), [portfolio]);
  const { rsi, loadingRSI } = useRSI(tickers);
  const [chartTicker, setChartTicker] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => { modalRef.current?.focus(); }, []);

  const chartData = portfolio.holdings.map((h) => ({
    name: h.ticker, value: h.allocation, color: h.color, rationale: h.rationale,
  }));

  const health = useMemo(
    () => generateHealthSummary(portfolio, prices, rsi),
    [portfolio, prices, rsi]
  );

  const toneStyle = {
    positive: "border-green-800 bg-green-900/10",
    neutral:  "border-yellow-800 bg-yellow-900/10",
    warning:  "border-red-800 bg-red-900/10",
  }[health.tone];
  const toneIcon = { positive: "✅", neutral: "⚠️", warning: "🔴" }[health.tone];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={`${portfolio.name} portfolio details`}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-gray-900 border border-gray-700 shadow-2xl focus-visible:outline-none"
      >
        {/* Header */}
        <div className={`bg-gradient-to-br ${portfolio.cardGradient} ${portfolio.accentColor} p-6 rounded-t-2xl`}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{portfolio.accountType}</p>
              <h2 className="text-3xl font-bold text-white">{portfolio.name}</h2>
              <p className="text-sm text-gray-300 mt-2 max-w-xl leading-relaxed">{portfolio.description}</p>
            </div>
            <div className="flex flex-col items-end gap-2 ml-4 shrink-0">
              <span className={`text-sm font-semibold px-3 py-1 rounded-full border ${portfolio.riskColor} border-current/30 bg-black/20`}>
                {portfolio.riskLevel}
              </span>
              <span className="text-xs text-gray-400">{portfolio.timeHorizon}</span>
              <button onClick={onClose} className="mt-2 text-gray-400 hover:text-white transition-colors text-2xl leading-none" aria-label="Close modal">✕</button>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-xs text-gray-500 mr-1 self-center">Research:</span>
            {portfolio.promptsUsed.map((p) => (
              <span key={p} className="text-xs bg-black/30 border border-white/10 text-gray-300 px-2 py-0.5 rounded-full">{p}</span>
            ))}
          </div>
        </div>

        <div className="p-6 space-y-6">

          {/* ── Health Summary ─────────────────────────────────────── */}
          <div className={`rounded-xl border p-4 ${toneStyle}`}>
            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">
              {toneIcon} Portfolio Health Analysis
            </p>
            <ul className="space-y-1.5">
              {health.bullets.map((b, i) => (
                <li key={i} className="text-sm text-gray-300 flex gap-2">
                  <span className="text-gray-600 shrink-0 mt-0.5">•</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Charts row: Allocation donut + Sector bars ─────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Allocation</h3>
              <div className="h-56" aria-hidden="true">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={chartData} cx="50%" cy="50%" innerRadius={52} outerRadius={90} dataKey="value" stroke="none">
                      {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
                      {chartData.map((entry) => (<Cell key={entry.name} fill={entry.color} />))}
                    </Pie>
                    <Tooltip content={<ChartTooltip />} />
                    <Legend formatter={(v) => <span className="text-gray-300 text-xs">{v}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Sector Concentration</h3>
              <SectorChart portfolio={portfolio} />
            </div>
          </div>

          {/* ── Holdings table ────────────────────────────────────────── */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Holdings — Live Data
              </h3>
              <p className="text-[10px] text-gray-600">Click any row to view price chart</p>
            </div>
            <div className="overflow-x-auto rounded-xl border border-gray-800">
              <table className="w-full text-sm" aria-label={`${portfolio.name} holdings`}>
                <thead>
                  <tr className="border-b border-gray-800 bg-gray-800/40">
                    {["Ticker","Name","Type","Alloc.","Price","24h %","RSI","P/E","52-Week Range","Mkt Cap","Risk"].map((h) => (
                      <th key={h} scope="col" className="text-left text-[10px] text-gray-500 font-semibold uppercase tracking-wider px-3 py-2.5 whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {portfolio.holdings.map((h, i) => {
                    const lp = prices[h.ticker];
                    const isUp = (lp?.changePercent ?? 0) >= 0;
                    const isChartOpen = chartTicker === h.ticker;

                    return (
                      <>
                        <tr
                          key={h.ticker}
                          onClick={() => setChartTicker(isChartOpen ? null : h.ticker)}
                          className={`border-b border-gray-800/50 cursor-pointer transition-colors ${
                            i % 2 === 0 ? "" : "bg-gray-800/10"
                          } ${isChartOpen ? "bg-gray-800/40" : "hover:bg-gray-800/30"}`}
                        >
                          {/* Ticker */}
                          <td className="px-3 py-2.5">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: h.color }} />
                                <span className="font-mono font-bold text-white text-xs">{h.ticker}</span>
                                <span className="text-gray-600 text-[10px]">{isChartOpen ? "▲" : "▼"}</span>
                              </div>
                              <EarningsBadge earningsDate={lp?.earningsDate} />
                            </div>
                          </td>
                          {/* Name */}
                          <td className="px-3 py-2.5 text-gray-300 text-xs max-w-32 truncate">{h.name}</td>
                          {/* Type */}
                          <td className="px-3 py-2.5">
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${TYPE_BADGE[h.type] ?? "text-gray-400"}`}>
                              {h.type.toUpperCase()}
                            </span>
                          </td>
                          {/* Alloc */}
                          <td className="px-3 py-2.5 text-right font-mono text-xs text-gray-300">
                            <div className="flex items-center justify-end gap-1.5">
                              <div className="w-12 bg-gray-800 rounded-full h-1.5 hidden sm:block">
                                <div className="h-1.5 rounded-full" style={{ width: `${h.allocation}%`, backgroundColor: h.color }} />
                              </div>
                              {h.allocation}%
                            </div>
                          </td>
                          {/* Price */}
                          <td className="px-3 py-2.5 text-right font-mono text-xs text-white">
                            {loadingPrices ? <span className="animate-pulse text-gray-600">…</span> : fmt(lp?.price ?? null)}
                          </td>
                          {/* 24h */}
                          <td className="px-3 py-2.5 text-right font-mono text-xs">
                            {loadingPrices ? <span className="animate-pulse text-gray-600">…</span> : (
                              <span className={lp?.changePercent == null ? "text-gray-600" : isUp ? "text-green-400" : "text-red-400"}>
                                {fmtPct(lp?.changePercent ?? null)}
                              </span>
                            )}
                          </td>
                          {/* RSI */}
                          <td className="px-3 py-2.5">
                            {loadingRSI ? <span className="animate-pulse text-gray-600 text-xs">…</span> : (
                              <RSIBadge rsi={rsi[h.ticker]} />
                            )}
                          </td>
                          {/* P/E */}
                          <td className="px-3 py-2.5 text-right font-mono text-xs text-gray-400">
                            {loadingPrices ? <span className="animate-pulse text-gray-600">…</span> : fmtPE(lp?.trailingPE ?? null)}
                          </td>
                          {/* 52-week range */}
                          <td className="px-3 py-2.5 min-w-36">
                            {loadingPrices ? <span className="animate-pulse text-gray-600 text-xs">…</span> : (
                              <WeekRangeBar
                                low={lp?.fiftyTwoWeekLow ?? null}
                                high={lp?.fiftyTwoWeekHigh ?? null}
                                price={lp?.price ?? null}
                              />
                            )}
                          </td>
                          {/* Mkt Cap */}
                          <td className="px-3 py-2.5 text-right font-mono text-xs text-gray-500">
                            {loadingPrices ? <span className="animate-pulse text-gray-600">…</span> : fmtCap(lp?.marketCap ?? null)}
                          </td>
                          {/* Risk */}
                          <td className="px-3 py-2.5">
                            <RiskBadge risk={h.risk} />
                          </td>
                        </tr>

                        {/* ── Expanded price chart row ── */}
                        {isChartOpen && (
                          <tr key={`${h.ticker}-chart`} className="border-b border-gray-800/50 bg-gray-900/40">
                            <td colSpan={11} className="px-4 py-3">
                              <StockPriceChart
                                ticker={h.ticker}
                                name={h.name}
                                color={h.color}
                                currency="USD"
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
          </div>
        </div>
      </div>
    </div>
  );
}
