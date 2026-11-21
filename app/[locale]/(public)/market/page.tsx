import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { ShieldCheck } from "lucide-react";
import Hero from "@/components/market/hero";
import Categories from "@/components/market/categories";
import { getLocale, getTranslations } from "next-intl/server";
import MarketListingCard from "@/components/market/listing-card";
import { headingFont, marketListings } from "@/constants/marketplace";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim().toLowerCase();
  const locale = await getLocale();
  const t = await getTranslations("Market");
  const font = headingFont(locale);

  const results = query
    ? marketListings.filter((l) =>
        `${l.title.en} ${l.title.ar} ${l.seller ?? ""}`
          .toLowerCase()
          .includes(query),
      )
    : marketListings;

  return (
    <div className="min-h-screen bg-[#FAF6EF]">
      <Hero q={q} />

      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 md:py-10">
        <Categories />

        <section aria-labelledby="latest-heading">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
            <h2
              id="latest-heading"
              className={cn(font, "text-xl font-bold text-[#1A1A14]")}
            >
              {query ? t("latest.results", { q }) : t("latest.title")}
            </h2>
            {query && (
              <Link
                href="/market"
                className="text-sm font-semibold text-[#1B6B4A] hover:underline"
              >
                {t("latest.clear")}
              </Link>
            )}
          </div>

          {results.length ? (
            <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {results.map((listing) => (
                <li key={listing.id} className="flex">
                  <MarketListingCard listing={listing} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-2xl border border-dashed border-[#E8E1D0] bg-white p-8 text-center text-sm text-[#8A8678]">
              {t("latest.empty")}
            </p>
          )}
        </section>

        <section
          aria-labelledby="market-safety"
          className="flex gap-4 rounded-2xl border border-[#E6CF8C] bg-[#FBF3DA] p-5 text-[#5C4710]"
        >
          <ShieldCheck className="size-6 shrink-0" />
          <div className="text-sm leading-relaxed">
            <h2 id="market-safety" className={cn(font, "text-lg font-bold")}>
              {t("safety.title")}
            </h2>
            <ul className="mt-2 flex list-disc flex-col gap-1 ps-5">
              <li>{t("safety.tips.meet")}</li>
              <li>{t("safety.tips.inspect")}</li>
              <li>{t("safety.tips.stores")}</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
