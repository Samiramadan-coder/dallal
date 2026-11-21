"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { SearchX, MapPin } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import ListingCard from "../reusable/listing-card";
import { useBrowseFilters } from "@/providers/browse-filters";
import { formatPrice, type Listing } from "@/constants/marketplace";

// Deterministic pseudo-position on the map preview for each listing.
function pinPosition(id: string) {
  let h = 0;
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) % 997;
  return { top: `${15 + (h % 70)}%`, left: `${10 + ((h * 7) % 80)}%` };
}

function MapView({ items }: { items: Listing[] }) {
  const locale = useLocale();
  const t = useTranslations("Browse.map");
  const tListing = useTranslations("Listing");
  const lang = locale === "ar" ? "ar" : "en";

  return (
    <div className="grid gap-5 xl:grid-cols-5">
      <div className="relative h-80 overflow-hidden rounded-2xl border border-[rgba(27,107,74,0.15)] bg-[#E9E4D6] xl:col-span-3 xl:h-auto xl:min-h-130">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(27,107,74,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(27,107,74,0.08)_1px,transparent_1px)] bg-size-[40px_40px]" />
        {items.map((item) => {
          const pos = pinPosition(item.id);
          return (
            <Link
              key={item.id}
              href={`/listing/${item.id}`}
              style={pos}
              className="absolute -translate-x-1/2 -translate-y-full rounded-full bg-[#1B6B4A] px-2.5 py-1 text-[11px] font-bold whitespace-nowrap text-[#FAF6EF] shadow-md transition-colors hover:bg-[#C9A445] hover:text-[#071E14]"
            >
              {formatPrice(item.price, tListing("currency"), locale)}
            </Link>
          );
        })}
        <span className="absolute bottom-4 start-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#1A1A14] shadow-sm">
          {t("preview")}
        </span>
      </div>

      <ul className="flex max-h-130 flex-col gap-3 overflow-y-auto xl:col-span-2">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={`/listing/${item.id}`}
              className="flex items-center gap-3 rounded-2xl border border-[rgba(27,107,74,0.1)] bg-white p-3 transition-colors hover:border-[rgba(27,107,74,0.3)]"
            >
              <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-[#F5F0E8]">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-[#1A1A14]">
                  {item.title[lang]}
                </p>
                <p className="mt-0.5 text-sm font-bold text-[#1B6B4A]">
                  {formatPrice(item.price, tListing("currency"), locale)}
                </p>
                <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-[#8A8678]">
                  <MapPin className="size-3" />
                  {item.distance} {tListing("km")}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Results() {
  const t = useTranslations("Browse");
  const { filters, results, resetFilters } = useBrowseFilters();

  if (!results.length) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-[rgba(27,107,74,0.2)] bg-white px-6 py-16 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-[rgba(27,107,74,0.08)] text-[#1B6B4A]">
          <SearchX className="size-6" />
        </span>
        <h3 className="mt-4 text-lg font-bold text-[#1A1A14]">
          {t("empty.title")}
        </h3>
        <p className="mt-1 max-w-sm text-sm text-[#8A8678]">
          {t("empty.description")}
        </p>
        <button
          type="button"
          onClick={resetFilters}
          className="mt-5 rounded-lg bg-[#1B6B4A] px-4 py-2 text-sm font-semibold text-[#FAF6EF]"
        >
          {t("active.clearAll")}
        </button>
      </div>
    );
  }

  if (filters.view === "map") return <MapView items={results} />;

  if (filters.view === "list") {
    return (
      <ul className="flex flex-col gap-4">
        {results.map((listing) => (
          <li key={listing.id}>
            <ListingCard listing={listing} layout="list" />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {results.map((listing) => (
        <li key={listing.id} className="*:h-full">
          <ListingCard listing={listing} />
        </li>
      ))}
    </ul>
  );
}
