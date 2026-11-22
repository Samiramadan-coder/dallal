"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Country } from "@/types/global";
import { useTranslations } from "next-intl";
import WaitlistDialog from "./waitlist-dialog";
import { Bell, Check, ChevronDown } from "lucide-react";
import { useSelectedCountry } from "@/hook/use-selected-country";

// Desktop: compact trigger + dropdown list
export function CountryDropdown({ countries }: { countries: Country[] }) {
  const t = useTranslations("Navbar");
  const { selected, select, isLive } = useSelectedCountry(countries);
  // Coming-soon country whose waitlist dialog is open
  const [waitlist, setWaitlist] = useState<Country | null>(null);

  if (!selected) return null;

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="group flex h-8 items-center gap-1.5 rounded-lg border border-primary/25 bg-primary/7 px-2.5 text-[11px] font-bold text-[rgba(245,240,232,0.9)] transition-colors hover:border-primary/50 data-[state=open]:border-primary/60"
          >
            <span className="text-[rgba(245,240,232,0.6)]">
              {selected.code}
            </span>
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
                // Coming soon: open the "notify me" waitlist instead
                onSelect={() => (live ? select(country) : setWaitlist(country))}
                className={cn(
                  "group/item flex cursor-pointer items-center gap-3 rounded-none px-4 py-3",
                  active && "bg-primary/8",
                )}
              >
                <span
                  className={cn(
                    "flex min-w-0 flex-1 items-center gap-3",
                    !live &&
                      "opacity-45 transition-opacity group-focus/item:opacity-70",
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
                </span>
                {active && <Check className="size-3.5 text-primary" />}
                {!live && (
                  <span className="flex items-center gap-1 whitespace-nowrap rounded-full border border-primary/40 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary">
                    <Bell className="size-2.5" />
                    {t("comingSoon")}
                  </span>
                )}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <WaitlistDialog
        country={waitlist}
        onOpenChange={(open) => !open && setWaitlist(null)}
      />
    </>
  );
}

// Mobile: two-column grid of country cards
export function CountryGrid({ countries }: { countries: Country[] }) {
  const t = useTranslations("Navbar");
  const { selected, select, isLive } = useSelectedCountry(countries);
  // Coming-soon country whose waitlist dialog is open
  const [waitlist, setWaitlist] = useState<Country | null>(null);

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
              aria-pressed={live ? active : undefined}
              // Coming soon: open the "notify me" waitlist instead
              onClick={() => (live ? select(country) : setWaitlist(country))}
              className={cn(
                "flex items-center gap-2 rounded-lg border px-3 py-2.5 text-start transition-colors",
                active
                  ? "border-primary bg-primary/10"
                  : "border-white/8 hover:border-primary/40",
                !live && "opacity-45 hover:opacity-70",
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
                    "flex items-center gap-1 text-[10px]",
                    active ? "text-primary/70" : "text-[rgba(245,240,232,0.5)]",
                  )}
                >
                  {!live && <Bell className="size-2.5" />}
                  {live ? country.currency : t("comingSoon")}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <WaitlistDialog
        country={waitlist}
        onOpenChange={(open) => !open && setWaitlist(null)}
      />
    </div>
  );
}
