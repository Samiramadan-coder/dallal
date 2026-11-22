"use client";

import { cn } from "@/lib/utils";
import { useCurrency } from "@/hook/use-currency";
import { MOCK_CURRENCY, convert, roundApprox } from "@/lib/currency";

// An amount in its listing country's currency. With `approx`, signed-in
// users from another country also see it in their own currency underneath
// ("≈ 1,950 د.إ"). Usable from Server Components too
export default function Price({
  value,
  currency,
  mock = false,
  approx = false,
  digits,
  className,
  approxClassName,
}: {
  value: number;
  // Currency `value` is in; defaults to the browse country's
  currency?: string;
  // `value` is a mock amount in dirhams: convert it to the browse currency.
  // TODO: remove once the APIs return local amounts
  mock?: boolean;
  approx?: boolean;
  digits?: number;
  className?: string;
  approxClassName?: string;
}) {
  const { currency: browse, userCurrency, format } = useCurrency();

  const code = mock ? browse : (currency ?? browse);
  const amount = mock ? (convert(value, MOCK_CURRENCY, browse) ?? value) : value;

  const inUserCurrency =
    approx && userCurrency && userCurrency !== code
      ? convert(amount, code, userCurrency)
      : null;

  return (
    <>
      <span className={className}>{format(amount, code, digits)}</span>
      {inUserCurrency !== null && (
        <span
          className={cn(
            "block text-[0.7em] font-normal opacity-70",
            approxClassName,
          )}
        >
          ≈ {format(roundApprox(inUserCurrency), userCurrency!, 0)}
        </span>
      )}
    </>
  );
}
