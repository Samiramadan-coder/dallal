import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { headingFont } from "@/constants/marketplace";
import { getCategories } from "@/lib/api/catalog";
import CategoryIcon from "@/components/reusable/category-icon";

// Individual-market categories from the catalog; each opens
// /market/[category] with its filters
export default async function Categories() {
  const locale = await getLocale();
  const t = await getTranslations("Market.categories");
  const font = headingFont(locale);
  const categories = await getCategories("individual_market");

  if (!categories.length) return null;

  return (
    <section aria-labelledby="categories-heading">
      <h2
        id="categories-heading"
        className={cn(font, "mb-4 text-xl font-bold text-foreground")}
      >
        {t("title")}
      </h2>

      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {categories.map((category) => (
          <li key={category.key}>
            <Link
              href={`/market/${category.key}`}
              className="flex h-full flex-col gap-3 rounded-2xl border border-[#E8E1D0] bg-white p-4 transition-colors hover:border-[#1B6B4A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B6B4A]"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-[#E9F3EC] text-[#1B6B4A]">
                <CategoryIcon icon={category.icon} className="size-5" />
              </span>
              <span
                className={cn(
                  font,
                  "block text-base font-bold leading-tight text-foreground",
                )}
              >
                {category.name}
              </span>
              {category.badge && (
                <span className="mt-auto self-start rounded-full border border-[#E6CF8C] bg-[#FBF3DA] px-2.5 py-0.5 text-[11px] font-bold text-[#6B5210]">
                  {category.badge}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
