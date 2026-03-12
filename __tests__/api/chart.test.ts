/**
 * @jest-environment node
 */
import { GET } from "@/app/api/chart/route";
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

describe("GET /api/chart", () => {
  it("returns 400 when ticker param is missing", async () => {
    const res = await GET(makeReq("http://localhost/api/chart"));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Missing ticker");
  });

  it("returns chart data for a valid ticker", async () => {
    yf.chart.mockResolvedValue({
      quotes: [
        { date: new Date("2024-01-01"), close: 150.5 },
        { date: new Date("2024-01-02"), close: 152.0 },
      ],
    });

    const res = await GET(makeReq("http://localhost/api/chart?ticker=AAPL&period=3m"));
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.ticker).toBe("AAPL");
    expect(json.period).toBe("3m");
    expect(json.points).toHaveLength(2);
    expect(json.points[0]).toEqual({ date: "2024-01-01", close: 150.5 });
    expect(json.points[1]).toEqual({ date: "2024-01-02", close: 152 });
  });

  it("filters out quotes with null close", async () => {
    yf.chart.mockResolvedValue({
      quotes: [
        { date: new Date("2024-01-01"), close: null },
        { date: new Date("2024-01-02"), close: 152.0 },
      ],
    });

    const res = await GET(makeReq("http://localhost/api/chart?ticker=AAPL"));
    const json = await res.json();
    expect(json.points).toHaveLength(1);
    expect(json.points[0].close).toBe(152);
  });

  it("returns 500 when yf.chart throws", async () => {
    yf.chart.mockRejectedValue(new Error("Yahoo Finance error"));

    const res = await GET(makeReq("http://localhost/api/chart?ticker=AAPL"));
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.error).toBe("Chart data unavailable");
  });

  it("defaults to 3m period when period param is missing", async () => {
    yf.chart.mockResolvedValue({ quotes: [] });

    await GET(makeReq("http://localhost/api/chart?ticker=AAPL"));

    // 3m = 90 days
    const callArgs = yf.chart.mock.calls[0];
    const period1: Date = callArgs[1].period1;
    const diffDays = (Date.now() - period1.getTime()) / (1000 * 60 * 60 * 24);
    expect(diffDays).toBeCloseTo(90, 0);
  });

  it("uses weekly interval for 1y period", async () => {
    yf.chart.mockResolvedValue({ quotes: [] });

    await GET(makeReq("http://localhost/api/chart?ticker=AAPL&period=1y"));

    const callArgs = yf.chart.mock.calls[0];
    expect(callArgs[1].interval).toBe("1wk");
  });

  it("rounds close prices to 2 decimal places", async () => {
    yf.chart.mockResolvedValue({
      quotes: [{ date: new Date("2024-01-01"), close: 150.5678 }],
    });

    const res = await GET(makeReq("http://localhost/api/chart?ticker=AAPL"));
    const json = await res.json();
    expect(json.points[0].close).toBe(150.57);
  });
});
