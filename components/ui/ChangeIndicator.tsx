import { LoadingSkeleton } from "./LoadingSkeleton";

interface ChangeIndicatorProps {
  changePercent: number | null;
  loading?: boolean;
}

export function ChangeIndicator({ changePercent, loading }: ChangeIndicatorProps) {
  if (loading) return <LoadingSkeleton className="h-6 w-16" />;
  if (changePercent === null) return <span style={{ color: "rgba(255,255,255,0.2)" }} className="font-mono text-sm">—</span>;

  const isPositive = changePercent >= 0;

  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-sm font-mono tabular-nums font-semibold"
      style={
        isPositive
          ? {
              color: "#00e5a0",
              background: "rgba(0,229,160,0.1)",
              border: "1px solid rgba(0,229,160,0.18)",
            }
          : {
              color: "#ff4d6a",
              background: "rgba(255,77,106,0.1)",
              border: "1px solid rgba(255,77,106,0.18)",
            }
      }
    >
      <span className="text-xs">{isPositive ? "▲" : "▼"}</span>
      <span>{Math.abs(changePercent).toFixed(2)}%</span>
    </span>
  );
}
