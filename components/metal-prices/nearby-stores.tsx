import Image from "next/image";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight, BadgeCheck, MapPin, Star } from "lucide-react";
import { formatPrice, headingFont, metalRates, stores } from "@/constants/marketplace";

// Mock: each store's distance and usual making charge (percent).
const nearby = [
  { slug: "al-faris-jewellers", distance: 4, making: 6 },
  { slug: "premium-timepieces", distance: 21, making: 9 },
  { slug: "gulf-bullion", distance: 38, making: 3 },
  { slug: "diamond-house-ad", distance: 142, making: 8 },
];

export default async function NearbyStores() {
  const locale = await getLocale();
  const t = await getTranslations("MetalPrices.stores");
  const tCities = await getTranslations("Cities");
  const currency = locale === "ar" ? "د.إ" : "AED";
  const karats = metalRates.gold.slice(0, 3);

  return (
    <section className="pb-10">
      <div className="rounded-2xl border border-[rgba(27,107,74,0.1)] bg-white p-5 shadow-sm md:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              className={cn(
                headingFont(locale),
                "text-xl font-bold text-[#1A1A14]",
              )}
            >
              {t("title")}
            </h2>
            <p className="mt-1 max-w-xl text-xs text-[#8A8678]">
              {t("description")}
            </p>
          </div>
          <Link
            href="/browse?view=map"
            className="inline-flex items-center gap-1.5 self-start text-sm font-bold text-[#1B6B4A] hover:underline sm:self-auto"
          >
            {t("openMap")}
            <ArrowRight className="size-4 rtl:rotate-180" />
          </Link>
        </div>

        <div className="-mx-5 overflow-x-auto px-5 md:-mx-6 md:px-6">
          <table className="w-full min-w-150 text-sm">
            <thead>
              <tr className="border-b border-[rgba(27,107,74,0.1)] text-[11px] uppercase tracking-wider text-[#8A8678]">
                <th scope="col" className="py-2.5 text-start font-bold">
                  <span className="sr-only">Store</span>
                </th>
                {karats.map((k) => (
                  <th key={k.label} scope="col" className="py-2.5 text-end font-bold">
                    {k.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {nearby.map(({ slug, distance, making }) => {
                const store = stores.find((s) => s.slug === slug)!;
                return (
                  <tr
                    key={slug}
                    className="border-b border-[rgba(27,107,74,0.06)] last:border-0"
                  >
                    <th scope="row" className="py-3 text-start font-normal">
                      <Link
                        href={`/store/${slug}`}
                        aria-label={t("view", { name: store.name })}
                        className="group flex items-center gap-3"
                      >
                        <Image
                          src={store.logo}
                          alt=""
                          width={40}
                          height={40}
                          className="size-10 shrink-0 rounded-lg object-cover"
                        />
                        <span className="min-w-0">
                          <span className="flex items-center gap-1 font-semibold text-[#1A1A14] group-hover:text-[#1B6B4A]">
                            {store.name}
                            <BadgeCheck className="size-3.5 text-[#1B6B4A]" />
                          </span>
                          <span className="mt-0.5 flex items-center gap-2 text-[11px] text-[#8A8678]">
                            <span className="inline-flex items-center gap-0.5">
                              <MapPin className="size-3" />
                              {tCities(store.city)} · {t("km", { value: distance })}
                            </span>
                            <span className="inline-flex items-center gap-0.5">
                              <Star className="size-3 fill-[#C9A445] text-[#C9A445]" />
                              {store.rating}
                            </span>
                          </span>
                        </span>
                      </Link>
                    </th>
                    {karats.map((k) => (
                      <td
                        key={k.label}
                        className="py-3 text-end font-semibold text-[#1A1A14]"
                      >
                        {formatPrice(
                          Number((k.price * (1 + making / 100)).toFixed(2)),
                          currency,
                          locale,
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
