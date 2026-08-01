import { NextResponse } from "next/server";
import { fetchQuotes } from "@/lib/yahoo-finance";
import { CRYPTO_TICKERS } from "@/constants/crypto-data";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function GET() {
  try {
    const data = await fetchQuotes(CRYPTO_TICKERS);
    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("[api/crypto] Failed to fetch crypto prices:", error);
    return NextResponse.json({ error: "Failed to fetch prices" }, { status: 500 });
  }
}
