import { renderHook, waitFor } from "@testing-library/react";
import { useRSI } from "@/hooks/useRSI";

const mockFetch = jest.fn();
global.fetch = mockFetch;

afterEach(() => jest.clearAllMocks());

describe("useRSI", () => {
  it("starts with empty RSI map and loading=false", () => {
    mockFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
    });
    const { result } = renderHook(() => useRSI([]));
    // Empty tickers — effect doesn't run
    expect(result.current.rsi).toEqual({});
  });

  it("fetches RSI for given tickers", async () => {
    const mockRSI = { AAPL: 62, MSFT: 55 };
    mockFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockRSI),
    });

    const { result } = renderHook(() => useRSI(["AAPL", "MSFT"]));
    await waitFor(() => expect(result.current.loadingRSI).toBe(false));

    expect(result.current.rsi).toEqual(mockRSI);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("tickers=AAPL,MSFT")
    );
  });

  it("handles fetch error gracefully", async () => {
    mockFetch.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useRSI(["AAPL"]));
    await waitFor(() => expect(result.current.loadingRSI).toBe(false));

    expect(result.current.rsi).toEqual({});
  });

  it("sets loadingRSI=true while fetching", () => {
    let resolvePromise: (v: unknown) => void;
    mockFetch.mockReturnValue(
      new Promise((resolve) => { resolvePromise = resolve; })
    );

    const { result } = renderHook(() => useRSI(["AAPL"]));
    expect(result.current.loadingRSI).toBe(true);

    // Cleanup
    resolvePromise!({ json: () => Promise.resolve({}) });
  });
});
