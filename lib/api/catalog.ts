import { cache } from "react";
import { unstable_rethrow } from "next/navigation";

import type { Catalog, CatalogAudience } from "@/types/catalog";

import { api, type RequestOptions } from "./client";

// Categories and their fields rarely change: public (no token) and cached for
// an hour across all requests, per language. Refresh early with
// revalidateTag("catalog")
const CATALOG_REQUEST: RequestOptions = {
  auth: false,
  next: { revalidate: 3600, tags: ["catalog"] },
};

const EMPTY_CATALOG: Catalog = {
  version: "",
  common_fields: [],
  categories: [],
};

// Listing categories with their fields. Deduped per request, so any number
// of Server Components can call it
export const getCatalog = cache(async (): Promise<Catalog> => {
  try {
    const res = await api.get<{ data: Catalog }>("/v1/catalog", CATALOG_REQUEST);
    return res.data;
  } catch (error) {
    unstable_rethrow(error);
    console.error("failed to load the catalog", error);
    return EMPTY_CATALOG;
  }
});

// Categories of one market: "merchant" (browse) or "individual_market"
export async function getCategories(audience?: CatalogAudience) {
  const { categories } = await getCatalog();
  return audience
    ? categories.filter((category) => category.audience === audience)
    : categories;
}

export async function getCategory(key: string) {
  const { categories } = await getCatalog();
  return categories.find((category) => category.key === key) ?? null;
}
