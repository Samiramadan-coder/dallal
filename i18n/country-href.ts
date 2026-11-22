import { addCountry } from "@/lib/country";

type Href = string | { pathname?: string | null };

// Adds the country to an href ("/browse" or { pathname: "/browse" }).
// Paths are written without a country everywhere in the app
export function withCountry<H extends Href>(
  href: H,
  country: string | null | undefined,
): H {
  if (!country) return href;
  if (typeof href === "string") return addCountry(href, country) as H;
  if (href.pathname) {
    return {
      ...(href as object),
      pathname: addCountry(href.pathname, country),
    } as H;
  }
  return href;
}
