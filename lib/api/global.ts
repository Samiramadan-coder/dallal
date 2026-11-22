import { cache } from "react";
import { api, type RequestOptions } from "./client";
import { City, Country } from "@/types/global";
import { unstable_rethrow } from "next/navigation";

// Countries and cities rarely change: public (no token) and cached for an hour
// across all requests, per language. Refresh early with revalidateTag("countries")
const STATIC_DATA: RequestOptions = {
  auth: false,
  next: { revalidate: 3600, tags: ["countries"] },
};

// get list of countries
export const getCountries = cache(async (): Promise<Country[]> => {
  try {
    const res = await api.get<{ data: Country[] }>("/v1/countries", STATIC_DATA);
    return res.data;
  } catch (error) {
    unstable_rethrow(error);
    console.error("failed to load countries", error);
    return [];
  }
});

// get cities of a country by its code (e.g. "AE")
export const getCities = cache(async (countryCode: string): Promise<City[]> => {
  try {
    const res = await api.get<{ data: City[] }>(
      `/v1/countries/${encodeURIComponent(countryCode)}/cities`,
      STATIC_DATA,
    );
    return res.data;
  } catch (error) {
    unstable_rethrow(error);
    console.error(`failed to load cities of ${countryCode}`, error);
    return [];
  }
});
