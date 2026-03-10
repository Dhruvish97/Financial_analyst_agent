import { LoadingSkeleton } from "./LoadingSkeleton";

interface ChangeIndicatorProps {
  changePercent: number | null;
  loading?: boolean;
}

export function ChangeIndicator({ changePercent, loading }: ChangeIndicatorProps) {
  if (loading) return <LoadingSkeleton className="h-5 w-16" />;
  if (changePercent === null) return <span className="text-gray-500">—</span>;

  const isPositive = changePercent >= 0;
  const color = isPositive ? "text-green-400" : "text-red-400";
  const bg = isPositive ? "bg-green-400/10" : "bg-red-400/10";
  const arrow = isPositive ? "↑" : "↓";

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-sm font-mono tabular-nums ${color} ${bg}`}>
      <span>{arrow}</span>
      <span>{Math.abs(changePercent).toFixed(2)}%</span>
    </span>
  );
}
