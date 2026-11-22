import OTPVerify from "@/components/auth/otp-verify";
import { getCountries } from "@/lib/api/global";
import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/server-navigation";
import { SIGN_IN_PATH } from "@/lib/auth-routes";
import { formatPhoneForDisplay } from "@/lib/phone";

type SearchParams = {
  phone?: string | string[];
  // Kept from sign-in / sign-up; checked by verifyOTP before use
  callbackUrl?: string | string[];
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { phone, callbackUrl } = await searchParams;

  // Older links may carry an unencoded "+", which arrives as a space
  const digits =
    typeof phone === "string" ? phone.trim().replace(/^\+/, "") : "";

  // Nothing to verify without a phone, e.g. the page was opened directly
  if (!/^\d{6,15}$/.test(digits)) {
    await redirect({ href: SIGN_IN_PATH, locale: await getLocale() });
  }

  const countries = await getCountries();

  return (
    <OTPVerify
      phone={digits}
      displayPhone={formatPhoneForDisplay(digits, countries)}
      callbackUrl={typeof callbackUrl === "string" ? callbackUrl : null}
    />
  );
}
