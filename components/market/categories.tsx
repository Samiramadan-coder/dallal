import {
  Coins,
  Gem,
  Landmark,
  Sparkles,
  Watch,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import {
  headingFont,
  marketCategories,
  marketCategoryCounts,
} from "@/constants/marketplace";

const icons = {
  tools: Wrench,
  silver: Coins,
  watches: Watch,
  accessories: Sparkles,
  antiques: Landmark,
  beads: Gem,
} as const;

export default async function Categories() {
  const locale = await getLocale();
  const t = await getTranslations("Market.categories");
  const font = headingFont(locale);

  return (
    <section aria-labelledby="categories-heading">
      <h2
        id="categories-heading"
        className={cn(font, "mb-4 text-xl font-bold text-[#1A1A14]")}
      >
        {t("title")}
      </h2>

      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {marketCategories.map((category) => {
          const Icon = icons[category.key];
          return (
            <li key={category.key}>
              <Link
                href={`/market/${category.slug}`}
                className="flex h-full flex-col gap-3 rounded-2xl border border-[#E8E1D0] bg-white p-4 transition-colors hover:border-[#1B6B4A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B6B4A]"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-[#E9F3EC] text-[#1B6B4A]">
                  <Icon className="size-5" />
                </span>
                <span>
                  <span
                    className={cn(
                      font,
                      "block text-base font-bold leading-tight text-[#1A1A14]",
                    )}
                  >
                    {t(`items.${category.key}.name`)}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-[#8A8678]">
                    {t(`items.${category.key}.blurb`)}
                  </span>
                </span>
                <span className="mt-auto text-xs font-bold text-[#1B6B4A]">
                  {t("count", { count: marketCategoryCounts[category.key] })}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
