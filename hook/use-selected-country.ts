"use client";

import { useSyncExternalStore, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Country } from "@/types/global";
import { COUNTRY_COOKIE, resolveCountry } from "@/lib/country";

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

// Selected country code from the cookie (null on the server / before choosing)
export function useSelectedCountryCode() {
  return useSyncExternalStore(subscribe, readCookie, () => null);
}

// Selected country, persisted in a cookie so the server can read it too.
// Falls back to the first live country.
export function useSelectedCountry(countries: Country[]) {
  const code = useSelectedCountryCode();

  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const isLive = (c: Country) => c.status === "live";
  const selected = resolveCountry(countries, code);

  const select = (country: Country) => {
    if (!isLive(country)) return;
    document.cookie = `${COUNTRY_COOKIE}=${encodeURIComponent(country.code)}; path=/; max-age=31536000; samesite=lax`;
    window.dispatchEvent(new Event(CHANGE_EVENT));
    // Re-render server components (hero, prices…) with the new country
    startTransition(() => router.refresh());
  };

  return { selected, select, isLive, pending };
}
