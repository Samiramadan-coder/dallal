"use client";

import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useBrowseFilters } from "@/providers/browse-filters";
import { categories, conditionLabels, type City } from "@/constants/marketplace";

export default function ActiveFilters() {
  const t = useTranslations("Browse");
  const tCities = useTranslations("Cities");
  const tCategories = useTranslations("Home.categories.items");
  const { filters, setFilters, resetFilters } = useBrowseFilters();

  const chips: { key: string; label: string; clear: () => void }[] = [];

  const category = categories.find((c) => c.slug === filters.category);
  if (category) {
    chips.push({
      key: "category",
      label: tCategories(category.key),
      clear: () => setFilters({ category: null }),
    });
  }
  if (filters.min_price != null || filters.max_price != null) {
    const min = filters.min_price?.toLocaleString("en-US") ?? "0";
    const max = filters.max_price?.toLocaleString("en-US") ?? "∞";
    chips.push({
      key: "price",
      label: `AED ${min} – ${max}`,
      clear: () => setFilters({ min_price: null, max_price: null }),
    });
  }
  if (filters.city) {
    chips.push({
      key: "city",
      label: tCities(filters.city as City),
      clear: () => setFilters({ city: null }),
    });
  }
  for (const c of filters.condition) {
    chips.push({
      key: `condition-${c}`,
      label: conditionLabels[c],
      clear: () => {
        const next = filters.condition.filter((x) => x !== c);
        setFilters({ condition: next.length ? next : null });
      },
    });
  }
  const toggles = [
    ["negotiable", "negotiable"],
    ["rating4", "rating4"],
    ["open_now", "openNow"],
    ["delivers", "delivers"],
  ] as const;
  for (const [param, label] of toggles) {
    if (filters[param]) {
      chips.push({
        key: param,
        label: t(`filters.${label}`),
        clear: () => setFilters({ [param]: null }),
      });
    }
  }

  if (!chips.length) return null;

  return (
    <div className="mb-5 flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold text-[#8A8678]">
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
        className="text-xs font-semibold text-[#8A8678] hover:text-[#1B6B4A] hover:underline"
      >
        {t("active.clearAll")}
      </button>
    </div>
  );
}
