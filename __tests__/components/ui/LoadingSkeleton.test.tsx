import { render, screen } from "@testing-library/react";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

describe("LoadingSkeleton", () => {
  it("renders with role=status and aria-label", () => {
    render(<LoadingSkeleton />);
    const el = screen.getByRole("status");
    expect(el).toHaveAttribute("aria-label", "Loading");
  });

  it("applies animate-pulse class", () => {
    render(<LoadingSkeleton />);
    expect(screen.getByRole("status")).toHaveClass("animate-pulse");
  });

  it("applies custom className", () => {
    render(<LoadingSkeleton className="h-5 w-24" />);
    const el = screen.getByRole("status");
    expect(el).toHaveClass("h-5", "w-24");
  });

  it("works with no className prop", () => {
    render(<LoadingSkeleton />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
