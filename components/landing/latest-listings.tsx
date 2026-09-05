import {
  Heart,
  Clock3,
  MapPin,
  BadgeCheck,
  ArrowRight,
  TrendingDown,
} from "lucide-react";
import Image from "next/image";
import Title from "../reusable/title";
import { Link } from "@/i18n/navigation";
import EyeBrow from "../reusable/eye-brow";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { getLocale, getTranslations } from "next-intl/server";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

const categories = ["all", "gold", "diamonds", "watches"] as const;

const listings = [
  {
    id: 1,
    category: "diamonds",
    image: "/product.png",
    title: "18K Diamond Solitaire Ring",
    details: "0.85ct · VVS1 · GIA Certified",
    price: "18,500",
    marketDifference: "-3.6%",
    location: "Abu Dhabi",
    createdAt: "5 hours ago",
    verified: true,
  },
  {
    id: 2,
    category: "diamonds",
    image: "/product.png",
    title: "18K Diamond Solitaire Ring",
    details: "0.85ct · VVS1 · GIA Certified",
    price: "18,500",
    marketDifference: "-3.6%",
    location: "Abu Dhabi",
    createdAt: "5 hours ago",
    verified: true,
  },
  {
    id: 3,
    category: "diamonds",
    image: "/product.png",
    title: "18K Diamond Solitaire Ring",
    details: "0.85ct · VVS1 · GIA Certified",
    price: "18,500",
    marketDifference: "-3.6%",
    location: "Abu Dhabi",
    createdAt: "5 hours ago",
    verified: true,
  },
] as const;

export default async function LatestListings() {
  const locale = await getLocale();
  const t = await getTranslations("Home.latest");
  const fontClass = locale === "en" ? "font-playfair" : "";

  return (
    <section
      id="latest-near-you"
      className="relative overflow-hidden bg-[#0a2918] py-20 text-card-foreground lg:py-24"
    >
      <div className="container max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
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
              {t("description")}{" "}
              <span className="font-medium text-primary">{t("location")}</span>
              {" — "}
              {t("descriptionEnd")}
            </p>
          </div>

          <Tabs defaultValue="diamonds">
            <TabsList
              className="
                h-auto!
                w-fit
                rounded-lg
                border
                border-primary/20
                bg-card
                p-1
              "
            >
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="
                    rounded-md
                    px-5
                    py-2.5
                    text-xs
                    h-7
                    font-semibold
                    uppercase
                    tracking-wide
                    text-card-foreground/55
                    transition-colors
                    hover:text-white
                    data-[state=active]:bg-primary
                    data-[state=active]:text-primary-foreground
                    data-[state=active]:shadow-none
                  "
                >
                  {t(`categories.${category}`)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Listings */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing, index) => (
            <Card
              key={index}
              className="
                group
                ring-0!
                border
                border-primary/15
                p-0
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-primary/40
                hover:shadow-[0_18px_45px_rgba(0,0,0,0.18)]
              "
            >
              {/* Image */}
              <div className="relative aspect-[1.45] overflow-hidden bg-white">
                <div className="absolute z-1 inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.18)_0%,transparent_40%,rgba(7,30,20,0.72)_100%)]"></div>

                <Image
                  src={listing.image}
                  alt={listing.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 400px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />

                <Badge className="absolute inset-s-3 top-3 h-6 text-[9px] font-bold uppercase tracking-[0.12em] text-primary-foreground ">
                  {t(`categories.${listing.category}`)}
                </Badge>

                <div className="absolute inset-e-3 top-3 flex items-center gap-2">
                  {listing.verified && (
                    <Badge className="h-6 bg-white text-[9px] font-semibold text-accent shadow-sm">
                      <BadgeCheck className="size-3" />
                      {t("verified")}
                    </Badge>
                  )}

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={t("favorite")}
                    className="size-9 rounded-full bg-white text-foreground shadow-sm hover:bg-white hover:text-destructive"
                  >
                    <Heart className="size-4" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3
                  className={`text-lg font-semibold text-card-foreground ${fontClass}`}
                >
                  {listing.title}
                </h3>

                <p className="mt-1 text-xs text-muted-foreground">
                  {listing.details}
                </p>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <p className={`text-xl font-bold text-primary ${fontClass}`}>
                    {t("currency")} {listing.price}
                  </p>

                  <Badge className="h-6 border-accent/25 bg-accent/10 text-[10px] font-medium text-accent">
                    <TrendingDown className="size-3" />
                    {listing.marketDifference} {t("belowMarket")}
                  </Badge>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-primary/10 px-4 py-3 text-[10px] text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <MapPin className="size-3 text-primary" />
                  <span>{listing.location}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock3 className="size-3" />
                  <span>{listing.createdAt}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View all */}
        <div className="mt-12 flex justify-center">
          <Button
            asChild
            variant="outline"
            className="
              h-12
              min-w-64
              rounded-lg
              border-primary/40
              bg-transparent
              px-8
              text-sm
              font-semibold
              uppercase
              tracking-[0.12em]
              text-primary
              hover:bg-transparent
              hover:text-primary
              hover:-translate-y-0.5
            "
          >
            <Link href="/listings">
              {t("viewAll")}
              <ArrowRight
                className="
                  ms-3
                  size-4
                  transition-transform
                  rtl:rotate-180
                  rtl:group-hover:-translate-x-1
                "
              />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
