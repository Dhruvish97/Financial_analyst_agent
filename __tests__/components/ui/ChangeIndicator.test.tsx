import { render, screen } from "@testing-library/react";
import { ChangeIndicator } from "@/components/ui/ChangeIndicator";

describe("ChangeIndicator", () => {
  it("shows loading skeleton when loading=true", () => {
    render(<ChangeIndicator changePercent={null} loading={true} />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("shows — when changePercent is null and not loading", () => {
    render(<ChangeIndicator changePercent={null} />);
    expect(screen.getByText("—")).toBeInTheDocument();
  });

  it("shows upward arrow for positive change", () => {
    render(<ChangeIndicator changePercent={2.5} />);
    expect(screen.getByText("↑")).toBeInTheDocument();
    expect(screen.getByText("2.50%")).toBeInTheDocument();
  });

  it("shows downward arrow for negative change", () => {
    render(<ChangeIndicator changePercent={-1.75} />);
    expect(screen.getByText("↓")).toBeInTheDocument();
    expect(screen.getByText("1.75%")).toBeInTheDocument();
  });

  it("shows upward arrow for zero change", () => {
    render(<ChangeIndicator changePercent={0} />);
    expect(screen.getByText("↑")).toBeInTheDocument();
    expect(screen.getByText("0.00%")).toBeInTheDocument();
  });

  it("applies green color for positive change", () => {
    const { container } = render(<ChangeIndicator changePercent={5} />);
    expect(container.firstChild).toHaveClass("text-green-400");
  });

  it("applies red color for negative change", () => {
    const { container } = render(<ChangeIndicator changePercent={-5} />);
    expect(container.firstChild).toHaveClass("text-red-400");
  });
});
