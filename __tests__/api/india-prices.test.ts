/**
 * @jest-environment node
 */
import { GET } from "@/app/api/india-prices/route";
import YahooFinance from "yahoo-finance2";

jest.mock("yahoo-finance2");

const yf = (
  YahooFinance as jest.Mock & {
    __instance: { quote: jest.Mock; chart: jest.Mock };
  }
).__instance;

beforeEach(() => jest.clearAllMocks());

describe("GET /api/india-prices", () => {
  it("returns a price map on success", async () => {
    yf.quote.mockResolvedValue({
      regularMarketPrice: 2850,
      regularMarketChange: 30,
      regularMarketChangePercent: 1.06,
      marketCap: 19e12,
      regularMarketVolume: 5e6,
      trailingPE: 25,
      forwardPE: 22,
      beta: 0.9,
      fiftyTwoWeekLow: 2200,
      fiftyTwoWeekHigh: 3100,
      earningsTimestamp: undefined,
    });

    const res = await GET();
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(typeof json).toBe("object");
    expect(Object.keys(json).length).toBeGreaterThan(0);
  });

  it("returns fetch_failed entries when quote throws", async () => {
    yf.quote.mockRejectedValue(new Error("NSE error"));

    const res = await GET();
    expect(res.status).toBe(200);
    const json = await res.json();
    const values = Object.values(json) as { error?: string }[];
    expect(values.every((v) => v.error === "fetch_failed")).toBe(true);
  });

  it("sets Cache-Control: no-store header", async () => {
    yf.quote.mockResolvedValue({
      regularMarketPrice: 1000,
      regularMarketChange: 0,
      regularMarketChangePercent: 0,
      marketCap: null,
      regularMarketVolume: null,
      trailingPE: null,
      forwardPE: null,
      beta: null,
      fiftyTwoWeekLow: null,
      fiftyTwoWeekHigh: null,
      earningsTimestamp: undefined,
    });

    const res = await GET();
    expect(res.headers.get("Cache-Control")).toBe("no-store");
  });
});
