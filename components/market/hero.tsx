import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { Plus, Search } from "lucide-react";
import { headingFont } from "@/constants/marketplace";
import { getLocale, getTranslations } from "next-intl/server";

export default async function Hero({ q }: { q: string }) {
  const locale = await getLocale();
  const t = await getTranslations("Market.hero");

  return (
    <section className="mt-30 bg-[#071E14] text-[#FAF6EF]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:py-14">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A445]">
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
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-[#C9A445] px-5 py-3 text-sm font-bold text-[#071E14] transition-colors hover:bg-[#D4B55A] md:self-auto"
          >
            <Plus className="size-4" />
            {t("post")}
          </Link>
        </div>

        <form
          role="search"
          action={`${locale === "en" ? "" : `/${locale}`}/market`}
          className="flex max-w-2xl gap-2"
        >
          <label htmlFor="market-search" className="sr-only">
            {t("searchLabel")}
          </label>
          <div className="relative flex-1">
            <Search
              aria-hidden
              className="pointer-events-none absolute start-4 top-1/2 size-4 -translate-y-1/2 text-[#8A8678]"
            />
            <input
              id="market-search"
              type="search"
              name="q"
              defaultValue={q}
              placeholder={t("placeholder")}
              className="h-12 w-full rounded-xl border border-transparent bg-white ps-11 pe-4 text-sm text-[#1A1A14] placeholder:text-[#8A8678] focus:border-[#C9A445] focus:outline-none focus:ring-2 focus:ring-[#C9A445]/30"
            />
          </div>
          <button
            type="submit"
            className="h-12 rounded-xl bg-[#C9A445] px-5 text-sm font-bold text-[#071E14] hover:bg-[#D4B55A]"
          >
            {t("search")}
          </button>
        </form>
      </div>

      <div
        aria-hidden
        className="h-1 bg-[repeating-linear-gradient(90deg,#C9A445_0_12px,transparent_12px_20px)]"
      />
    </section>
  );
}
