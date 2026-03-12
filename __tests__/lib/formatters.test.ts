import { formatMarketCap, formatVolume } from "@/lib/formatters";

describe("formatMarketCap", () => {
  it("returns — for null", () => {
    expect(formatMarketCap(null)).toBe("—");
  });

  it("formats trillions", () => {
    expect(formatMarketCap(1e12)).toBe("$1.00T");
    expect(formatMarketCap(2.75e12)).toBe("$2.75T");
  });

  it("formats billions", () => {
    expect(formatMarketCap(1e9)).toBe("$1.00B");
    expect(formatMarketCap(500e9)).toBe("$500.00B");
  });

  it("formats millions", () => {
    expect(formatMarketCap(1e6)).toBe("$1.00M");
    expect(formatMarketCap(250e6)).toBe("$250.00M");
  });

  it("formats small values with toLocaleString", () => {
    expect(formatMarketCap(999999)).toBe("$999,999");
  });
});

describe("formatVolume", () => {
  it("returns — for null", () => {
    expect(formatVolume(null)).toBe("—");
  });

  it("formats billions", () => {
    expect(formatVolume(1e9)).toBe("1.00B");
    expect(formatVolume(3.5e9)).toBe("3.50B");
  });

  it("formats millions", () => {
    expect(formatVolume(1e6)).toBe("1.00M");
    expect(formatVolume(50e6)).toBe("50.00M");
  });

  it("formats thousands", () => {
    expect(formatVolume(1000)).toBe("1.00K");
    expect(formatVolume(5500)).toBe("5.50K");
  });

  it("formats small values", () => {
    expect(formatVolume(500)).toBe("500");
    expect(formatVolume(1)).toBe("1");
  });
});
