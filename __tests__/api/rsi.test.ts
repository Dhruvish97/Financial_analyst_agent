/**
 * @jest-environment node
 */
import { GET } from "@/app/api/rsi/route";
import { NextRequest } from "next/server";
import YahooFinance from "yahoo-finance2";

jest.mock("yahoo-finance2");

const yf = (
  YahooFinance as jest.Mock & {
    __instance: { quote: jest.Mock; chart: jest.Mock };
  }
).__instance;

beforeEach(() => jest.clearAllMocks());

function makeReq(url: string) {
  return new NextRequest(new URL(url, "http://localhost"));
}

describe("GET /api/rsi", () => {
  it("returns RSI values for requested tickers", async () => {
    const closes = Array.from({ length: 20 }, (_, i) => 100 + i * 2);
    yf.chart.mockResolvedValue({
      quotes: closes.map((c, i) => ({ date: new Date(2024, 0, i + 1), close: c })),
    });

    const res = await GET(makeReq("http://localhost/api/rsi?tickers=AAPL,MSFT"));
    expect(res.status).toBe(200);

    const json = await res.json();
    expect("AAPL" in json).toBe(true);
    expect("MSFT" in json).toBe(true);
  });

  it("returns null RSI when chart fetch fails", async () => {
    yf.chart.mockRejectedValue(new Error("fail"));

    const res = await GET(makeReq("http://localhost/api/rsi?tickers=BAD"));
    const json = await res.json();
    expect(json["BAD"]).toBeNull();
  });

  it("sets Cache-Control: no-store header", async () => {
    yf.chart.mockResolvedValue({ quotes: [] });

    const res = await GET(makeReq("http://localhost/api/rsi?tickers=AAPL"));
    expect(res.headers.get("Cache-Control")).toBe("no-store");
  });

  it("uses default tickers when tickers param is missing", async () => {
    yf.chart.mockResolvedValue({ quotes: [] });

    const res = await GET(makeReq("http://localhost/api/rsi"));
    expect(res.status).toBe(200);
    // Should return a non-empty map using ALL_STOCK_TICKERS
    const json = await res.json();
    expect(typeof json).toBe("object");
    expect(Object.keys(json).length).toBeGreaterThan(0);
  });
});
