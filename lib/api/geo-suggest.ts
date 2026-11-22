import { isCountrySegment } from "@/lib/country";

// Used by the proxy, so it can't use the `api` client (server-only,
// request-time APIs): a plain fetch that never throws

// Every country-less visit without a remembered country waits for this,
// so keep it short and fall back to the default country
const GEO_TIMEOUT = 1500;

type GeoSuggestResponse = {
  data?: {
    country?: { code?: string; status?: string };
    // "default" when the API couldn't locate the visitor
    source?: string;
  };
};

// Country suggested for the visitor's IP ("sa"), or null when the API
// fails, is slow, can't locate the visitor, or suggests a country that
// isn't live
export async function suggestCountry(
  clientIp: string | null,
): Promise<string | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");
  if (!baseUrl) return null;

  try {
    const res = await fetch(`${baseUrl}/v1/geo/suggest`, {
      headers: {
        Accept: "application/json",
        // The request comes from this server, so pass on the visitor's IP
        ...(clientIp ? { "X-Forwarded-For": clientIp } : {}),
      },
      cache: "no-store",
      signal: AbortSignal.timeout(GEO_TIMEOUT),
    });
    if (!res.ok) return null;

    const { data } = (await res.json()) as GeoSuggestResponse;
    const country = data?.country;
    // The API's own fallback isn't a real location: don't remember it
    if (data?.source === "default") return null;
    if (country?.status !== "live" || !isCountrySegment(country.code)) {
      return null;
    }
    return country.code!.toLowerCase();
  } catch (error) {
    console.error("[geo] suggest failed", error);
    return null;
  }
}
