"use client";

import {
  ArrowRight,
  Coins,
  Crown,
  Diamond,
  Gem,
  LayoutGrid,
  Watch,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { categories } from "@/constants/marketplace";
import { useBrowseFilters } from "@/providers/browse-filters";

const icons = {
  "": LayoutGrid,
  "gold-jewelry": Crown,
  "coins-bars": Coins,
  diamonds: Diamond,
  "luxury-watches": Watch,
  "stones-pearls": Gem,
} as const;

export default function CategoryTabs() {
  const t = useTranslations("Browse");
  const tCategories = useTranslations("Home.categories.items");
  const { filters, setFilters, categoryCounts } = useBrowseFilters();

  const tabs = [
    { slug: "" as const, label: t("all") },
    ...categories.map((c) => ({ slug: c.slug, label: tCategories(c.key) })),
  ];

  return (
    <div className="-mx-4 flex items-center gap-4 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0">
      <div
        role="tablist"
        aria-label={t("categoriesLabel")}
        className="flex w-fit shrink-0 items-center gap-1 rounded-xl border border-[rgba(27,107,74,0.1)] bg-white p-1 shadow-sm"
      >
        {tabs.map((tab) => {
          const Icon = icons[tab.slug];
          const active = filters.category === tab.slug;
          return (
            <button
              key={tab.slug || "all"}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilters({ category: tab.slug || null })}
              className={cn(
                "flex items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-semibold tracking-wide transition-all duration-150",
                active
                  ? "bg-[#1B6B4A] text-card-foreground shadow-sm"
                  : "text-[#4A4840] hover:bg-[rgba(27,107,74,0.06)] hover:text-[#1B6B4A]",
              )}
            >
              <Icon
                className={cn(
                  "size-4",
                  active ? "text-[#E8D5A0]" : "text-muted-foreground",
                )}
              />
              {tab.label}
              <span
                className={cn(
                  "rounded-full px-1.5 py-px text-[11px] font-bold",
                  active
                    ? "bg-card-foreground/20 text-card-foreground"
                    : "bg-[rgba(27,107,74,0.08)] text-[#4A4840]",
                )}
              >
                {categoryCounts[tab.slug] ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      <Link
        href="/market"
        className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-sm font-bold text-[#1B6B4A] hover:underline"
      >
        {t("individualMarket")}
        <ArrowRight className="size-4 rtl:rotate-180" />
      </Link>
    </div>
  );
}
