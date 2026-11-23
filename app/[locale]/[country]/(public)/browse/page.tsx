import Hero from "@/components/browse/hero";
import { getCatalog } from "@/lib/api/catalog";
import { getSelectedCountryCities } from "@/lib/api/selected-country";
import Results from "@/components/browse/results";
import Toolbar from "@/components/browse/toolbar";
import SearchBar from "@/components/browse/search-bar";
import FiltersSidebar from "@/components/browse/filters";
import CategoryTabs from "@/components/browse/category-tabs";
import ActiveFilters from "@/components/browse/active-filters";
import { BrowseFiltersProvider } from "@/providers/browse-filters";

// Loading and error states live in ./loading.tsx and ./error.tsx
export default async function Page() {
  // Cached and shared with every other page that needs the catalog
  const [catalog, cities] = await Promise.all([
    getCatalog(),
    // Options of the city_id filter
    getSelectedCountryCities(),
  ]);
  // getCatalog() falls back to an empty catalog when the API fails; the page
  // is useless without categories, so show ./error.tsx (with retry) instead
  if (!catalog.version) throw new Error("Failed to load the catalog");

  // The individual market's categories live on /market
  const categories = catalog.categories.filter(
    (category) => category.audience === "merchant",
  );

  return (
    <div className="min-h-screen bg-card-foreground">
      <Hero />

      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10">
        <BrowseFiltersProvider
          categories={categories}
          commonFields={catalog.common_fields}
          cities={cities}
        >
          <div className="mb-5">
            <SearchBar />
          </div>

          <div className="mb-5">
            <CategoryTabs />
          </div>

          <div className="flex items-start gap-8">
            <FiltersSidebar />

            <div className="min-w-0 flex-1">
              <Toolbar />
              <ActiveFilters />
              <Results />
            </div>
          </div>
        </BrowseFiltersProvider>
      </div>
    </div>
  );
}
