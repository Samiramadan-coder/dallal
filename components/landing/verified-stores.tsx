"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { headingFont, stores } from "./data";
import { useLocale, useTranslations } from "next-intl";
import {
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Star,
} from "lucide-react";

export default function VerifiedStores() {
  const locale = useLocale();
  const t = useTranslations("Home.verifiedStores");
  const tCities = useTranslations("Home.hero.cities");
  const listRef = useRef<HTMLUListElement>(null);
  const isRtl = locale === "ar";
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // In RTL, scrollLeft goes from 0 to negative values, so use its magnitude.
  const updateEdges = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    const offset = Math.abs(el.scrollLeft);
    setAtStart(offset <= 1);
    setAtEnd(offset + el.clientWidth >= el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [updateEdges]);

  // dir: 1 = forward (next), -1 = backward (previous), in reading direction.
  const scroll = (dir: 1 | -1) => {
    const el = listRef.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    const step = card.getBoundingClientRect().width + 16; // card + gap-4
    el.scrollBy({ left: dir * (isRtl ? -step : step), behavior: "smooth" });
  };

  const navBtn =
    "flex size-10 items-center justify-center rounded-full border border-[rgba(201,164,69,0.3)] text-[#FAF6EF] transition-colors hover:bg-[rgba(201,164,69,0.12)] disabled:pointer-events-none disabled:opacity-35";

  return (
    <section
      aria-labelledby="verified-stores-title"
      className="bg-[#0A2A1C] py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2
              id="verified-stores-title"
              className={`${headingFont(locale)} text-3xl font-bold text-[#FAF6EF] md:text-4xl`}
            >
              {t("title")}
            </h2>
            <p className="mt-2 text-[#B9B5A6]">{t("description")}</p>
          </div>
          <div className="hidden gap-2 md:flex">
            <button
              type="button"
              aria-label={t("previous")}
              onClick={() => scroll(-1)}
              disabled={atStart}
              className={navBtn}
            >
              <ChevronLeft className="size-4 rtl:rotate-180" />
            </button>
            <button
              type="button"
              aria-label={t("next")}
              onClick={() => scroll(1)}
              disabled={atEnd}
              className={navBtn}
            >
              <ChevronRight className="size-4 rtl:rotate-180" />
            </button>
          </div>
        </div>

        <ul
          ref={listRef}
          onScroll={updateEdges}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth scrollbar-none [&::-webkit-scrollbar]:hidden"
        >
          {stores.map((store) => (
            <li key={store.slug} className="w-72 shrink-0 snap-start">
              <Link
                href={`/store/${store.slug}`}
                className={cn(
                  "flex h-full flex-col gap-4 rounded-2xl border bg-[#0F4A31] p-5 transition-colors hover:border-[rgba(201,164,69,0.6)]",
                  store.tier
                    ? "border-[rgba(201,164,69,0.55)]"
                    : "border-[rgba(201,164,69,0.2)]",
                )}
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={store.logo}
                    alt=""
                    width={56}
                    height={56}
                    className="size-14 rounded-xl object-cover"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`truncate ${headingFont(locale)} text-base font-bold text-[#FAF6EF]`}
                      >
                        {store.name}
                      </span>
                      <BadgeCheck className="size-4 shrink-0 text-[#C9A445]" />
                    </div>
                    <div className="mt-0.5 flex items-center gap-1 text-xs text-[#B9B5A6]">
                      <MapPin className="size-3" />
                      {tCities(store.city)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-[#B9B5A6]">
                  <span className="inline-flex items-center gap-1 text-[#FAF6EF]">
                    <Star className="size-3 fill-[#C9A445] text-[#C9A445]" />
                    {store.rating} ({store.reviews})
                  </span>
                  <span>{t("listings", { count: store.listings })}</span>
                </div>
                {store.tier && (
                  <span className="self-start rounded-full bg-[rgba(201,164,69,0.15)] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#C9A445]">
                    {store.tier}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/sellers"
          className="mt-6 inline-block text-sm font-semibold text-[#C9A445] hover:underline"
        >
          {t("plans")}
        </Link>
      </div>
    </section>
  );
}
