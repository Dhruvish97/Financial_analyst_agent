import { NextResponse } from "next/server";
import { fetchQuotes } from "@/lib/yahoo-finance";
import { INDIA_TICKERS } from "@/constants/india-stocks";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

// NSE index tickers for India market overview
const INDIA_INDICES = ["^NSEI", "^BSESN"];

export async function GET() {
  try {
    const data = await fetchQuotes([...INDIA_TICKERS, ...INDIA_INDICES]);
    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("[api/india-prices] Failed:", error);
    return NextResponse.json({ error: "Failed to fetch India prices" }, { status: 500 });
  }
}
