import "server-only";

import { base } from "./base-navigation";
import { withCountry } from "./country-href";
import { getCountryCode } from "@/lib/api/selected-country";

// next-intl's redirect that also keeps the current country (from the URL).
// Never returns
export async function redirect(
  args: Parameters<typeof base.redirect>[0] & { country?: string },
): Promise<never> {
  const { country, ...rest } = args;
  return base.redirect({
    ...rest,
    href: withCountry(rest.href, country ?? (await getCountryCode())),
  });
}
