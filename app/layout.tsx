import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Financial Analyst Agent",
  description:
    "Real-time financial dashboard with curated moderately aggressive stock and crypto portfolios. Live prices refresh every 60 seconds.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-950">
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
        {/* Global disclaimer — every page shows this, so no route can ship
            ticker-level allocations without it. */}
        <footer
          className="px-4 py-6 text-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p
            className="max-w-3xl mx-auto text-[11px] leading-relaxed"
            style={{ color: "rgba(255,255,255,0.28)" }}
          >
            <strong style={{ color: "rgba(255,255,255,0.4)" }}>Disclaimer:</strong>{" "}
            This project is a personal software portfolio piece, built for
            educational and demonstration purposes only. The portfolios shown are
            illustrative examples — not real holdings, and not a record of any
            actual account. Nothing here is financial advice or a solicitation to
            buy or sell any security. Market data may be delayed or inaccurate.
            Always do your own research and consult a licensed financial advisor
            before investing.
          </p>
        </footer>
      </body>
    </html>
  );
}
