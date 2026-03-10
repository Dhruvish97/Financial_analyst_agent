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
      <div className="mb-8">
        <p className="text-orange-400 text-xs font-mono font-semibold uppercase tracking-widest mb-2">
          Digital Assets
        </p>
        <h1 className="text-3xl font-bold text-white mb-3">Crypto Portfolio</h1>
        <p className="text-gray-400 max-w-2xl">
          A moderately aggressive digital assets portfolio anchored in Bitcoin and Ethereum,
          with selective exposure to high-upside Layer 1 protocols and DeFi infrastructure.
        </p>
      </div>

      {/* Stats + Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 grid grid-cols-3 gap-4">
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
            <p className="text-gray-500 text-xs uppercase tracking-wider">Holdings</p>
            <p className="text-white text-2xl font-bold font-mono mt-1">{CRYPTO_PORTFOLIO.length}</p>
          </div>
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
            <p className="text-gray-500 text-xs uppercase tracking-wider">Strategy</p>
            <p className="text-white text-lg font-bold mt-1">Mod. Aggressive</p>
          </div>
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
            <p className="text-gray-500 text-xs uppercase tracking-wider">BTC Dominance</p>
            <p className="text-white text-lg font-bold mt-1 font-mono">40%</p>
          </div>
        </div>
        <div>
          <AllocationDonut data={donutData} title="Crypto" />
        </div>
      </div>

      {/* Table */}
      <CryptoTable />
    </div>
  );
}
