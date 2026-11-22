import { cn } from "@/lib/utils";
import { ShieldCheck } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { headingFont } from "@/constants/marketplace";

const cities = [
  "dubai",
  "abuDhabi",
  "sharjah",
  "ajman",
  "rasAlKhaimah",
  "fujairah",
  "ummAlQuwain",
] as const;

export default async function Hero() {
  const locale = await getLocale();
  const t = await getTranslations("Sell.hero");
  const tCities = await getTranslations("Cities");
  const font = headingFont(locale);

  return (
    <section className="mt-30 bg-[#0F4A31] px-4 py-14 text-[#FAF6EF] sm:px-6 sm:py-20">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C9A445]">
          {t("eyebrow")}
        </p>
        <h1
          className={cn(
            font,
            "max-w-3xl text-balance text-4xl font-bold leading-tight sm:text-5xl",
          )}
        >
          {t("title")}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-[rgba(245,240,232,0.75)]">
          {t("description")}
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C9A445] px-5 py-3 text-sm font-bold tracking-wide text-[#071E14] transition-colors hover:bg-[#E8D5A0]"
          >
            {t("start")}
          </button>

          <div className="flex flex-wrap items-center gap-2 text-sm text-[rgba(245,240,232,0.85)]">
            <ShieldCheck size={18} className="text-[#C9A445]" aria-hidden />
            <span>{t("storesIn", { count: 4 })}</span>
            <label className="sr-only" htmlFor="sell-intro-city">
              {t("city")}
            </label>
            <select
              id="sell-intro-city"
              defaultValue="dubai"
              className="rounded-lg border border-[rgba(201,164,69,0.4)] bg-[#0B3A26] px-2 py-1 text-sm font-semibold text-[#FAF6EF]"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {tCities(city)}
                </option>
              ))}
            </select>
            <span>{t("buyingGold")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
