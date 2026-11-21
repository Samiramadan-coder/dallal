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
      <div className="relative overflow-hidden rounded-3xl bg-[#071E14] px-6 py-10 md:px-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            background:
              "radial-gradient(ellipse at 90% 50%, #C9A445, transparent 60%)",
          }}
        />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A445]">
              {t("eyebrow")}
            </p>
            <h2
              id="gold-cta-title"
              className={cn(
                headingFont(locale),
                "text-balance text-3xl font-bold text-[#FAF6EF]",
              )}
            >
              {t("title")}
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/sell"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C9A445] px-6 py-3.5 text-sm font-bold text-[#071E14] transition-colors hover:bg-[#D8B556]"
            >
              {t("sell")}
              <ArrowRight className="size-4 rtl:rotate-180" />
            </Link>
            <Link
              href="/browse?category=gold-jewelry"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[rgba(201,164,69,0.4)] px-6 py-3.5 text-sm font-bold text-[#FAF6EF] transition-colors hover:bg-[rgba(201,164,69,0.12)]"
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
    <div className="min-h-screen bg-[#FAF6EF]">
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
