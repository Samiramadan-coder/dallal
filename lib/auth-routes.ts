import type { Locale } from "next-intl";
import { hasLocale } from "next-intl";

import { routing } from "@/i18n/routing";
import { addCountry, isCountrySegment } from "@/lib/country";

// Shared between the proxy and server code, so it must stay free of
// `server-only` and request-time APIs. All paths are unprefixed
// (no locale, no country)

// Shows the sign-in form when there's no `?action=sign-up`
export const SIGN_IN_PATH = "/auth";
export const FORGOT_PASSWORD_PATH = "/auth/forgot-password";
export const OTP_VERIFY_PATH = "/auth/otp-verify";
export const HOME_PATH = "/";
// The signed-in user's account page
export const ACCOUNT_PATH = "/profile";

// Pages that need a signed-in user (the route and all of its sub-paths).
// Guest-only routes are never protected
// (the gated buttons in the UI open the sign-up modal instead; this covers
// opening the URL directly)
export const PROTECTED_ROUTES: readonly string[] = [
  "/profile",
  "/post-listing",
  "/sell/new",
];

// Pages a signed-in user is sent away from. "/auth" covers sign-in,
// sign-up, OTP verification, forgot and reset password
export const GUEST_ONLY_ROUTES: readonly string[] = [SIGN_IN_PATH];

export const CALLBACK_URL_PARAM = "callbackUrl";

// The OTP page for an international phone ("+971501112233"). Encoded, so
// the "+" doesn't arrive as a space; the callbackUrl survives verification
export function otpVerifyHref(
  phone: string,
  callbackUrl?: string | null,
): string {
  const params = new URLSearchParams({ phone });
  if (callbackUrl) params.set(CALLBACK_URL_PARAM, callbackUrl);
  return `${OTP_VERIFY_PATH}?${params}`;
}

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

// Splits "/ar/sa/profile" into { locale: "ar", country: "sa", pathname: "/profile" }.
// `country` is null when the URL has none (it keeps its original case)
export function splitPath(pathname: string): {
  locale: Locale;
  country: string | null;
  pathname: string;
} {
  const { locale, pathname: rest } = splitLocale(pathname);
  const [, first, ...tail] = rest.split("/");

  if (isCountrySegment(first)) {
    return { locale, country: first, pathname: `/${tail.join("/")}` };
  }

  return { locale, country: null, pathname: rest };
}

// Adds the country and the locale prefix ("as-needed"):
// ("/profile", "ar", "sa") → "/ar/sa/profile", ("/", "en", "sa") → "/sa"
export function localizePath(
  pathname: string,
  locale: Locale,
  country: string,
): string {
  const withCountry = addCountry(pathname, country);
  if (locale === routing.defaultLocale) return withCountry;

  return `/${locale}${withCountry}`;
}

function matchesRoute(pathname: string, route: string): boolean {
  const normalized =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  if (route === "/") return true;
  return normalized === route || normalized.startsWith(`${route}/`);
}

// `pathname` may include the locale and country prefixes
export function isProtectedRoute(pathname: string): boolean {
  if (isGuestOnlyRoute(pathname)) return false;

  const unprefixed = splitPath(pathname).pathname;
  return PROTECTED_ROUTES.some((route) => matchesRoute(unprefixed, route));
}

// `pathname` may include the locale and country prefixes
export function isGuestOnlyRoute(pathname: string): boolean {
  const unprefixed = splitPath(pathname).pathname;
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
