import Image from "next/image";
import Price from "@/components/reusable/price";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight, BadgeCheck, TrendingDown } from "lucide-react";
import { headingFont } from "@/constants/marketplace";

// Mock: listings priced below the market value of their metal.
const nearMarket = [
  {
    id: "l-006",
    title: { en: "22K Gold Drop Earrings — Bridal Filigree", ar: "أقراط ذهب عيار 22 متدلية — فيليغري للعروس" },
    image: "/listing-set-6.webp",
    karat: "22K",
    price: 7700,
    market: 8200,
  },
  {
    id: "l-007",
    title: { en: "18K White Gold Diamond Tennis Bracelet", ar: "سوار تنس ألماس من الذهب الأبيض عيار 18" },
    image: "/listing-set-7.webp",
    karat: "18K",
    price: 14800,
    market: 15600,
  },
  {
    id: "l-011",
    title: { en: "18K Gold Diamond Cluster Ring", ar: "خاتم ذهب عيار 18 بعنقود ألماس" },
    image: "/listing-set-2.webp",
    karat: "18K",
    price: 4350,
    market: 4680,
  },
  {
    id: "l-013",
    title: { en: "18K White Gold Solitaire Ring Setting", ar: "قاعدة خاتم سوليتير من الذهب الأبيض عيار 18" },
    image: "/listing-ring.webp",
    karat: "18K",
    price: 1840,
    market: 1930,
  },
];

export default async function Listings() {
  const locale = await getLocale();
  const t = await getTranslations("Calculator.listings");
  const font = headingFont(locale);
  const lang = locale === "ar" ? "ar" : "en";

  return (
    <section className="border-t border-[rgba(27,107,74,0.08)] py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-primary">
            {t("eyebrow")}
          </p>
          <h2 className={cn(font, "text-3xl font-bold text-foreground")}>
            {t("title")}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{t("description")}</p>
        </div>
        <Link
          href="/browse"
          className="hidden items-center gap-2 text-xs font-black uppercase tracking-wider text-[#1B6B4A] transition-colors hover:text-card sm:flex"
        >
          {t("all")}
          <ArrowRight className="size-4 rtl:rotate-180" />
        </Link>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {nearMarket.map((item) => {
          const below = Math.round(((item.market - item.price) / item.market) * 100);
          return (
            <Link
              key={item.id}
              href={`/listing/${item.id}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[rgba(27,107,74,0.1)] bg-white transition-all duration-200 hover:border-[rgba(27,107,74,0.28)] hover:shadow-[0_12px_40px_rgba(27,107,74,0.12)]"
            >
              <div className="relative h-44 overflow-hidden bg-[#F5F1EA]">
                <Image
                  src={item.image}
                  alt={item.title[lang]}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute start-3 top-3 rounded-full bg-card/90 px-2.5 py-1 text-[10px] font-black tracking-wide text-[#E8D5A0]">
                  {item.karat}
                </span>
                <span className="absolute end-3 top-3 flex items-center gap-1 rounded-full bg-[rgba(21,128,61,0.92)] px-2 py-1 text-[10px] font-black text-white">
                  <TrendingDown className="size-3" />
                  {t("below", { value: below })}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <p className="line-clamp-2 flex-1 text-xs font-bold leading-snug text-foreground">
                  {item.title[lang]}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <div className={cn(font, "text-lg font-bold text-[#1B6B4A]")}>
                      <Price value={item.price} mock approx />
                    </div>
                    <div className="text-[10px] text-muted-foreground line-through">
                      <Price value={item.market} mock />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-[#1B6B4A]">
                    <BadgeCheck className="size-3.5" />
                    {t("verified")}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/browse"
          className="inline-flex items-center gap-2 rounded-xl bg-[#1B6B4A] px-8 py-3.5 text-xs font-black uppercase tracking-widest text-white shadow-[0_4px_20px_rgba(27,107,74,0.25)] transition-colors duration-200 hover:bg-card"
        >
          {t("browseAll")}
          <ArrowRight className="size-4 rtl:rotate-180" />
        </Link>
      </div>
    </section>
  );
}
