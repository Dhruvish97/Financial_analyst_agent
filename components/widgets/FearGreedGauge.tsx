"use client";

import { FearGreedData } from "@/types/portfolio";

interface Props {
  data: FearGreedData | null;
  loading: boolean;
}

function scoreToColor(score: number): string {
  if (score <= 25) return "#ef4444"; // red — Extreme Fear
  if (score <= 44) return "#f97316"; // orange — Fear
  if (score <= 55) return "#eab308"; // yellow — Neutral
  if (score <= 74) return "#84cc16"; // lime — Greed
  return "#22c55e"; // green — Extreme Greed
}

function scoreToLabel(score: number): string {
  if (score <= 25) return "Extreme Fear";
  if (score <= 44) return "Fear";
  if (score <= 55) return "Neutral";
  if (score <= 74) return "Greed";
  return "Extreme Greed";
}

// Converts a 0–100 score to SVG arc path for a semicircle gauge
function buildArc(score: number, r: number, cx: number, cy: number): string {
  const startAngle = -180; // left
  const endAngle = startAngle + (score / 100) * 180;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const x1 = cx + r * Math.cos(toRad(startAngle));
  const y1 = cy + r * Math.sin(toRad(startAngle));
  const x2 = cx + r * Math.cos(toRad(endAngle));
  const y2 = cy + r * Math.sin(toRad(endAngle));
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
}

function NeedleArrow({ score, cx, cy, r }: { score: number; cx: number; cy: number; r: number }) {
  const angle = -180 + (score / 100) * 180;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const needleLen = r - 8;
  const nx = cx + needleLen * Math.cos(toRad(angle));
  const ny = cy + needleLen * Math.sin(toRad(angle));
  return (
    <>
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="white" strokeWidth={2} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={4} fill="white" />
    </>
  );
}

function DeltaBadge({ label, current, previous }: { label: string; current: number; previous: number }) {
  const diff = current - previous;
  const color = diff > 0 ? "text-green-400" : diff < 0 ? "text-red-400" : "text-gray-500";
  const sign = diff > 0 ? "+" : "";
  return (
    <div className="text-center">
      <p className="text-gray-600 text-[10px] uppercase tracking-wider">{label}</p>
      <p className={`font-mono text-xs font-semibold ${color}`}>{sign}{diff}</p>
    </div>
  );
}

export function FearGreedGauge({ data, loading }: Props) {
  const cx = 110;
  const cy = 100;
  const r = 80;
  const score = data?.score ?? 50;
  const color = scoreToColor(score);

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
      <div className="flex items-center justify-between mb-1">
        <p className="text-gray-500 text-xs uppercase tracking-wider font-medium">Stock Market Sentiment</p>
        <p className="text-gray-600 text-[10px]">CNN Fear &amp; Greed · Equities Only</p>
      </div>

      {loading ? (
        <div className="h-36 flex items-center justify-center">
          <span className="text-gray-600 animate-pulse text-sm">Loading…</span>
        </div>
      ) : (
        <>
          {/* SVG Gauge */}
          <div className="flex justify-center">
            <svg width={220} height={115} viewBox="0 0 220 115" aria-hidden="true">
              {/* Background track */}
              <path
                d={buildArc(100, r, cx, cy)}
                fill="none"
                stroke="#1f2937"
                strokeWidth={14}
                strokeLinecap="round"
              />
              {/* Zone segments */}
              {[
                { from: 0,  to: 25, color: "#ef4444" },
                { from: 25, to: 44, color: "#f97316" },
                { from: 44, to: 56, color: "#eab308" },
                { from: 56, to: 75, color: "#84cc16" },
                { from: 75, to: 100,color: "#22c55e" },
              ].map(({ from, to, color: zc }) => (
                <path
                  key={from}
                  d={(() => {
                    const startA = -180 + (from / 100) * 180;
                    const endA   = -180 + (to   / 100) * 180;
                    const toRad = (d: number) => (d * Math.PI) / 180;
                    const x1 = cx + r * Math.cos(toRad(startA));
                    const y1 = cy + r * Math.sin(toRad(startA));
                    const x2 = cx + r * Math.cos(toRad(endA));
                    const y2 = cy + r * Math.sin(toRad(endA));
                    return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;
                  })()}
                  fill="none"
                  stroke={zc}
                  strokeWidth={14}
                  strokeLinecap="butt"
                  opacity={0.25}
                />
              ))}
              {/* Active fill up to score */}
              <path
                d={buildArc(score, r, cx, cy)}
                fill="none"
                stroke={color}
                strokeWidth={14}
                strokeLinecap="round"
              />
              {/* Needle */}
              <NeedleArrow score={score} cx={cx} cy={cy} r={r} />
              {/* Score label */}
              <text x={cx} y={cy - 16} textAnchor="middle" fill="white" fontSize={28} fontWeight={700} fontFamily="monospace">
                {score}
              </text>
              <text x={cx} y={cy - 1} textAnchor="middle" fill={color} fontSize={11} fontWeight={600}>
                {scoreToLabel(score)}
              </text>
            </svg>
          </div>

          {/* Deltas row */}
          {data && (
            <div className="grid grid-cols-4 gap-2 mt-1 border-t border-gray-800 pt-3">
              <DeltaBadge label="Prev Close" current={score} previous={data.previousClose} />
              <DeltaBadge label="1 Week" current={score} previous={data.previousWeek} />
              <DeltaBadge label="1 Month" current={score} previous={data.previousMonth} />
              <DeltaBadge label="1 Year" current={score} previous={data.previousYear} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
