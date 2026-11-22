"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { base } from "./base-navigation";
import { withCountry } from "./country-href";


// Country of the current URL ("sa"), null outside the [country] segment
export function useCountryParam(): string | null {
  return useParams<{ country?: string }>().country ?? null;
}

// Current path without the locale and the country: "/ar/sa/browse" → "/browse"
export function usePathname(): string {
  const pathname = base.usePathname();
  const country = useCountryParam();

  if (!country) return pathname;
  if (pathname === `/${country}`) return "/";
  if (pathname.startsWith(`/${country}/`)) {
    return pathname.slice(country.length + 1);
  }
  return pathname;
}

type BaseRouter = ReturnType<typeof base.useRouter>;
type WithCountry<O> = (O extends undefined ? object : NonNullable<O>) & {
  // Navigate to another country (defaults to the current one)
  country?: string;
};
type Navigate<K extends "push" | "replace" | "prefetch"> = (
  href: Parameters<BaseRouter[K]>[0],
  options?: WithCountry<Parameters<BaseRouter[K]>[1]>,
) => void;

// next-intl's router that also keeps the current country
export function useRouter() {
  const router = base.useRouter();
  const current = useCountryParam();

  return useMemo(() => {
    const wrap =
      <K extends "push" | "replace" | "prefetch">(method: K): Navigate<K> =>
      (href, options) => {
        const { country, ...rest } = options ?? {};
        const target = withCountry(href, country ?? current);
        router[method](target, rest);
      };

    return {
      ...router,
      push: wrap("push"),
      replace: wrap("replace"),
      prefetch: wrap("prefetch"),
    };
  }, [router, current]);
}
