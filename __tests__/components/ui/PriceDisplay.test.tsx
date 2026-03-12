import { render, screen } from "@testing-library/react";
import { PriceDisplay } from "@/components/ui/PriceDisplay";

describe("PriceDisplay", () => {
  it("shows loading skeleton when loading=true", () => {
    render(<PriceDisplay price={null} loading={true} />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("shows — when price is null and not loading", () => {
    render(<PriceDisplay price={null} />);
    expect(screen.getByText("—")).toBeInTheDocument();
  });

  it("formats regular USD price correctly", () => {
    render(<PriceDisplay price={1234.56} />);
    expect(screen.getByText("$1,234.56")).toBeInTheDocument();
  });

  it("formats price of exactly $1.00", () => {
    render(<PriceDisplay price={1.0} />);
    expect(screen.getByText("$1.00")).toBeInTheDocument();
  });

  it("formats crypto price < 1 with 6 decimal places", () => {
    render(<PriceDisplay price={0.0001} isCrypto={true} />);
    expect(screen.getByText("$0.000100")).toBeInTheDocument();
  });

  it("formats crypto price < 10 with 4 decimal places", () => {
    render(<PriceDisplay price={5.5} isCrypto={true} />);
    expect(screen.getByText("$5.5000")).toBeInTheDocument();
  });

  it("formats large crypto price like a normal price", () => {
    render(<PriceDisplay price={65000.0} isCrypto={true} />);
    expect(screen.getByText("$65,000.00")).toBeInTheDocument();
  });

  it("does not show skeleton when loading is false", () => {
    render(<PriceDisplay price={100} loading={false} />);
    expect(screen.queryByRole("status")).toBeNull();
  });
});
