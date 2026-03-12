/**
 * @jest-environment node
 */
import { GET } from "@/app/api/fear-greed/route";

const mockFetch = jest.fn();
global.fetch = mockFetch;

beforeEach(() => jest.clearAllMocks());

const CNN_RESPONSE = {
  fear_and_greed: {
    score: 42.7,
    rating: "Fear",
    previous_close: 40.1,
    previous_1_week: 38.5,
    previous_1_month: 55.2,
    previous_1_year: 60.0,
    timestamp: "2025-03-10T00:00:00Z",
  },
};

describe("GET /api/fear-greed", () => {
  it("returns parsed Fear & Greed data on success", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(CNN_RESPONSE),
    });

    const res = await GET();
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.score).toBe(43); // Math.round(42.7)
    expect(json.rating).toBe("Fear");
    expect(json.previousClose).toBe(40);
    expect(json.previousWeek).toBe(39);
    expect(json.previousMonth).toBe(55);
    expect(json.previousYear).toBe(60);
    expect(json.lastUpdated).toBe("2025-03-10T00:00:00Z");
  });

  it("returns fallback neutral data when CNN API returns non-ok", async () => {
    mockFetch.mockResolvedValue({ ok: false, status: 503 });

    const res = await GET();
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.score).toBe(50);
    expect(json.rating).toBe("Neutral");
    expect(json.fallback).toBe(true);
  });

  it("returns fallback neutral data when fetch throws", async () => {
    mockFetch.mockRejectedValue(new Error("Network error"));

    const res = await GET();
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.score).toBe(50);
    expect(json.fallback).toBe(true);
  });

  it("sets Cache-Control: no-store header", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(CNN_RESPONSE),
    });

    const res = await GET();
    expect(res.headers.get("Cache-Control")).toBe("no-store");
  });
});
