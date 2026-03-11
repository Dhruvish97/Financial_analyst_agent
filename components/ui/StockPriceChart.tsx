"use client";

import { useState, useEffect } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

// ── Types ─────────────────────────────────────────────────────────────────────

interface ChartPoint {
  date: string;
  close: number;
}

const PERIODS = ["1W", "1M", "3M", "1Y"] as const;
type Period = typeof PERIODS[number];

const PERIOD_KEY: Record<Period, string> = {
  "1W": "1w", "1M": "1m", "3M": "3m", "1Y": "1y",
};

interface Props {
  ticker: string;
  name?: string;
  color?: string;
  currency?: "USD" | "INR";
}

// ── Tooltip ───────────────────────────────────────────────────────────────────

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
  currency: "USD" | "INR";
  color: string;
}

function ChartTooltip({ active, payload, label, currency, color }: TooltipProps) {
  if (!active || !payload?.length || !label) return null;
  const price = payload[0].value;
  const formatted = currency === "INR"
    ? `₹${price.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`
    : `$${price.toFixed(2)}`;
  const date = new Date(label + "T12:00:00Z").toLocaleDateString("en", {
    year: "numeric", month: "short", day: "numeric",
  });
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 shadow-xl">
      <p className="text-gray-400 text-[10px] mb-0.5">{date}</p>
      <p className="font-mono font-bold text-xs" style={{ color }}>{formatted}</p>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export function StockPriceChart({ ticker, name, color = "#3b82f6", currency = "USD" }: Props) {
  const [period, setPeriod] = useState<Period>("3M");
  const [points, setPoints] = useState<ChartPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setErrored(false);
    fetch(`/api/chart?ticker=${encodeURIComponent(ticker)}&period=${PERIOD_KEY[period]}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        setPoints(Array.isArray(data.points) ? data.points : []);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setErrored(true);
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, [ticker, period]);

  // Period return
  const first = points[0]?.close ?? null;
  const last = points[points.length - 1]?.close ?? null;
  const periodReturn = first && last ? ((last - first) / first) * 100 : null;
  const isPositive = (periodReturn ?? 0) >= 0;

  // Y-axis formatter
  const fmtY = (v: number) => {
    if (currency === "INR") {
      if (v >= 1000) return `₹${(v / 1000).toFixed(0)}K`;
      return `₹${v.toFixed(0)}`;
    }
    if (v >= 1000) return `$${(v / 1000).toFixed(0)}K`;
    return `$${v.toFixed(0)}`;
  };

  // X-axis date formatter
  const fmtX = (d: string) => {
    const date = new Date(d + "T12:00:00Z");
    if (period === "1Y") return date.toLocaleDateString("en", { month: "short" });
    return date.toLocaleDateString("en", { month: "short", day: "numeric" });
  };

  const gradientId = `chart-grad-${ticker.replace(/[^a-zA-Z0-9]/g, "_")}`;

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: color }}
          />
          <span className="font-mono font-bold text-white text-xs">{ticker}</span>
          {name && (
            <span className="text-gray-500 text-[10px] truncate hidden sm:block">{name}</span>
          )}
          {periodReturn !== null && !loading && (
            <span className={`font-mono text-xs font-semibold ${isPositive ? "text-green-400" : "text-red-400"}`}>
              {isPositive ? "+" : ""}{periodReturn.toFixed(2)}%
              <span className="text-gray-600 ml-1 text-[10px]">({period})</span>
            </span>
          )}
        </div>

        {/* Period selector */}
        <div className="flex gap-0.5 bg-gray-800/60 rounded-lg p-0.5 shrink-0">
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`text-[10px] font-mono font-medium px-2.5 py-1 rounded-md transition-all ${
                period === p
                  ? "bg-gray-700 text-white shadow"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Chart body */}
      {loading ? (
        <div className="h-36 flex items-center justify-center">
          <span className="text-gray-600 text-xs animate-pulse">Loading chart…</span>
        </div>
      ) : errored || points.length < 2 ? (
        <div className="h-36 flex items-center justify-center">
          <span className="text-gray-700 text-xs">Chart data unavailable</span>
        </div>
      ) : (
        <div className="h-36">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={points} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="date"
                tickFormatter={fmtX}
                tick={{ fill: "#6b7280", fontSize: 9 }}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
                minTickGap={40}
              />
              <YAxis
                tickFormatter={fmtY}
                tick={{ fill: "#6b7280", fontSize: 9 }}
                tickLine={false}
                axisLine={false}
                domain={["auto", "auto"]}
                width={52}
              />
              <Tooltip
                content={<ChartTooltip currency={currency} color={color} />}
              />
              <Area
                type="monotone"
                dataKey="close"
                stroke={color}
                strokeWidth={1.5}
                fill={`url(#${gradientId})`}
                dot={false}
                activeDot={{ r: 3, fill: color, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
