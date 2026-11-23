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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
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

function MobileFilters({ count }: { count: number }) {
  const locale = useLocale();
  const t = useTranslations("Browse.filters");
  const { resetFilters } = useBrowseFilters();

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
        className="w-[88%] gap-0 bg-white text-foreground sm:max-w-sm"
        aria-describedby={undefined}
      >
        <SheetHeader className="border-b border-[rgba(27,107,74,0.08)]">
          <SheetTitle className="text-sm font-bold text-foreground">
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
              className="flex-1 rounded-lg bg-[#1B6B4A] px-4 py-2.5 text-sm font-semibold text-card-foreground"
            >
              {t("showResults", { count })}
            </button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default function Toolbar({
  count,
  simple = false,
}: {
  // Listings shown; defaults to the browse results
  count?: number;
  // Count, filters and sort only: no saved search or layout switch
  simple?: boolean;
}) {
  const t = useTranslations("Browse.toolbar");
  const { filters, setFilters, results } = useBrowseFilters();
  const total = count ?? results.length;

  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-[#4A4840]" aria-live="polite">
        {t("results", { count: total })}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <MobileFilters count={total} />

        {!simple && (
          <button
            type="button"
            onClick={() => toast.success(t("searchSaved"))}
            className="inline-flex items-center gap-2 rounded-lg border border-primary/50 bg-primary/10 px-3.5 py-2 text-sm font-semibold text-[#8B6914] transition-colors hover:bg-primary/18"
          >
            <Bookmark className="size-4" />
            {t("saveSearch")}
          </button>
        )}

        <Select
          value={filters.sort}
          onValueChange={(v) =>
            setFilters({
              sort: v === "recommended" ? null : (v as SortOption),
            })
          }
        >
          <SelectTrigger
            aria-label={t("sortBy")}
            className="rounded-lg border border-[rgba(27,107,74,0.2)] bg-white px-3 text-sm font-semibold text-foreground focus-visible:border-[#1B6B4A] focus-visible:ring-[rgba(27,107,74,0.12)] data-[size=default]:h-9.5"
          >
            {/* Label given directly, so it shows before hydration too */}
            <SelectValue>{t(`sort.${filters.sort}`)}</SelectValue>
          </SelectTrigger>
          <SelectContent position="popper" align="end">
            {sortOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {t(`sort.${option}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {!simple && (
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
                onClick={() =>
                  setFilters({ view: key === "grid" ? null : key })
                }
                className={cn(
                  "rounded-md p-2 transition-colors",
                  filters.view === key
                    ? "bg-[#1B6B4A] text-card-foreground"
                    : "text-muted-foreground hover:text-[#1B6B4A]",
                )}
              >
                <Icon className="size-4" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
