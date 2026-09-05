import Image from "next/image";
import Title from "../reusable/title";
import { Link } from "@/i18n/navigation";
import EyeBrow from "../reusable/eye-brow";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight, BadgeCheck, Package, Star } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

const shops = [
  {
    key: "alfardan",
    image: "/shop.png",
    initials: "AF",
    established: "1954",
    rating: "4.9",
    reviews: "312",
    listings: "148",
  },
  {
    key: "damas",
    image: "/shop.png",
    initials: "DL",
    established: "1907",
    rating: "4.8",
    reviews: "204",
    listings: "96",
  },
  {
    key: "malabar",
    image: "/shop.png",
    initials: "MG",
    established: "1993",
    rating: "4.9",
    reviews: "518",
    listings: "232",
  },
  {
    key: "joyalukkas",
    image: "/shop.png",
    initials: "JU",
    established: "1987",
    rating: "4.7",
    reviews: "389",
    listings: "175",
  },
] as const;

export default async function VerifiedShops() {
  const locale = await getLocale();
  const t = await getTranslations("Home.verifiedShops");
  const fontClass = locale === "en" ? "font-playfair" : "";

  return (
    <section className="relative overflow-hidden bg-[#0a2918] py-20 text-card-foreground lg:py-24">
      <div className="container max-w-7xl">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-primary/70" />
              <EyeBrow className="text-xs text-primary">{t("eyebrow")}</EyeBrow>
            </div>
            <Title className={`text-4xl md:text-5xl ${fontClass}`}>
              {t("title")}{" "}
              <span className="gold-text">{t("titleHighlight")}</span>
            </Title>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
          </div>

          <Link
            href="/shops"
            className="
              group
              flex
              w-fit
              items-center
              gap-2
              text-sm
              font-semibold
              text-primary
            "
          >
            {t("browseAll")}
            <ArrowRight
              className="
                size-4
                transition-transform
                group-hover:translate-x-1
                rtl:rotate-180
                rtl:group-hover:-translate-x-1
              "
            />
          </Link>
        </div>

        {/* Shops */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {shops.map((shop) => (
            <Card
              key={shop.key}
              className="
                p-0
                group
                ring-0!
                border
                border-accent/20
                bg-secondary
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-primary/50
                hover:shadow-[0_18px_45px_rgba(0,0,0,0.18)]
              "
            >
              <div className="relative aspect-[1.65] overflow-hidden">
                <div
                  className="
                  absolute 
                  z-1 
                  inset-0 
                  bg-linear-to-t 
                  from-background/90 
                  via-background/15 
                  to-transparent
                "
                />

                <Image
                  src={shop.image}
                  alt={t(`shops.${shop.key}.name`)}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />

                <Badge
                  className="
                    h-7
                    absolute
                    inset-s-3
                    top-3
                    bg-background/90
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-widest
                    text-primary
                    backdrop-blur
                  "
                >
                  {t(`shops.${shop.key}.category`)}
                </Badge>

                <Badge
                  className="
                    h-7
                    absolute
                    inset-e-3
                    top-3
                    bg-background/90
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.08em]
                    text-primary
                    backdrop-blur
                  "
                >
                  <BadgeCheck className="size-3" />
                  {t("verified")}
                </Badge>

                <div className="absolute z-2 inset-x-4 bottom-4">
                  <h3 className={`text-lg font-bold text-white ${fontClass}`}>
                    {t(`shops.${shop.key}.name`)}
                  </h3>
                  <p className="mt-0.5 text-[11px] text-[#faf6efa6]">
                    {t(`shops.${shop.key}.location`)}
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`
                      flex
                      size-10
                      items-center
                      justify-center
                      rounded-full
                      bg-background
                      border
                      border-primary
                      text-sm
                      font-bold
                      text-primary
                      ${fontClass}
                    `}
                  >
                    {shop.initials}
                  </div>
                  <p className="text-[11px] font-semibold text-primary">
                    {t("established", {
                      year: shop.established,
                    })}
                  </p>
                </div>

                {/* Stats */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div
                    className="
                      rounded-lg
                      border
                      border-primary/15
                      bg-card/20
                      px-3
                      py-3
                    "
                  >
                    <div className="flex items-center gap-1.5">
                      <Star className="size-3.5 fill-primary text-primary" />
                      <span className="text-sm font-bold text-card-foreground">
                        {shop.rating}
                      </span>
                    </div>
                    <p className="mt-1 text-[10px] text-muted-foreground">
                      {t("reviews", {
                        count: shop.reviews,
                      })}
                    </p>
                  </div>

                  <div
                    className="
                      rounded-lg
                      border
                      border-primary/15
                      bg-card/20
                      px-3
                      py-3
                    "
                  >
                    <div className="flex items-center gap-1.5">
                      <Package className="size-3.5 text-primary" />
                      <span className="text-sm font-bold text-card-foreground">
                        {shop.listings}
                      </span>
                    </div>

                    <p className="mt-1 text-[10px] text-muted-foreground">
                      {t("activeListings")}
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href={`/shops/${shop.key}`}
                  className="
                    group/link
                    mt-4
                    flex
                    h-10
                    items-center
                    justify-between
                    rounded-lg
                    border
                    border-primary/25
                    px-3
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.08em]
                    text-primary
                    transition-colors
                    hover:border-primary/50
                    hover:bg-primary/10
                  "
                >
                  {t("viewShop")}
                  <ArrowRight
                    className="
                      size-4
                      transition-transform
                      group-hover/link:translate-x-1
                      rtl:rotate-180
                      rtl:group-hover/link:-translate-x-1
                    "
                  />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
