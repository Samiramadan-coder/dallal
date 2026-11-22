"use client";

import Price from "@/components/reusable/price";

import {
  BadgeCheck,
  Clock,
  Eye,
  MapPin,
  Star,
  TrendingDown,
  Zap,
} from "lucide-react";
import {
  conditionLabels,
  getStore,
  headingFont,
  type Listing,
} from "@/constants/marketplace";
import Image from "next/image";
import { cn } from "@/lib/utils";
import SaveButton from "./save-button";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

export default function ListingCard({
  listing,
  layout = "grid",
}: {
  listing: Listing;
  layout?: "grid" | "list";
}) {
  const locale = useLocale();
  const t = useTranslations("Listing");
  const tCities = useTranslations("Cities");
  const lang = locale === "ar" ? "ar" : "en";
  const font = headingFont(locale);
  const store = getStore(listing.store);
  const title = listing.title[lang];
  const isList = layout === "list";

  return (
    <article
      className={cn(
        "group relative flex overflow-hidden rounded-2xl border border-[rgba(27,107,74,0.1)] bg-white transition-all duration-300 hover:border-[rgba(27,107,74,0.3)] hover:shadow-[0_12px_48px_rgba(27,107,74,0.14)]",
        isList ? "flex-col sm:flex-row" : "flex-col",
      )}
    >
      <Link
        href={`/listing/${listing.id}`}
        aria-label={title}
        className="absolute inset-0 z-1"
      />

      <div
        className={cn(
          "relative overflow-hidden bg-[#F5F0E8]",
          isList
            ? "aspect-4/3 sm:aspect-auto sm:w-64 sm:shrink-0"
            : "aspect-4/3",
        )}
      >
        <Image
          src={listing.image}
          alt={title}
          fill
          sizes={
            isList
              ? "(min-width: 640px) 256px, 100vw"
              : "(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
          }
          className="object-cover"
        />

        <div className="absolute top-3 inset-s-3 z-10 flex flex-col items-start gap-1.5">
          {listing.pinned && (
            <span className="rounded-full bg-[#1B6B4A] px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-card-foreground shadow-md">
              {t("pinned")}
            </span>
          )}
          {listing.featured && (
            <span className="rounded-full bg-primary px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-background shadow-md">
              {t("featured")}
            </span>
          )}
        </div>

        <span className="absolute bottom-3 inset-e-3 z-10 inline-flex items-center gap-1 rounded-full bg-background/75 px-2 py-0.5 text-[10px] font-semibold text-card-foreground backdrop-blur-sm">
          <Eye className="size-3" />
          {listing.views}
        </span>

        {listing.reserved && (
          <div className="absolute inset-0 z-5 flex items-center justify-center bg-background/45">
            <span className="rounded-full bg-card-foreground px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-foreground">
              {t("reserved")}
            </span>
          </div>
        )}

        <SaveButton label={t("save")} listingId={listing.id} />
      </div>

      <div className={cn("flex flex-1 flex-col", isList ? "p-5" : "p-4")}>
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          {listing.type} · {conditionLabels[listing.condition]}
        </p>
        <h3
          className={cn(
            font,
            "mt-1 line-clamp-2 font-semibold leading-snug text-foreground transition-colors group-hover:text-[#1B6B4A]",
            isList ? "text-base" : "text-sm",
          )}
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
          <p className={cn(font, "text-xl font-bold text-foreground")}>
            <Price value={listing.price} mock approx />
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
              <span className="truncate font-semibold text-foreground">
                {store.name}
              </span>
              <span className="inline-flex shrink-0 items-center gap-0.5 font-semibold text-[#1B6B4A]">
                <BadgeCheck className="size-3" />
                <span className="sr-only sm:not-sr-only">
                  {t("verifiedMerchant")}
                </span>
              </span>
              <span className="inline-flex shrink-0 items-center gap-0.5 text-muted-foreground">
                <Star className="size-3 fill-primary text-primary" />
                {store.rating}
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3" />
                {tCities(listing.city)} · {listing.distance} {t("km")}
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
  );
}

export function ListingCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-[rgba(27,107,74,0.08)] bg-white">
      <div className="aspect-4/3 bg-[#F0EBE0]" />
      <div className="flex-1 space-y-3 p-4">
        <div className="h-3 w-1/3 rounded bg-[#F0EBE0]" />
        <div className="h-4 w-4/5 rounded bg-[#F0EBE0]" />
        <div className="h-3 w-1/2 rounded bg-[#F0EBE0]" />
        <div className="h-6 w-2/5 rounded bg-[#F0EBE0]" />
      </div>
    </div>
  );
}
