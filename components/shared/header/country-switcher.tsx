"use client";

import { useSyncExternalStore } from "react";
import { Check, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Country } from "@/types/global";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const COUNTRY_COOKIE = "country";

// Selected country, persisted in a cookie so the server can read it later.
// Falls back to the first live country.
const CHANGE_EVENT = "country-change";

const subscribe = (cb: () => void) => {
  window.addEventListener(CHANGE_EVENT, cb);
  return () => window.removeEventListener(CHANGE_EVENT, cb);
};

const readCookie = () => {
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${COUNTRY_COOKIE}=([^;]*)`),
  );
  return match ? decodeURIComponent(match[1]) : null;
};

function useSelectedCountry(countries: Country[]) {
  const code = useSyncExternalStore(subscribe, readCookie, () => null);

  const isLive = (c: Country) => c.status === "live";
  const selected =
    countries.find((c) => c.code === code && isLive(c)) ??
    countries.find(isLive) ??
    countries[0];

  const select = (country: Country) => {
    if (!isLive(country)) return;
    document.cookie = `${COUNTRY_COOKIE}=${encodeURIComponent(country.code)}; path=/; max-age=31536000; samesite=lax`;
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  return { selected, select, isLive };
}

// Desktop: compact trigger + dropdown list
export function CountryDropdown({ countries }: { countries: Country[] }) {
  const t = useTranslations("Navbar");
  const { selected, select, isLive } = useSelectedCountry(countries);

  if (!selected) return null;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="group flex h-8 items-center gap-1.5 rounded-lg border border-primary/25 bg-primary/7 px-2.5 text-[11px] font-bold text-[rgba(245,240,232,0.9)] transition-colors hover:border-primary/50 data-[state=open]:border-primary/60"
        >
          <span className="text-[rgba(245,240,232,0.6)]">{selected.code}</span>
          <span>{selected.currency}</span>
          <ChevronDown className="size-3 transition-transform group-data-[state=open]:rotate-180" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        sideOffset={8}
        className="w-56 rounded-xl border border-primary/15 bg-card p-0"
      >
        <DropdownMenuLabel className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
          {t("selectCountry")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="m-0 bg-primary/10" />

        {countries.map((country) => {
          const live = isLive(country);
          const active = country.code === selected.code;

          return (
            <DropdownMenuItem
              key={country.id}
              disabled={!live}
              onSelect={() => select(country)}
              className={cn(
                "flex items-center gap-3 rounded-none px-4 py-3 data-disabled:opacity-45",
                active && "bg-primary/8",
              )}
            >
              <span className="w-6 text-sm font-semibold text-[rgba(245,240,232,0.85)]">
                {country.code}
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm font-bold text-[#F5F0E8]">
                  {country.name}
                </span>
                <span className="text-[10px] text-[rgba(245,240,232,0.5)]">
                  {country.currency} · {country.dial_code}
                </span>
              </span>
              {active && <Check className="size-3.5 text-primary" />}
              {!live && (
                <span className="whitespace-nowrap rounded-full border border-primary/40 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary">
                  {t("comingSoon")}
                </span>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Mobile: two-column grid of country cards
export function CountryGrid({ countries }: { countries: Country[] }) {
  const t = useTranslations("Navbar");
  const { selected, select, isLive } = useSelectedCountry(countries);

  if (!selected) return null;

  return (
    <div>
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
        {t("countryCurrency")}
      </p>

      <div className="grid grid-cols-2 gap-2">
        {countries.map((country) => {
          const live = isLive(country);
          const active = country.code === selected.code;

          return (
            <button
              key={country.id}
              type="button"
              disabled={!live}
              aria-pressed={active}
              onClick={() => select(country)}
              className={cn(
                "flex items-center gap-2 rounded-lg border px-3 py-2.5 text-start transition-colors",
                active
                  ? "border-primary bg-primary/10"
                  : "border-white/8 hover:border-primary/40",
                !live && "cursor-not-allowed opacity-45 hover:border-white/8",
              )}
            >
              <span
                className={cn(
                  "text-sm font-semibold",
                  active ? "text-primary" : "text-[rgba(245,240,232,0.8)]",
                )}
              >
                {country.code}
              </span>
              <span className="flex min-w-0 flex-col">
                <span
                  className={cn(
                    "truncate text-[11px] font-bold",
                    active ? "text-primary" : "text-[#F5F0E8]",
                  )}
                >
                  {country.name}
                </span>
                <span
                  className={cn(
                    "text-[10px]",
                    active ? "text-primary/70" : "text-[rgba(245,240,232,0.5)]",
                  )}
                >
                  {live ? country.currency : t("comingSoon")}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
