"use client";

import { useState, useEffect } from "react";
import { HoldingDrift } from "@/lib/drift";

interface DriftResponse {
  portfolioId: string;
  asOfDate: string;
  lookbackDays: number;
  drift: HoldingDrift[];
}

export function useDrift(portfolioId: string) {
  const [drift, setDrift] = useState<HoldingDrift[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!portfolioId) return;
    let cancelled = false;
    setLoading(true);
    fetch(`/api/drift?portfolio=${encodeURIComponent(portfolioId)}`)
      .then((r) => r.json())
      .then((data: DriftResponse) => { if (!cancelled) setDrift(data.drift ?? []); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [portfolioId]);

  return { drift, loadingDrift: loading };
}
