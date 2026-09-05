import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import SignIn from "@/components/auth/sign-in-form";
import SignUp from "@/components/auth/sign-up-form";
import { Separator } from "@/components/ui/separator";
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

      {action === "sign-in" || !action ? <SignIn /> : <SignUp />}

      <div className="w-full space-y-5 mt-4">
        <div className="flex items-center gap-3">
          <Separator className="flex-1 bg-[rgba(27,107,74,0.12)]" />
          <span className="text-xs text-muted-foreground">{t("or")}</span>
          <Separator className="flex-1 bg-[rgba(27,107,74,0.12)]" />
        </div>

        <Button
          type="button"
          variant="outline"
          className="h-11.5 w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-[rgba(27,107,74,0.18)] bg-white hover:bg-card-foreground text-sm font-semibold transition-all duration-200 hover:border-[rgba(27,107,74,0.35)] shadow-sm"
        >
          <GoogleIcon />
          {t("continueWithGoogle")}
        </Button>

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

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.91h5.38a4.6 4.6 0 0 1-2 3.02v2.54h3.24c1.9-1.75 2.98-4.33 2.98-7.4Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.97-.9 6.62-2.43l-3.24-2.54c-.9.6-2.05.96-3.38.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.62A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.39 13.86A6 6 0 0 1 6.08 12c0-.65.11-1.28.31-1.86V7.52H3.04A10 10 0 0 0 2 12c0 1.61.38 3.14 1.04 4.48l3.35-2.62Z"
      />
      <path
        fill="#EA4335"
        d="M12 6.01c1.47 0 2.78.5 3.82 1.49l2.86-2.86A9.62 9.62 0 0 0 12 2a10 10 0 0 0-8.96 5.52l3.35 2.62C7.18 7.77 9.39 6.01 12 6.01Z"
      />
    </svg>
  );
}
