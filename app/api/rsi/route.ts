import { NextRequest, NextResponse } from "next/server";
import { fetchRSI } from "@/lib/yahoo-finance";
import { ALL_STOCK_TICKERS } from "@/constants/all-portfolios";

export const dynamic = "force-dynamic";
export const maxDuration = 30; // RSI fetches 45 days of historical data — needs extra headroom

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tickersParam = searchParams.get("tickers");
  const tickers = tickersParam ? tickersParam.split(",") : ALL_STOCK_TICKERS;

  try {
    const data = await fetchRSI(tickers);
    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("[api/rsi] Failed to fetch RSI data:", error);
    return NextResponse.json({ error: "Failed to fetch RSI" }, { status: 500 });
  }
}
