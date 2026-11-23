"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useBrowseCountry, useCurrency } from "@/hook/use-currency";
import { Check, ChevronDown } from "lucide-react";
import {
  getCategoryFilterFields,
  useBrowseFilters,
} from "@/providers/browse-filters";
import { cities } from "@/constants/marketplace";
import { TYPE_PARAM, maxParam, minParam, unitParam } from "@/lib/catalog";
import type { CatalogField, CatalogOption } from "@/types/catalog";

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
            "absolute inset-s-0.5 top-0.5 size-4 rounded-full bg-white shadow transition-transform",
            checked && "translate-x-4 rtl:-translate-x-4",
          )}
        />
      </button>
    </div>
  );
}

// Multi-select checkboxes; `onChange` gets null when nothing is picked
function CheckboxList({
  options,
  selected,
  onChange,
}: {
  options: CatalogOption[];
  selected: string[];
  onChange: (value: string[] | null) => void;
}) {
  const toggle = (value: string) => {
    const next = selected.includes(value)
      ? selected.filter((x) => x !== value)
      : [...selected, value];
    onChange(next.length ? next : null);
  };

  return (
    <div className="flex flex-col">
      {options.map((option) => {
        const checked = selected.includes(option.value);
        return (
          <label
            key={option.value}
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
              onChange={() => toggle(option.value)}
            />
            <span className="flex-1 text-sm text-[#4A4840]">
              {option.label}
            </span>
          </label>
        );
      })}
    </div>
  );
}

function parseNumber(value: string) {
  if (value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

function RangeInputs({
  min,
  max,
  onMin,
  onMax,
  minLabel,
  maxLabel,
  step,
}: {
  min: number | null;
  max: number | null;
  onMin: (value: number | null) => void;
  onMax: (value: number | null) => void;
  minLabel: string;
  maxLabel: string;
  step?: number;
}) {
  const t = useTranslations("Browse.filters");

  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        inputMode="decimal"
        min={0}
        step={step}
        placeholder={t("min")}
        aria-label={minLabel}
        value={min ?? ""}
        onChange={(e) => onMin(parseNumber(e.target.value))}
        className={cn(inputClass, "min-w-0 flex-1")}
      />
      <span className="text-muted-foreground">–</span>
      <input
        type="number"
        inputMode="decimal"
        min={0}
        step={step}
        placeholder={t("max")}
        aria-label={maxLabel}
        value={max ?? ""}
        onChange={(e) => onMax(parseNumber(e.target.value))}
        className={cn(inputClass, "min-w-0 flex-1")}
      />
    </div>
  );
}

// One filter of the active category, drawn from its catalog field
function CategoryFieldFilter({ field }: { field: CatalogField }) {
  const t = useTranslations("Browse.filters");
  const { fieldFilters, setFieldFilters } = useBrowseFilters();

  switch (field.type) {
    case "select":
      return (
        <Section title={field.label}>
          <CheckboxList
            options={field.options ?? []}
            selected={(fieldFilters[field.key] as string[]) ?? []}
            onChange={(v) => setFieldFilters({ [field.key]: v })}
          />
        </Section>
      );

    case "bool":
      return (
        <div className="border-b border-[rgba(27,107,74,0.08)] py-2.5 last:border-0">
          <Toggle
            label={field.label}
            checked={!!fieldFilters[field.key]}
            onChange={(v) => setFieldFilters({ [field.key]: v || null })}
          />
        </div>
      );

    case "text":
      return (
        <Section title={field.label}>
          <input
            type="text"
            aria-label={field.label}
            value={(fieldFilters[field.key] as string) ?? ""}
            onChange={(e) =>
              setFieldFilters({ [field.key]: e.target.value || null })
            }
            className={inputClass}
          />
        </Section>
      );

    case "number":
    case "unit_number": {
      const units = field.type === "unit_number" ? (field.units ?? []) : [];
      const unit =
        (fieldFilters[unitParam(field.key)] as string) ?? units[0]?.value;
      const suffix = unit ? ` (${unit})` : "";
      const integer = field.validation?.integer === true;

      return (
        <Section title={`${field.label}${suffix}`}>
          {units.length > 1 && (
            <div
              role="radiogroup"
              aria-label={field.label}
              className="mb-3 inline-flex rounded-lg bg-[rgba(27,107,74,0.06)] p-0.5"
            >
              {units.map((u) => {
                const active = u.value === unit;
                return (
                  <button
                    key={u.value}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    title={u.label}
                    onClick={() =>
                      setFieldFilters({
                        // The first unit is the default, so it stays out of the URL
                        [unitParam(field.key)]:
                          u.value === units[0].value ? null : u.value,
                      })
                    }
                    className={cn(
                      "rounded-md px-3 py-1 text-xs font-semibold transition-colors",
                      active
                        ? "bg-[#1B6B4A] text-card-foreground shadow-sm"
                        : "text-[#4A4840] hover:text-[#1B6B4A]",
                    )}
                  >
                    {u.value}
                  </button>
                );
              })}
            </div>
          )}
          <RangeInputs
            min={(fieldFilters[minParam(field.key)] as number | null) ?? null}
            max={(fieldFilters[maxParam(field.key)] as number | null) ?? null}
            onMin={(v) => setFieldFilters({ [minParam(field.key)]: v })}
            onMax={(v) => setFieldFilters({ [maxParam(field.key)]: v })}
            minLabel={t("fieldMin", { label: `${field.label}${suffix}` })}
            maxLabel={t("fieldMax", { label: `${field.label}${suffix}` })}
            step={integer ? 1 : undefined}
          />
        </Section>
      );
    }

    default:
      return null;
  }
}

/** Filter fields, shared by the desktop sidebar and the mobile sheet. */
export function FilterFields() {
  const t = useTranslations("Browse.filters");
  const tCities = useTranslations("Cities");
  const country = useBrowseCountry();
  const { label: currency } = useCurrency();
  const {
    filters,
    setFilters,
    activeCategory,
    commonFields,
    fieldFilters,
    setFieldFilters,
  } = useBrowseFilters();

  const conditionOptions =
    commonFields.find((f) => f.key === "condition")?.options ?? [];
  const negotiableLabel =
    commonFields.find((f) => f.key === "negotiable")?.label ?? t("negotiable");

  return (
    <div>
      {activeCategory ? (
        <>
          {activeCategory.types.length > 0 && (
            <Section title={t("type")}>
              <CheckboxList
                options={activeCategory.types.map((type) => ({
                  value: type.key,
                  label: type.name,
                }))}
                selected={(fieldFilters[TYPE_PARAM] as string[]) ?? []}
                onChange={(v) => setFieldFilters({ [TYPE_PARAM]: v })}
              />
            </Section>
          )}
          {getCategoryFilterFields(activeCategory).map((field) => (
            <CategoryFieldFilter key={field.key} field={field} />
          ))}
        </>
      ) : (
        <p className="mb-1 border-b border-[rgba(27,107,74,0.08)] pb-3 text-xs leading-relaxed text-muted-foreground">
          {t("hint")}
        </p>
      )}

      <Section title={t("price", { currency })}>
        <RangeInputs
          min={filters.min_price}
          max={filters.max_price}
          onMin={(v) => setFilters({ min_price: v })}
          onMax={(v) => setFilters({ max_price: v })}
          minLabel={t("minLabel", { currency })}
          maxLabel={t("maxLabel", { currency })}
        />
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
          <option value="">
            {t("allCities", { country: country?.name ?? "" })}
          </option>
          {cities.map((city) => (
            <option key={city.key} value={city.key}>
              {tCities(city.key)}
            </option>
          ))}
        </select>
      </Section>

      {conditionOptions.length > 0 && (
        <Section title={t("condition")}>
          <CheckboxList
            options={conditionOptions}
            selected={filters.condition}
            onChange={(v) => setFilters({ condition: v })}
          />
        </Section>
      )}

      <Section title={t("sellerDelivery")}>
        <Toggle
          label={negotiableLabel}
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
  const { resetFilters, hasFilters, activeCategory } = useBrowseFilters();

  return (
    <aside className="sticky top-36 hidden w-72 shrink-0 overflow-y-auto rounded-2xl border border-[rgba(27,107,74,0.1)] bg-white px-5 py-3 shadow-sm lg:block">
      <div className="py-2">
        <div className="flex items-center justify-between">
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
        {activeCategory && (
          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#D9B55A]">
            {t("categoryFilters", { category: activeCategory.name })}
          </p>
        )}
      </div>
      <FilterFields />
    </aside>
  );
}
