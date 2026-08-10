import { renderHook, waitFor } from "@testing-library/react";
import { useDrift } from "@/hooks/useDrift";

const mockFetch = jest.fn();
global.fetch = mockFetch;

afterEach(() => jest.clearAllMocks());

describe("useDrift", () => {
  it("starts with empty drift array and loading=false when portfolioId is empty", () => {
    const { result } = renderHook(() => useDrift(""));
    expect(result.current.drift).toEqual([]);
    expect(result.current.loadingDrift).toBe(false);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("fetches drift for the given portfolio id", async () => {
    const mockDrift = [{ ticker: "NVDA", targetPct: 20, currentPct: 22, gapPct: 2, status: "on-target" }];
    mockFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ portfolioId: "stocks", drift: mockDrift }),
    });

    const { result } = renderHook(() => useDrift("stocks"));
    await waitFor(() => expect(result.current.loadingDrift).toBe(false));

    expect(result.current.drift).toEqual(mockDrift);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("portfolio=stocks")
    );
  });

  it("handles fetch error gracefully", async () => {
    mockFetch.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useDrift("india"));
    await waitFor(() => expect(result.current.loadingDrift).toBe(false));

    expect(result.current.drift).toEqual([]);
  });

  it("refetches when portfolioId changes", async () => {
    mockFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ portfolioId: "401k", drift: [] }),
    });

    const { rerender } = renderHook(({ id }) => useDrift(id), {
      initialProps: { id: "401k" },
    });
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));

    rerender({ id: "roth-ira" });
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(2));
    expect(mockFetch).toHaveBeenLastCalledWith(
      expect.stringContaining("portfolio=roth-ira")
    );
  });
});
