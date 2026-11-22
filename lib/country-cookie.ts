import { COUNTRY_COOKIE, isCountrySegment } from "@/lib/country";

// Browser-only helpers for the remembered country (see COUNTRY_COOKIE)

export function readCountryCookie(): string | null {
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${COUNTRY_COOKIE}=([^;]*)`),
  );
  const value = match ? decodeURIComponent(match[1]) : null;
  return isCountrySegment(value) ? value!.toLowerCase() : null;
}

export function writeCountryCookie(code: string) {
  document.cookie = `${COUNTRY_COOKIE}=${encodeURIComponent(code)}; path=/; max-age=31536000; samesite=lax`;
}
