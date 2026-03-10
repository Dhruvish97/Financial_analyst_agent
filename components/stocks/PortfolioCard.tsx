"use client";

import { PortfolioDefinition, PriceMap } from "@/types/portfolio";
// eslint-disable-next-line @typescript-eslint/no-deprecated
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const RADIAN = Math.PI / 180;

interface CustomLabelProps {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
  name?: string;
}

function renderCustomLabel({
  cx = 0,
  cy = 0,
  midAngle = 0,
  innerRadius = 0,
  outerRadius = 0,
  percent = 0,
  name = "",
}: CustomLabelProps) {
  if (percent < 0.07) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={10}
      fontWeight={600}
    >
      {name}
    </text>
  );
}

interface TooltipPayload {
  name: string;
  value: number;
  payload: { color: string; rationale: string };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-2 text-xs max-w-48 shadow-xl">
      <p className="font-bold text-white mb-1">
        {item.name} — {item.value}%
      </p>
      <p className="text-gray-400 leading-snug">{item.payload.rationale}</p>
    </div>
  );
}

interface PortfolioCardProps {
  portfolio: PortfolioDefinition;
  prices: PriceMap;
  loadingPrices: boolean;
  onClick: () => void;
}

export function PortfolioCard({
  portfolio,
  prices,
  loadingPrices,
  onClick,
}: PortfolioCardProps) {
  const chartData = portfolio.holdings.map((h) => ({
    name: h.ticker,
    value: h.allocation,
    color: h.color,
    rationale: h.rationale,
  }));

  // Calculate weighted portfolio value change (by allocation weight)
  let weightedChange: number | null = 0;
  let hasAnyPrice = false;
  for (const h of portfolio.holdings) {
    const lp = prices[h.ticker];
    if (lp?.changePercent !== null && lp?.changePercent !== undefined) {
      weightedChange! += (h.allocation / 100) * lp.changePercent;
      hasAnyPrice = true;
    }
  }
  if (!hasAnyPrice) weightedChange = null;

  const isPositive = weightedChange !== null && weightedChange >= 0;

  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left rounded-2xl border bg-gradient-to-br ${portfolio.cardGradient}
        ${portfolio.accentColor} hover:border-white/20 transition-all duration-300
        hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/40
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40
        p-5 group
      `}
      aria-label={`View ${portfolio.name} portfolio details`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-white leading-tight">
            {portfolio.name}
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">{portfolio.accountType}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${portfolio.riskColor} border-current/30 bg-current/5`}
          >
            {portfolio.riskLevel}
          </span>
          <span className="text-xs text-gray-500">{portfolio.timeHorizon}</span>
        </div>
      </div>

      {/* Donut chart */}
      <div className="h-44 w-full" aria-hidden="true">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={48}
              outerRadius={78}
              dataKey="value"
              labelLine={false}
              label={renderCustomLabel}
              stroke="none"
            >
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Stats row */}
      <div className="mt-3 space-y-2">
        {/* Top performers / laggards */}
        {!loadingPrices && (
          <div className="flex gap-1.5 flex-wrap">
            {portfolio.holdings
              .map((h) => ({ h, cp: prices[h.ticker]?.changePercent ?? null }))
              .filter((x) => x.cp !== null)
              .sort((a, b) => b.cp! - a.cp!)
              .slice(0, 3)
              .map(({ h, cp }) => (
                <span
                  key={h.ticker}
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                    cp! >= 0
                      ? "text-green-400 border-green-900 bg-green-900/20"
                      : "text-red-400 border-red-900 bg-red-900/20"
                  }`}
                >
                  {h.ticker} {cp! >= 0 ? "+" : ""}{cp!.toFixed(1)}%
                </span>
              ))}
          </div>
        )}

        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400">{portfolio.holdings.length} holdings</span>

          {loadingPrices ? (
            <span className="text-gray-600 animate-pulse">Loading…</span>
          ) : weightedChange !== null ? (
            <span className={`font-mono font-semibold ${isPositive ? "text-green-400" : "text-red-400"}`}>
              {isPositive ? "+" : ""}{weightedChange.toFixed(2)}% today
            </span>
          ) : (
            <span className="text-gray-600">No price data</span>
          )}

          <span className="text-gray-500 group-hover:text-white/60 transition-colors text-[10px] uppercase tracking-wide">
            Explore →
          </span>
        </div>
      </div>
    </button>
  );
}
