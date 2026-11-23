import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { Plus, Search } from "lucide-react";
import { headingFont } from "@/constants/marketplace";
import { getLocale, getTranslations } from "next-intl/server";
import { localizePath } from "@/lib/auth-routes";
import { getCountryCode } from "@/lib/api/selected-country";

export default async function Hero({ q }: { q: string }) {
  const locale = await getLocale();
  const countryCode = await getCountryCode();
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

          <Link
            href="/market/new"
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-primary px-5 py-3 text-sm font-bold text-background transition-colors hover:bg-[#D4B55A] md:self-auto"
          >
            <Plus className="size-4" />
            {t("post")}
          </Link>
        </div>

        <form
          role="search"
          action={localizePath("/market", locale, countryCode)}
          className="flex max-w-2xl gap-2"
        >
          <label htmlFor="market-search" className="sr-only">
            {t("searchLabel")}
          </label>
          <div className="relative flex-1">
            <Search
              aria-hidden
              className="pointer-events-none absolute start-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <input
              id="market-search"
              type="search"
              name="q"
              defaultValue={q}
              placeholder={t("placeholder")}
              className="h-12 w-full rounded-xl border border-transparent bg-white ps-11 pe-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <button
            type="submit"
            className="h-12 rounded-xl bg-primary px-5 text-sm font-bold text-background hover:bg-[#D4B55A]"
          >
            {t("search")}
          </button>
        </form>
      </div>
    </section>
  );
}
