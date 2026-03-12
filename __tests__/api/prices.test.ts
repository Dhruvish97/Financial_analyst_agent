/**
 * @jest-environment node
 */
import { GET } from "@/app/api/prices/route";
import YahooFinance from "yahoo-finance2";

jest.mock("yahoo-finance2");

const yf = (
  YahooFinance as jest.Mock & {
    __instance: { quote: jest.Mock; chart: jest.Mock };
  }
).__instance;

beforeEach(() => jest.clearAllMocks());

describe("GET /api/prices", () => {
  it("returns a price map on success", async () => {
    yf.quote.mockResolvedValue({
      regularMarketPrice: 175,
      regularMarketChange: 2,
      regularMarketChangePercent: 1.15,
      marketCap: 2.8e12,
      regularMarketVolume: 55e6,
      trailingPE: 28,
      forwardPE: 25,
      beta: 1.1,
      fiftyTwoWeekLow: 140,
      fiftyTwoWeekHigh: 200,
      earningsTimestamp: undefined,
    });

    const res = await GET();
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(typeof json).toBe("object");
  });

  it("returns price map with fetch_failed when quote throws", async () => {
    yf.quote.mockRejectedValue(new Error("Yahoo Finance down"));

    // fetchQuotes uses Promise.allSettled — individual failures produce error entries
    const res = await GET();
    expect(res.status).toBe(200);
    const json = await res.json();
    const values = Object.values(json) as { error?: string }[];
    expect(values.every((v) => v.error === "fetch_failed")).toBe(true);
  });

  it("sets Cache-Control: no-store header", async () => {
    yf.quote.mockResolvedValue({
      regularMarketPrice: 100,
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
