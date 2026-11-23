import { cn } from "@/lib/utils";
import { getCatalog } from "@/lib/api/catalog";
import Safety from "@/components/market/safety";
import Hero from "@/components/market/hero";
import Categories from "@/components/market/categories";
import { getLocale, getTranslations } from "next-intl/server";
import MarketListingCard from "@/components/market/listing-card";
import { headingFont, marketListings } from "@/constants/marketplace";

export default async function Page() {
  // getCatalog() falls back to an empty catalog when the API fails, which
  // would quietly drop the categories: show ./error.tsx (with retry) instead.
  // Cached, so <Categories /> reuses this request
  if (!(await getCatalog()).version) {
    throw new Error("Failed to load the catalog");
  }
  const locale = await getLocale();
  const t = await getTranslations("Market");
  const font = headingFont(locale);

  return (
    <div className="min-h-screen bg-card-foreground">
      <Hero />

      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 md:py-10">
        <Categories />

        <section aria-labelledby="latest-heading">
          <h2
            id="latest-heading"
            className={cn(font, "mb-4 text-xl font-bold text-foreground")}
          >
            {t("latest.title")}
          </h2>

          {/* Static until the listings API lands */}
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {marketListings.map((listing) => (
              <li key={listing.id} className="flex">
                <MarketListingCard listing={listing} />
              </li>
            ))}
          </ul>
        </section>

        <Safety />
      </div>
    </div>
  );
}
