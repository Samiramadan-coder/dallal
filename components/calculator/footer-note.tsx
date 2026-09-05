import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function FooterNote() {
  const t = await getTranslations("Calculator.footerNote");

  return (
    <section className="border-t border-border bg-white py-7 text-foreground">
      <div className="container flex max-w-5xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-muted-foreground">
          {t("disclaimer")}
        </p>

        <nav className="flex flex-wrap items-center gap-x-7 gap-y-3">
          <Link
            href="/gold-prices"
            className="text-xs font-semibold text-accent transition-colors hover:text-primary"
          >
            {t("links.goldPrices")}
          </Link>

          <Link
            href="/listings"
            className="text-xs font-semibold text-accent transition-colors hover:text-primary"
          >
            {t("links.listings")}
          </Link>

          <Link
            href="/"
            className="text-xs text-muted-foreground transition-colors hover:text-accent"
          >
            {t("links.home")}
          </Link>
        </nav>
      </div>
    </section>
  );
}
