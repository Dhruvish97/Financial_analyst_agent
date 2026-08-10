"use client";

import { useState } from "react";
import { RESEARCH_LOG, ResearchLogScope } from "@/constants/research-log";

const SCOPE_META: Record<ResearchLogScope, { label: string; color: string }> = {
  "multi": { label: "Multi-Market", color: "#00e5a0" },
  "us-stocks": { label: "US Aggressive Growth", color: "#00d4ff" },
  "india": { label: "India", color: "#fb923c" },
  "roth-ira": { label: "Tax-Free Growth", color: "#a78bfa" },
};

const FILTERS: ("all" | ResearchLogScope)[] = ["all", "multi", "us-stocks", "india", "roth-ira"];

function formatDate(iso: string): string {
  // "YYYY-MM" (month-only precision) vs full "YYYY-MM-DD"
  if (/^\d{4}-\d{2}$/.test(iso)) {
    const [y, m] = iso.split("-").map(Number);
    return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
  }
  return new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

export default function ResearchLogPage() {
  const [filter, setFilter] = useState<"all" | ResearchLogScope>("all");
  const entries = filter === "all" ? RESEARCH_LOG : RESEARCH_LOG.filter((e) => e.scope === filter);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-10 animate-fade-in-up">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-1 h-5 rounded-full" style={{ background: "linear-gradient(180deg, #38bdf8, #a78bfa)" }} />
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em]" style={{ color: "#38bdf8" }}>
            Every Rebalance &amp; Refresh, In Order
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 leading-[1.05] text-white">
          Research Log
        </h1>
        <p className="text-base max-w-2xl leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
          A timeline of every dated research cycle across the model portfolios — what changed,
          and why. Full narrative detail lives in the header comments of each portfolio&apos;s
          constants file; this is the distilled, browsable version.
        </p>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-8 animate-fade-in-up-1">
        {FILTERS.map((f) => {
          const isActive = filter === f;
          const color = f === "all" ? "#ffffff" : SCOPE_META[f].color;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={
                isActive
                  ? { color, background: `${color}1a`, border: `1px solid ${color}44` }
                  : { color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }
              }
            >
              {f === "all" ? "All" : SCOPE_META[f].label}
            </button>
          );
        })}
      </div>

      {/* Timeline */}
      <div className="relative pl-6 animate-fade-in-up-2">
        <div className="absolute left-[7px] top-2 bottom-2 w-px" style={{ background: "rgba(255,255,255,0.08)" }} />

        <div className="flex flex-col gap-6">
          {entries.map((entry, i) => {
            const meta = SCOPE_META[entry.scope];
            return (
              <div key={`${entry.date}-${entry.title}-${i}`} className="relative">
                <div
                  className="absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full"
                  style={{ background: meta.color, boxShadow: `0 0 0 3px rgba(7,6,15,1), 0 0 0 4px ${meta.color}33` }}
                />
                <div className="rounded-2xl p-5 glass glass-hover transition-all">
                  <div className="flex items-center flex-wrap gap-2 mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.35)" }}>
                      {formatDate(entry.date)}
                    </span>
                    <span
                      className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
                      style={{ color: meta.color, background: `${meta.color}14`, border: `1px solid ${meta.color}33` }}
                    >
                      {meta.label}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-base mb-1.5">{entry.title}</h3>
                  <p className="text-sm mb-3 leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {entry.summary}
                  </p>
                  <ul className="space-y-1">
                    {entry.highlights.map((h, hi) => (
                      <li key={hi} className="text-xs flex items-start gap-2" style={{ color: "rgba(255,255,255,0.4)" }}>
                        <span className="mt-1 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: meta.color }} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
