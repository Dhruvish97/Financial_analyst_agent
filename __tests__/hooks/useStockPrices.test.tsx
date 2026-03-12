import { renderHook, waitFor } from "@testing-library/react";
import { useStockPrices } from "@/hooks/useStockPrices";

const mockFetch = jest.fn();
global.fetch = mockFetch;

const MOCK_PRICES = {
  AAPL: {
    ticker: "AAPL",
    price: 175,
    change: 2.5,
    changePercent: 1.45,
    marketCap: 2.8e12,
    volume: 55e6,
    trailingPE: 28,
    forwardPE: 25,
    beta: 1.1,
    fiftyTwoWeekLow: 140,
    fiftyTwoWeekHigh: 200,
    earningsDate: null,
  },
};

beforeAll(() => jest.useFakeTimers());
afterAll(() => jest.useRealTimers());
afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});

describe("useStockPrices", () => {
  it("starts with loading=true and empty prices", () => {
    mockFetch.mockResolvedValue({ ok: true, json: jest.fn().mockResolvedValue({}) });
    const { result } = renderHook(() => useStockPrices());
    expect(result.current.loading).toBe(true);
    expect(result.current.prices).toEqual({});
  });

  it("sets prices and clears loading after successful fetch", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(MOCK_PRICES),
    });

    const { result } = renderHook(() => useStockPrices());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.prices).toEqual(MOCK_PRICES);
    expect(result.current.error).toBeNull();
    expect(result.current.lastUpdated).toBeInstanceOf(Date);
  });

  it("sets error message when fetch returns non-ok", async () => {
    mockFetch.mockResolvedValue({ ok: false });

    const { result } = renderHook(() => useStockPrices());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Failed to fetch prices");
  });

  it("sets error message when fetch throws", async () => {
    mockFetch.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useStockPrices());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Failed to fetch prices");
  });

  it("exposes a refetch function", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(MOCK_PRICES),
    });

    const { result } = renderHook(() => useStockPrices());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(typeof result.current.refetch).toBe("function");
  });
});
