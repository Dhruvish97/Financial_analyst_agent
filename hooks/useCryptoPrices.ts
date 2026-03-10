"use client";
import { useState, useEffect, useCallback } from "react";
import { PriceMap } from "@/types/portfolio";

const POLL_INTERVAL = 60_000;

export function useCryptoPrices() {
  const [prices, setPrices] = useState<PriceMap>({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPrices = useCallback(async () => {
    try {
      const res = await fetch("/api/crypto", { cache: "no-store" });
      if (!res.ok) throw new Error("API error");
      const data: PriceMap = await res.json();
      setPrices(data);
      setLastUpdated(new Date());
      setError(null);
    } catch {
      setError("Failed to fetch prices");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchPrices]);

  return { prices, loading, lastUpdated, error, refetch: fetchPrices };
}
