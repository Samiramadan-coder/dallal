import "server-only";

import { headers } from "next/headers";
import { unstable_rethrow } from "next/navigation";
import { getCities, getCountries } from "./global";
import {
  COUNTRY_HEADER,
  DEFAULT_COUNTRY,
  isCountrySegment,
  resolveCountry,
} from "@/lib/country";

// Country code of the current URL ("sa"), set by the proxy on every request
export async function getCountryCode(): Promise<string> {
  try {
    const code = (await headers()).get(COUNTRY_HEADER);
    if (isCountrySegment(code)) return code!.toLowerCase();
  } catch (error) {
    // No request scope (e.g. inside "use cache")
    unstable_rethrow(error);
  }
  return DEFAULT_COUNTRY;
}

// Country of the current URL, for Server Components / Server Actions /
// Route Handlers
export async function getSelectedCountry() {
  const [countries, code] = await Promise.all([
    getCountries(),
    getCountryCode(),
  ]);
  return resolveCountry(countries, code);
}

// Cities of the selected country
export async function getSelectedCountryCities() {
  const country = await getSelectedCountry();
  return country ? getCities(country.code) : [];
}
