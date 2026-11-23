// Types of the browse page

// Value of one category-field filter in the URL:
// select / types → chosen values, bool → on, text → search text,
// number range → min / max, unit → chosen unit
export type FieldFilterValue = string[] | boolean | string | number | null;

// Category-field filters, keyed by URL param
// (e.g. karat, gross_weight_min, gross_weight_unit, type)
export type FieldFilters = Record<string, FieldFilterValue>;
