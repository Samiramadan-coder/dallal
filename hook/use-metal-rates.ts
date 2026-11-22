"use client";

import { useMemo } from "react";
import { metalRates, type Metal, type MetalRate } from "@/constants/marketplace";
import { useCurrency } from "./use-currency";

// Live metal prices per gram in the browse country's currency, so a country
// switch updates them everywhere.
// TODO: fetch the country's prices from the API; the mock ones are in dirhams
export function useMetalRates(): Record<Metal, MetalRate[]> {
  const { currency, fromMock } = useCurrency();

  return useMemo(() => {
    const out = {} as Record<Metal, MetalRate[]>;
    for (const metal of Object.keys(metalRates) as Metal[]) {
      out[metal] = metalRates[metal].map((rate) => ({
        ...rate,
        price: Number(fromMock(rate.price).toFixed(2)),
      }));
    }
    return out;
    // `fromMock` only depends on `currency`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);
}
