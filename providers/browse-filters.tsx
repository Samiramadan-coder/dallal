"use client";

import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsFloat,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  useQueryStates,
  type SingleParserBuilder,
} from "nuqs";
import { listings, type Listing } from "@/constants/marketplace";
import { createContext, useContext, useMemo } from "react";
import {
  TYPE_PARAM,
  getFilterFields,
  getFilterParams,
  maxParam,
  minParam,
  unitParam,
} from "@/lib/catalog";
import type { FieldFilters } from "@/types/browse";
import type { CatalogCategory, CatalogField } from "@/types/catalog";
import type { City } from "@/types/global";

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
  // Catalog category key, e.g. ?category=gold_jewellery
  category: parseAsString.withDefault("").withOptions(click),
  // Catalog common field `city_id`; ids from GET /v1/countries/{code}/cities
  city_id: parseAsInteger.withOptions(click),
  // Catalog condition values (new, like_new, good, fair)
  condition: parseAsArrayOf(parseAsString).withDefault([]).withOptions(click),
  negotiable: parseAsBoolean.withDefault(false).withOptions(click),
  sort: parseAsStringLiteral(sortOptions)
    .withDefault("recommended")
    .withOptions(click),
  view: parseAsStringLiteral(viewOptions).withDefault("grid").withOptions(click),
};

// Category fields can't take over the page's own params
const RESERVED_PARAMS: ReadonlySet<string> = new Set([
  ...Object.keys(filtersParsers),
  TYPE_PARAM,
]);

// Filters of `category` that the sidebar shows
export function getCategoryFilterFields(category: CatalogCategory) {
  return getFilterFields(category, RESERVED_PARAMS);
}

type AnyParser = SingleParserBuilder<unknown>;

// URL parsers of the category's own filters
function buildFieldParsers(category: CatalogCategory | null) {
  const parsers: Record<string, AnyParser> = {};
  if (!category) return parsers;

  const list = (options = click) =>
    parseAsArrayOf(parseAsString).withDefault([]).withOptions(options);

  if (category.types.length) parsers[TYPE_PARAM] = list() as AnyParser;

  for (const field of getCategoryFilterFields(category)) {
    switch (field.type) {
      case "select":
        parsers[field.key] = list() as AnyParser;
        break;
      case "bool":
        parsers[field.key] = parseAsBoolean
          .withDefault(false)
          .withOptions(click) as AnyParser;
        break;
      case "text":
        parsers[field.key] = parseAsString
          .withDefault("")
          .withOptions(typing) as AnyParser;
        break;
      case "unit_number": {
        const units = field.units!.map((unit) => unit.value);
        parsers[unitParam(field.key)] = parseAsStringLiteral(units)
          .withDefault(units[0])
          .withOptions(click) as AnyParser;
      }
      // falls through
      case "number":
        parsers[minParam(field.key)] = parseAsFloat.withOptions(
          typing,
        ) as AnyParser;
        parsers[maxParam(field.key)] = parseAsFloat.withOptions(
          typing,
        ) as AnyParser;
        break;
    }
  }

  return parsers;
}

// A field filter is set when it differs from "nothing picked"
function isSet(value: FieldFilters[string]) {
  if (Array.isArray(value)) return value.length > 0;
  return value !== null && value !== undefined && value !== false && value !== "";
}

type Filters = ReturnType<typeof useQueryStates<typeof filtersParsers>>[0];
type SetFilters = ReturnType<typeof useQueryStates<typeof filtersParsers>>[1];

type BrowseFiltersContextType = {
  filters: Filters;
  setFilters: SetFilters;
  // Merchant categories from the catalog, in API order
  categories: CatalogCategory[];
  // The URL's category; null = all (or an unknown key)
  activeCategory: CatalogCategory | null;
  // The category comes from the route (/market/[category]), not ?category=,
  // so it can't be changed or cleared
  fixedCategory: boolean;
  // Fields every listing has (condition, negotiable…)
  commonFields: CatalogField[];
  // Cities of the browse country, for the city_id filter
  cities: City[];
  // Filters of the active category, keyed by URL param
  fieldFilters: FieldFilters;
  setFieldFilters: (values: FieldFilters) => void;
  // Switches category and drops the old category's filters
  selectCategory: (key: string | null) => void;
  // Static for now; the listings API will return them already filtered
  // by the URL params above
  results: Listing[];
  // True when any filter other than search, sort and layout is set
  hasFilters: boolean;
  /** Clears every filter except search, sort and layout. */
  resetFilters: () => void;
};

const BrowseFiltersContext = createContext<BrowseFiltersContextType | null>(
  null,
);

const nullAll = (keys: readonly string[]) =>
  Object.fromEntries(keys.map((key) => [key, null]));

export function BrowseFiltersProvider({
  categories = [],
  category,
  commonFields,
  cities,
  children,
}: {
  // Categories picked with ?category= (browse tabs)
  categories?: CatalogCategory[];
  // A fixed category instead, e.g. from the route
  category?: CatalogCategory;
  commonFields: CatalogField[];
  cities: City[];
  children: React.ReactNode;
}) {
  const [filters, setFilters] = useQueryStates(filtersParsers);
  const fixedCategory = !!category;

  const activeCategory = useMemo(
    () =>
      category ?? categories.find((c) => c.key === filters.category) ?? null,
    [category, categories, filters.category],
  );

  // Rebuilt when the category changes, so only its params are read
  const fieldParsers = useMemo(
    () => buildFieldParsers(activeCategory),
    [activeCategory],
  );
  const [fieldFilters, setFieldFiltersState] = useQueryStates(fieldParsers);

  const value = useMemo<BrowseFiltersContextType>(() => {
    const fieldParams = activeCategory
      ? getFilterParams(activeCategory, RESERVED_PARAMS)
      : [];
    const unitParams = new Set(
      activeCategory
        ? getCategoryFilterFields(activeCategory)
            .filter((field) => field.type === "unit_number")
            .map((field) => unitParam(field.key))
        : [],
    );
    const clearFields = () => {
      if (fieldParams.length) setFieldFiltersState(nullAll(fieldParams));
    };

    const hasFilters =
      (!!activeCategory && !fixedCategory) ||
      filters.city_id != null ||
      filters.condition.length > 0 ||
      filters.negotiable ||
      Object.entries(fieldFilters).some(
        // The unit alone isn't a filter
        ([param, v]) =>
          !unitParams.has(param) && isSet(v as FieldFilters[string]),
      );

    return {
      filters,
      setFilters,
      categories,
      activeCategory,
      fixedCategory,
      commonFields,
      cities,
      fieldFilters: fieldFilters as FieldFilters,
      setFieldFilters: (values) => setFieldFiltersState(values),
      selectCategory: (key) => {
        if (fixedCategory || (key ?? "") === filters.category) return;
        // Both updates land in the same URL change
        clearFields();
        setFilters({ category: key || null });
      },
      results: listings,
      hasFilters,
      resetFilters: () => {
        clearFields();
        setFilters({
          category: null,
          city_id: null,
          condition: null,
          negotiable: null,
        });
      },
    };
  }, [
    filters,
    setFilters,
    categories,
    activeCategory,
    fixedCategory,
    commonFields,
    cities,
    fieldFilters,
    setFieldFiltersState,
  ]);

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
