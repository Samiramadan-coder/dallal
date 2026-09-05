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

import { Link } from "@/i18n/navigation";
import EyeBrow from "../reusable/eye-brow";
import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLocale, getTranslations } from "next-intl/server";

const quickBrowse = [
  {
    key: "jewelry",
    href: "/listings?category=jewelry",
  },
  {
    key: "diamonds",
    href: "/listings?category=diamonds",
  },
  {
    key: "watches",
    href: "/listings?category=watches",
  },
  {
    key: "coins",
    href: "/listings?category=coins",
  },
] as const;

const stats = ["listings", "sellers", "transactions", "rating"] as const;

export default async function Hero() {
  const locale = await getLocale();
  const t = await getTranslations("Home.hero");
  const fontClass = locale === "en" ? "font-playfair" : "";

  return (
    <section className="relative min-h-screen overflow-hidden bg-background text-card-foreground">
      <div
        aria-hidden
        className="absolute inset-0 bg-[url('/hero.png')] bg-cover bg-center bg-no-repeat"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,30,20,0.98)_0%,rgba(7,30,20,0.92)_35%,rgba(7,30,20,0.70)_65%,rgba(7,30,20,0.78)_100%)]"
      />

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[35%] bg-linear-to-t from-background to-transparent"
      />

      <div className="container max-w-7xl relative z-10 flex min-h-screen items-center py-20 lg:py-24">
        <div className="w-full max-w-205">
          <div className="flex items-center gap-4">
            <span className="h-px w-9 bg-primary/70" />
            <EyeBrow className="text-primary text-xs">{t("eyebrow")}</EyeBrow>
            <span className="h-px w-9 bg-primary/70" />
          </div>

          <h1
            className={`mt-7 max-w-175 ${fontClass} text-5xl font-bold leading-[1.05] text-balance text-card-foreground md:text-6xl lg:text-7xl`}
          >
            {t("titleFirst")}
            <br />
            {t("titleSecond")}{" "}
            <span className="gold-text">{t("titleHighlight")}</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed  text-[#f5f0e8a6] md:text-xl">
            {t("description")}
          </p>

          <form
            action="/listings"
            method="GET"
            className="mt-10 flex flex-col overflow-hidden rounded-xl border border-[#c9a4454d] bg-card/90 shadow-[0_15px_50px_rgba(0,0,0,0.25)] backdrop-blur-md lg:flex-row lg:items-center"
          >
            {/* Category */}
            <Select name="category" defaultValue="jewelry">
              <SelectTrigger
                className="h-14 w-full rounded-none border-0 bg-transparent px-5 text-sm text-card-foreground shadow-none focus-visible:ring-0 lg:w-40 lg:border-e lg:border-primary/20"
                aria-label={t("search.categoryLabel")}
              >
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="jewelry">
                  {t("search.categories.jewelry")}
                </SelectItem>
                <SelectItem value="diamonds">
                  {t("search.categories.diamonds")}
                </SelectItem>
                <SelectItem value="watches">
                  {t("search.categories.watches")}
                </SelectItem>
                <SelectItem value="coins">
                  {t("search.categories.coins")}
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Search */}
            <InputGroup className="h-14 flex-1 rounded-none border-0 bg-transparent shadow-none focus-within:ring-0 lg:border-e lg:border-primary/20">
              <InputGroupInput
                type="search"
                name="q"
                placeholder={t("search.placeholder")}
                className="text-card-foreground placeholder:text-card-foreground/35"
              />

              <InputGroupAddon
                align="inline-start"
                className="text-card-foreground/45"
              >
                <Search className="size-4" />
              </InputGroupAddon>
            </InputGroup>

            {/* Location */}
            <InputGroup className="h-14 rounded-none border-0 bg-transparent shadow-none focus-within:ring-0 lg:w-48">
              <InputGroupInput
                type="text"
                name="location"
                placeholder={t("search.location")}
                aria-label={t("search.locationLabel")}
                autoComplete="address-level2"
                className="text-sm text-card-foreground placeholder:text-card-foreground/45"
              />

              <InputGroupAddon
                align="inline-start"
                className="text-card-foreground/45"
              >
                <MapPin className="size-4" />
              </InputGroupAddon>
            </InputGroup>

            {/* Submit */}
            <div className="p-1.5">
              <Button
                type="submit"
                className="h-11 w-full rounded-lg bg-primary px-7 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground hover:opacity-90 lg:w-auto"
              >
                {t("search.button")}
              </Button>
            </div>
          </form>

          {/* Quick Browse */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="me-1 text-xs uppercase tracking-[0.08em] text-muted-foreground">
              {t("quickBrowse.label")}:
            </span>

            {quickBrowse.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="rounded-full border border-primary/25 px-3.5 py-1.5 text-sm text-[#f5f0e8a6] transition-colors hover:border-primary/60 hover:bg-primary/10 hover:text-primary"
              >
                {t(`quickBrowse.${item.key}`)}
              </Link>
            ))}

            <Link
              href="/listings"
              className="rounded-full border border-primary/25 px-3.5 py-1.5 text-sm text-[#f5f0e8a6] transition-colors hover:border-primary/60 hover:bg-primary/10 hover:text-primary"
            >
              {t("quickBrowse.all")}
            </Link>
          </div>

          <div className="mt-16 grid max-w-150 grid-cols-2 gap-y-7 sm:grid-cols-4 sm:gap-0">
            {stats.map((stat, index) => (
              <div
                key={stat}
                className={[
                  "border-s-2 border-[#c9a44580] px-4",
                  index === 0 ? "ps-4" : "",
                ].join(" ")}
              >
                <p className={`text-xl font-bold gold-text ${fontClass}`}>
                  {t(`stats.${stat}.value`)}
                </p>
                <p className="mt-0.5 text-xs tracking-wider text-muted-foreground">
                  {t(`stats.${stat}.label`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
