"use client";

import { useState, useEffect } from "react";
import { FearGreedData } from "@/types/portfolio";

export function useFearGreed() {
  const [data, setData] = useState<FearGreedData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function load() {
      fetch("/api/fear-greed")
        .then((r) => r.json())
        .then((d: FearGreedData) => setData(d))
        .catch(() => {})
        .finally(() => setLoading(false));
    }
    load();
    const id = setInterval(load, 5 * 60 * 1000); // refresh every 5 min
    return () => clearInterval(id);
  }, []);

  return { fearGreed: data, loadingFearGreed: loading };
}
