import { notFound } from "next/navigation";
import { getCatalog } from "@/lib/api/catalog";
import { getSelectedCountryCities } from "@/lib/api/selected-country";
import Safety from "@/components/market/safety";
import Toolbar from "@/components/browse/toolbar";
import FiltersSidebar from "@/components/browse/filters";
import { marketListings } from "@/constants/marketplace";
import CategoryHero from "@/components/market/category-hero";
import ActiveFilters from "@/components/browse/active-filters";
import MarketListingCard from "@/components/market/listing-card";
import { BrowseFiltersProvider } from "@/providers/browse-filters";

// /market/[category]: one individual-market category with its catalog
// filters, like /browse. Filters only set URL params; the listings are
// static until the listings API lands
export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: key } = await params;
  const [catalog, cities] = await Promise.all([
    getCatalog(),
    // Options of the city_id filter
    getSelectedCountryCities(),
  ]);
  // getCatalog() falls back to an empty catalog when the API fails:
  // show ./error.tsx (with retry) rather than a 404
  if (!catalog.version) throw new Error("Failed to load the catalog");

  const category = catalog.categories.find(
    (c) => c.key === key && c.audience === "individual_market",
  );
  if (!category) notFound();

  return (
    <div className="min-h-screen bg-card-foreground">
      <CategoryHero category={category} />

      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 md:py-10">
        <BrowseFiltersProvider
          category={category}
          commonFields={catalog.common_fields}
          cities={cities}
        >
          <div className="flex items-start gap-8">
            <FiltersSidebar />

            <div className="min-w-0 flex-1">
              <Toolbar count={marketListings.length} simple />
              <ActiveFilters />

              <ul className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3">
                {marketListings.map((listing) => (
                  <li key={listing.id} className="flex">
                    <MarketListingCard listing={listing} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </BrowseFiltersProvider>

        <Safety />
      </div>
    </div>
  );
}
