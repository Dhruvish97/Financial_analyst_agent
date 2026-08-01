import { HoldingRisk } from "@/types/portfolio";

const RISK_STYLE: Record<HoldingRisk, React.CSSProperties> = {
  Low:    { color: "#00e5a0", background: "rgba(0,229,160,0.08)", border: "1px solid rgba(0,229,160,0.2)" },
  Medium: { color: "#fbbf24", background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)" },
  High:   { color: "#ff4d6a", background: "rgba(255,77,106,0.08)", border: "1px solid rgba(255,77,106,0.2)" },
};

export function RiskBadge({ risk }: { risk: HoldingRisk }) {
  return (
    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={RISK_STYLE[risk]}>
      {risk}
    </span>
  );
}
