import { render, screen } from "@testing-library/react";
import { RiskBadge } from "@/components/ui/RiskBadge";

describe("RiskBadge", () => {
  it("renders Low risk with mint color", () => {
    const { container } = render(<RiskBadge risk="Low" />);
    expect(screen.getByText("Low")).toBeInTheDocument();
    expect(container.firstChild).toHaveStyle({ color: "rgb(0, 229, 160)" });
  });

  it("renders Medium risk with amber color", () => {
    const { container } = render(<RiskBadge risk="Medium" />);
    expect(screen.getByText("Medium")).toBeInTheDocument();
    expect(container.firstChild).toHaveStyle({ color: "rgb(251, 191, 36)" });
  });

  it("renders High risk with rose color", () => {
    const { container } = render(<RiskBadge risk="High" />);
    expect(screen.getByText("High")).toBeInTheDocument();
    expect(container.firstChild).toHaveStyle({ color: "rgb(255, 77, 106)" });
  });
});
