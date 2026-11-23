import Hero from "@/components/browse/hero";
import { ListingCardSkeleton } from "@/components/reusable/listing-card";

const bar = "rounded bg-[#F0EBE0]";

// Same layout as the page, so nothing jumps when it loads
export default function Loading() {
  return (
    <div className="min-h-screen bg-card-foreground">
      <Hero />

      <div
        aria-busy="true"
        className="mx-auto max-w-7xl animate-pulse px-4 py-6 md:px-6 md:py-10"
      >
        {/* Search bar */}
        <div className="mb-5 h-13.5 rounded-2xl border border-[rgba(27,107,74,0.14)] bg-white" />

        {/* Category tabs */}
        <div className="mb-5 flex w-fit max-w-full gap-1 overflow-hidden rounded-xl border border-[rgba(27,107,74,0.1)] bg-white p-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={`h-9 w-28 shrink-0 ${bar}`} />
          ))}
        </div>

        <div className="flex items-start gap-8">
          {/* Filters sidebar */}
          <div className="hidden w-72 shrink-0 space-y-6 rounded-2xl border border-[rgba(27,107,74,0.1)] bg-white px-5 py-5 lg:block">
            <div className={`h-4 w-20 ${bar}`} />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className={`h-3 w-24 ${bar}`} />
                <div className={`h-9 w-full ${bar}`} />
              </div>
            ))}
          </div>

          <div className="min-w-0 flex-1">
            {/* Toolbar */}
            <div className="mb-5 flex items-center justify-between">
              <div className={`h-4 w-40 ${bar}`} />
              <div className={`h-10 w-64 ${bar}`} />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <ListingCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
