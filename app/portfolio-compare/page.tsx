"use client";

import { useState, useRef, useCallback } from "react";
import {
  PORTFOLIO_TARGETS,
  PortfolioStyle,
  PortfolioTarget,
} from "@/constants/portfolio-targets";
import {
  DetectedHolding,
  PortfolioAnalysis,
  analysePortfolio,
} from "@/lib/portfolio-analysis";

// ── Step indicator ─────────────────────────────────────────────────────────────

function StepDot({ n, active, done }: { n: number; active: boolean; done: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
          done
            ? "bg-green-500 border-green-500 text-gray-950"
            : active
            ? "bg-transparent border-white text-white"
            : "bg-transparent border-gray-700 text-gray-600"
        }`}
      >
        {done ? "✓" : n}
      </div>
      <span className={`text-xs font-medium hidden sm:block ${active ? "text-white" : done ? "text-green-400" : "text-gray-600"}`}>
        {n === 1 ? "Style" : n === 2 ? "Upload" : "Analysis"}
      </span>
    </div>
  );
}

// ── Step 1: Portfolio style selector ─────────────────────────────────────────

function StyleSelector({
  selected,
  onSelect,
}: {
  selected: PortfolioStyle | null;
  onSelect: (s: PortfolioStyle) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {(["conservative", "aggressive"] as PortfolioStyle[]).map((style) => {
        const t = PORTFOLIO_TARGETS[style];
        const isSelected = selected === style;
        return (
          <button
            key={style}
            onClick={() => onSelect(style)}
            className={`text-left rounded-2xl border-2 p-6 transition-all duration-200 hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 ${
              isSelected
                ? style === "conservative"
                  ? "border-green-500 bg-green-500/10"
                  : "border-amber-500 bg-amber-500/10"
                : "border-gray-700 bg-gray-900 hover:border-gray-500"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-4xl">{t.icon}</span>
              {isSelected && (
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    style === "conservative"
                      ? "bg-green-500/20 text-green-400 border border-green-700"
                      : "bg-amber-500/20 text-amber-400 border border-amber-700"
                  }`}
                >
                  Selected
                </span>
              )}
            </div>
            <h3 className={`text-xl font-bold mb-1 ${isSelected ? (style === "conservative" ? "text-green-400" : "text-amber-400") : "text-white"}`}>
              {t.label}
            </h3>
            <p className="text-gray-400 text-sm font-medium mb-3">{t.tagline}</p>
            <p className="text-gray-500 text-xs leading-relaxed mb-4">{t.description}</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] font-mono bg-gray-800 border border-gray-700 text-gray-400 px-2 py-0.5 rounded-full">
                Risk: {t.riskLevel}
              </span>
              <span className="text-[10px] font-mono bg-gray-800 border border-gray-700 text-gray-400 px-2 py-0.5 rounded-full">
                Horizon: {t.timeHorizon}
              </span>
            </div>
            {/* Sector breakdown mini-preview */}
            <div className="mt-4 space-y-1.5">
              {t.sectors.slice(0, 4).map((s) => (
                <div key={s.sector} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                  <span className="text-[10px] text-gray-500 flex-1 truncate">{s.sector}</span>
                  <span className="text-[10px] font-mono text-gray-400">{s.targetPct}%</span>
                </div>
              ))}
              {t.sectors.length > 4 && (
                <p className="text-[10px] text-gray-600 pl-4">+ {t.sectors.length - 4} more sectors</p>
              )}
            </div>
          </button>
        );
      })}
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
      setPreview(URL.createObjectURL(file));
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

  const accentColor = style === "conservative" ? "border-green-500 bg-green-500/5" : "border-amber-500 bg-amber-500/5";

  return (
    <div className="space-y-5">
      {/* Drop zone */}
      <div
        onDrop={onDrop}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onClick={() => fileRef.current?.click()}
        className={`relative rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 p-10 text-center ${
          dragging ? accentColor : "border-gray-700 bg-gray-900 hover:border-gray-500"
        }`}
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) processFile(f); }}
        />
        {loading ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            <p className="text-gray-400 text-sm">Analyzing with Claude AI…</p>
            <p className="text-gray-600 text-xs">Extracting tickers, quantities, and prices</p>
          </div>
        ) : preview ? (
          <div className="flex flex-col items-center gap-3">
            <img src={preview} alt="Portfolio preview" className="max-h-40 rounded-lg object-contain border border-gray-700" />
            <p className="text-gray-400 text-xs">{fileName} · Click to replace</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center text-2xl">
              📸
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Drop your portfolio screenshot here</p>
              <p className="text-gray-500 text-xs mt-1">or click to browse · PNG, JPG, WebP supported</p>
            </div>
            <div className="flex gap-3 mt-2">
              {["Stock list view", "Pie chart view", "Mobile app screenshot"].map((t) => (
                <span key={t} className="text-[10px] bg-gray-800 border border-gray-700 text-gray-500 px-2 py-0.5 rounded-full">{t}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="rounded-xl border border-red-800 bg-red-900/20 p-4 text-red-400 text-sm">
          {error}
        </div>
      )}

      <p className="text-gray-600 text-xs text-center">
        Your screenshot is sent to Claude AI for analysis and is never stored.
      </p>
    </div>
  );
}

// ── Step 3: Analysis results ───────────────────────────────────────────────────

function ScoreBadge({ score, style }: { score: number; style: PortfolioStyle }) {
  const color =
    score >= 80 ? "text-green-400 border-green-700 bg-green-900/20" :
    score >= 60 ? "text-yellow-400 border-yellow-700 bg-yellow-900/20" :
                  "text-red-400 border-red-700 bg-red-900/20";
  return (
    <div className={`inline-flex flex-col items-center justify-center w-20 h-20 rounded-full border-2 ${color}`}>
      <span className="text-2xl font-bold font-mono">{score}</span>
      <span className="text-[9px] uppercase tracking-widest">/ 100</span>
    </div>
  );
}

function AllocationRow({ alloc, target }: { alloc: import("@/lib/portfolio-analysis").SectorAllocation; target: PortfolioTarget }) {
  const sectorTarget = target.sectors.find((s) => s.sector === alloc.sector);
  const maxPct = Math.max(alloc.currentPct, alloc.targetPct, 5);
  const isOver = alloc.status === "overweight";
  const isUnder = alloc.status === "underweight";

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: alloc.color }} />
          <span className="text-gray-300 truncate">{alloc.sector}</span>
          {isOver && <span className="text-red-400 text-[9px] font-bold uppercase tracking-wide shrink-0">▲ Over</span>}
          {isUnder && alloc.targetPct > 0 && <span className="text-amber-400 text-[9px] font-bold uppercase tracking-wide shrink-0">▼ Under</span>}
        </div>
        <div className="flex items-center gap-3 shrink-0 ml-3">
          <span className="text-gray-500 font-mono">
            {alloc.currentPct.toFixed(1)}%
            <span className="text-gray-700"> / </span>
            <span style={{ color: alloc.color }}>{alloc.targetPct}%</span>
          </span>
        </div>
      </div>
      {/* Dual bar: current vs target */}
      <div className="relative h-3 rounded-full bg-gray-800 overflow-hidden">
        {/* Target bar (ghost) */}
        <div
          className="absolute inset-y-0 left-0 rounded-full opacity-25"
          style={{ width: `${(alloc.targetPct / maxPct) * 100}%`, backgroundColor: alloc.color }}
        />
        {/* Current bar */}
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ width: `${Math.min(100, (alloc.currentPct / maxPct) * 100)}%`, backgroundColor: alloc.color, opacity: 0.85 }}
        />
      </div>
      <div className="flex justify-between text-[9px] text-gray-700">
        <span>Your: {alloc.currentPct.toFixed(1)}%</span>
        <span>Target: {alloc.targetPct}%</span>
      </div>
    </div>
  );
}

function RecommendationCard({ rec }: { rec: import("@/lib/portfolio-analysis").Recommendation }) {
  const isBuy = rec.action === "BUY";
  const priorityCls =
    rec.priority === "high" ? "border-red-800 bg-red-900/10" :
    rec.priority === "medium" ? "border-yellow-800 bg-yellow-900/10" :
    "border-gray-700 bg-gray-900";
  const actionCls = isBuy
    ? "bg-green-500/20 text-green-400 border-green-700"
    : "bg-red-500/20 text-red-400 border-red-700";

  return (
    <div className={`rounded-xl border p-4 ${priorityCls}`}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs font-bold px-2 py-0.5 rounded border ${actionCls}`}>
            {rec.action}
          </span>
          <span className="text-gray-300 text-xs font-semibold">{rec.sector}</span>
          {rec.priority === "high" && (
            <span className="text-[9px] font-bold text-red-400 uppercase tracking-wider border border-red-800 bg-red-900/20 px-1.5 py-0.5 rounded">
              High Priority
            </span>
          )}
        </div>
        <span className={`font-mono text-sm font-bold shrink-0 ${isBuy ? "text-green-400" : "text-red-400"}`}>
          {isBuy ? "+" : "-"}${rec.amount.toLocaleString()}
        </span>
      </div>

      <p className="text-gray-400 text-xs leading-relaxed mb-3">{rec.reason}</p>

      {/* Per-ticker share breakdown */}
      {rec.tickerBreakdown.length > 0 && (
        <div className="mt-2 space-y-1.5">
          <span className="text-[9px] text-gray-600 uppercase tracking-wider">
            {isBuy ? "Buy" : "Sell"} breakdown:
          </span>
          {rec.tickerBreakdown.map((t) => (
            <div key={t.ticker} className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 ${isBuy ? "bg-green-900/20 border border-green-900" : "bg-red-900/20 border border-red-900"}`}>
              <span className={`font-mono font-bold text-xs ${isBuy ? "text-green-300" : "text-red-300"}`}>
                {t.ticker}
              </span>
              <div className="flex items-center gap-2 text-[10px] font-mono text-right">
                {t.shares !== null ? (
                  <>
                    <span className={`font-bold ${isBuy ? "text-green-400" : "text-red-400"}`}>
                      {isBuy ? "+" : "-"}{t.shares} shares
                    </span>
                    {t.price !== null && (
                      <span className="text-gray-600">@ ${t.price.toFixed(2)}</span>
                    )}
                  </>
                ) : null}
                <span className={`${isBuy ? "text-green-600" : "text-red-600"}`}>
                  = ${t.dollarAmount.toLocaleString()}
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
  const sells = analysis.recommendations.filter((r) => r.action === "SELL");
  const buys = analysis.recommendations.filter((r) => r.action === "BUY");

  return (
    <div className="space-y-8">
      <style>{`
        @media print {
          nav, .print-hide { display: none !important; }
          body { background: #030712 !important; }
          @page { margin: 1.5cm; }
        }
      `}</style>
      {/* Summary header */}
      <div className="rounded-2xl border border-gray-700 bg-gray-900 p-6">
        <div className="flex items-start gap-5 flex-wrap">
          <ScoreBadge score={analysis.overallScore} style={target.style} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
              <span className="text-white font-bold text-lg">{target.icon} {target.label} Alignment</span>
              <button
                onClick={() => window.print()}
                className="print-hide flex items-center gap-1.5 text-xs font-medium border border-gray-600 hover:border-gray-400 text-gray-400 hover:text-white rounded-lg px-3 py-1.5 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download PDF
              </button>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">{analysis.summary}</p>
            <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-500 font-mono">
              <span>Total: <span className="text-white font-bold">${analysis.totalValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}</span></span>
              <span>Holdings: <span className="text-white font-bold">{analysis.holdings.length}</span></span>
              <span>Actions: <span className="text-red-400 font-bold">{sells.length} SELL</span> · <span className="text-green-400 font-bold">{buys.length} BUY</span></span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Left: Detected holdings */}
        <div>
          <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-3">
            Detected Holdings ({analysis.holdings.length})
          </h3>
          <div className="rounded-xl border border-gray-800 overflow-x-auto">
            <table className="w-full text-xs min-w-[480px]">
              <thead>
                <tr className="bg-gray-800/50 border-b border-gray-800">
                  {["Ticker", "Sector", "Qty", "Price", "Value", "%"].map((h) => (
                    <th key={h} className="text-left text-[10px] text-gray-500 uppercase tracking-wider px-3 py-2 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {analysis.holdings.map((h, i) => (
                  <tr key={h.ticker + i} className={`border-b border-gray-800/50 ${i % 2 === 0 ? "" : "bg-gray-800/10"}`}>
                    <td className="px-3 py-2 font-mono font-bold text-white">{h.ticker}</td>
                    <td className="px-3 py-2 text-gray-500 max-w-28 truncate">{h.sector}</td>
                    <td className="px-3 py-2 font-mono text-gray-400">{h.quantity.toFixed(2)}</td>
                    <td className="px-3 py-2 font-mono text-gray-400">
                      {h.price !== null ? `$${h.price.toFixed(2)}` : "—"}
                    </td>
                    <td className="px-3 py-2 font-mono text-white">
                      ${h.computedValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                    </td>
                    <td className="px-3 py-2 font-mono text-gray-500">
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

        {/* Right: Sector allocation comparison */}
        <div>
          <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-3">
            Sector Allocation vs Target
          </h3>
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-5 space-y-5">
            <div className="flex gap-4 text-[10px] text-gray-600 mb-1">
              <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-2 rounded-sm bg-gray-500 opacity-50" />Target (ghost)</span>
              <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-2 rounded-sm bg-gray-500" />Yours (solid)</span>
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
          <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-3">
            Rebalancing Recommendations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.recommendations.map((rec, i) => (
              <RecommendationCard key={i} rec={rec} />
            ))}
          </div>
          <p className="text-gray-700 text-xs mt-4">
            Dollar amounts are estimates based on your current portfolio size. Not financial advice.
          </p>
        </div>
      )}

      <button
        onClick={onReset}
        className="print-hide text-xs text-gray-500 hover:text-white transition-colors border border-gray-700 hover:border-gray-500 rounded-lg px-4 py-2"
      >
        ← Start over
      </button>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function PortfolioComparePage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [style, setStyle] = useState<PortfolioStyle | null>(null);
  const [analysis, setAnalysis] = useState<PortfolioAnalysis | null>(null);

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
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-orange-400 text-xs font-mono font-semibold uppercase tracking-widest">
              AI-Powered · Claude Vision
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Portfolio Advisor</h1>
          <p className="text-gray-400 mt-1 text-sm max-w-2xl">
            Upload a screenshot of your brokerage portfolio. Claude AI extracts your holdings,
            maps them to sectors, and gives you specific rebalancing recommendations aligned
            to your chosen investment style.
          </p>
        </div>

        {/* Step indicator */}
        <div className="print-hide flex items-center gap-3 mb-8">
          <StepDot n={1} active={step === 1} done={step > 1} />
          <div className="flex-1 h-px bg-gray-800 max-w-12" />
          <StepDot n={2} active={step === 2} done={step > 2} />
          <div className="flex-1 h-px bg-gray-800 max-w-12" />
          <StepDot n={3} active={step === 3} done={false} />
        </div>

        {/* Step content */}
        {step === 1 && (
          <div>
            <h2 className="text-lg font-bold text-white mb-1">Choose your investment style</h2>
            <p className="text-gray-500 text-sm mb-6">
              This determines your target sector allocation and which positions to recommend.
            </p>
            <StyleSelector selected={style} onSelect={handleStyleSelect} />
          </div>
        )}

        {step === 2 && style && target && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-white mb-1">
                  {target.icon} {target.label} — Upload your portfolio
                </h2>
                <p className="text-gray-500 text-sm">
                  Screenshot from any brokerage app. Works with list view or pie chart.
                </p>
              </div>
              <button
                onClick={() => setStep(1)}
                className="text-xs text-gray-500 hover:text-white border border-gray-700 rounded-lg px-3 py-1.5 transition-colors"
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
        <div className="mt-10 border border-gray-800 rounded-xl p-4 bg-gray-900/50">
          <p className="text-gray-600 text-xs leading-relaxed">
            <span className="text-gray-400 font-semibold">Disclaimer: </span>
            This tool is for educational and informational purposes only. Recommendations are
            generated by AI based on backtested frameworks and do not constitute financial advice.
            Always consult a registered investment advisor before making any investment decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
