"use client";

import {
  parseAsString,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  useQueryStates,
} from "nuqs";
import { createContext, useContext } from "react";

const filtersParsers = {
  karat: parseAsArrayOf(parseAsInteger)
    .withDefault([])
    .withOptions({ history: "push", shallow: false }),
  min_price: parseAsInteger
    .withDefault(0)
    .withOptions({ history: "push", shallow: false }),
  max_price: parseAsInteger
    .withDefault(300)
    .withOptions({ history: "push", shallow: false }),
  min_weight: parseAsInteger
    .withDefault(0)
    .withOptions({ history: "push", shallow: false }),
  max_weight: parseAsInteger
    .withDefault(500)
    .withOptions({ history: "push", shallow: false }),
  condition: parseAsArrayOf(parseAsString)
    .withDefault([])
    .withOptions({ history: "push", shallow: false }),
  location: parseAsString
    .withDefault("all-uae")
    .withOptions({ history: "push", shallow: false }),
  verified: parseAsBoolean
    .withDefault(false)
    .withOptions({ history: "push", shallow: false }),
  q: parseAsString
    .withDefault("")
    .withOptions({ history: "push", shallow: false }),
  category: parseAsString
    .withDefault("all")
    .withOptions({ history: "push", shallow: false }),
  sort: parseAsString
    .withDefault("newest")
    .withOptions({ history: "push", shallow: false }),
  show_type: parseAsString
    .withDefault("grid")
    .withOptions({ history: "push", shallow: false }),
};

type BrowseFiltersContextType = {
  filters: ReturnType<typeof useQueryStates<typeof filtersParsers>>[0];
  setFilters: ReturnType<typeof useQueryStates<typeof filtersParsers>>[1];
};

const BrowseFiltersContext = createContext<BrowseFiltersContextType | null>(
  null,
);

export function BrowseFiltersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [filters, setFilters] = useQueryStates(filtersParsers);

  return (
    <BrowseFiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </BrowseFiltersContext.Provider>
  );
}

export function useBrowseFilters() {
  const context = useContext(BrowseFiltersContext);

  if (!context) {
    throw new Error(
      "useBrowseFilters must be used inside BrowseFiltersProvider",
    );
  }

  return context;
}
