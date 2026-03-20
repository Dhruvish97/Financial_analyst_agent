"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ALL_PORTFOLIOS } from "@/constants/all-portfolios";
import { CRYPTO_PORTFOLIO } from "@/constants/crypto-data";
import { useFearGreed } from "@/hooks/useFearGreed";
import { useStockPrices } from "@/hooks/useStockPrices";

const FearGreedGauge = dynamic(
  () => import("@/components/widgets/FearGreedGauge").then((m) => m.FearGreedGauge),
  { ssr: false }
);

const MARKET_TICKERS = ["^GSPC", "^IXIC", "^DJI", "^VIX"];
const MARKET_LABELS: Record<string, string> = {
  "^GSPC": "S&P 500",
  "^IXIC": "NASDAQ",
  "^DJI": "DOW",
  "^VIX": "VIX",
};
const MARKET_COLORS: Record<string, string> = {
  "^GSPC": "#00d4ff",
  "^IXIC": "#a78bfa",
  "^DJI": "#00e5a0",
  "^VIX": "#fb923c",
};

export default function DashboardPage() {
  const { fearGreed, loadingFearGreed } = useFearGreed();
  const { prices, loading: loadingMarket } = useStockPrices();

  const totalStockHoldings = ALL_PORTFOLIOS.reduce((s, p) => s + p.holdings.length, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className="mb-10 animate-fade-in-up">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-1 h-5 rounded-full" style={{ background: "linear-gradient(180deg, #00e5a0, #00d4ff)" }} />
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em]" style={{ color: "#00e5a0" }}>
            Analyst Research · Live Intelligence
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 leading-[1.05]">
          <span className="text-white">Financial </span>
          <span className="text-gradient-mint">Analyst</span>
          <br />
          <span className="text-white">Agent</span>
        </h1>

        <p className="text-base max-w-2xl leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
          Four institutional-grade stock portfolios and a digital assets portfolio.
          Live prices, RSI, valuation metrics and market sentiment — all in one place.
        </p>
      </div>

      {/* ── Market Indices ────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 animate-fade-in-up-1">
        {MARKET_TICKERS.map((ticker) => {
          const lp = prices[ticker];
          const loaded = !loadingMarket && !!lp?.price;
          const isUp = (lp?.changePercent ?? 0) >= 0;
          const accent = MARKET_COLORS[ticker];
          const changeColor = !loaded ? "rgba(255,255,255,0.2)" : isUp ? "#00e5a0" : "#ff4d6a";

          return (
            <div
              key={ticker}
              className="rounded-xl glass glass-hover transition-all duration-300 hover:scale-[1.02] p-4 relative overflow-hidden"
            >
              {/* Top color strip */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: `linear-gradient(90deg, transparent, ${accent}80, transparent)` }}
              />

              <p
                className="text-[10px] font-mono font-bold uppercase tracking-[0.12em] mb-1.5"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                {MARKET_LABELS[ticker]}
              </p>

              {!loaded ? (
                <p className="font-mono text-2xl font-bold animate-pulse" style={{ color: "rgba(255,255,255,0.15)" }}>—</p>
              ) : (
                <>
                  <p className="text-white font-mono text-2xl font-black tabular-nums leading-none">
                    {lp!.price!.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                  </p>
                  <p className="font-mono text-xs font-bold mt-1.5 tabular-nums" style={{ color: changeColor }}>
                    {isUp ? "▲ +" : "▼ "}{lp!.changePercent?.toFixed(2)}%
                  </p>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Main grid: Fear & Greed + Cards ───────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">

        {/* Fear & Greed gauge */}
        <div className="animate-fade-in-up-1">
          <FearGreedGauge data={fearGreed} loading={loadingFearGreed} />
        </div>

        {/* Stocks card */}
        <div
          className="rounded-2xl p-6 relative overflow-hidden animate-fade-in-up-2"
          style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.14)" }}
        >
          <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, #00d4ff80, transparent)" }} />

          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.14em] mb-1" style={{ color: "#00d4ff80" }}>
                Equities
              </p>
              <h2 className="text-xl font-bold text-white">4 Stock Portfolios</h2>
            </div>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
              style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)" }}
            >
              📈
            </div>
          </div>

          <div className="space-y-2 mb-5">
            {ALL_PORTFOLIOS.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between rounded-lg px-3 py-2"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#00d4ff" }} />
                  <span className="text-white text-xs font-semibold">{p.name}</span>
                </div>
                <span className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {p.holdings.length} holdings
                </span>
              </div>
            ))}
          </div>

          <div className="text-[11px] mb-4" style={{ color: "rgba(255,255,255,0.25)" }}>
            {totalStockHoldings} total positions · Live prices + RSI + P/E
          </div>

          <Link
            href="/stocks"
            className="flex items-center justify-center w-full py-2.5 rounded-xl font-semibold text-sm transition-all"
            style={{
              background: "rgba(0,212,255,0.12)",
              border: "1px solid rgba(0,212,255,0.28)",
              color: "#00d4ff",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(0,212,255,0.2)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(0,212,255,0.12)";
            }}
          >
            View Stock Portfolios →
          </Link>
        </div>

        {/* Crypto card */}
        <div
          className="rounded-2xl p-6 relative overflow-hidden animate-fade-in-up-3"
          style={{ background: "rgba(255,107,43,0.04)", border: "1px solid rgba(255,107,43,0.14)" }}
        >
          <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, #ff6b2b80, transparent)" }} />

          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.14em] mb-1" style={{ color: "#ff6b2b80" }}>
                Digital Assets
              </p>
              <h2 className="text-xl font-bold text-white">Crypto Portfolio</h2>
            </div>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
              style={{ background: "rgba(255,107,43,0.1)", border: "1px solid rgba(255,107,43,0.2)" }}
            >
              ₿
            </div>
          </div>

          <div className="space-y-2 mb-5">
            {CRYPTO_PORTFOLIO.slice(0, 5).map((c) => (
              <div key={c.ticker} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                  <span className="font-mono text-sm font-semibold" style={{ color: c.color }}>{c.displayTicker}</span>
                </div>
                <span className="font-mono text-sm text-white font-bold">{c.allocation}%</span>
              </div>
            ))}
            {CRYPTO_PORTFOLIO.length > 5 && (
              <p className="text-[11px] pl-3.5" style={{ color: "rgba(255,255,255,0.25)" }}>
                +{CRYPTO_PORTFOLIO.length - 5} more
              </p>
            )}
          </div>

          <Link
            href="/crypto"
            className="flex items-center justify-center w-full py-2.5 rounded-xl font-semibold text-sm transition-all"
            style={{
              background: "rgba(255,107,43,0.12)",
              border: "1px solid rgba(255,107,43,0.28)",
              color: "#ff6b2b",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,107,43,0.2)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,107,43,0.12)";
            }}
          >
            View Crypto Portfolio →
          </Link>
        </div>
      </div>

      {/* ── Quick nav tiles ────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 animate-fade-in-up-3">
        {[
          { href: "/stocks",            label: "Stock Portfolios",  sub: "4 strategies",   color: "#00d4ff", icon: "📊" },
          { href: "/crypto",            label: "Digital Assets",    sub: "6 holdings",      color: "#ff6b2b", icon: "₿" },
          { href: "/india",             label: "India Market",      sub: "10 NSE stocks",   color: "#fb923c", icon: "🇮🇳" },
          { href: "/portfolio-compare", label: "AI Advisor",        sub: "Upload & analyse",color: "#a78bfa", icon: "🧠" },
        ].map(({ href, label, sub, color, icon }) => (
          <Link
            key={href}
            href={href}
            className="rounded-xl p-4 glass glass-hover transition-all hover:scale-[1.02] flex items-center gap-3"
          >
            <span
              className="w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0"
              style={{ background: `${color}14`, border: `1px solid ${color}28` }}
            >
              {icon}
            </span>
            <div>
              <p className="text-white font-semibold text-xs leading-tight">{label}</p>
              <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{sub}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Disclaimer ────────────────────────────────────────── */}
      <div
        className="rounded-xl p-4"
        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.28)" }}>
          <span style={{ color: "rgba(255,255,255,0.45)" }} className="font-semibold">Disclaimer: </span>
          This is for informational purposes only and does not constitute financial advice.
          Past performance is not indicative of future results. Always conduct your own research before investing.
        </p>
      </div>
    </div>
  );
}
