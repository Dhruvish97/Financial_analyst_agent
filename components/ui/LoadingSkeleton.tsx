export function LoadingSkeleton({ className = "" }: { className?: string }) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`animate-pulse bg-gray-700 rounded ${className}`}
    />
  );
}
