import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { headingFont } from "@/constants/marketplace";
import { getLocale, getTranslations } from "next-intl/server";

// Private page: keep it out of search results
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// Signed-out visitors are sent to sign-in by the proxy
// (see PROTECTED_ROUTES in lib/auth-routes.ts)
export default async function Page() {
  const locale = await getLocale();
  const t = await getTranslations("Sell.new");

  return (
    <div className="min-h-screen bg-card-foreground">
      <section className="mt-30 bg-background text-card-foreground">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-14">
          <h1
            className={cn(
              headingFont(locale),
              "text-balance text-4xl font-bold leading-tight md:text-5xl",
            )}
          >
            {t("title")}
          </h1>
          <p className="mt-3 text-pretty text-base leading-relaxed text-[#D9D1BD]">
            {t("description")}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-10">
        {/* Until the listing form is designed */}
        <div className="rounded-2xl border border-dashed border-[#e2d9c6] bg-white/60 px-6 py-16 text-center text-sm text-muted-foreground">
          {t("comingSoon")}
        </div>
      </div>
    </div>
  );
}
