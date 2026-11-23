// Catalog helpers, usable on the server and in the browser

import type { CatalogCategory, CatalogField } from "@/types/catalog";

// URL param of the category's sub-type filter (ring, chain…)
export const TYPE_PARAM = "type";

// URL params of a range filter: carat → carat_min / carat_max
export const minParam = (key: string) => `${key}_min`;
export const maxParam = (key: string) => `${key}_max`;
// URL param of a unit_number filter's unit: weight → weight_unit
export const unitParam = (key: string) => `${key}_unit`;

// The category's fields that can be used as browse filters, in API order.
// `reserved` are URL params already taken by the page's own filters
export function getFilterFields(
  category: CatalogCategory,
  reserved: ReadonlySet<string> = new Set(),
): CatalogField[] {
  return category.fields.filter(
    (field) =>
      field.filterable &&
      !field.hidden_from_public &&
      field.type !== "file" &&
      !reserved.has(field.key) &&
      // select filters need options to pick from
      (field.type !== "select" || !!field.options?.length) &&
      (field.type !== "unit_number" || !!field.units?.length),
  );
}

// Every URL param a category's filters use
export function getFilterParams(
  category: CatalogCategory,
  reserved?: ReadonlySet<string>,
): string[] {
  const params = category.types.length ? [TYPE_PARAM] : [];
  for (const field of getFilterFields(category, reserved)) {
    switch (field.type) {
      case "unit_number":
        params.push(unitParam(field.key));
      // falls through
      case "number":
        params.push(minParam(field.key), maxParam(field.key));
        break;
      default:
        params.push(field.key);
    }
  }
  return params;
}
