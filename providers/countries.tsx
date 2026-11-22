"use client";

import { createContext, useContext, type ReactNode } from "react";
import { Country } from "@/types/global";

// The countries list (from the API, cached), for client components that
// need the browse country's currency or flag without a prop chain
const CountriesContext = createContext<Country[]>([]);

export function CountriesProvider({
  countries,
  children,
}: {
  countries: Country[];
  children: ReactNode;
}) {
  return (
    <CountriesContext.Provider value={countries}>
      {children}
    </CountriesContext.Provider>
  );
}

export function useCountries() {
  return useContext(CountriesContext);
}
