import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { getCountries } from "@/lib/api/global";
import { Button } from "@/components/ui/button";
import SignIn from "@/components/auth/sign-in-form";
import SignUp from "@/components/auth/sign-up-form";
import SecureNote from "@/components/auth/secure-note";
import { getTranslations } from "next-intl/server";
import { getSelectedCountry } from "@/lib/api/selected-country";

type SearchParams = {
  action?: "sign-in" | "sign-up";
  // Set by the proxy / the API client when sign-in was required
  callbackUrl?: string | string[];
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { action, callbackUrl: rawCallbackUrl } = await searchParams;
  const callbackUrl =
    typeof rawCallbackUrl === "string" ? rawCallbackUrl : null;
  const t = await getTranslations("Auth.Forms");

  const [countries, selectedCountry] = await Promise.all([
    getCountries(),
    getSelectedCountry(),
  ]);

  return (
    <>
      <div className="grid h-12 w-full grid-cols-2 rounded-2xl bg-[#F0EBE3] p-1 mb-8">
        <Button
          asChild
          type="button"
          variant="ghost"
          className={cn(
            "h-full rounded-xl text-sm font-semibold text-muted-foreground hover:bg-transparent hover:text-[#4A4840]",
            action === "sign-up" &&
              "bg-white text-[#0F4A31] shadow-sm hover:bg-white hover:text-[#0F4A31]",
          )}
        >
          <Link href="/auth?action=sign-up">{t("signUp")}</Link>
        </Button>

        <Button
          asChild
          type="button"
          variant="ghost"
          className={cn(
            "h-full rounded-xl text-sm font-semibold text-muted-foreground hover:bg-transparent hover:text-[#4A4840]",
            (action === "sign-in" || !action) &&
              "bg-white text-[#0F4A31] shadow-sm hover:bg-white hover:text-[#0F4A31]",
          )}
        >
          <Link href="/auth?action=sign-in">{t("signIn")}</Link>
        </Button>
      </div>

      {action === "sign-in" || !action ? (
        <SignIn callbackUrl={callbackUrl} />
      ) : (
        <SignUp
          countries={countries}
          defaultCountryId={selectedCountry?.id}
          callbackUrl={callbackUrl}
        />
      )}

      <SecureNote className="mt-4" />
    </>
  );
}
