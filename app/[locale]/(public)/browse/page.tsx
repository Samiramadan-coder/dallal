import { Suspense } from "react";
import Hero from "@/components/browse/hero";
import Results from "@/components/browse/results";
import Toolbar from "@/components/browse/toolbar";
import SearchBar from "@/components/browse/search-bar";
import FiltersSidebar from "@/components/browse/filters";
import CategoryTabs from "@/components/browse/category-tabs";
import ActiveFilters from "@/components/browse/active-filters";
import { BrowseFiltersProvider } from "@/providers/browse-filters";
import { ListingCardSkeleton } from "@/components/reusable/listing-card";

function ResultsSkeleton() {
  return (
    <div
      aria-busy="true"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <ListingCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-[#FAF6EF]">
      <Hero />

      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10">
        <Suspense fallback={<ResultsSkeleton />}>
          <BrowseFiltersProvider>
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
        </Suspense>
      </div>
    </div>
  );
}
