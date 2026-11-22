import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getCountries } from "@/lib/api/global";
import { DEFAULT_COUNTRY } from "@/lib/country";
import { localizePath, PATHNAME_HEADER, splitPath } from "@/lib/auth-routes";
import RememberCountry from "@/components/shared/remember-country";

type Props = {
  children: React.ReactNode;
  params: Promise<{ country: string }>;
};

// canonical + hreflang for every page: tells search engines this page exists
// per language and country (en-SA, ar-SA, en-AE…) and which one is which
export async function generateMetadata({
  params,
}: Omit<Props, "children">): Promise<Metadata> {
  const [{ country }, locale, countries, requestHeaders] = await Promise.all([
    params,
    getLocale(),
    getCountries(),
    headers(),
  ]);

  // Current page without locale, country or query: "/ar/sa/browse?x=1" → "/browse"
  const current = requestHeaders.get(PATHNAME_HEADER) ?? "/";
  const { pathname } = splitPath(current.split("?")[0]);

  const languages: Record<string, string> = {};
  for (const c of countries.filter((c) => c.status === "live")) {
    for (const l of routing.locales) {
      languages[`${l}-${c.code.toUpperCase()}`] = localizePath(
        pathname,
        l,
        c.code.toLowerCase(),
      );
    }
  }
  languages["x-default"] = localizePath(
    pathname,
    routing.defaultLocale,
    DEFAULT_COUNTRY,
  );

  return {
    alternates: {
      canonical: localizePath(pathname, locale, country),
      languages,
    },
  };
}

export default async function CountryLayout({ children, params }: Props) {
  const { country } = await params;
  const countries = await getCountries();

  // Only live countries have pages. If the countries API is down
  // (empty list), keep the site up instead of answering 404 everywhere
  const isLive = countries.some(
    (c) => c.code.toLowerCase() === country && c.status === "live",
  );
  if (countries.length > 0 && !isLive) notFound();

  return (
    <>
      {children}
      <RememberCountry code={country} />
    </>
  );
}
