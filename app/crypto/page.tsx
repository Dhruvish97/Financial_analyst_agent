"use client";
import dynamic from "next/dynamic";
import { CryptoTable } from "@/components/crypto/CryptoTable";
import { CRYPTO_PORTFOLIO } from "@/constants/crypto-data";

const AllocationDonut = dynamic(
  () => import("@/components/charts/AllocationDonut").then((m) => m.AllocationDonut),
  { ssr: false }
);

const donutData = CRYPTO_PORTFOLIO.map((c) => ({
  name: c.displayTicker,
  value: c.allocation,
  color: c.color,
}));

export default function CryptoPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8 animate-fade-in-up relative">
        {/* Ambient glow */}
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-2 mb-2">
          <span className="w-5 h-px bg-gradient-to-r from-orange-400 to-orange-600" />
          <p className="text-orange-400 text-xs font-mono font-semibold uppercase tracking-widest">
            Digital Assets
          </p>
        </div>
        <h1 className="text-3xl font-bold mb-3">
          <span className="text-white">Crypto </span>
          <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">Portfolio</span>
        </h1>
        <p className="text-gray-400 max-w-2xl">
          A moderately aggressive digital assets portfolio anchored in Bitcoin and Ethereum,
          with selective exposure to high-upside Layer 1 protocols and DeFi infrastructure.
        </p>
      </div>

      {/* Stats + Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 animate-fade-in-up-1">
        <div className="lg:col-span-2 grid grid-cols-3 gap-4">
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 relative overflow-hidden border-l-2 border-l-orange-500">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />
            <p className="text-gray-500 text-xs uppercase tracking-wider">Holdings</p>
            <p className="text-orange-400 text-2xl font-bold font-mono mt-1">{CRYPTO_PORTFOLIO.length}</p>
          </div>
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 relative overflow-hidden border-l-2 border-l-amber-500">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
            <p className="text-gray-500 text-xs uppercase tracking-wider">Strategy</p>
            <p className="text-amber-400 text-lg font-bold mt-1">Mod. Aggressive</p>
          </div>
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 relative overflow-hidden border-l-2 border-l-yellow-500">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-500/60 to-transparent" />
            <p className="text-gray-500 text-xs uppercase tracking-wider">BTC Dominance</p>
            <p className="text-yellow-400 text-2xl font-bold mt-1 font-mono">40%</p>
          </div>
        </div>
        <div>
          <AllocationDonut data={donutData} title="Crypto" />
        </div>
      </div>

      {/* Table */}
      <div className="animate-fade-in-up-2">
        <CryptoTable />
      </div>
    </div>
  );
}
