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
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Page header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 animate-fade-in-up relative">
          {/* Ambient glow */}
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-px bg-gradient-to-r from-blue-400 to-blue-600" />
              <p className="text-blue-400 text-xs font-mono font-semibold uppercase tracking-widest">
                Equities
              </p>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              <span className="text-white">Stock </span>
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Portfolios</span>
            </h1>
            <p className="text-gray-400 mt-1 text-sm">
              Four distinct strategies — click any portfolio to explore holdings &amp; live prices.
            </p>
          </div>

          {/* Status bar */}
          <div className="flex items-center gap-3 text-xs text-gray-500 shrink-0">
            {error && (
              <span className="text-red-400 bg-red-900/20 border border-red-800 rounded-lg px-3 py-1.5">
                {error}
              </span>
            )}
            {lastUpdated && !error && (
              <span className="text-gray-600">
                Updated {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            <button
              onClick={refetch}
              disabled={loading}
              className="bg-gray-800 hover:bg-gray-700 disabled:opacity-40 border border-gray-700 hover:border-blue-700 rounded-lg px-3 py-1.5 text-gray-300 hover:text-white transition-all"
            >
              {loading ? "Refreshing…" : "↻ Refresh"}
            </button>
          </div>
        </div>

        {/* 2×2 Portfolio grid */}
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
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-600">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            ETF — Exchange-Traded Fund
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            Stock — Individual equity
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Bond — Fixed income
          </div>
          <div className="ml-auto text-gray-700">Prices auto-refresh every 60s</div>
        </div>
      </div>

      {/* Detail modal */}
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
