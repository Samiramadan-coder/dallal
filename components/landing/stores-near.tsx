import Image from "next/image";
import { nearbyStores } from "@/constants/marketplace";
import { Link } from "@/i18n/navigation";
import SectionHeading from "./section-heading";
import { getTranslations } from "next-intl/server";
import { ArrowRight, BadgeCheck, MapPin, Star } from "lucide-react";

// Decorative pin positions on the map preview (percentages).
const pins = [
  { top: "28%", left: "62%" },
  { top: "46%", left: "38%" },
  { top: "64%", left: "70%" },
  { top: "38%", left: "20%" },
  { top: "72%", left: "30%" },
];

export default async function StoresNear() {
  const t = await getTranslations("Home.nearby");
  const tCities = await getTranslations("Cities");

  return (
    <section
      aria-labelledby="stores-near-title"
      className="bg-[#0A2A1C] py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="stores-near-title"
            title={t("title")}
            description={t("description")}
          />
          <Link
            href="/browse?view=map"
            className="inline-flex items-center gap-2 self-start rounded-full bg-primary px-6 py-3 text-sm font-bold text-background hover:bg-[#D9B55A] md:self-auto"
          >
            {t("openMap")}
            <ArrowRight className="size-4 rtl:rotate-180" />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <Link
            href="/browse?view=map"
            aria-label={t("openMap")}
            className="relative h-72 overflow-hidden rounded-2xl border border-primary/25 bg-card lg:col-span-3 lg:h-auto lg:min-h-88"
          >
            <div className="absolute inset-0 bg-[linear-gradient(color-mix(in_srgb,var(--primary)_7%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--primary)_7%,transparent)_1px,transparent_1px)] bg-size-[40px_40px]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--accent)_25%,transparent),transparent_70%)]" />
            {pins.map((pin, i) => (
              <span
                key={i}
                className="absolute -translate-x-1/2 -translate-y-full"
                style={{ top: pin.top, left: pin.left }}
              >
                <MapPin className="size-7 fill-primary text-background" />
              </span>
            ))}
            <span className="absolute bottom-4 start-4 rounded-full bg-background/80 px-3 py-1.5 text-xs font-semibold text-card-foreground backdrop-blur-sm">
              {t("mapSoon")}
            </span>
          </Link>

          <ul className="flex flex-col gap-3 lg:col-span-2">
            {nearbyStores.map(({ store, distance, open }) => (
              <li key={store.slug}>
                <Link
                  href={`/store/${store.slug}`}
                  className="flex items-center gap-4 rounded-2xl border border-primary/20 bg-card p-4 transition-colors hover:border-primary/50"
                >
                  <Image
                    src={store.logo}
                    alt=""
                    width={56}
                    height={56}
                    className="size-14 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="truncate font-semibold text-card-foreground">
                        {store.name}
                      </span>
                      <BadgeCheck className="size-4 shrink-0 text-primary" />
                    </div>
                    <div className="mt-0.5 flex items-center gap-1 text-xs text-[#B9B5A6]">
                      <MapPin className="size-3" />
                      {tCities(store.city)} · {distance} {t("km")}
                    </div>
                    <div className="mt-1 flex items-center gap-3 text-xs">
                      <span className="inline-flex items-center gap-1 text-card-foreground">
                        <Star className="size-3 fill-primary text-primary" />
                        {store.rating} ({store.reviews})
                      </span>
                      <span
                        className={open ? "text-[#4ADE80]" : "text-muted-foreground"}
                      >
                        {open ? t("openNow") : t("closed")}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
