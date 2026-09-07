import { cn } from "@/lib/utils";
import { http } from "@/lib/http";
import { Country } from "@/types/global";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import SignIn from "@/components/auth/sign-in-form";
import SignUp from "@/components/auth/sign-up-form";
import { getLocale, getTranslations } from "next-intl/server";

type SearchParams = {
  action?: "sign-in" | "sign-up";
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const locale = await getLocale();
  const { action } = await searchParams;
  const t = await getTranslations("Auth.Forms");
  const fontClass = locale === "en" ? "font-playfair" : "";

  const { data, ok } = await http.get<{
    data: Country[];
  }>("/api/v1/countries");

  if (!ok) {
    throw new Error("Failed to fetch countries data");
  }

  return (
    <>
      <div className="mb-8">
        <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-primary mb-2">
          {t("welcome")}
        </p>
        <h3 className={cn("text-3xl font-bold", fontClass)}>
          {t("yourAccount")}
        </h3>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          {t("accessListening")}
        </p>
      </div>

      <div className="grid h-12 w-full grid-cols-2 rounded-2xl bg-[#F0EBE3] p-1 mb-8">
        <Button
          asChild
          type="button"
          variant="ghost"
          className={cn(
            "h-full rounded-xl text-sm font-bold uppercase text-muted-foreground hover:bg-transparent",
            (action === "sign-in" || !action) &&
              "bg-white text-secondary shadow-sm hover:bg-white",
          )}
        >
          <Link href="/auth?action=sign-in">{t("signIn")}</Link>
        </Button>

        <Button
          asChild
          type="button"
          variant="ghost"
          className={cn(
            "h-full rounded-xl text-sm font-bold uppercase text-muted-foreground hover:bg-transparent",
            action === "sign-up" &&
              "bg-white text-secondary shadow-sm hover:bg-white",
          )}
        >
          <Link href="/auth?action=sign-up">{t("signUp")}</Link>
        </Button>
      </div>

      {action === "sign-in" || !action ? (
        <SignIn />
      ) : (
        <SignUp countries={data.data} />
      )}

      <div className="w-full space-y-5 mt-4">
        <p className="text-center text-xs text-muted-foreground">
          {t("noAccount")}{" "}
          <Link
            href="/auth?action=sign-up"
            className="font-medium text-secondary underline underline-offset-2"
          >
            {t("createAccount")}
          </Link>
        </p>

        <p className="text-center text-[11px] text-muted-foreground">
          {t("protectedBy")}{" "}
          <Link href="/privacy-policy" className="underline underline-offset-2">
            {t("privacyPolicy")}
          </Link>
        </p>
      </div>
    </>
  );
}
