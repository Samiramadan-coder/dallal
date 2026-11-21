"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { BadgeCheck, MapPin, Store } from "lucide-react";
import SaveButton from "../reusable/save-button";
import {
  formatPrice,
  getStore,
  headingFont,
  type MarketListing,
} from "@/constants/marketplace";

const badgeStyles = {
  certified: "border-[#BFDFCB] bg-[#E4F2E9] text-[#17653F]",
  accessory: "border-[#E6CF8C] bg-[#FBF3DA] text-[#6B5210]",
} as const;

export default function MarketListingCard({
  listing,
}: {
  listing: MarketListing;
}) {
  const locale = useLocale();
  const t = useTranslations("Market.card");
  const tCities = useTranslations("Cities");
  const tListing = useTranslations("Listing");
  const title = listing.title[locale === "ar" ? "ar" : "en"];

  return (
    <article className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-[#E8E1D0] bg-white transition-shadow hover:shadow-md">
      <SaveButton label={t("save")} />

      <Link
        href={`/listing/${listing.id}`}
        className="flex flex-1 flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B6B4A]"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-[#F0EADB]">
          <Image
            src={listing.image}
            alt={title}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          {listing.badge && (
            <ul
              aria-label={t("badges")}
              className="absolute start-2 top-2 flex flex-col items-start gap-1.5"
            >
              <li
                className={cn(
                  "rounded-full border px-2.5 py-1 text-[11px] font-bold",
                  badgeStyles[listing.badge],
                )}
              >
                {t(listing.badge)}
              </li>
            </ul>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <h3
            className={cn(
              headingFont(locale),
              "line-clamp-2 text-base font-bold leading-snug text-[#1A1A14]",
            )}
          >
            {title}
          </h3>
          <p className="text-lg font-bold text-[#1B6B4A]">
            {formatPrice(listing.price, tListing("currency"), locale)}
          </p>

          <div className="mt-auto flex flex-col gap-1.5 border-t border-[#EFE9D8] pt-3 text-xs text-[#4A4840]">
            {listing.store ? (
              <p className="flex items-center gap-1.5 font-semibold text-[#1A1A14]">
                <Store className="size-3.5 text-[#1B6B4A]" />
                {getStore(listing.store).name}
              </p>
            ) : (
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="font-semibold text-[#1A1A14]">
                  {listing.seller}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#E4F2E9] px-2 py-0.5 text-[11px] font-bold text-[#17653F]">
                  <BadgeCheck className="size-3" />
                  {t("verifiedIndividual")}
                </span>
              </p>
            )}
            <p className="flex items-center gap-1 text-[#8A8678]">
              <MapPin className="size-3" />
              {tCities(listing.city)}, {t("country")}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}
