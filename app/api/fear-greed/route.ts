import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const CNN_URL =
  "https://production.dataviz.cnn.io/index/fearandgreed/graphdata";

export async function GET() {
  try {
    const res = await fetch(CNN_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
        Referer: "https://money.cnn.com/",
      },
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      throw new Error(`CNN API returned ${res.status}`);
    }

    const json = await res.json();
    const fg = json.fear_and_greed;

    return NextResponse.json(
      {
        score: Math.round(fg.score),
        rating: fg.rating,
        previousClose: Math.round(fg.previous_close),
        previousWeek: Math.round(fg.previous_1_week),
        previousMonth: Math.round(fg.previous_1_month),
        previousYear: Math.round(fg.previous_1_year),
        lastUpdated: fg.timestamp,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("[api/fear-greed] Failed:", error);
    // Fallback — return a neutral value so UI doesn't break
    return NextResponse.json(
      {
        score: 50,
        rating: "Neutral",
        previousClose: 50,
        previousWeek: 50,
        previousMonth: 50,
        previousYear: 50,
        lastUpdated: new Date().toISOString(),
        fallback: true,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  }
}
