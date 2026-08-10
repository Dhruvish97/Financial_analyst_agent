import { NextRequest, NextResponse } from "next/server";
import { fetchReturns } from "@/lib/yahoo-finance";
import { calcHoldingDrift, HoldingDrift } from "@/lib/drift";
import { ALL_PORTFOLIOS } from "@/constants/all-portfolios";
import { INDIA_STOCKS } from "@/constants/india-stocks";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const LOOKBACK_DAYS = 90;

// Portfolio ids are resolved to holdings server-side from constants only — the client
// can never supply tickers or weights, so this endpoint can't be used to probe
// arbitrary historical data the way a ticker-accepting endpoint could be.
const PORTFOLIO_IDS = ["401k", "roth-ira", "house", "stocks", "india"] as const;
type PortfolioId = (typeof PORTFOLIO_IDS)[number];

function isPortfolioId(value: string | null): value is PortfolioId {
  return !!value && (PORTFOLIO_IDS as readonly string[]).includes(value);
}

function getHoldings(id: PortfolioId): { ticker: string; allocation: number }[] {
  if (id === "india") {
    return INDIA_STOCKS.map((s) => ({ ticker: s.ticker, allocation: s.allocation }));
  }
  const portfolio = ALL_PORTFOLIOS.find((p) => p.id === id);
  return portfolio ? portfolio.holdings.map((h) => ({ ticker: h.ticker, allocation: h.allocation })) : [];
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const portfolioParam = searchParams.get("portfolio");

  if (!isPortfolioId(portfolioParam)) {
    return NextResponse.json(
      { error: `Invalid portfolio. Must be one of: ${PORTFOLIO_IDS.join(", ")}` },
      { status: 400 }
    );
  }

  try {
    const holdings = getHoldings(portfolioParam);
    const returns = await fetchReturns(
      holdings.map((h) => h.ticker),
      LOOKBACK_DAYS
    );
    const drift: HoldingDrift[] = calcHoldingDrift(holdings, returns);

    return NextResponse.json(
      {
        portfolioId: portfolioParam,
        asOfDate: new Date().toISOString().split("T")[0],
        lookbackDays: LOOKBACK_DAYS,
        drift,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("[api/drift] Failed to compute drift:", error);
    return NextResponse.json({ error: "Failed to compute drift" }, { status: 500 });
  }
}
