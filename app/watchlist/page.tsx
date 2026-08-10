"use client";

import { CANDIDATE_SCREENING, ScreeningLabel, ScreeningMarket } from "@/constants/candidate-screening";
import { INDIA_MARKET_ENABLED } from "@/constants/feature-flags";

const LABEL_STYLE: Record<ScreeningLabel, React.CSSProperties> = {
  "STRONG WATCH": { color: "#00e5a0", background: "rgba(0,229,160,0.08)", border: "1px solid rgba(0,229,160,0.2)" },
  "WATCH":        { color: "#fbbf24", background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)" },
  "ON RADAR":     { color: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.14)" },
};

const MARKET_META: Record<ScreeningMarket, { label: string; color: string }> = {
  us: { label: "United States", color: "#00d4ff" },
  india: { label: "India", color: "#fb923c" },
};

function ScreeningBadge({ label }: { label: ScreeningLabel }) {
  return (
    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap" style={LABEL_STYLE[label]}>
      {label}
    </span>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso + "T12:00:00Z");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

export default function WatchlistPage() {
  const markets: ScreeningMarket[] = INDIA_MARKET_ENABLED ? ["us", "india"] : ["us"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-10 animate-fade-in-up">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-1 h-5 rounded-full" style={{ background: "linear-gradient(180deg, #fbbf24, #00e5a0)" }} />
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em]" style={{ color: "#fbbf24" }}>
            Candidate Screening · Not Currently Held
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 leading-[1.05] text-white">
          Watchlist
        </h1>
        <p className="text-base max-w-2xl leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
          Every weekly research refresh screens new stocks against the 7 Powers moat framework
          (≥3/7 to qualify). These are the current cycle&apos;s candidates — names being tracked as
          potential additions or replacements, not positions in any portfolio.
        </p>
      </div>

      {markets.map((market) => {
        const entries = CANDIDATE_SCREENING.filter((c) => c.market === market);
        if (entries.length === 0) return null;
        const meta = MARKET_META[market];

        return (
          <div key={market} className="mb-10 animate-fade-in-up-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: meta.color }} />
              <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: meta.color }}>
                {meta.label}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {entries.map((c) => (
                <div
                  key={c.ticker}
                  className="rounded-2xl p-5 relative overflow-hidden glass glass-hover transition-all"
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: `linear-gradient(90deg, transparent, ${meta.color}80, transparent)` }}
                  />
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-mono font-bold text-lg text-white leading-none">{c.ticker}</p>
                      <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{c.name}</p>
                    </div>
                    <ScreeningBadge label={c.label} />
                  </div>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {c.rationale}
                  </p>
                  <p className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>
                    Last confirmed {formatDate(c.date)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div
        className="rounded-xl p-4"
        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.28)" }}>
          <span style={{ color: "rgba(255,255,255,0.45)" }} className="font-semibold">Note: </span>
          These are research candidates, not recommendations, and not held in any portfolio shown
          on this site. See the <a href="/research-log" className="underline">Research Log</a> for
          how past candidates were ultimately decided.
        </p>
      </div>
    </div>
  );
}
