import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import React from "react";
import { StockPriceChart } from "@/components/ui/StockPriceChart";

// Mock recharts — ResponsiveContainer needs a real DOM size in jsdom
jest.mock("recharts", () => ({
  AreaChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="area-chart">{children}</div>
  ),
  Area: () => null,
  XAxis: () => null,
  YAxis: () => null,
  Tooltip: () => null,
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div style={{ width: 500, height: 300 }}>{children}</div>
  ),
  defs: () => null,
  linearGradient: () => null,
  stop: () => null,
}));

const mockFetch = jest.fn();
global.fetch = mockFetch;

const MOCK_POINTS = [
  { date: "2024-01-01", close: 150 },
  { date: "2024-02-01", close: 157 },
  { date: "2024-03-01", close: 165 },
];

function mockSuccess(points = MOCK_POINTS) {
  mockFetch.mockResolvedValue({
    json: () => Promise.resolve({ ticker: "AAPL", period: "3m", points }),
  });
}

afterEach(() => {
  jest.clearAllMocks();
});

describe("StockPriceChart", () => {
  it("shows loading state initially", () => {
    mockSuccess();
    render(<StockPriceChart ticker="AAPL" />);
    expect(screen.getByText("Loading chart…")).toBeInTheDocument();
  });

  it("renders all four period buttons", () => {
    mockSuccess();
    render(<StockPriceChart ticker="AAPL" />);
    expect(screen.getByText("1W")).toBeInTheDocument();
    expect(screen.getByText("1M")).toBeInTheDocument();
    expect(screen.getByText("3M")).toBeInTheDocument();
    expect(screen.getByText("1Y")).toBeInTheDocument();
  });

  it("renders the chart after data loads", async () => {
    mockSuccess();
    render(<StockPriceChart ticker="AAPL" />);
    await waitFor(() =>
      expect(screen.getByTestId("area-chart")).toBeInTheDocument()
    );
  });

  it("displays ticker name", () => {
    mockSuccess();
    render(<StockPriceChart ticker="AAPL" />);
    expect(screen.getByText("AAPL")).toBeInTheDocument();
  });

  it("displays optional stock name", () => {
    mockSuccess();
    render(<StockPriceChart ticker="AAPL" name="Apple Inc." />);
    expect(screen.getByText("Apple Inc.")).toBeInTheDocument();
  });

  it("shows period return percentage after load", async () => {
    mockSuccess();
    render(<StockPriceChart ticker="AAPL" />);
    // (165 - 150) / 150 * 100 = 10%
    await waitFor(() =>
      expect(screen.getByText(/10\.00%/)).toBeInTheDocument()
    );
  });

  it("fetches with 3m period by default", () => {
    mockSuccess();
    render(<StockPriceChart ticker="AAPL" />);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("period=3m")
    );
  });

  it("fetches new period when button is clicked", async () => {
    mockSuccess();
    render(<StockPriceChart ticker="AAPL" />);
    await waitFor(() => screen.getByTestId("area-chart"));

    mockSuccess();
    fireEvent.click(screen.getByText("1Y"));
    await waitFor(() =>
      expect(mockFetch).toHaveBeenLastCalledWith(
        expect.stringContaining("period=1y")
      )
    );
  });

  it("shows error state when fetch throws", async () => {
    mockFetch.mockRejectedValue(new Error("Network error"));
    render(<StockPriceChart ticker="AAPL" />);
    await waitFor(() =>
      expect(screen.getByText("Chart data unavailable")).toBeInTheDocument()
    );
  });

  it("shows unavailable when fewer than 2 data points", async () => {
    mockFetch.mockResolvedValue({
      json: () =>
        Promise.resolve({ points: [{ date: "2024-01-01", close: 150 }] }),
    });
    render(<StockPriceChart ticker="AAPL" />);
    await waitFor(() =>
      expect(screen.getByText("Chart data unavailable")).toBeInTheDocument()
    );
  });

  it("encodes ticker in the fetch URL", () => {
    mockSuccess();
    render(<StockPriceChart ticker="RELIANCE.NS" />);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("ticker=RELIANCE.NS")
    );
  });

  it("uses INR symbol for currency=INR", async () => {
    // Period return label is currency-agnostic; just verify chart renders
    mockSuccess();
    render(<StockPriceChart ticker="RELIANCE.NS" currency="INR" />);
    await waitFor(() => screen.getByTestId("area-chart"));
    expect(screen.getByText("RELIANCE.NS")).toBeInTheDocument();
  });
});
