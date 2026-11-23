const bar = "rounded bg-[#F0EBE0]";

// Same layout as the page, so nothing jumps when it loads
export default function Loading() {
  return (
    <div className="min-h-screen bg-card-foreground">
      {/* Category header */}
      <div className="mt-30 bg-background">
        <div className="mx-auto max-w-7xl animate-pulse space-y-3 px-4 py-8 sm:px-6">
          <div className="h-3 w-32 rounded bg-white/10" />
          <div className="h-9 w-64 rounded bg-white/10" />
        </div>
      </div>

      <div
        aria-busy="true"
        className="mx-auto flex max-w-7xl animate-pulse items-start gap-8 px-4 py-8 sm:px-6 md:py-10"
      >
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
          <div className="mb-4 flex items-center justify-between">
            <div className={`h-4 w-32 ${bar}`} />
            <div className={`h-10 w-44 ${bar}`} />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
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
