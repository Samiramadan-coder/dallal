import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/server-navigation";
import { FORGOT_PASSWORD_PATH } from "@/lib/auth-routes";
import ResetPassword from "@/components/auth/reset-password-form";

type SearchParams = {
  // The mobile number or email from forgot-password
  identifier?: string | string[];
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { identifier } = await searchParams;
  const value = typeof identifier === "string" ? identifier.trim() : "";

  // No code was requested yet, e.g. the page was opened directly
  if (!value) {
    await redirect({ href: FORGOT_PASSWORD_PATH, locale: await getLocale() });
  }

  return <ResetPassword identifier={value} />;
}
