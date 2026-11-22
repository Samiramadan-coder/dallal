import { Country } from "@/types/global";

// Cookie holding the selected country code (e.g. "SA")
export const COUNTRY_COOKIE = "country";

// Saved code if it's a live country, otherwise the first live country
export function resolveCountry(
  countries: Country[],
  code: string | null | undefined,
): Country | undefined {
  const isLive = (c: Country) => c.status === "live";
  return (
    countries.find((c) => c.code === code && isLive(c)) ??
    countries.find(isLive) ??
    countries[0]
  );
}
