"use client";

import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  getCategoryFilterFields,
  useBrowseFilters,
} from "@/providers/browse-filters";
import { TYPE_PARAM, maxParam, minParam, unitParam } from "@/lib/catalog";
import type { CatalogOption } from "@/types/catalog";

type Chip = { key: string; label: string; clear: () => void };

const labelOf = (options: CatalogOption[] | null, value: string) =>
  options?.find((o) => o.value === value)?.label ?? value;

const range = (min: number | null, max: number | null) =>
  `${min?.toLocaleString("en-US") ?? "0"} – ${max?.toLocaleString("en-US") ?? "∞"}`;

export default function ActiveFilters() {
  const t = useTranslations("Browse");
  const {
    filters,
    setFilters,
    activeCategory,
    commonFields,
    cities,
    fieldFilters,
    setFieldFilters,
    selectCategory,
    fixedCategory,
    resetFilters,
  } = useBrowseFilters();

  const chips: Chip[] = [];

  // One chip per picked value of a multi-select filter
  const listChips = (
    param: string,
    selected: string[],
    options: CatalogOption[] | null,
    set: (value: string[] | null) => void,
  ) => {
    for (const value of selected) {
      chips.push({
        key: `${param}-${value}`,
        label: labelOf(options, value),
        clear: () => {
          const next = selected.filter((x) => x !== value);
          set(next.length ? next : null);
        },
      });
    }
  };

  if (activeCategory) {
    // A route's category isn't a removable filter
    if (!fixedCategory) {
      chips.push({
        key: "category",
        label: activeCategory.name,
        clear: () => selectCategory(null),
      });
    }

    listChips(
      TYPE_PARAM,
      (fieldFilters[TYPE_PARAM] as string[]) ?? [],
      activeCategory.types.map((type) => ({
        value: type.key,
        label: type.name,
      })),
      (v) => setFieldFilters({ [TYPE_PARAM]: v }),
    );

    for (const field of getCategoryFilterFields(activeCategory)) {
      const value = fieldFilters[field.key];
      switch (field.type) {
        case "select":
          listChips(field.key, (value as string[]) ?? [], field.options, (v) =>
            setFieldFilters({ [field.key]: v }),
          );
          break;
        case "bool":
          if (value) {
            chips.push({
              key: field.key,
              label: field.label,
              clear: () => setFieldFilters({ [field.key]: null }),
            });
          }
          break;
        case "text":
          if (value) {
            chips.push({
              key: field.key,
              label: `${field.label}: ${value}`,
              clear: () => setFieldFilters({ [field.key]: null }),
            });
          }
          break;
        case "number":
        case "unit_number": {
          const min = (fieldFilters[minParam(field.key)] as number | null) ?? null;
          const max = (fieldFilters[maxParam(field.key)] as number | null) ?? null;
          if (min == null && max == null) break;
          const unit =
            field.type === "unit_number"
              ? ((fieldFilters[unitParam(field.key)] as string) ??
                field.units?.[0]?.value)
              : undefined;
          chips.push({
            key: field.key,
            label: `${field.label}: ${range(min, max)}${unit ? ` ${unit}` : ""}`,
            clear: () =>
              setFieldFilters({
                [minParam(field.key)]: null,
                [maxParam(field.key)]: null,
              }),
          });
          break;
        }
      }
    }
  }

  // Ids that aren't a city of this country get no chip
  const city = cities.find((c) => c.id === filters.city_id);
  if (city) {
    chips.push({
      key: "city_id",
      label: city.name,
      clear: () => setFilters({ city_id: null }),
    });
  }
  listChips(
    "condition",
    filters.condition,
    commonFields.find((f) => f.key === "condition")?.options ?? null,
    (v) => setFilters({ condition: v }),
  );
  if (filters.negotiable) {
    chips.push({
      key: "negotiable",
      label:
        commonFields.find((f) => f.key === "negotiable")?.label ??
        "negotiable",
      clear: () => setFilters({ negotiable: null }),
    });
  }

  if (!chips.length) return null;

  return (
    <div className="mb-5 flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold text-muted-foreground">
        {t("active.title")}:
      </span>
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={chip.clear}
          aria-label={t("active.remove", { label: chip.label })}
          className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(27,107,74,0.2)] bg-white px-3 py-1 text-xs font-semibold text-[#1B6B4A] transition-colors hover:border-[#1B6B4A]"
        >
          {chip.label}
          <X className="size-3" />
        </button>
      ))}
      <button
        type="button"
        onClick={resetFilters}
        className="text-xs font-semibold text-muted-foreground hover:text-[#1B6B4A] hover:underline"
      >
        {t("active.clearAll")}
      </button>
    </div>
  );
}
