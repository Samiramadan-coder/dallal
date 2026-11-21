import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { headingFont } from "./data";
import { ArrowRight, MapPin, Search } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

const cities = [
  { key: "dubai", value: "Dubai" },
  { key: "abuDhabi", value: "Abu Dhabi" },
  { key: "sharjah", value: "Sharjah" },
  { key: "ajman", value: "Ajman" },
  { key: "rasAlKhaimah", value: "Ras Al Khaimah" },
  { key: "fujairah", value: "Fujairah" },
  { key: "ummAlQuwain", value: "Umm Al Quwain" },
] as const;

export default async function Hero() {
  const locale = await getLocale();
  const t = await getTranslations("Home.hero");

  return (
    <section className="relative overflow-hidden bg-[#071E14]">
      <Image
        src="/hero-jewelry.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,30,20,0.55),#071E14)]" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 pb-20 pt-44 text-center md:pb-28 md:pt-52">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A445]">
          {t("badge")}
        </p>

        <h1
          className={`text-balance ${headingFont(locale)} text-4xl font-bold leading-tight text-[#FAF6EF] md:text-6xl`}
        >
          {t("title")}
        </h1>

        <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-[#B9B5A6] md:text-lg">
          {t("description")}
        </p>

        <form
          role="search"
          action={`${locale === "en" ? "" : `/${locale}`}/browse`}
          method="GET"
          className="mt-9 flex w-full flex-col gap-2 rounded-2xl border border-[rgba(201,164,69,0.25)] bg-[#0F4A31] p-2 md:flex-row"
        >
          <label className="flex flex-1 items-center gap-2 rounded-xl bg-[#071E14] px-4">
            <Search className="size-4 shrink-0 text-[#8A8678]" aria-hidden />
            <span className="sr-only">{t("keywordLabel")}</span>
            <input
              type="search"
              name="q"
              placeholder={t("placeholder")}
              className="h-12 w-full bg-transparent text-sm text-[#FAF6EF] placeholder:text-[#8A8678] focus:outline-none"
            />
          </label>

          <label className="flex items-center gap-2 rounded-xl bg-[#071E14] px-4 md:w-56">
            <MapPin className="size-4 shrink-0 text-[#8A8678]" aria-hidden />
            <span className="sr-only">{t("cityLabel")}</span>
            <select
              name="city"
              defaultValue=""
              className="h-12 w-full bg-transparent text-sm text-[#FAF6EF] focus:outline-none"
            >
              <option value="" className="bg-[#071E14]">
                {t("allCities")}
              </option>
              {cities.map((city) => (
                <option
                  key={city.key}
                  value={city.value}
                  className="bg-[#071E14]"
                >
                  {t(`cities.${city.key}`)}
                </option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            className="h-12 rounded-xl bg-[#C9A445] px-7 text-sm font-bold text-[#071E14] transition-colors hover:bg-[#D9B55A]"
          >
            {t("search")}
          </button>
        </form>

        <Link
          href="/sell"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-[rgba(201,164,69,0.5)] px-6 py-3 text-sm font-semibold text-[#FAF6EF] transition-colors hover:bg-[rgba(201,164,69,0.12)]"
        >
          {t("sellGold")}
          <ArrowRight className="size-4 rtl:rotate-180" />
        </Link>
      </div>
    </section>
  );
}
