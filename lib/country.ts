import { Country } from "@/types/global";

// Shared by the proxy, server and client code, so it must stay free of
// `server-only` and request-time APIs.
//
// The country lives in the URL right after the locale (`/sa/browse`,
// `/ar/sa/browse`). The cookie only remembers the last one, so URLs
// without a country can be sent back to it

// Cookie holding the last visited country code (e.g. "sa")
export const COUNTRY_COOKIE = "country";

// Request header the proxy sets to the URL's country. Always overwritten,
// so it can't be spoofed
export const COUNTRY_HEADER = "x-country";

// Used when the URL has no country and none is remembered
export const DEFAULT_COUNTRY = "ae";

// Country URL segments are ISO codes: two letters
export function isCountrySegment(value: string | null | undefined) {
  return !!value && /^[a-z]{2}$/i.test(value);
}

// "/browse" → "/sa/browse"; anything not starting with "/" is left alone
export function addCountry(pathname: string, country: string): string {
  if (!pathname.startsWith("/") || pathname.startsWith("//")) return pathname;
  return pathname === "/" ? `/${country}` : `/${country}${pathname}`;
}

// The URL's country if it's live, otherwise the first live country
export function resolveCountry(
  countries: Country[],
  code: string | null | undefined,
): Country | undefined {
  const isLive = (c: Country) => c.status === "live";
  const wanted = code?.toLowerCase();
  return (
    countries.find((c) => c.code.toLowerCase() === wanted && isLive(c)) ??
    countries.find(isLive) ??
    countries[0]
  );
}

// The user's own country: the one of their primary phone (set when the
// phone is verified), else of any phone. Null for guests
export function primaryCountry(
  user: { phones?: { is_primary: boolean; country: Country }[] } | null,
): Country | null {
  const phones = user?.phones ?? [];
  return (phones.find((p) => p.is_primary) ?? phones[0])?.country ?? null;
}
