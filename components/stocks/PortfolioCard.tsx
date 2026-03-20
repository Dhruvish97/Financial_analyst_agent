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
  cx = 0, cy = 0, midAngle = 0,
  innerRadius = 0, outerRadius = 0,
  percent = 0, name = "",
}: CustomLabelProps) {
  if (percent < 0.07) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="rgba(255,255,255,0.9)" textAnchor="middle"
      dominantBaseline="central" fontSize={9} fontWeight={700} fontFamily="monospace">
      {name}
    </text>
  );
}

interface TooltipPayload {
  name: string;
  value: number;
  payload: { color: string; rationale: string };
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div
      className="rounded-xl p-3 text-xs max-w-52 shadow-2xl"
      style={{ background: "rgba(15,14,24,0.96)", border: "1px solid rgba(255,255,255,0.12)" }}
    >
      <p className="font-bold text-white mb-1 font-mono">{item.name} — {item.value}%</p>
      <p className="leading-snug" style={{ color: "rgba(255,255,255,0.5)" }}>{item.payload.rationale}</p>
    </div>
  );
}

// Map portfolio id → section glow color
const PORTFOLIO_ACCENT: Record<string, string> = {
  stocks:   "#ff6b6b",
  "roth-ira": "#00e5a0",
  "401k":   "#00d4ff",
  house:    "#a78bfa",
};

interface PortfolioCardProps {
  portfolio: PortfolioDefinition;
  prices: PriceMap;
  loadingPrices: boolean;
  onClick: () => void;
}

export function PortfolioCard({ portfolio, prices, loadingPrices, onClick }: PortfolioCardProps) {
  const chartData = portfolio.holdings.map((h) => ({
    name: h.ticker,
    value: h.allocation,
    color: h.color,
    rationale: h.rationale,
  }));

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
  const accent = PORTFOLIO_ACCENT[portfolio.id] ?? "#00d4ff";
  const changeColor = weightedChange === null ? "rgba(255,255,255,0.3)" : isPositive ? "#00e5a0" : "#ff4d6a";

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-2xl glass glass-hover transition-all duration-300 hover:scale-[1.018] group focus-visible:outline-none focus-visible:ring-2"
      style={{}}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 1px ${accent}30, 0 16px 56px ${accent}12`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "";
      }}
      aria-label={`View ${portfolio.name} portfolio details`}
    >
      {/* Top accent bar */}
      <div
        className="rounded-t-2xl h-[2px] w-full"
        style={{ background: `linear-gradient(90deg, transparent 0%, ${accent} 40%, ${accent} 60%, transparent 100%)` }}
      />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.14em] font-semibold mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>
              {portfolio.accountType}
            </p>
            <h2 className="text-xl font-bold text-white leading-tight">{portfolio.name}</h2>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span
              className="text-[10px] font-bold px-2.5 py-1 rounded-full"
              style={{
                color: accent,
                background: `${accent}18`,
                border: `1px solid ${accent}35`,
              }}
            >
              {portfolio.riskLevel}
            </span>
            <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.28)" }}>{portfolio.timeHorizon}</span>
          </div>
        </div>

        {/* Donut chart */}
        <div className="h-40 w-full" aria-hidden="true">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%" cy="50%"
                innerRadius={42} outerRadius={70}
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

        {/* Stats */}
        <div className="mt-3 space-y-2.5">
          {/* Top performers */}
          {!loadingPrices && (
            <div className="flex gap-1.5 flex-wrap">
              {portfolio.holdings
                .map((h) => ({ h, cp: prices[h.ticker]?.changePercent ?? null }))
                .filter((x) => x.cp !== null)
                .sort((a, b) => b.cp! - a.cp!)
                .slice(0, 4)
                .map(({ h, cp }) => (
                  <span
                    key={h.ticker}
                    className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                    style={
                      cp! >= 0
                        ? { color: "#00e5a0", background: "rgba(0,229,160,0.1)", border: "1px solid rgba(0,229,160,0.18)" }
                        : { color: "#ff4d6a", background: "rgba(255,77,106,0.1)", border: "1px solid rgba(255,77,106,0.18)" }
                    }
                  >
                    {h.ticker} {cp! >= 0 ? "+" : ""}{cp!.toFixed(1)}%
                  </span>
                ))}
            </div>
          )}

          {/* Footer row */}
          <div className="flex items-center justify-between pt-1" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>
              {portfolio.holdings.length} holdings
            </span>

            {loadingPrices ? (
              <span className="text-xs animate-pulse" style={{ color: "rgba(255,255,255,0.2)" }}>Loading…</span>
            ) : weightedChange !== null ? (
              <span className="font-mono font-bold text-sm" style={{ color: changeColor }}>
                {isPositive ? "+" : ""}{weightedChange.toFixed(2)}% today
              </span>
            ) : (
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>No price data</span>
            )}

            <span className="text-[10px] uppercase tracking-wider transition-colors group-hover:text-white/60"
              style={{ color: "rgba(255,255,255,0.25)" }}>
              View →
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
