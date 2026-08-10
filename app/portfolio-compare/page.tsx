"use client";

import { useState, useRef, useCallback } from "react";
import {
  PORTFOLIO_TARGETS,
  PortfolioStyle,
  PortfolioTarget,
  Market,
} from "@/constants/portfolio-targets";
import {
  DetectedHolding,
  PortfolioAnalysis,
  analysePortfolio,
} from "@/lib/portfolio-analysis";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { INDIA_MARKET_ENABLED } from "@/constants/feature-flags";

// ── Step indicator ─────────────────────────────────────────────────────────────

function StepDot({ n, active, done }: { n: number; active: boolean; done: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
        style={
          done
            ? { background: "#00e5a0", color: "#07060f", border: "2px solid #00e5a0", boxShadow: "0 0 12px rgba(0,229,160,0.4)" }
            : active
            ? { background: "transparent", color: "#a78bfa", border: "2px solid #a78bfa", boxShadow: "0 0 12px rgba(167,139,250,0.3)" }
            : { background: "transparent", color: "rgba(255,255,255,0.2)", border: "2px solid rgba(255,255,255,0.1)" }
        }
      >
        {done ? "✓" : n}
      </div>
      <span
        className="text-xs font-medium hidden sm:block"
        style={{ color: done ? "#00e5a0" : active ? "#a78bfa" : "rgba(255,255,255,0.25)" }}
      >
        {n === 1 ? "Style" : n === 2 ? "Upload" : "Analysis"}
      </span>
    </div>
  );
}

// ── Step 1: Portfolio style selector ─────────────────────────────────────────

const MARKET_STYLES: Record<Market, PortfolioStyle[]> = {
  us: ["conservative", "aggressive"],
  india: ["india-conservative", "india-aggressive"],
};

function StyleSelector({
  selected,
  onSelect,
  market,
  onMarketChange,
}: {
  selected: PortfolioStyle | null;
  onSelect: (s: PortfolioStyle) => void;
  market: Market;
  onMarketChange: (m: Market) => void;
}) {
  const styles = MARKET_STYLES[market];
  return (
    <div className="space-y-5">
      {/* Market toggle — only worth showing when there's more than one market to pick from */}
      {INDIA_MARKET_ENABLED && (
        <div className="flex items-center gap-1 p-1 rounded-xl w-fit" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          {(["us", "india"] as Market[]).map((m) => (
            <button
              key={m}
              onClick={() => onMarketChange(m)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
              style={
                market === m
                  ? { background: "rgba(167,139,250,0.15)", color: "#a78bfa", border: "1px solid rgba(167,139,250,0.3)" }
                  : { color: "rgba(255,255,255,0.35)", border: "1px solid transparent" }
              }
            >
              {m === "us" ? "🇺🇸 US Market" : "🇮🇳 India Market"}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {styles.map((style) => {
          const t = PORTFOLIO_TARGETS[style];
          const isSelected = selected === style;
          const isConservative = style.includes("conservative");
          const accent = isConservative ? "#00e5a0" : "#fb923c";

          return (
            <button
              key={style}
              onClick={() => onSelect(style)}
              className="text-left rounded-2xl p-6 transition-all duration-200 hover:scale-[1.01] focus-visible:outline-none relative overflow-hidden"
              style={{
                background: isSelected
                  ? `rgba(${isConservative ? "0,229,160" : "251,146,60"},0.08)`
                  : "rgba(255,255,255,0.03)",
                border: isSelected
                  ? `1px solid ${accent}50`
                  : "1px solid rgba(255,255,255,0.08)",
                boxShadow: isSelected ? `0 0 24px ${accent}12` : "none",
              }}
            >
              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
              )}
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">{t.icon}</span>
                {isSelected && (
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ color: accent, background: `${accent}18`, border: `1px solid ${accent}35` }}
                  >
                    Selected ✓
                  </span>
                )}
              </div>
              <h3
                className="text-xl font-bold mb-1"
                style={{ color: isSelected ? accent : "rgba(255,255,255,0.9)" }}
              >
                {t.label}
              </h3>
              <p className="text-sm font-medium mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>{t.tagline}</p>
              <p className="text-xs leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>{t.description}</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: `Risk: ${t.riskLevel}` },
                  { label: `Horizon: ${t.timeHorizon}` },
                  { label: t.currency === "INR" ? "₹ INR" : "$ USD" },
                ].map(({ label }) => (
                  <span
                    key={label}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}
                  >
                    {label}
                  </span>
                ))}
              </div>
              <div className="mt-4 space-y-1.5">
                {t.sectors.slice(0, 4).map((s) => (
                  <div key={s.sector} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                    <span className="text-[10px] flex-1 truncate" style={{ color: "rgba(255,255,255,0.4)" }}>{s.sector}</span>
                    <span className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.5)" }}>{s.targetPct}%</span>
                  </div>
                ))}
                {t.sectors.length > 4 && (
                  <p className="text-[10px] pl-3.5" style={{ color: "rgba(255,255,255,0.2)" }}>+ {t.sectors.length - 4} more sectors</p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Step 2: Image upload ───────────────────────────────────────────────────────

function ImageUploader({
  onHoldings,
  style,
}: {
  onHoldings: (h: DetectedHolding[]) => void;
  style: PortfolioStyle;
}) {
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file (PNG, JPG, WebP).");
        return;
      }
      setError(null);
      setFileName(file.name);
      // Release the previous blob URL before replacing it, or each re-upload leaks.
      setPreview((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(file);
      });
      setLoading(true);

      const fd = new FormData();
      fd.append("image", file);

      try {
        const res = await fetch("/api/analyze-portfolio", { method: "POST", body: fd });
        const json = await res.json();
        if (!res.ok) {
          setError(json.error ?? "Analysis failed. Try a clearer screenshot.");
          setLoading(false);
          return;
        }
        onHoldings(json.holdings);
      } catch {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [onHoldings]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  return (
    <div className="space-y-5">
      {/* Drop zone */}
      <div
        onDrop={onDrop}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onClick={() => fileRef.current?.click()}
        className="relative rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 p-10 text-center"
        style={{
          borderColor: dragging ? "#a78bfa" : "rgba(255,255,255,0.1)",
          background: dragging ? "rgba(167,139,250,0.06)" : "rgba(255,255,255,0.02)",
        }}
      >
        {dragging && (
          <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl" style={{ background: "linear-gradient(90deg, transparent, #a78bfa, transparent)" }} />
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) processFile(f); }}
        />
        {loading ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-2 rounded-full animate-spin" style={{ borderColor: "rgba(167,139,250,0.2)", borderTopColor: "#a78bfa" }} />
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>Analyzing with Claude AI…</p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Extracting tickers, quantities, and prices</p>
          </div>
        ) : preview ? (
          <div className="flex flex-col items-center gap-3">
            <img src={preview} alt="Portfolio preview" className="max-h-40 rounded-lg object-contain" style={{ border: "1px solid rgba(255,255,255,0.1)" }} />
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{fileName} · Click to replace</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: "rgba(167,139,250,0.08)", border: "1px solid rgba(167,139,250,0.2)" }}
            >
              📸
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Drop your portfolio screenshot here</p>
              <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>or click to browse · PNG, JPG, WebP supported</p>
            </div>
            <div className="flex gap-3 mt-2">
              {["Stock list view", "Pie chart view", "Mobile screenshot"].map((t) => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.35)" }}>{t}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="rounded-xl p-4 text-sm" style={{ color: "#ff4d6a", background: "rgba(255,77,106,0.08)", border: "1px solid rgba(255,77,106,0.2)" }}>
          {error}
        </div>
      )}

      <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.2)" }}>
        Your screenshot is sent to Claude AI for analysis and is never stored.
      </p>
    </div>
  );
}

// ── Step 3: Analysis results ───────────────────────────────────────────────────

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 80 ? { ring: "#00e5a0", text: "#00e5a0", bg: "rgba(0,229,160,0.08)" } :
    score >= 60 ? { ring: "#fbbf24", text: "#fbbf24", bg: "rgba(251,191,36,0.08)" } :
                  { ring: "#ff4d6a", text: "#ff4d6a", bg: "rgba(255,77,106,0.08)" };
  return (
    <div
      className="inline-flex flex-col items-center justify-center w-20 h-20 rounded-full"
      style={{ border: `2px solid ${color.ring}`, background: color.bg, boxShadow: `0 0 20px ${color.ring}25` }}
    >
      <span className="text-2xl font-bold font-mono" style={{ color: color.text }}>{score}</span>
      <span className="text-[9px] uppercase tracking-widest" style={{ color: `${color.text}80` }}>/ 100</span>
    </div>
  );
}

function AllocationRow({ alloc, target }: { alloc: import("@/lib/portfolio-analysis").SectorAllocation; target: PortfolioTarget }) {
  const maxPct = Math.max(alloc.currentPct, alloc.targetPct, 5);
  const isOver = alloc.status === "overweight";
  const isUnder = alloc.status === "underweight";

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: alloc.color }} />
          <span className="truncate" style={{ color: "rgba(255,255,255,0.65)" }}>{alloc.sector}</span>
          {isOver && <span className="text-[9px] font-bold uppercase tracking-wide shrink-0" style={{ color: "#ff4d6a" }}>▲ Over</span>}
          {isUnder && alloc.targetPct > 0 && <span className="text-[9px] font-bold uppercase tracking-wide shrink-0" style={{ color: "#fbbf24" }}>▼ Under</span>}
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-3 font-mono text-xs">
          <span style={{ color: "rgba(255,255,255,0.4)" }}>{alloc.currentPct.toFixed(1)}%</span>
          <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
          <span style={{ color: alloc.color }}>{alloc.targetPct}%</span>
        </div>
      </div>
      <div className="relative h-2.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ width: `${(alloc.targetPct / maxPct) * 100}%`, backgroundColor: alloc.color, opacity: 0.2 }}
        />
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ width: `${Math.min(100, (alloc.currentPct / maxPct) * 100)}%`, backgroundColor: alloc.color, opacity: 0.85 }}
        />
      </div>
      <div className="flex justify-between text-[9px]" style={{ color: "rgba(255,255,255,0.2)" }}>
        <span>Yours: {alloc.currentPct.toFixed(1)}%</span>
        <span>Target: {alloc.targetPct}%</span>
      </div>
    </div>
  );
}

function fmtAmount(value: number, currency: "USD" | "INR"): string {
  if (currency === "INR") return `₹${value.toLocaleString("en-IN")}`;
  return `$${value.toLocaleString()}`;
}

function RecommendationCard({ rec, currency }: { rec: import("@/lib/portfolio-analysis").Recommendation; currency: "USD" | "INR" }) {
  const isBuy = rec.action === "BUY";
  const accentColor = isBuy ? "#00e5a0" : "#ff4d6a";
  const priorityBg =
    rec.priority === "high" ? "rgba(255,77,106,0.06)" :
    rec.priority === "medium" ? "rgba(251,191,36,0.06)" :
    "rgba(255,255,255,0.02)";
  const priorityBorder =
    rec.priority === "high" ? "rgba(255,77,106,0.2)" :
    rec.priority === "medium" ? "rgba(251,191,36,0.15)" :
    "rgba(255,255,255,0.07)";

  return (
    <div className="rounded-xl p-4" style={{ background: priorityBg, border: `1px solid ${priorityBorder}` }}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-xs font-bold px-2 py-0.5 rounded"
            style={{ color: accentColor, background: `${accentColor}15`, border: `1px solid ${accentColor}30` }}
          >
            {rec.action}
          </span>
          <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.8)" }}>{rec.sector}</span>
          {rec.priority === "high" && (
            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ color: "#ff4d6a", background: "rgba(255,77,106,0.1)", border: "1px solid rgba(255,77,106,0.2)" }}>
              High Priority
            </span>
          )}
        </div>
        <span className="font-mono text-sm font-bold shrink-0" style={{ color: accentColor }}>
          {isBuy ? "+" : "-"}{fmtAmount(rec.amount, currency)}
        </span>
      </div>

      <p className="text-xs leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>{rec.reason}</p>

      {rec.tickerBreakdown.length > 0 && (
        <div className="mt-2 space-y-1.5">
          <span className="text-[9px] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.25)" }}>
            {isBuy ? "Buy" : "Sell"} breakdown:
          </span>
          {rec.tickerBreakdown.map((t) => (
            <div
              key={t.ticker}
              className="flex items-center justify-between rounded-lg px-2.5 py-1.5"
              style={{ background: `${accentColor}0a`, border: `1px solid ${accentColor}18` }}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs" style={{ color: accentColor }}>
                  {t.ticker}
                </span>
                {t.risk && <RiskBadge risk={t.risk} />}
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono">
                {t.shares !== null ? (
                  <>
                    <span className="font-bold" style={{ color: accentColor }}>
                      {isBuy ? "+" : "-"}{t.shares} shares
                    </span>
                    {t.price !== null && (
                      <span style={{ color: "rgba(255,255,255,0.3)" }}>@ {fmtAmount(t.price, currency)}</span>
                    )}
                  </>
                ) : null}
                <span style={{ color: `${accentColor}80` }}>
                  = {fmtAmount(t.dollarAmount, currency)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AnalysisResults({
  analysis,
  target,
  onReset,
}: {
  analysis: PortfolioAnalysis;
  target: PortfolioTarget;
  onReset: () => void;
}) {
  const currency = analysis.currency;
  const sells = analysis.recommendations.filter((r) => r.action === "SELL");
  const buys = analysis.recommendations.filter((r) => r.action === "BUY");

  return (
    <div className="space-y-8">
      <style>{`
        @media print {
          nav, .print-hide { display: none !important; }
          @page { margin: 1.5cm; }
        }
      `}</style>

      {/* Summary header */}
      <div className="rounded-2xl p-6 relative overflow-hidden" style={{ background: "rgba(167,139,250,0.05)", border: "1px solid rgba(167,139,250,0.18)" }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, #a78bfa, transparent)" }} />
        <div className="flex items-start gap-5 flex-wrap">
          <ScoreBadge score={analysis.overallScore} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
              <span className="text-white font-bold text-lg">{target.icon} {target.label} Alignment</span>
              <button
                onClick={() => window.print()}
                className="print-hide flex items-center gap-1.5 text-xs font-medium rounded-lg px-3 py-1.5 transition-all"
                style={{ color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download PDF
              </button>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{analysis.summary}</p>
            <div className="flex flex-wrap gap-3 mt-3 text-xs font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>
              <span>Total: <span className="text-white font-bold">{currency === "INR" ? `₹${analysis.totalValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}` : `$${analysis.totalValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}`}</span></span>
              <span>Holdings: <span className="text-white font-bold">{analysis.holdings.length}</span></span>
              <span>Actions: <span className="font-bold" style={{ color: "#ff4d6a" }}>{sells.length} SELL</span> · <span className="font-bold" style={{ color: "#00e5a0" }}>{buys.length} BUY</span></span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Left: Detected holdings */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 rounded-full" style={{ background: "#a78bfa" }} />
            <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.6)" }}>
              Detected Holdings ({analysis.holdings.length})
            </h3>
          </div>
          <div className="rounded-xl overflow-x-auto" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
            <table className="w-full text-xs min-w-[480px]">
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {["Ticker", "Sector", "Qty", "Price", "Value", "%"].map((h) => (
                    <th key={h} className="text-left text-[10px] uppercase tracking-wider px-3 py-2.5 font-bold" style={{ color: "rgba(255,255,255,0.3)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {analysis.holdings.map((h, i) => (
                  <tr key={h.ticker + i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
                    <td className="px-3 py-2.5 font-mono font-bold text-white">{h.ticker}</td>
                    <td className="px-3 py-2.5 max-w-28 truncate" style={{ color: "rgba(255,255,255,0.4)" }}>{h.sector}</td>
                    <td className="px-3 py-2.5 font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>{h.quantity.toFixed(2)}</td>
                    <td className="px-3 py-2.5 font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {h.price !== null ? fmtAmount(h.price, currency) : "—"}
                    </td>
                    <td className="px-3 py-2.5 font-mono text-white">
                      {fmtAmount(h.computedValue, currency)}
                    </td>
                    <td className="px-3 py-2.5 font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {analysis.totalValue > 0
                        ? ((h.computedValue / analysis.totalValue) * 100).toFixed(1) + "%"
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Sector allocation */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 rounded-full" style={{ background: "#a78bfa" }} />
            <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.6)" }}>
              Sector Allocation vs Target
            </h3>
          </div>
          <div className="rounded-xl p-5 space-y-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex gap-4 text-[10px] mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-2 rounded-sm" style={{ background: "rgba(255,255,255,0.2)" }} />Target (ghost)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-2 rounded-sm" style={{ background: "rgba(255,255,255,0.5)" }} />Yours (solid)
              </span>
            </div>
            {analysis.sectorAllocations
              .filter((a) => a.targetPct > 0 || a.currentPct > 0)
              .map((alloc) => (
                <AllocationRow key={alloc.sector} alloc={alloc} target={target} />
              ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {analysis.recommendations.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 rounded-full" style={{ background: "#a78bfa" }} />
            <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.6)" }}>
              Rebalancing Recommendations
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.recommendations.map((rec, i) => (
              <RecommendationCard key={i} rec={rec} currency={currency} />
            ))}
          </div>
          <p className="text-xs mt-4" style={{ color: "rgba(255,255,255,0.2)" }}>
            Amounts are estimates based on your current portfolio size. Not financial advice.
          </p>
        </div>
      )}

      <button
        onClick={onReset}
        className="print-hide text-xs rounded-lg px-4 py-2 transition-all"
        style={{ color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)"; }}
      >
        ← Start over
      </button>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function PortfolioComparePage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [market, setMarket] = useState<Market>("us");
  const [style, setStyle] = useState<PortfolioStyle | null>(null);
  const [analysis, setAnalysis] = useState<PortfolioAnalysis | null>(null);

  const handleMarketChange = (m: Market) => {
    setMarket(m);
    setStyle(null);
  };

  const handleStyleSelect = (s: PortfolioStyle) => {
    setStyle(s);
    setStep(2);
  };

  const handleHoldings = (holdings: DetectedHolding[]) => {
    if (!style) return;
    const target = PORTFOLIO_TARGETS[style];
    const result = analysePortfolio(holdings, target);
    setAnalysis(result);
    setStep(3);
  };

  const handleReset = () => {
    setStep(1);
    setStyle(null);
    setAnalysis(null);
  };

  const target = style ? PORTFOLIO_TARGETS[style] : null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

      {/* Header */}
      <div className="mb-8 animate-fade-in-up">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-1 h-5 rounded-full" style={{ background: "linear-gradient(180deg, #a78bfa, #818cf8)" }} />
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em]" style={{ color: "#a78bfa" }}>
            AI-Powered · Claude Vision
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
          <span className="text-white">Portfolio </span>
          <span className="text-gradient-violet">Advisor</span>
        </h1>
        <p className="text-sm max-w-2xl" style={{ color: "rgba(255,255,255,0.4)" }}>
          Upload a screenshot of your brokerage portfolio. Claude AI extracts your holdings,
          maps them to sectors, and gives you specific rebalancing recommendations aligned
          to your chosen investment style.
        </p>
      </div>

      {/* Step indicator */}
      <div className="print-hide flex items-center gap-3 mb-8 animate-fade-in-up-1">
        <StepDot n={1} active={step === 1} done={step > 1} />
        <div className="flex-1 h-px max-w-16 transition-colors duration-500" style={{ background: step > 1 ? "#00e5a0" : "rgba(255,255,255,0.08)" }} />
        <StepDot n={2} active={step === 2} done={step > 2} />
        <div className="flex-1 h-px max-w-16 transition-colors duration-500" style={{ background: step > 2 ? "#00e5a0" : "rgba(255,255,255,0.08)" }} />
        <StepDot n={3} active={step === 3} done={false} />
      </div>

      {/* Step content */}
      {step === 1 && (
        <div className="animate-fade-in-up-2">
          <h2 className="text-lg font-bold text-white mb-1">Choose your investment style</h2>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.35)" }}>
            This determines your target sector allocation and which positions to recommend.
          </p>
          <StyleSelector selected={style} onSelect={handleStyleSelect} market={market} onMarketChange={handleMarketChange} />
        </div>
      )}

      {step === 2 && style && target && (
        <div className="animate-fade-in-up-1">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-white mb-1">
                {target.icon} {target.label} — Upload your portfolio
              </h2>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
                Screenshot from any brokerage app. Works with list view or pie chart.
              </p>
            </div>
            <button
              onClick={() => setStep(1)}
              className="text-xs rounded-lg px-3 py-1.5 transition-all"
              style={{ color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)" }}
            >
              ← Change style
            </button>
          </div>
          <ImageUploader onHoldings={handleHoldings} style={style} />
        </div>
      )}

      {step === 3 && analysis && target && (
        <AnalysisResults analysis={analysis} target={target} onReset={handleReset} />
      )}

      {/* Disclaimer */}
      <div className="mt-10 rounded-xl p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.28)" }}>
          <span className="font-semibold" style={{ color: "rgba(255,255,255,0.45)" }}>Disclaimer: </span>
          This tool is for educational and informational purposes only. Recommendations are
          generated by AI based on backtested frameworks and do not constitute financial advice.
          Always consult a registered investment advisor before making any investment decisions.
        </p>
      </div>
    </div>
  );
}
