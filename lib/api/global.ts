import { cache } from "react";
import { api } from "./client";
import { Country } from "@/types/global";
import { unstable_rethrow } from "next/dist/client/components/unstable-rethrow.server";

// get list of countries
export const getCountries = cache(async (): Promise<Country[]> => {
  try {
    const res = await api.get<{ data: Country[] }>("/v1/countries");
    return res.data;
  } catch (error) {
    unstable_rethrow(error);
    console.error("failed to load countries", error);
    return [];
  }
});
