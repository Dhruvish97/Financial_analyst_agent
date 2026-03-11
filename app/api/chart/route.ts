import { NextRequest, NextResponse } from "next/server";
import YahooFinance from "yahoo-finance2";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const yf = new YahooFinance({ suppressNotices: ["yahooSurvey"] });

const PERIOD_CONFIG = {
  "1w": { days: 7,   interval: "1d"  as const },
  "1m": { days: 30,  interval: "1d"  as const },
  "3m": { days: 90,  interval: "1d"  as const },
  "1y": { days: 365, interval: "1wk" as const },
};

export async function GET(req: NextRequest) {
  const ticker = req.nextUrl.searchParams.get("ticker");
  const periodKey = (req.nextUrl.searchParams.get("period") ?? "3m") as keyof typeof PERIOD_CONFIG;

  if (!ticker) {
    return NextResponse.json({ error: "Missing ticker" }, { status: 400 });
  }

  const config = PERIOD_CONFIG[periodKey] ?? PERIOD_CONFIG["3m"];
  const period1 = new Date(Date.now() - config.days * 24 * 60 * 60 * 1000);

  try {
    const result = await yf.chart(ticker, {
      period1,
      period2: new Date(),
      interval: config.interval,
    });

    const points = (result.quotes ?? [])
      .filter((q) => q.close !== null && q.close !== undefined && q.date !== null)
      .map((q) => ({
        date: q.date!.toISOString().split("T")[0],
        close: Math.round(q.close! * 100) / 100,
      }));

    return NextResponse.json(
      { ticker, period: periodKey, points },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error(`[api/chart] Failed for ${ticker}:`, error);
    return NextResponse.json({ error: "Chart data unavailable" }, { status: 500 });
  }
}
