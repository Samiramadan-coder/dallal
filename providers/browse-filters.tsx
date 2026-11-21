"use client";

import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsFloat,
  parseAsString,
  parseAsStringLiteral,
  useQueryStates,
} from "nuqs";
import { conditions, listings, type Listing, getStore } from "@/constants/marketplace";
import { createContext, useContext, useMemo } from "react";

export const sortOptions = [
  "recommended",
  "price_asc",
  "price_desc",
  "newest",
  "nearest",
] as const;
export type SortOption = (typeof sortOptions)[number];

export const viewOptions = ["grid", "list", "map"] as const;
export type ViewOption = (typeof viewOptions)[number];

// Typing-driven params replace history entries instead of pushing new ones.
const typing = { history: "replace" } as const;
const click = { history: "push" } as const;

const filtersParsers = {
  q: parseAsString.withDefault("").withOptions(typing),
  category: parseAsString.withDefault("").withOptions(click),
  min_price: parseAsFloat.withOptions(typing),
  max_price: parseAsFloat.withOptions(typing),
  city: parseAsString.withDefault("").withOptions(click),
  condition: parseAsArrayOf(parseAsStringLiteral(conditions))
    .withDefault([])
    .withOptions(click),
  negotiable: parseAsBoolean.withDefault(false).withOptions(click),
  rating4: parseAsBoolean.withDefault(false).withOptions(click),
  open_now: parseAsBoolean.withDefault(false).withOptions(click),
  delivers: parseAsBoolean.withDefault(false).withOptions(click),
  sort: parseAsStringLiteral(sortOptions)
    .withDefault("recommended")
    .withOptions(click),
  view: parseAsStringLiteral(viewOptions).withDefault("grid").withOptions(click),
};

type Filters = ReturnType<typeof useQueryStates<typeof filtersParsers>>[0];
type SetFilters = ReturnType<typeof useQueryStates<typeof filtersParsers>>[1];

type BrowseFiltersContextType = {
  filters: Filters;
  setFilters: SetFilters;
  /** Listings matching every filter. */
  results: Listing[];
  /** Count per category slug ("" = all), using every filter except category. */
  categoryCounts: Record<string, number>;
  /** Clears every filter except search, sort and layout. */
  resetFilters: () => void;
};

const BrowseFiltersContext = createContext<BrowseFiltersContextType | null>(
  null,
);

function matches(listing: Listing, f: Filters, ignoreCategory = false) {
  const store = getStore(listing.store);
  const q = f.q.trim().toLowerCase();

  if (q) {
    const haystack = [
      listing.title.en,
      listing.title.ar,
      listing.type,
      store.name,
      ...listing.specs,
    ]
      .join(" ")
      .toLowerCase();
    if (!q.split(/\s+/).every((word) => haystack.includes(word))) return false;
  }
  if (!ignoreCategory && f.category && listing.category !== f.category)
    return false;
  if (f.min_price != null && listing.price < f.min_price) return false;
  if (f.max_price != null && listing.price > f.max_price) return false;
  if (f.city && listing.city !== f.city) return false;
  if (f.condition.length && !f.condition.includes(listing.condition))
    return false;
  if (f.negotiable && !listing.negotiable) return false;
  if (f.rating4 && store.rating < 4) return false;
  if (f.open_now && !store.open) return false;
  if (f.delivers && !listing.delivers) return false;
  return true;
}

function sortListings(items: Listing[], sort: SortOption) {
  const sorted = [...items];
  switch (sort) {
    case "price_asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price_desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "newest":
      return sorted.sort((a, b) => a.ageHours - b.ageHours);
    case "nearest":
      return sorted.sort((a, b) => a.distance - b.distance);
    default:
      // Pinned first, then featured, then newest.
      return sorted.sort(
        (a, b) =>
          Number(!!b.pinned) - Number(!!a.pinned) ||
          Number(!!b.featured) - Number(!!a.featured) ||
          a.ageHours - b.ageHours,
      );
  }
}

export function BrowseFiltersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [filters, setFilters] = useQueryStates(filtersParsers);

  const value = useMemo<BrowseFiltersContextType>(() => {
    const withoutCategory = listings.filter((l) => matches(l, filters, true));
    const categoryCounts: Record<string, number> = {
      "": withoutCategory.length,
    };
    for (const l of withoutCategory) {
      categoryCounts[l.category] = (categoryCounts[l.category] ?? 0) + 1;
    }

    const results = sortListings(
      withoutCategory.filter(
        (l) => !filters.category || l.category === filters.category,
      ),
      filters.sort,
    );

    return {
      filters,
      setFilters,
      results,
      categoryCounts,
      resetFilters: () =>
        setFilters({
          category: null,
          min_price: null,
          max_price: null,
          city: null,
          condition: null,
          negotiable: null,
          rating4: null,
          open_now: null,
          delivers: null,
        }),
    };
  }, [filters, setFilters]);

  return (
    <BrowseFiltersContext.Provider value={value}>
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
