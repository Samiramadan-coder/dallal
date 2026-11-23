import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import MarketSearch from "./search";
import GatedLink from "@/components/auth/gated-link";
import { headingFont } from "@/constants/marketplace";
import { getLocale, getTranslations } from "next-intl/server";

export default async function Hero() {
  const locale = await getLocale();
  const t = await getTranslations("Market.hero");

  return (
    <section className="mt-30 bg-background text-card-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:py-14">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              {t("eyebrow")}
            </p>
            <h1
              className={cn(
                headingFont(locale),
                "mt-2 text-balance text-4xl font-bold leading-tight md:text-5xl",
              )}
            >
              {t("title")}
            </h1>
            <p className="mt-3 text-pretty text-base leading-relaxed text-[#D9D1BD]">
              {t("description")}
            </p>
          </div>

          {/* Guests get the sign-up modal, then continue to the form */}
          <GatedLink
            href="/market/new"
            className="inline-flex cursor-pointer items-center justify-center gap-2 self-start rounded-xl bg-primary px-5 py-3 text-sm font-bold text-background transition-colors hover:bg-[#D4B55A] md:self-auto"
          >
            <Plus className="size-4" />
            {t("post")}
          </GatedLink>
        </div>

        <MarketSearch />
      </div>
    </section>
  );
}
