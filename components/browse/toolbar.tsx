"use client";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "../ui/sheet";
import {
  sortOptions,
  useBrowseFilters,
  type SortOption,
  type ViewOption,
} from "@/providers/browse-filters";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { FilterFields } from "./filters";
import { useLocale, useTranslations } from "next-intl";
import { Bookmark, LayoutGrid, List, Map, SlidersHorizontal } from "lucide-react";

const views: { key: ViewOption; icon: typeof LayoutGrid }[] = [
  { key: "grid", icon: LayoutGrid },
  { key: "list", icon: List },
  { key: "map", icon: Map },
];

function MobileFilters() {
  const locale = useLocale();
  const t = useTranslations("Browse.filters");
  const { results, resetFilters } = useBrowseFilters();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-[rgba(27,107,74,0.2)] bg-white px-3.5 py-2 text-sm font-semibold text-[#1B6B4A] lg:hidden"
        >
          <SlidersHorizontal className="size-4" />
          {t("title")}
        </button>
      </SheetTrigger>
      <SheetContent
        side={locale === "ar" ? "right" : "left"}
        className="w-[88%] gap-0 bg-white text-[#1A1A14] sm:max-w-sm"
        aria-describedby={undefined}
      >
        <SheetHeader className="border-b border-[rgba(27,107,74,0.08)]">
          <SheetTitle className="text-sm font-bold text-[#1A1A14]">
            {t("title")}
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-5 py-3">
          <FilterFields />
        </div>
        <SheetFooter className="flex-row gap-2 border-t border-[rgba(27,107,74,0.08)]">
          <button
            type="button"
            onClick={resetFilters}
            className="flex-1 rounded-lg border border-[rgba(27,107,74,0.2)] px-4 py-2.5 text-sm font-semibold text-[#1B6B4A]"
          >
            {t("reset")}
          </button>
          <SheetClose asChild>
            <button
              type="button"
              className="flex-1 rounded-lg bg-[#1B6B4A] px-4 py-2.5 text-sm font-semibold text-[#FAF6EF]"
            >
              {t("showResults", { count: results.length })}
            </button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default function Toolbar() {
  const t = useTranslations("Browse.toolbar");
  const { filters, setFilters, results } = useBrowseFilters();

  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-[#4A4840]" aria-live="polite">
        {t("results", { count: results.length })}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <MobileFilters />

        <button
          type="button"
          onClick={() => toast.success(t("searchSaved"))}
          className="inline-flex items-center gap-2 rounded-lg border border-[rgba(201,164,69,0.5)] bg-[rgba(201,164,69,0.1)] px-3.5 py-2 text-sm font-semibold text-[#8B6914] transition-colors hover:bg-[rgba(201,164,69,0.18)]"
        >
          <Bookmark className="size-4" />
          {t("saveSearch")}
        </button>

        <label className="sr-only" htmlFor="sort-select">
          {t("sortBy")}
        </label>
        <select
          id="sort-select"
          value={filters.sort}
          onChange={(e) =>
            setFilters({
              sort:
                e.target.value === "recommended"
                  ? null
                  : (e.target.value as SortOption),
            })
          }
          className="rounded-lg border border-[rgba(27,107,74,0.2)] bg-white px-3 py-2 text-sm font-semibold text-[#1A1A14] focus:border-[#1B6B4A] focus:outline-none"
        >
          {sortOptions.map((option) => (
            <option key={option} value={option}>
              {t(`sort.${option}`)}
            </option>
          ))}
        </select>

        <div
          role="group"
          aria-label={t("layout")}
          className="flex rounded-lg border border-[rgba(27,107,74,0.15)] bg-white p-0.5"
        >
          {views.map(({ key, icon: Icon }) => (
            <button
              key={key}
              type="button"
              aria-label={t(key)}
              aria-pressed={filters.view === key}
              onClick={() => setFilters({ view: key === "grid" ? null : key })}
              className={cn(
                "rounded-md p-2 transition-colors",
                filters.view === key
                  ? "bg-[#1B6B4A] text-[#FAF6EF]"
                  : "text-[#8A8678] hover:text-[#1B6B4A]",
              )}
            >
              <Icon className="size-4" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
