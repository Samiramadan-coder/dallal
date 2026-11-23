// Same layout as the page, so the market skeleton doesn't flash in its place
export default function Loading() {
  return (
    <div
      aria-busy="true"
      className="min-h-screen animate-pulse bg-card-foreground"
    >
      <section className="mt-30 bg-background">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-14">
          <div className="h-10 w-72 rounded bg-white/10 md:h-12" />
          <div className="mt-4 h-5 w-96 max-w-full rounded bg-white/10" />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-10">
        <div className="h-48 rounded-2xl bg-[#F0EBE0]" />
      </div>
    </div>
  );
}
