"use client";

import { useState, useEffect } from "react";
import { RSIMap } from "@/types/portfolio";

export function useRSI(tickers: string[]) {
  const [rsi, setRSI] = useState<RSIMap>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!tickers.length) return;
    let cancelled = false;
    setLoading(true);
    fetch(`/api/rsi?tickers=${tickers.join(",")}`)
      .then((r) => r.json())
      .then((data: RSIMap) => { if (!cancelled) setRSI(data); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [tickers.join(",")]); // eslint-disable-line react-hooks/exhaustive-deps

  return { rsi, loadingRSI: loading };
}
