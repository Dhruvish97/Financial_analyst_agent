import { LoadingSkeleton } from "./LoadingSkeleton";

interface PriceDisplayProps {
  price: number | null;
  loading?: boolean;
  isCrypto?: boolean;
}

function formatPrice(price: number, isCrypto: boolean): string {
  if (isCrypto && price < 1) {
    return `$${price.toFixed(6)}`;
  }
  if (isCrypto && price < 10) {
    return `$${price.toFixed(4)}`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export function PriceDisplay({ price, loading, isCrypto = false }: PriceDisplayProps) {
  if (loading) return <LoadingSkeleton className="h-5 w-24" />;
  if (price === null) return <span className="text-gray-500 font-mono">—</span>;

  return (
    <span className="font-mono tabular-nums text-white">
      {formatPrice(price, isCrypto)}
    </span>
  );
}
