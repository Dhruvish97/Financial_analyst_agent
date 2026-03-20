"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { useStockPrices } from "@/hooks/useStockPrices";
import { ALL_PORTFOLIOS } from "@/constants/all-portfolios";
import { PortfolioDefinition } from "@/types/portfolio";

const PortfolioCard = dynamic(
  () => import("@/components/stocks/PortfolioCard").then((m) => m.PortfolioCard),
  { ssr: false }
);

const PortfolioDetailModal = dynamic(
  () => import("@/components/stocks/PortfolioDetailModal").then((m) => m.PortfolioDetailModal),
  { ssr: false }
);

export default function StocksPage() {
  const { prices, loading, lastUpdated, error, refetch } = useStockPrices();
  const [selectedPortfolio, setSelectedPortfolio] = useState<PortfolioDefinition | null>(null);

  const handleCardClick = useCallback((portfolio: PortfolioDefinition) => {
    setSelectedPortfolio(portfolio);
  }, []);

  const handleModalClose = useCallback(() => {
    setSelectedPortfolio(null);
  }, []);

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 animate-fade-in-up">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-1 h-5 rounded-full" style={{ background: "linear-gradient(180deg, #00d4ff, #818cf8)" }} />
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em]" style={{ color: "#00d4ff" }}>
                Equities
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
              <span className="text-white">Stock </span>
              <span className="text-gradient-cyan">Portfolios</span>
            </h1>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              Four distinct strategies — click any portfolio to explore holdings &amp; live prices.
            </p>
          </div>

          {/* Status bar */}
          <div className="flex items-center gap-3 text-xs shrink-0">
            {error && (
              <span
                className="rounded-lg px-3 py-1.5 text-xs"
                style={{ color: "#ff4d6a", background: "rgba(255,77,106,0.1)", border: "1px solid rgba(255,77,106,0.2)" }}
              >
                {error}
              </span>
            )}
            {lastUpdated && !error && (
              <span className="font-mono text-[11px]" style={{ color: "rgba(255,255,255,0.25)" }}>
                {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            <button
              onClick={refetch}
              disabled={loading}
              className="rounded-lg px-3 py-1.5 text-xs font-medium transition-all disabled:opacity-40"
              style={{
                background: "rgba(0,212,255,0.08)",
                border: "1px solid rgba(0,212,255,0.22)",
                color: "#00d4ff",
              }}
            >
              {loading ? "Refreshing…" : "↻ Refresh"}
            </button>
          </div>
        </div>

        {/* 2×2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in-up-1">
          {ALL_PORTFOLIOS.map((portfolio) => (
            <PortfolioCard
              key={portfolio.id}
              portfolio={portfolio}
              prices={prices}
              loadingPrices={loading}
              onClick={() => handleCardClick(portfolio)}
            />
          ))}
        </div>

        {/* Legend */}
        <div
          className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs animate-fade-in-up-2"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          {[
            { color: "#00d4ff", label: "ETF — Exchange-Traded Fund" },
            { color: "#a78bfa", label: "Stock — Individual equity" },
            { color: "#fb923c", label: "Bond — Fixed income" },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              {label}
            </div>
          ))}
          <div className="ml-auto" style={{ color: "rgba(255,255,255,0.18)" }}>Prices auto-refresh every 60s</div>
        </div>
      </div>

      {selectedPortfolio && (
        <PortfolioDetailModal
          portfolio={selectedPortfolio}
          prices={prices}
          loadingPrices={loading}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}
