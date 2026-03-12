import { renderHook, waitFor } from "@testing-library/react";
import { useIndiaPrices } from "@/hooks/useIndiaPrices";

const mockFetch = jest.fn();
global.fetch = mockFetch;

beforeAll(() => jest.useFakeTimers());
afterAll(() => jest.useRealTimers());
afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});

const MOCK_PRICES = {
  "RELIANCE.NS": {
    ticker: "RELIANCE.NS",
    price: 2850,
    change: 30,
    changePercent: 1.06,
    marketCap: 19e12,
    volume: 5e6,
    trailingPE: 25,
    forwardPE: 22,
    beta: 0.9,
    fiftyTwoWeekLow: 2200,
    fiftyTwoWeekHigh: 3100,
    earningsDate: null,
  },
};

describe("useIndiaPrices", () => {
  it("starts with loading=true and empty prices", () => {
    mockFetch.mockResolvedValue({ ok: true, json: jest.fn().mockResolvedValue({}) });
    const { result } = renderHook(() => useIndiaPrices());
    expect(result.current.loading).toBe(true);
    expect(result.current.prices).toEqual({});
  });

  it("sets prices after successful fetch", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(MOCK_PRICES),
    });

    const { result } = renderHook(() => useIndiaPrices());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.prices).toEqual(MOCK_PRICES);
    expect(result.current.error).toBeNull();
  });

  it("sets error on non-ok response", async () => {
    mockFetch.mockResolvedValue({ ok: false });

    const { result } = renderHook(() => useIndiaPrices());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Failed to fetch India prices");
  });

  it("sets error on fetch exception", async () => {
    mockFetch.mockRejectedValue(new Error("timeout"));

    const { result } = renderHook(() => useIndiaPrices());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Failed to fetch India prices");
  });
});
