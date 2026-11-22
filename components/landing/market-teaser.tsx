import { Link } from "@/i18n/navigation";
import { marketCategories } from "@/constants/marketplace";
import SectionHeading from "./section-heading";
import { getTranslations } from "next-intl/server";
import {
  ArrowRight,
  Coins,
  Gem,
  Landmark,
  Sparkles,
  Watch,
  Wrench,
} from "lucide-react";

const icons = {
  tools: Wrench,
  silver: Coins,
  watches: Watch,
  accessories: Sparkles,
  antiques: Landmark,
  beads: Gem,
} as const;

export default async function MarketTeaser() {
  const t = await getTranslations("Home.market");

  return (
    <section
      aria-labelledby="market-teaser-title"
      className="bg-background py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="market-teaser-title"
            title={t("title")}
            description={t("description")}
          />
          <Link
            href="/market"
            className="inline-flex items-center gap-2 self-start rounded-full border border-primary/50 px-6 py-3 text-sm font-semibold text-card-foreground hover:bg-primary/12 md:self-auto"
          >
            {t("cta")}
            <ArrowRight className="size-4 rtl:rotate-180" />
          </Link>
        </div>

        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {marketCategories.map((item) => {
            const Icon = icons[item.key];
            return (
              <li key={item.key}>
                <Link
                  href={`/market/${item.slug}`}
                  className="flex h-full flex-col items-start gap-3 rounded-2xl border border-primary/20 bg-card p-5 transition-colors hover:border-primary/50"
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <span className="text-sm font-semibold leading-snug text-card-foreground">
                    {t(`items.${item.key}`)}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
