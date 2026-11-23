"use client";

import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import CategoryIcon from "@/components/reusable/category-icon";
import { useBrowseFilters } from "@/providers/browse-filters";

export default function CategoryTabs() {
  const t = useTranslations("Browse");
  const { categories, activeCategory, selectCategory } = useBrowseFilters();

  // Names come from the catalog, already in the page's language
  const tabs = [
    { key: "", label: t("all"), icon: null },
    ...categories.map((c) => ({ key: c.key, label: c.name, icon: c.icon })),
  ];
  const activeKey = activeCategory?.key ?? "";

  return (
    <div className="-mx-4 flex items-center gap-4 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0">
      <div
        role="tablist"
        aria-label={t("categoriesLabel")}
        className="flex w-fit shrink-0 items-center gap-1 rounded-xl border border-[rgba(27,107,74,0.1)] bg-white p-1 shadow-sm"
      >
        {tabs.map((tab) => {
          const active = activeKey === tab.key;
          return (
            <button
              key={tab.key || "all"}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => selectCategory(tab.key || null)}
              className={cn(
                "flex items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-semibold tracking-wide transition-all duration-150",
                active
                  ? "bg-[#1B6B4A] text-card-foreground shadow-sm"
                  : "text-[#4A4840] hover:bg-[rgba(27,107,74,0.06)] hover:text-[#1B6B4A]",
              )}
            >
              <CategoryIcon
                icon={tab.icon}
                className={cn(
                  "size-4",
                  active ? "text-[#E8D5A0]" : "text-muted-foreground",
                )}
              />
              {tab.label}
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
