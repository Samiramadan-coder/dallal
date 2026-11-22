import "server-only";

import { cookies } from "next/headers";
import { getCities, getCountries } from "./global";
import { COUNTRY_COOKIE, resolveCountry } from "@/lib/country";

// Selected country for Server Components / Server Actions / Route Handlers
export async function getSelectedCountry() {
  const [countries, store] = await Promise.all([getCountries(), cookies()]);
  return resolveCountry(countries, store.get(COUNTRY_COOKIE)?.value);
}

// Cities of the selected country
export async function getSelectedCountryCities() {
  const country = await getSelectedCountry();
  return country ? getCities(country.code) : [];
}
