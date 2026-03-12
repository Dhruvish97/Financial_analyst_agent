import { renderHook, waitFor } from "@testing-library/react";
import { useCryptoPrices } from "@/hooks/useCryptoPrices";

const mockFetch = jest.fn();
global.fetch = mockFetch;

beforeAll(() => jest.useFakeTimers());
afterAll(() => jest.useRealTimers());
afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});

const MOCK_PRICES = {
  "BTC-USD": {
    ticker: "BTC-USD",
    price: 65000,
    change: 500,
    changePercent: 0.78,
    marketCap: 1.2e12,
    volume: 30e9,
    trailingPE: null,
    forwardPE: null,
    beta: null,
    fiftyTwoWeekLow: 40000,
    fiftyTwoWeekHigh: 73000,
    earningsDate: null,
  },
};

describe("useCryptoPrices", () => {
  it("starts with loading=true and empty prices", () => {
    mockFetch.mockResolvedValue({ ok: true, json: jest.fn().mockResolvedValue({}) });
    const { result } = renderHook(() => useCryptoPrices());
    expect(result.current.loading).toBe(true);
    expect(result.current.prices).toEqual({});
  });

  it("populates prices after successful fetch", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(MOCK_PRICES),
    });

    const { result } = renderHook(() => useCryptoPrices());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.prices).toEqual(MOCK_PRICES);
    expect(result.current.error).toBeNull();
  });

  it("sets error when fetch returns non-ok", async () => {
    mockFetch.mockResolvedValue({ ok: false });

    const { result } = renderHook(() => useCryptoPrices());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Failed to fetch prices");
  });

  it("sets error when fetch throws", async () => {
    mockFetch.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useCryptoPrices());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Failed to fetch prices");
  });
});
