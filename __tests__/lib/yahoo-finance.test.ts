import { calcRSI, fetchQuotes, fetchRSI } from "@/lib/yahoo-finance";
import YahooFinance from "yahoo-finance2";

jest.mock("yahoo-finance2");

const yf = (YahooFinance as jest.Mock & { __instance: { quote: jest.Mock; chart: jest.Mock } }).__instance;

beforeEach(() => {
  jest.clearAllMocks();
});

// ── calcRSI ──────────────────────────────────────────────────────────────────

describe("calcRSI", () => {
  it("returns null for empty array", () => {
    expect(calcRSI([])).toBeNull();
  });

  it("returns null when fewer than period + 1 data points", () => {
    expect(calcRSI([100, 101, 102])).toBeNull();
    // exactly 14 points — need at least 15 (period=14 + 1)
    expect(calcRSI(new Array(14).fill(100))).toBeNull();
  });

  it("returns 100 when all moves are gains (avgLoss = 0)", () => {
    const closes = Array.from({ length: 16 }, (_, i) => 100 + i);
    expect(calcRSI(closes)).toBe(100);
  });

  it("returns a number between 0 and 100 for mixed data", () => {
    const closes = Array.from({ length: 20 }, (_, i) =>
      i % 2 === 0 ? 100 + i * 0.5 : 100 + i * 0.3
    );
    const result = calcRSI(closes);
    expect(result).not.toBeNull();
    expect(result!).toBeGreaterThanOrEqual(0);
    expect(result!).toBeLessThanOrEqual(100);
  });

  it("returns high RSI (>70) for strong uptrend", () => {
    const closes = Array.from({ length: 20 }, (_, i) => 100 + i * 3);
    expect(calcRSI(closes)).toBeGreaterThan(70);
  });

  it("returns low RSI (<30) for strong downtrend", () => {
    const closes = Array.from({ length: 20 }, (_, i) => 200 - i * 3);
    expect(calcRSI(closes)).toBeLessThan(30);
  });

  it("accepts a custom period", () => {
    const closes = Array.from({ length: 15 }, (_, i) => 100 + i);
    expect(calcRSI(closes, 7)).not.toBeNull();
  });

  it("returns null when length equals period exactly", () => {
    const closes = new Array(14).fill(0).map((_, i) => 100 + i);
    expect(calcRSI(closes)).toBeNull();
  });
});

// ── fetchQuotes ───────────────────────────────────────────────────────────────

describe("fetchQuotes", () => {
  it("maps fulfilled quotes to LivePrice objects", async () => {
    yf.quote.mockResolvedValue({
      regularMarketPrice: 150,
      regularMarketChange: 2,
      regularMarketChangePercent: 1.35,
      marketCap: 2e12,
      regularMarketVolume: 50e6,
      trailingPE: 28.5,
      forwardPE: 24,
      beta: 1.2,
      fiftyTwoWeekLow: 120,
      fiftyTwoWeekHigh: 180,
      earningsTimestamp: new Date("2025-04-25"),
    });

    const result = await fetchQuotes(["AAPL"]);

    expect(result["AAPL"].price).toBe(150);
    expect(result["AAPL"].change).toBe(2);
    expect(result["AAPL"].changePercent).toBe(1.35);
    expect(result["AAPL"].marketCap).toBe(2e12);
    expect(result["AAPL"].trailingPE).toBe(28.5);
    expect(result["AAPL"].earningsDate).toBe("2025-04-25");
    expect(result["AAPL"].error).toBeUndefined();
  });

  it("sets null earningsDate when earningsTimestamp is absent", async () => {
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

    const result = await fetchQuotes(["MSFT"]);
    expect(result["MSFT"].earningsDate).toBeNull();
  });

  it("uses null fallbacks on rejected quote", async () => {
    yf.quote.mockRejectedValue(new Error("Network error"));

    const result = await fetchQuotes(["BAD"]);
    expect(result["BAD"].price).toBeNull();
    expect(result["BAD"].error).toBe("fetch_failed");
  });

  it("handles multiple tickers", async () => {
    yf.quote
      .mockResolvedValueOnce({ regularMarketPrice: 100, regularMarketChange: 1, regularMarketChangePercent: 1, marketCap: 1e9, regularMarketVolume: 1e6, trailingPE: 20, forwardPE: 18, beta: 1, fiftyTwoWeekLow: 80, fiftyTwoWeekHigh: 120, earningsTimestamp: undefined })
      .mockRejectedValueOnce(new Error("fail"));

    const result = await fetchQuotes(["AAPL", "BAD"]);
    expect(result["AAPL"].price).toBe(100);
    expect(result["BAD"].price).toBeNull();
  });
});

// ── fetchRSI ──────────────────────────────────────────────────────────────────

describe("fetchRSI", () => {
  it("returns calculated RSI for a ticker", async () => {
    const closes = Array.from({ length: 20 }, (_, i) => 100 + i * 2);
    yf.chart.mockResolvedValue({
      quotes: closes.map((c, i) => ({ date: new Date(2024, 0, i + 1), close: c })),
    });

    const result = await fetchRSI(["AAPL"]);
    expect(result["AAPL"]).not.toBeNull();
    expect(result["AAPL"]!).toBeGreaterThan(70);
  });

  it("returns null when chart call fails", async () => {
    yf.chart.mockRejectedValue(new Error("fail"));

    const result = await fetchRSI(["BAD"]);
    expect(result["BAD"]).toBeNull();
  });

  it("filters out null closes", async () => {
    yf.chart.mockResolvedValue({
      quotes: [
        { date: new Date(), close: null },
        { date: new Date(), close: 100 },
        { date: new Date(), close: 102 },
      ],
    });

    const result = await fetchRSI(["AAPL"]);
    // Only 2 valid closes — not enough for period=14, returns null
    expect(result["AAPL"]).toBeNull();
  });
});
