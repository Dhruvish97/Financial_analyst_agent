/**
 * @jest-environment node
 */
import { GET } from "@/app/api/crypto/route";
import YahooFinance from "yahoo-finance2";

jest.mock("yahoo-finance2");

const yf = (
  YahooFinance as jest.Mock & {
    __instance: { quote: jest.Mock; chart: jest.Mock };
  }
).__instance;

beforeEach(() => jest.clearAllMocks());

describe("GET /api/crypto", () => {
  it("returns crypto prices on success", async () => {
    yf.quote.mockResolvedValue({
      regularMarketPrice: 65000,
      regularMarketChange: 500,
      regularMarketChangePercent: 0.78,
      marketCap: 1.2e12,
      regularMarketVolume: 30e9,
      trailingPE: null,
      forwardPE: null,
      beta: null,
      fiftyTwoWeekLow: 40000,
      fiftyTwoWeekHigh: 73000,
      earningsTimestamp: undefined,
    });

    const res = await GET();
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(typeof json).toBe("object");
    expect(Object.keys(json).length).toBeGreaterThan(0);
  });

  it("returns fetch_failed entries when quote throws", async () => {
    yf.quote.mockRejectedValue(new Error("timeout"));

    const res = await GET();
    expect(res.status).toBe(200);
    const json = await res.json();
    const values = Object.values(json) as { error?: string }[];
    expect(values.every((v) => v.error === "fetch_failed")).toBe(true);
  });

  it("sets Cache-Control: no-store header", async () => {
    yf.quote.mockResolvedValue({
      regularMarketPrice: 65000,
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
