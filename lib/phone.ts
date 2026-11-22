import type { Country } from "@/types/global";

// "971501112233" or "+971501112233" → "+971 501112233", splitting off the
// longest matching dial code. Usable on the server and in the browser
export function formatPhoneForDisplay(
  phone: string,
  countries: Country[],
): string {
  const full = "+" + phone.trim().replace(/^\+/, "");
  const dialCode = countries
    .map((c) => c.dial_code)
    .filter((code) => code && full.startsWith(code))
    .sort((a, b) => b.length - a.length)[0];

  return dialCode ? `${dialCode} ${full.slice(dialCode.length)}` : full;
}
