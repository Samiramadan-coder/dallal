import Image from "next/image";
import SaveButton from "./save-button";
import { Link } from "@/i18n/navigation";
import SectionHeading from "./section-heading";
import { getLocale, getTranslations } from "next-intl/server";
import { featuredListings, formatPrice, headingFont, stores } from "./data";
import {
  ArrowRight,
  BadgeCheck,
  Clock,
  Eye,
  MapPin,
  Star,
  TrendingDown,
  Zap,
} from "lucide-react";

export default async function FeaturedListings() {
  const locale = await getLocale();
  const t = await getTranslations("Home.featured");
  const tCities = await getTranslations("Home.hero.cities");
  const currency = (await getTranslations("Home.metals"))("currency");
  const font = headingFont(locale);
  const lang = locale === "ar" ? "ar" : "en";

  return (
    <section
      aria-labelledby="featured-title"
      className="bg-[#071E14] py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <SectionHeading
            id="featured-title"
            title={t("title")}
            description={t("description")}
          />
          <Link
            href="/browse"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#C9A445] hover:underline"
          >
            {t("browseAll")}
            <ArrowRight className="size-4 rtl:rotate-180" />
          </Link>
        </div>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredListings.map((listing) => {
            const store = stores.find((s) => s.slug === listing.store)!;
            const title = listing.title[lang];

            return (
              <li key={listing.id} className="*:h-full">
                <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-[rgba(27,107,74,0.1)] bg-white transition-all duration-300 hover:border-[rgba(27,107,74,0.3)] hover:shadow-[0_12px_48px_rgba(27,107,74,0.14)]">
                  <Link
                    href={`/listing/${listing.id}`}
                    aria-label={title}
                    className="absolute inset-0 z-1"
                  />

                  <div className="relative aspect-[4/3] overflow-hidden bg-[#F5F0E8]">
                    <Image
                      src={listing.image}
                      alt={title}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />

                    <div className="absolute top-3 start-3 z-10 flex flex-col items-start gap-1.5">
                      {listing.pinned && (
                        <span className="rounded-full bg-[#1B6B4A] px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-[#FAF6EF] shadow-md">
                          {t("pinned")}
                        </span>
                      )}
                      <span className="rounded-full bg-[#C9A445] px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-[#071E14] shadow-md">
                        {t("featured")}
                      </span>
                    </div>

                    <span className="absolute bottom-3 end-3 z-10 inline-flex items-center gap-1 rounded-full bg-[#071E14]/75 px-2 py-0.5 text-[10px] font-semibold text-[#FAF6EF] backdrop-blur-sm">
                      <Eye className="size-3" />
                      {listing.views}
                    </span>

                    {listing.reserved && (
                      <div className="absolute inset-0 z-5 flex items-center justify-center bg-[#071E14]/45">
                        <span className="rounded-full bg-[#FAF6EF] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#1A1A14]">
                          {t("reserved")}
                        </span>
                      </div>
                    )}

                    <SaveButton label={t("save")} />
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#8A8678]">
                      {listing.meta}
                    </p>
                    <h3
                      className={`${font} mt-1 line-clamp-2 text-sm font-semibold leading-snug text-[#1A1A14] transition-colors group-hover:text-[#1B6B4A]`}
                    >
                      {title}
                    </h3>

                    <ul className="mt-2.5 flex flex-wrap gap-1.5">
                      {listing.specs.map((spec) => (
                        <li
                          key={spec}
                          className="rounded-md bg-[rgba(27,107,74,0.07)] px-2 py-0.5 text-[10px] font-semibold text-[#1B6B4A]"
                        >
                          {spec}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-3">
                      <p className={`${font} text-xl font-bold text-[#1A1A14]`}>
                        {formatPrice(listing.price, currency, locale)}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                        {listing.livePrice && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#1B6B4A]">
                            <Zap className="size-3" />
                            {t("livePrice")}
                          </span>
                        )}
                        {listing.belowMarket && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(21,128,61,0.2)] bg-[rgba(21,128,61,0.1)] px-2.5 py-1 text-[10px] font-bold tracking-wide text-[#15803D]">
                            <TrendingDown className="size-3" />
                            {t("belowMarket", { value: listing.belowMarket })}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-auto pt-3">
                      <div className="flex flex-col gap-1.5 border-t border-[rgba(27,107,74,0.07)] pt-3">
                        <div className="flex min-w-0 items-center gap-1.5 text-[11px]">
                          <span className="truncate font-semibold text-[#1A1A14]">
                            {store.name}
                          </span>
                          <span className="inline-flex shrink-0 items-center gap-0.5 font-semibold text-[#1B6B4A]">
                            <BadgeCheck className="size-3" />
                            <span className="sr-only sm:not-sr-only">
                              {t("verifiedMerchant")}
                            </span>
                          </span>
                          <span className="inline-flex shrink-0 items-center gap-0.5 text-[#8A8678]">
                            <Star className="size-3 fill-[#C9A445] text-[#C9A445]" />
                            {store.rating}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-[#8A8678]">
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="size-3" />
                            {tCities(listing.city)} · {listing.distance}{" "}
                            {t("km")}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="size-3" />
                            {listing.postedAt[lang]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
