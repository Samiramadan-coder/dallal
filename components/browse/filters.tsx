"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Check, ChevronDown } from "lucide-react";
import { useBrowseFilters } from "@/providers/browse-filters";
import {
  cities,
  conditionLabels,
  conditions,
  type Condition,
} from "@/constants/marketplace";

const inputClass =
  "w-full rounded-lg border border-[rgba(27,107,74,0.2)] bg-white px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#1B6B4A] focus:outline-none focus:ring-2 focus:ring-[rgba(27,107,74,0.12)]";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="border-b border-[rgba(27,107,74,0.08)] last:border-0">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4 text-start"
      >
        <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-foreground">
          {title}
        </span>
        <ChevronDown
          className={cn(
            "size-4 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-sm text-[#4A4840]">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-5 w-9 shrink-0 rounded-full transition-colors",
          checked ? "bg-[#1B6B4A]" : "bg-[#D9D3C4]",
        )}
      >
        <span
          className={cn(
            "absolute start-0.5 top-0.5 size-4 rounded-full bg-white shadow transition-transform",
            checked && "translate-x-4 rtl:-translate-x-4",
          )}
        />
      </button>
    </div>
  );
}

function parsePrice(value: string) {
  if (value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

/** Filter fields, shared by the desktop sidebar and the mobile sheet. */
export function FilterFields() {
  const t = useTranslations("Browse.filters");
  const tCities = useTranslations("Cities");
  const { filters, setFilters } = useBrowseFilters();

  const toggleCondition = (c: Condition) => {
    const next = filters.condition.includes(c)
      ? filters.condition.filter((x) => x !== c)
      : [...filters.condition, c];
    setFilters({ condition: next.length ? next : null });
  };

  return (
    <div>
      <p className="mb-1 border-b border-[rgba(27,107,74,0.08)] pb-3 text-xs leading-relaxed text-muted-foreground">
        {t("hint")}
      </p>

      <Section title={t("price")}>
        <div className="flex items-center gap-2">
          <input
            type="number"
            inputMode="decimal"
            min={0}
            placeholder={t("min")}
            aria-label={t("minLabel")}
            value={filters.min_price ?? ""}
            onChange={(e) =>
              setFilters({ min_price: parsePrice(e.target.value) })
            }
            className={cn(inputClass, "min-w-0 flex-1")}
          />
          <span className="text-muted-foreground">–</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            placeholder={t("max")}
            aria-label={t("maxLabel")}
            value={filters.max_price ?? ""}
            onChange={(e) =>
              setFilters({ max_price: parsePrice(e.target.value) })
            }
            className={cn(inputClass, "min-w-0 flex-1")}
          />
        </div>
      </Section>

      <Section title={t("location")}>
        <label className="sr-only" htmlFor="city-select">
          {t("city")}
        </label>
        <select
          id="city-select"
          value={filters.city}
          onChange={(e) => setFilters({ city: e.target.value || null })}
          className={inputClass}
        >
          <option value="">{t("allCities")}</option>
          {cities.map((city) => (
            <option key={city.key} value={city.key}>
              {tCities(city.key)}
            </option>
          ))}
        </select>
      </Section>

      <Section title={t("condition")}>
        <div className="flex flex-col">
          {conditions.map((c) => {
            const checked = filters.condition.includes(c);
            return (
              <label
                key={c}
                className="group flex cursor-pointer items-center gap-2.5 py-1.5"
              >
                <span
                  className={cn(
                    "flex size-4 shrink-0 items-center justify-center rounded border transition-colors",
                    checked
                      ? "border-[#1B6B4A] bg-[#1B6B4A] text-white"
                      : "border-[rgba(27,107,74,0.3)] group-hover:border-[#1B6B4A]",
                  )}
                >
                  {checked && <Check className="size-3" strokeWidth={3} />}
                </span>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={checked}
                  onChange={() => toggleCondition(c)}
                />
                <span className="flex-1 text-sm text-[#4A4840]">
                  {conditionLabels[c]}
                </span>
              </label>
            );
          })}
        </div>
      </Section>

      <Section title={t("sellerDelivery")}>
        <Toggle
          label={t("negotiable")}
          checked={filters.negotiable}
          onChange={(v) => setFilters({ negotiable: v || null })}
        />
        <Toggle
          label={t("rating4")}
          checked={filters.rating4}
          onChange={(v) => setFilters({ rating4: v || null })}
        />
        <Toggle
          label={t("openNow")}
          checked={filters.open_now}
          onChange={(v) => setFilters({ open_now: v || null })}
        />
        <Toggle
          label={t("delivers")}
          checked={filters.delivers}
          onChange={(v) => setFilters({ delivers: v || null })}
        />
      </Section>
    </div>
  );
}

export default function FiltersSidebar() {
  const t = useTranslations("Browse.filters");
  const { resetFilters, filters } = useBrowseFilters();
  const hasFilters =
    filters.min_price != null ||
    filters.max_price != null ||
    !!filters.city ||
    filters.condition.length > 0 ||
    filters.negotiable ||
    filters.rating4 ||
    filters.open_now ||
    filters.delivers;

  return (
    <aside className="sticky top-36 hidden max-h-[calc(100vh-10rem)] w-72 shrink-0 overflow-y-auto rounded-2xl border border-[rgba(27,107,74,0.1)] bg-white px-5 py-3 shadow-sm lg:block">
      <div className="flex items-center justify-between py-2">
        <h2 className="text-sm font-bold text-foreground">{t("title")}</h2>
        {hasFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-xs font-semibold text-[#1B6B4A] hover:underline"
          >
            {t("reset")}
          </button>
        )}
      </div>
      <FilterFields />
    </aside>
  );
}
