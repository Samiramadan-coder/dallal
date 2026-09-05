import { Suspense } from "react";
import Hero from "@/components/browse/hero";
import Filters from "@/components/browse/filters";
import GridItem from "@/components/browse/grid-item";
import ListItem from "@/components/browse/list-item";
import QueryFilters from "@/components/browse/query-filters";
import { BrowseFiltersProvider } from "@/providers/browse-filters";

type SearchParams = {
  show_type: "list" | "map";
};

async function ListItems({ searchParams }: { searchParams: SearchParams }) {
  const { show_type } = searchParams;

  if (show_type === "list") {
    return (
      <div className="grid grid-cols-1 gap-5">
        {Array.from({ length: 6 }).map((_, index) => (
          <ListItem key={index} />
        ))}
      </div>
    );
  }

  if (show_type === "map") {
    return <div>Map Item</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: 6 }).map((_, index) => (
        <GridItem key={index} />
      ))}
    </div>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return (
    <div>
      <Hero />

      <BrowseFiltersProvider>
        <div className="pt-12 pb-20 bg-card-foreground">
          <div className="container max-w-7xl">
            <div className="grid items-start grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <Filters />

              <div className="lg:col-span-3 space-y-5">
                <QueryFilters />

                <Suspense fallback={<p>Loading....</p>}>
                  <ListItems searchParams={await searchParams} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </BrowseFiltersProvider>
    </div>
  );
}
