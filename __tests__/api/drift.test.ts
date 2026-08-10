/**
 * @jest-environment node
 */
import { GET } from "@/app/api/drift/route";
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

describe("GET /api/drift", () => {
  it("rejects an unknown portfolio id with 400", async () => {
    const res = await GET(makeReq("http://localhost/api/drift?portfolio=not-a-real-portfolio"));
    expect(res.status).toBe(400);
    expect(yf.chart).not.toHaveBeenCalled();
  });

  it("rejects a missing portfolio param with 400", async () => {
    const res = await GET(makeReq("http://localhost/api/drift"));
    expect(res.status).toBe(400);
  });

  it("never forwards client-supplied tickers — only whitelisted portfolio ids resolve holdings", async () => {
    yf.chart.mockResolvedValue({ quotes: [] });
    // Attempt to smuggle a ticker list via the portfolio param — must still 400.
    const res = await GET(makeReq("http://localhost/api/drift?portfolio=AAPL,MSFT"));
    expect(res.status).toBe(400);
    expect(yf.chart).not.toHaveBeenCalled();
  });

  it("returns drift for a valid portfolio id", async () => {
    yf.chart.mockResolvedValue({
      quotes: [
        { date: new Date(2026, 0, 1), close: 100 },
        { date: new Date(2026, 0, 90), close: 110 },
      ],
    });

    const res = await GET(makeReq("http://localhost/api/drift?portfolio=stocks"));
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.portfolioId).toBe("stocks");
    expect(json.lookbackDays).toBe(90);
    expect(Array.isArray(json.drift)).toBe(true);
    expect(json.drift.length).toBeGreaterThan(0);
    expect(json.drift[0]).toHaveProperty("ticker");
    expect(json.drift[0]).toHaveProperty("targetPct");
    expect(json.drift[0]).toHaveProperty("currentPct");
    expect(json.drift[0]).toHaveProperty("status");
  });

  it("resolves india holdings for portfolio=india", async () => {
    yf.chart.mockResolvedValue({ quotes: [{ date: new Date(), close: 100 }] });

    const res = await GET(makeReq("http://localhost/api/drift?portfolio=india"));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.portfolioId).toBe("india");
    expect(json.drift.length).toBe(10);
  });

  it("marks holdings unknown (not 500) when chart fetch fails", async () => {
    yf.chart.mockRejectedValue(new Error("fail"));

    const res = await GET(makeReq("http://localhost/api/drift?portfolio=house"));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.drift.every((d: { status: string }) => d.status === "unknown")).toBe(true);
  });

  it("sets Cache-Control: no-store header", async () => {
    yf.chart.mockResolvedValue({ quotes: [] });
    const res = await GET(makeReq("http://localhost/api/drift?portfolio=401k"));
    expect(res.headers.get("Cache-Control")).toBe("no-store");
  });
});
