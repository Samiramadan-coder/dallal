import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  getSelectedCountry,
  getSelectedCountryCities,
} from "@/lib/api/selected-country";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Search } from "lucide-react";
import { headingFont } from "@/constants/marketplace";
import { getLocale, getTranslations } from "next-intl/server";

export default async function Hero() {
  const locale = await getLocale();
  const t = await getTranslations("Home.hero");

  const [country, cities] = await Promise.all([
    getSelectedCountry(),
    getSelectedCountryCities(),
  ]);

  return (
    <section className="relative overflow-hidden bg-background">
      <Image
        src="/hero-jewelry.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,color-mix(in_srgb,var(--background)_55%,transparent),var(--background))]" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 pb-20 pt-44 text-center md:pb-28 md:pt-52">
        {country && (
          <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            <Image
              src={country.flag}
              alt=""
              width={20}
              height={14}
              className="h-3.5 w-5 rounded-xs object-cover"
            />
            {country.name}
          </p>
        )}

        <h1
          className={`text-balance ${headingFont(locale)} text-4xl font-bold leading-tight text-card-foreground md:text-6xl`}
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
          className="mt-9 flex w-full flex-col gap-2 rounded-2xl border border-primary/25 bg-card p-2 md:flex-row"
        >
          <InputGroup className="h-12 flex-1 rounded-xl border-0 bg-background dark:bg-background">
            <InputGroupAddon className="ps-4">
              <Search className="text-muted-foreground" aria-hidden />
            </InputGroupAddon>
            <InputGroupInput
              type="search"
              name="q"
              aria-label={t("keywordLabel")}
              placeholder={t("placeholder")}
              className="h-12 text-sm text-card-foreground placeholder:text-muted-foreground"
            />
          </InputGroup>

          <Select name="city">
            <SelectTrigger
              aria-label={t("cityLabel")}
              className="h-12! w-full rounded-xl border-0 bg-background px-4 text-sm text-card-foreground md:w-56 dark:bg-background dark:hover:bg-background"
            >
              <span className="flex items-center gap-2">
                <MapPin className="text-muted-foreground" aria-hidden />
                <SelectValue
                  placeholder={t("allCities", { country: country?.name ?? "" })}
                />
              </span>
            </SelectTrigger>
            <SelectContent position="popper" className="bg-background">
              {cities.map((city) => (
                <SelectItem key={city.id} value={String(city.id)}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            type="submit"
            className="h-12 rounded-xl bg-primary px-7 text-sm font-bold text-background hover:bg-[#D9B55A]"
          >
            {t("search")}
          </Button>
        </form>

        <Link
          href="/sell"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/50 px-6 py-3 text-sm font-semibold text-card-foreground transition-colors hover:bg-primary/12"
        >
          {t("sellGold")}
          <ArrowRight className="size-4 rtl:rotate-180" />
        </Link>
      </div>
    </section>
  );
}
