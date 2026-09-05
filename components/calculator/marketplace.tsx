import Image from "next/image";
import { cn } from "@/lib/utils";
import Title from "../reusable/title";
import { Link } from "@/i18n/navigation";
import EyeBrow from "../reusable/eye-brow";
import { Button } from "@/components/ui/button";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight, BadgeCheck, TrendingDown } from "lucide-react";

const listings = [
  {
    key: "necklace",
    image: "/product.png",
    karat: "22K",
    discount: "8%",
    price: "7,250",
    oldPrice: "7,900",
  },
  {
    key: "bangles",
    image: "/product.png",
    karat: "21K",
    discount: "3%",
    price: "19,400",
    oldPrice: "20,100",
  },
  {
    key: "coins",
    image: "/product.png",
    karat: "24K",
    discount: "3%",
    price: "22,300",
    oldPrice: "23,100",
  },
  {
    key: "earrings",
    image: "/product.png",
    karat: "22K",
    discount: "8%",
    price: "3,300",
    oldPrice: "3,600",
  },
] as const;

export default async function Marketplace() {
  const locale = await getLocale();
  const t = await getTranslations("Calculator.marketplace");

  const fontClass = locale === "en" ? "font-playfair" : "";

  return (
    <section className="bg-[#faf6ef] py-20 text-foreground lg:py-24">
      <div className="container max-w-6xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <EyeBrow className="text-xs text-primary">{t("eyebrow")}</EyeBrow>
            <Title
              className={cn(
                "mt-4 text-3xl font-bold text-foreground md:text-4xl",
                fontClass,
              )}
            >
              {t("title")}
            </Title>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {t("description")}
            </p>
          </div>

          <Link
            href="/listings"
            className="
              group
              flex
              w-fit
              items-center
              gap-2
              text-xs
              font-bold
              uppercase
              tracking-wide
              text-accent
            "
          >
            {t("allListings")}

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

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {listings.map((listing) => (
            <article
              key={listing.key}
              className="
                group
                overflow-hidden
                rounded-xl
                border
                border-border
                bg-white
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-accent/30
                hover:shadow-[0_16px_40px_rgba(7,30,20,0.07)]
              "
            >
              <div className="relative aspect-[1.45] overflow-hidden bg-[#f4f4f2]">
                <Image
                  src={listing.image}
                  alt={t(`items.${listing.key}.title`)}
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                  className="
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-[1.03]
                  "
                />

                <span
                  className="
                    absolute
                    inset-s-3
                    top-3
                    rounded-full
                    bg-card/90
                    px-3
                    py-1.5
                    text-[10px]
                    font-bold
                    text-[#e8d5a0]
                  "
                >
                  {listing.karat}
                </span>

                <span
                  className="
                    absolute
                    inset-e-3
                    top-3
                    flex
                    items-center
                    gap-1
                    rounded-full
                    bg-accent
                    px-2.5
                    py-1.5
                    text-[10px]
                    font-bold
                    text-accent-foreground
                  "
                >
                  <TrendingDown className="size-3" />
                  {listing.discount} {t("below")}
                </span>
              </div>

              <div className="p-4">
                <h3 className="min-h-10 text-xs font-bold leading-5 text-foreground">
                  {t(`items.${listing.key}.title`)}
                </h3>

                <div className="mt-5 flex items-end justify-between gap-3">
                  <div>
                    <p
                      className={cn("text-xl font-bold text-accent", fontClass)}
                    >
                      {t("currency")} {listing.price}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground line-through">
                      {t("currency")} {listing.oldPrice}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-accent">
                    <BadgeCheck className="size-3.5" />
                    {t("verified")}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            asChild
            className="
              h-12
              min-w-60
              rounded-xl
              bg-accent
              px-7
              text-xs
              font-bold
              uppercase
              tracking-[0.08em]
              text-accent-foreground
              shadow-[0_10px_30px_rgba(42,138,95,0.16)]
              hover:bg-accent/90
            "
          >
            <Link href="/listings">
              {t("browse")}

              <ArrowRight className="ms-3 size-4 rtl:rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
