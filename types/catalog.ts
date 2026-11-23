// GET /v1/catalog: listing categories and the fields each one uses.
// Labels come back translated for the request's Accept-Language

export type CatalogFieldType =
  | "text"
  | "number"
  | "unit_number"
  | "select"
  | "bool"
  | "file";

export type CatalogOption = { value: string; label: string };

// `factor` converts the unit to the field's base unit (e.g. tola → grams)
export type CatalogUnit = { value: string; label: string; factor: number };

export type CatalogField = {
  key: string;
  label: string;
  type: CatalogFieldType;
  // `select` only; null when the options come from elsewhere
  // (validation.options_source, e.g. "cities")
  options: CatalogOption[] | null;
  // `unit_number` only; the first one is the base unit
  units: CatalogUnit[] | null;
  required: boolean;
  // Can be used as a browse filter
  filterable: boolean;
  hidden_from_public: boolean;
  validation: Record<string, unknown> | null;
  // Shown only when other fields have these values, e.g. { has_stones: true }
  show_if: Record<string, unknown> | null;
  audience: CatalogAudience | null;
};

export type CatalogAudience = "merchant" | "individual_market";

export type CatalogCategoryType = { key: string; name: string };

export type CatalogCategory = {
  key: string;
  name: string;
  audience: CatalogAudience;
  audience_label: string;
  pricing_mode: "live" | "fixed";
  // Icon name, e.g. "ring", "bar", "diamond" (see components/catalog-icon)
  icon: string;
  image: string | null;
  badge: string | null;
  always_review: boolean;
  forbidden_fields: string[];
  material_status: {
    default: string;
    certified_when: string;
    labels: Record<string, string>;
  } | null;
  // Sub-types (e.g. ring, chain); empty when the category has none
  types: CatalogCategoryType[];
  fields: CatalogField[];
  market_rule: unknown;
};

export type Catalog = {
  // Changes whenever the catalog does
  version: string;
  // Fields every listing has (title, condition, city_id, negotiable…)
  common_fields: CatalogField[];
  categories: CatalogCategory[];
};
