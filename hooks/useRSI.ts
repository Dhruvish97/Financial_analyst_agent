"use client";

import { useState, useEffect } from "react";
import { RSIMap } from "@/types/portfolio";

export function useRSI(tickers: string[]) {
  const [rsi, setRSI] = useState<RSIMap>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!tickers.length) return;
    setLoading(true);
    fetch(`/api/rsi?tickers=${tickers.join(",")}`)
      .then((r) => r.json())
      .then((data: RSIMap) => setRSI(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [tickers.join(",")]); // eslint-disable-line react-hooks/exhaustive-deps

  return { rsi, loadingRSI: loading };
}
