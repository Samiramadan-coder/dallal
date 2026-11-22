// Currency labels, formatting and approximate conversion. Shared by server
// and client code, so it must stay free of `server-only` and request APIs

type Label = { ar: string; en: string };

// How each currency is written next to an amount
const LABELS: Record<string, Label> = {
  AED: { ar: "د.إ", en: "AED" },
  SAR: { ar: "ر.س", en: "SAR" },
  KWD: { ar: "د.ك", en: "KWD" },
  QAR: { ar: "ر.ق", en: "QAR" },
  BHD: { ar: "د.ب", en: "BHD" },
  OMR: { ar: "ر.ع", en: "OMR" },
  EGP: { ar: "ج.م", en: "EGP" },
  USD: { ar: "$", en: "USD" },
};

// Units of each currency per 1 USD. Gulf currencies are pegged, so these
// are close enough for an "≈" hint.
// TODO: replace with the exchange-rates API once it exists
const USD_RATES: Record<string, number> = {
  USD: 1,
  AED: 3.6725,
  SAR: 3.75,
  QAR: 3.64,
  BHD: 0.376,
  OMR: 0.3845,
  KWD: 0.307,
  EGP: 48.5,
};

// Mock amounts (listings, gold prices, plans…) are written in dirhams.
// TODO: drop once the APIs return amounts in the listing country's currency
export const MOCK_CURRENCY = "AED";

// "SAR" + "ar" → "ر.س"; unknown codes are shown as-is
export function currencyLabel(code: string, locale: string): string {
  const label = LABELS[code?.toUpperCase()];
  if (!label) return code;
  return locale === "ar" ? label.ar : label.en;
}

// 1950 + "AED" → "1,950 د.إ" (ar) / "AED 1,950" (en)
export function formatMoney(
  value: number,
  code: string,
  locale: string,
  maximumFractionDigits = 2,
): string {
  const amount = value.toLocaleString("en-US", { maximumFractionDigits });
  const label = currencyLabel(code, locale);
  return locale === "ar" ? `${amount} ${label}` : `${label} ${amount}`;
}

// Converts between currencies; null when a rate is unknown
export function convert(
  value: number,
  from: string,
  to: string,
): number | null {
  const a = from?.toUpperCase();
  const b = to?.toUpperCase();
  if (a === b) return value;
  const fromRate = USD_RATES[a];
  const toRate = USD_RATES[b];
  if (!fromRate || !toRate) return null;
  return (value / fromRate) * toRate;
}

// Rounds an approximate amount so it doesn't look exact: 1953.4 → 1,950
export function roundApprox(value: number): number {
  if (value >= 1000) return Math.round(value / 10) * 10;
  if (value >= 100) return Math.round(value);
  return Math.round(value * 100) / 100;
}
