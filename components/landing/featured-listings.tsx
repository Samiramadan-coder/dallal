import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import SectionHeading from "./section-heading";
import { getTranslations } from "next-intl/server";
import { featuredListings } from "@/constants/marketplace";
import ListingCard from "@/components/reusable/listing-card";

export default async function FeaturedListings() {
  const t = await getTranslations("Home.featured");

  return (
    <section
      aria-labelledby="featured-title"
      className="bg-[#071E14] py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <SectionHeading
            id="featured-title"
            title={t("title")}
            description={t("description")}
          />
          <Link
            href="/browse"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#C9A445] hover:underline"
          >
            {t("browseAll")}
            <ArrowRight className="size-4 rtl:rotate-180" />
          </Link>
        </div>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredListings.map((listing) => (
            <li key={listing.id} className="*:h-full">
              <ListingCard listing={listing} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
