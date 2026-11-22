"use client";

import { useTransition } from "react";
import { Country } from "@/types/global";
import { resolveCountry } from "@/lib/country";
import { writeCountryCookie } from "@/lib/country-cookie";
import { useCountryParam, usePathname, useRouter } from "@/i18n/navigation";

// Country code of the current URL ("sa")
export function useSelectedCountryCode() {
  return useCountryParam();
}

// Country of the current URL. Selecting another one opens the same page
// in that country ("/sa/browse" → "/ae/browse")
export function useSelectedCountry(countries: Country[]) {
  const code = useCountryParam();
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  const isLive = (c: Country) => c.status === "live";
  const selected = resolveCountry(countries, code);

  const select = (country: Country) => {
    if (!isLive(country) || country.code.toLowerCase() === code) return;
    // An explicit choice is the new preference
    writeCountryCookie(country.code.toLowerCase());
    // Keep the current query string (filters, tabs…)
    const search = window.location.search;
    startTransition(() => {
      router.replace(`${pathname}${search}`, {
        country: country.code.toLowerCase(),
      });
    });
  };

  return { selected, select, isLive, pending };
}
