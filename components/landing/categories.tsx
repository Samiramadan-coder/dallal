import Image from "next/image";
import { Link } from "@/i18n/navigation";
import SectionHeading from "./section-heading";
import { getCategories } from "@/lib/api/catalog";
import { headingFont } from "@/constants/marketplace";
import { getLocale, getTranslations } from "next-intl/server";

// Placeholder until every category gets an image from the API
const FALLBACK_IMAGE = "/listing-necklace.webp";

export default async function Categories() {
  const locale = await getLocale();
  const t = await getTranslations("Home.categories");
  const categories = await getCategories("merchant");

  return (
    <section
      aria-labelledby="merchant-categories-title"
      className="bg-background py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8">
          <SectionHeading
            id="merchant-categories-title"
            title={t("title")}
            description={t("description")}
          />
        </div>

        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => (
            <li key={category.key}>
              <Link
                href={`/browse?category=${category.key}`}
                className="group relative block aspect-4/5 overflow-hidden rounded-2xl border border-primary/20"
              >
                <Image
                  src={category.image ?? FALLBACK_IMAGE}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_srgb,var(--background)_92%,transparent),color-mix(in_srgb,var(--background)_5%,transparent)_60%)]" />
                <span
                  className={`absolute inset-x-0 bottom-0 p-4 ${headingFont(locale)} text-lg font-bold leading-tight text-card-foreground`}
                >
                  {category.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
