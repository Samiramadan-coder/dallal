import { Suspense } from "react";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import Faq from "@/components/metal-prices/faq";
import Hero from "@/components/metal-prices/hero";
import { ArrowRight, Gem } from "lucide-react";
import { headingFont } from "@/constants/marketplace";
import PriceAlert from "@/components/metal-prices/price-alert";
import { getLocale, getTranslations } from "next-intl/server";
import PricesBoard from "@/components/metal-prices/prices-board";
import NearbyStores from "@/components/metal-prices/nearby-stores";

async function Cta() {
  const locale = await getLocale();
  const t = await getTranslations("MetalPrices.cta");

  return (
    <section aria-labelledby="gold-cta-title" className="pb-10">
      <div className="relative overflow-hidden rounded-3xl bg-background px-6 py-10 md:px-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            background:
              "radial-gradient(ellipse at 90% 50%, var(--primary), transparent 60%)",
          }}
        />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
              {t("eyebrow")}
            </p>
            <h2
              id="gold-cta-title"
              className={cn(
                headingFont(locale),
                "text-balance text-3xl font-bold text-card-foreground",
              )}
            >
              {t("title")}
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/sell"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-background transition-colors hover:bg-[#D8B556]"
            >
              {t("sell")}
              <ArrowRight className="size-4 rtl:rotate-180" />
            </Link>
            <Link
              href="/browse?category=gold-jewelry"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/40 px-6 py-3.5 text-sm font-bold text-card-foreground transition-colors hover:bg-primary/12"
            >
              <Gem className="size-4" />
              {t("browse")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-card-foreground">
      <Suspense>
        <Hero />
      </Suspense>

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Suspense>
          <PricesBoard />
        </Suspense>
        <NearbyStores />
        <PriceAlert />
        <Cta />
        <Faq />
      </div>
    </div>
  );
}
