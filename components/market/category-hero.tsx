import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import GatedLink from "../auth/gated-link";
import { ChevronRight, Plus } from "lucide-react";
import { headingFont } from "@/constants/marketplace";
import type { CatalogCategory } from "@/types/catalog";
import { getLocale, getTranslations } from "next-intl/server";

// Header of /market/[category]: breadcrumb, category name and post button
export default async function CategoryHero({
  category,
}: {
  category: CatalogCategory;
}) {
  const locale = await getLocale();
  const t = await getTranslations("Market.hero");

  return (
    <section className="mt-30 bg-background text-card-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div>
          <nav
            aria-label={t("breadcrumb")}
            className="mb-2 flex items-center gap-1.5 text-xs text-[#D9D1BD]"
          >
            <Link href="/market" className="hover:text-primary">
              {t("title")}
            </Link>
            <ChevronRight aria-hidden className="size-3 rtl:rotate-180" />
            <span aria-current="page">{category.name}</span>
          </nav>
          <h1
            className={cn(
              headingFont(locale),
              "text-3xl font-bold md:text-4xl",
            )}
          >
            {category.name}
          </h1>
          {category.badge && (
            <p className="mt-1 text-sm text-[#D9D1BD]">{category.badge}</p>
          )}
        </div>

        <GatedLink
          href="/market/new"
          className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-primary px-5 py-3 text-sm font-bold text-background transition-colors hover:bg-[#D4B55A] md:self-auto"
        >
          <Plus className="size-4" />
          {t("post")}
        </GatedLink>
      </div>
    </section>
  );
}
