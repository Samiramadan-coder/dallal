import type { Locale } from "next-intl";
import { hasLocale } from "next-intl";

import { routing } from "@/i18n/routing";

// Shared between the proxy and server code, so it must stay free of
// `server-only` and request-time APIs. All paths are unprefixed (no locale)

// Shows the sign-in form when there's no `?action=sign-up`
export const SIGN_IN_PATH = "/auth";
export const FORGOT_PASSWORD_PATH = "/auth/forgot-password";
export const HOME_PATH = "/";

// Pages that need a signed-in user (the route and all of its sub-paths).
// Guest-only routes are never protected
export const PROTECTED_ROUTES: readonly string[] = ["/profile"];

// Pages a signed-in user is sent away from. "/auth" covers sign-in,
// sign-up, OTP verification, forgot and reset password
export const GUEST_ONLY_ROUTES: readonly string[] = [SIGN_IN_PATH];

export const CALLBACK_URL_PARAM = "callbackUrl";

// Request header the proxy sets to the current path + search, so server
// code can build a callbackUrl. Always overwritten, so it can't be spoofed
export const PATHNAME_HEADER = "x-pathname";

// Splits "/ar/profile" into { locale: "ar", pathname: "/profile" }.
// Unprefixed paths belong to the default locale (localePrefix "as-needed")
export function splitLocale(pathname: string): {
  locale: Locale;
  pathname: string;
} {
  const [, first, ...rest] = pathname.split("/");

  if (hasLocale(routing.locales, first)) {
    return { locale: first, pathname: `/${rest.join("/")}` };
  }

  return { locale: routing.defaultLocale, pathname };
}

// Adds the locale prefix the way next-intl does for "as-needed"
export function localizePath(pathname: string, locale: Locale): string {
  if (locale === routing.defaultLocale) return pathname;

  return pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
}

function matchesRoute(pathname: string, route: string): boolean {
  const normalized =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  if (route === "/") return true;
  return normalized === route || normalized.startsWith(`${route}/`);
}

// `pathname` may include the locale prefix
export function isProtectedRoute(pathname: string): boolean {
  if (isGuestOnlyRoute(pathname)) return false;

  const unprefixed = splitLocale(pathname).pathname;
  return PROTECTED_ROUTES.some((route) => matchesRoute(unprefixed, route));
}

// `pathname` may include the locale prefix
export function isGuestOnlyRoute(pathname: string): boolean {
  const unprefixed = splitLocale(pathname).pathname;
  return GUEST_ONLY_ROUTES.some((route) => matchesRoute(unprefixed, route));
}

const CONTROL_CHARS = /[\u0000-\u001f\u007f]/;

// Returns `value` only if it's a same-site path that isn't a guest-only page,
// so it can't be used as an open redirect or a redirect loop
export function safeCallbackUrl<T extends string | null>(
  value: string | null | undefined,
  fallback: T,
): string | T {
  if (!value) return fallback;
  if (!value.startsWith("/") || value.startsWith("//")) return fallback;
  if (value.includes("\\") || CONTROL_CHARS.test(value)) return fallback;

  let url: URL;
  try {
    url = new URL(value, "http://localhost");
  } catch {
    return fallback;
  }
  if (url.origin !== "http://localhost") return fallback;
  if (isGuestOnlyRoute(url.pathname)) return fallback;

  return value;
}
