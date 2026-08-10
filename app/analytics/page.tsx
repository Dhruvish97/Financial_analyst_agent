"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { ALL_PORTFOLIOS } from "@/constants/all-portfolios";
import { INDIA_STOCKS } from "@/constants/india-stocks";
import { useDrift } from "@/hooks/useDrift";
import {
  aggregateSectorExposure,
  findOverlappingHoldings,
  calcPairwiseOverlap,
  AnalyticsPortfolio,
} from "@/lib/sector-analysis";
import { DriftStatus } from "@/lib/drift";
import { INDIA_MARKET_ENABLED } from "@/constants/feature-flags";

const AllocationDonut = dynamic(
  () => import("@/components/charts/AllocationDonut").then((m) => m.AllocationDonut),
  { ssr: false }
);

const SECTOR_PALETTE = [
  "#00d4ff", "#00e5a0", "#a78bfa", "#fb923c", "#f472b6",
  "#fbbf24", "#38bdf8", "#f87171", "#4ade80", "#818cf8",
];

const DRIFT_PORTFOLIOS = [
  { id: "401k", name: "Retirement Core" },
  { id: "roth-ira", name: "Tax-Free Growth" },
  { id: "house", name: "Medium-Term Savings" },
  { id: "stocks", name: "Aggressive Growth" },
  ...(INDIA_MARKET_ENABLED ? [{ id: "india", name: "India" }] : []),
];

const STATUS_STYLE: Record<DriftStatus, React.CSSProperties> = {
  overweight: { color: "#fbbf24", background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)" },
  underweight: { color: "#38bdf8", background: "rgba(56,189,248,0.08)", border: "1px solid rgba(56,189,248,0.2)" },
  "on-target": { color: "#00e5a0", background: "rgba(0,229,160,0.08)", border: "1px solid rgba(0,229,160,0.2)" },
  unknown: { color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)" },
};

const usAnalyticsPortfolios: AnalyticsPortfolio[] = ALL_PORTFOLIOS.map((p) => ({
  id: p.id,
  name: p.name,
  holdings: p.holdings.map((h) => ({ ticker: h.ticker, name: h.name, sector: h.sector, allocation: h.allocation })),
}));

const indiaAnalyticsPortfolio: AnalyticsPortfolio = {
  id: "india",
  name: "India",
  holdings: INDIA_STOCKS.map((s) => ({ ticker: s.displayTicker, name: s.name, sector: s.sector, allocation: s.allocation })),
};

// The drift API resolves India holdings via INDIA_STOCKS' raw Yahoo ticker (the .NS suffix
// is required to fetch a quote), but every other India view on this site displays the clean
// displayTicker — map back to that for the drift table so tickers read the same everywhere.
const INDIA_DISPLAY_TICKER: Record<string, string> = Object.fromEntries(
  INDIA_STOCKS.map((s) => [s.ticker, s.displayTicker])
);

export default function AnalyticsPage() {
  const [selectedPortfolio, setSelectedPortfolio] = useState("stocks");
  const { drift, loadingDrift } = useDrift(selectedPortfolio);

  const usSectorExposure = useMemo(() => aggregateSectorExposure(usAnalyticsPortfolios), []);
  const indiaSectorExposure = useMemo(() => aggregateSectorExposure([indiaAnalyticsPortfolio]), []);
  const overlap = useMemo(() => findOverlappingHoldings(usAnalyticsPortfolios), []);
  const pairwise = useMemo(() => calcPairwiseOverlap(usAnalyticsPortfolios), []);

  const usDonutData = usSectorExposure.map((s, i) => ({
    name: s.sector,
    value: Math.round(s.avgWeightPct * 10) / 10,
    color: SECTOR_PALETTE[i % SECTOR_PALETTE.length],
  }));
  const indiaDonutData = indiaSectorExposure.map((s, i) => ({
    name: s.sector,
    value: Math.round(s.avgWeightPct * 10) / 10,
    color: SECTOR_PALETTE[i % SECTOR_PALETTE.length],
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-10 animate-fade-in-up">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-1 h-5 rounded-full" style={{ background: "linear-gradient(180deg, #f472b6, #a78bfa)" }} />
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em]" style={{ color: "#f472b6" }}>
            Portfolio Construction Health
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 leading-[1.05] text-white">
          Insights
        </h1>
        <p className="text-base max-w-2xl leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
          Sector exposure, cross-portfolio overlap, and how far recent price moves have drifted
          each portfolio from its target weights.
        </p>
      </div>

      {/* ── Sector Exposure ──────────────────────────────────────── */}
      <section className="mb-10 animate-fade-in-up-1">
        <h2 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
          Sector Exposure
        </h2>
        <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>
          Average weight per sector across the 4 US model portfolios (each portfolio weighted
          equally, not by dollar value — these are illustrative allocations, not real accounts).
        </p>
        <div className={`grid grid-cols-1 ${INDIA_MARKET_ENABLED ? "lg:grid-cols-2" : ""} gap-5`}>
          <AllocationDonut data={usDonutData} title="US Portfolios (avg.)" />
          {INDIA_MARKET_ENABLED && <AllocationDonut data={indiaDonutData} title="India" />}
        </div>
      </section>

      {/* ── Overlap ──────────────────────────────────────────────── */}
      <section className="mb-10 animate-fade-in-up-2">
        <h2 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
          Cross-Portfolio Overlap
        </h2>

        {overlap.length === 0 ? (
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            No ticker is currently held in more than one US portfolio.
          </p>
        ) : (
          <div className="rounded-2xl overflow-hidden glass mb-5">
            <table className="w-full text-left text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <th className="px-4 py-3 text-[10px] uppercase tracking-wider font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>Ticker</th>
                  <th className="px-4 py-3 text-[10px] uppercase tracking-wider font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>Held In</th>
                  <th className="px-4 py-3 text-[10px] uppercase tracking-wider font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>Portfolios</th>
                </tr>
              </thead>
              <tbody>
                {overlap.map((e) => (
                  <tr key={e.ticker} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <td className="px-4 py-3 font-mono font-semibold text-white">{e.ticker}</td>
                    <td className="px-4 py-3 font-mono" style={{ color: "rgba(255,255,255,0.5)" }}>{e.count} portfolios</td>
                    <td className="px-4 py-3 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {e.portfolios.map((p) => `${p.name} (${p.allocation}%)`).join(" · ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {pairwise.map((p) => (
            <div
              key={`${p.a}-${p.b}`}
              className="rounded-xl px-4 py-3 flex items-center justify-between glass"
            >
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{p.a} ∩ {p.b}</span>
              <span className="text-xs font-mono font-semibold text-white">
                {p.sharedCount} shared · {p.jaccardPct.toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Drift ────────────────────────────────────────────────── */}
      <section className="mb-6 animate-fade-in-up-3">
        <h2 className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>
          Target vs Actual Drift
        </h2>
        <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>
          Rolling 90-day price drift from each holding&apos;s target weight — how much recent price
          action alone has skewed the portfolio off its intended mix. Not a since-purchase return.
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {DRIFT_PORTFOLIOS.map((p) => {
            const isActive = selectedPortfolio === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPortfolio(p.id)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={
                  isActive
                    ? { color: "#f472b6", background: "rgba(244,114,182,0.1)", border: "1px solid rgba(244,114,182,0.28)" }
                    : { color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }
                }
              >
                {p.name}
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl overflow-hidden glass">
          <table className="w-full text-left text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <th className="px-4 py-3 text-[10px] uppercase tracking-wider font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>Ticker</th>
                <th className="px-4 py-3 text-[10px] uppercase tracking-wider font-mono text-right" style={{ color: "rgba(255,255,255,0.35)" }}>Target</th>
                <th className="px-4 py-3 text-[10px] uppercase tracking-wider font-mono text-right" style={{ color: "rgba(255,255,255,0.35)" }}>Current (90d)</th>
                <th className="px-4 py-3 text-[10px] uppercase tracking-wider font-mono text-right" style={{ color: "rgba(255,255,255,0.35)" }}>Gap</th>
                <th className="px-4 py-3 text-[10px] uppercase tracking-wider font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {loadingDrift ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-xs animate-pulse" style={{ color: "rgba(255,255,255,0.3)" }}>
                    Loading 90-day price history…
                  </td>
                </tr>
              ) : drift.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                    No drift data available.
                  </td>
                </tr>
              ) : (
                drift.map((d) => (
                  <tr key={d.ticker} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <td className="px-4 py-3 font-mono font-semibold text-white">
                      {INDIA_DISPLAY_TICKER[d.ticker] ?? d.ticker}
                    </td>
                    <td className="px-4 py-3 font-mono text-right" style={{ color: "rgba(255,255,255,0.5)" }}>{d.targetPct.toFixed(1)}%</td>
                    <td className="px-4 py-3 font-mono text-right" style={{ color: "rgba(255,255,255,0.5)" }}>{d.currentPct.toFixed(1)}%</td>
                    <td className="px-4 py-3 font-mono text-right" style={{ color: d.gapPct > 0 ? "#fbbf24" : d.gapPct < 0 ? "#38bdf8" : "rgba(255,255,255,0.4)" }}>
                      {d.gapPct >= 0 ? "+" : ""}{d.gapPct.toFixed(1)}pp
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap" style={STATUS_STYLE[d.status]}>
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
