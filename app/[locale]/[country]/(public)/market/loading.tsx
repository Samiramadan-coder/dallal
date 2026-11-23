import Hero from "@/components/market/hero";

const bar = "rounded bg-[#F0EBE0]";

// Same layout as the page, so nothing jumps when it loads
export default function Loading() {
  return (
    <div className="min-h-screen bg-card-foreground">
      <Hero />

      <div
        aria-busy="true"
        className="mx-auto flex max-w-7xl animate-pulse flex-col gap-10 px-4 py-8 sm:px-6 md:py-10"
      >
        {/* Categories */}
        <div>
          <div className={`mb-4 h-6 w-48 ${bar}`} />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 rounded-2xl border border-[#E8E1D0] bg-white p-4"
              >
                <div className="size-10 rounded-xl bg-[#E9F3EC]" />
                <div className={`h-4 w-2/3 ${bar}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Latest listings */}
        <div>
          <div className={`mb-4 h-6 w-40 ${bar}`} />
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-[#E8E1D0] bg-white"
              >
                <div className="aspect-4/3 bg-[#F0EBE0]" />
                <div className="space-y-3 p-4">
                  <div className={`h-4 w-4/5 ${bar}`} />
                  <div className={`h-5 w-1/3 ${bar}`} />
                  <div className={`h-3 w-1/2 ${bar}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
