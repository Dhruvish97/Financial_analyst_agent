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

const btcDominance = CRYPTO_PORTFOLIO.find((c) => c.displayTicker === "BTC")?.allocation ?? 40;

export default function CryptoPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

      {/* Header */}
      <div className="mb-8 animate-fade-in-up">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-1 h-5 rounded-full" style={{ background: "linear-gradient(180deg, #ff6b2b, #fbbf24)" }} />
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em]" style={{ color: "#ff6b2b" }}>
            Digital Assets
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
          <span className="text-white">Crypto </span>
          <span className="text-gradient-orange">Portfolio</span>
        </h1>
        <p className="text-sm max-w-2xl" style={{ color: "rgba(255,255,255,0.4)" }}>
          A moderately aggressive digital assets portfolio anchored in Bitcoin and Ethereum,
          with selective exposure to high-upside Layer 1 protocols and DeFi infrastructure.
        </p>
      </div>

      {/* Stats + Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8 animate-fade-in-up-1">
        <div className="lg:col-span-2 grid grid-cols-3 gap-4">
          {[
            { label: "Holdings",     value: CRYPTO_PORTFOLIO.length.toString(), color: "#ff6b2b" },
            { label: "Strategy",     value: "Mod. Aggressive",                  color: "#fbbf24", small: true },
            { label: "BTC Weight",   value: `${btcDominance}%`,                 color: "#f59e0b" },
          ].map(({ label, value, color, small }) => (
            <div
              key={label}
              className="rounded-xl p-4 relative overflow-hidden"
              style={{ background: `${color}08`, border: `1px solid ${color}20` }}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }} />
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.12em] mb-1.5" style={{ color: `${color}80` }}>
                {label}
              </p>
              <p className={`font-black font-mono tabular-nums leading-none ${small ? "text-lg" : "text-2xl"}`} style={{ color }}>
                {value}
              </p>
            </div>
          ))}
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
