import { renderHook, waitFor } from "@testing-library/react";
import { useFearGreed } from "@/hooks/useFearGreed";

const mockFetch = jest.fn();
global.fetch = mockFetch;

beforeAll(() => jest.useFakeTimers());
afterAll(() => jest.useRealTimers());
afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});

const MOCK_DATA = {
  score: 42,
  rating: "Fear",
  previousClose: 40,
  previousWeek: 38,
  previousMonth: 55,
  previousYear: 60,
  lastUpdated: "2025-03-10T00:00:00Z",
};

describe("useFearGreed", () => {
  it("starts with loading=true and null data", () => {
    mockFetch.mockResolvedValue({ json: jest.fn().mockResolvedValue(MOCK_DATA) });
    const { result } = renderHook(() => useFearGreed());
    expect(result.current.loadingFearGreed).toBe(true);
    expect(result.current.fearGreed).toBeNull();
  });

  it("populates fearGreed data after fetch", async () => {
    mockFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(MOCK_DATA),
    });

    const { result } = renderHook(() => useFearGreed());
    await waitFor(() => expect(result.current.loadingFearGreed).toBe(false));

    expect(result.current.fearGreed).toEqual(MOCK_DATA);
  });

  it("stays with null data on fetch error (silent fail)", async () => {
    mockFetch.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useFearGreed());
    await waitFor(() => expect(result.current.loadingFearGreed).toBe(false));

    expect(result.current.fearGreed).toBeNull();
  });
});
