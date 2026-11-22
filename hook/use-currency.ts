"use client";

import { useLocale } from "next-intl";
import { useCountryParam } from "@/i18n/navigation";
import { useCountries } from "@/providers/countries";
import { useUser } from "@/providers/user-data";
import { primaryCountry, resolveCountry } from "@/lib/country";
import {
  MOCK_CURRENCY,
  convert,
  currencyLabel,
  formatMoney,
} from "@/lib/currency";

// Currency of the browse country (the URL's), plus the signed-in user's own
// currency for "≈" hints. Updates on a country switch, no reload needed
export function useCurrency() {
  const locale = useLocale();
  const countries = useCountries();
  const code = useCountryParam();
  const { user } = useUser();

  const currency = resolveCountry(countries, code)?.currency ?? MOCK_CURRENCY;
  const userCurrency = primaryCountry(user)?.currency ?? null;

  return {
    // Browse country's currency code ("SAR")
    currency,
    // How it's written next to an amount ("ر.س" / "SAR")
    label: currencyLabel(currency, locale),
    // The user's own currency, null for guests
    userCurrency,
    // A mock amount (written in dirhams) in the browse currency.
    // TODO: drop once the APIs return local amounts
    fromMock: (value: number) =>
      convert(value, MOCK_CURRENCY, currency) ?? value,
    // Formats an amount in `code` (the browse currency by default)
    format: (value: number, code = currency, digits?: number) =>
      formatMoney(value, code, locale, digits),
  };
}

// Country of the current URL (falls back to the first live one)
export function useBrowseCountry() {
  return resolveCountry(useCountries(), useCountryParam());
}

// The browse country's VAT as a fraction (0.05). The API may send 5 or 0.05
export function useVatRate(): number {
  const rate = Number(useBrowseCountry()?.vat_rate ?? 5);
  return rate > 1 ? rate / 100 : rate;
}
