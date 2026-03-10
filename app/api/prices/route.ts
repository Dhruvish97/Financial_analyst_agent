import { NextResponse } from "next/server";
import { fetchQuotes } from "@/lib/yahoo-finance";
import { ALL_STOCK_TICKERS } from "@/constants/all-portfolios";

export const dynamic = "force-dynamic";
export const maxDuration = 30; // Vercel Pro: 300s, Hobby: capped at 10s (free tier safety net)

const MARKET_INDICES = ["^GSPC", "^IXIC", "^DJI", "^VIX"];

export async function GET() {
  try {
    const data = await fetchQuotes([...ALL_STOCK_TICKERS, ...MARKET_INDICES]);
    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("[api/prices] Failed to fetch stock prices:", error);
    return NextResponse.json({ error: "Failed to fetch prices" }, { status: 500 });
  }
}
