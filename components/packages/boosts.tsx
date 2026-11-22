import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { boosts } from "@/constants/packages";
import { ArrowUp, Pin, Sparkles } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { formatPrice, headingFont } from "@/constants/marketplace";

const icons = { bump: ArrowUp, featured: Sparkles, pinned: Pin } as const;

export default async function Boosts() {
  const locale = await getLocale();
  const t = await getTranslations("Packages.boosts");
  const font = headingFont(locale);
  const currency = locale === "ar" ? "د.إ" : "AED";

  return (
    <section className="bg-card-foreground py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-[#1B6B4A]">
            {t("eyebrow")}
          </p>
          <h2
            className={cn(
              font,
              "text-balance text-3xl font-bold text-foreground md:text-4xl",
            )}
          >
            {t("title")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#6B6858]">
            {t("description")}
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {boosts.map((boost) => {
            const Icon = icons[boost.key];
            const name = t(`items.${boost.key}.name`);
            const place = t(`items.${boost.key}.place`);
            return (
              <div
                key={boost.key}
                className="flex flex-col rounded-2xl border border-[rgba(27,107,74,0.12)] bg-white p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-primary/15 text-[#9A7B22]">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className={cn(font, "text-xl font-bold text-foreground")}>
                      {name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {boost.duration === "oneTime"
                        ? t("oneTime")
                        : t("days", { n: boost.duration })}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-[#4A4840]">
                  {t(`items.${boost.key}.desc`)}
                </p>

                <div
                  className="mt-4 rounded-xl bg-card-foreground p-3"
                  aria-label={t("where", { name, place })}
                >
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {place}
                  </p>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between rounded-lg border border-primary bg-white px-2.5 py-2 text-[11px] font-semibold text-foreground">
                      <span>{t("yourListing")}</span>
                      <span className="rounded-full bg-primary px-2 py-0.5 text-[9px] font-bold uppercase text-background">
                        {t(`items.${boost.key}.tag`)}
                      </span>
                    </div>
                    {[0, 1].map((i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-lg border border-transparent bg-[rgba(0,0,0,0.04)] px-2.5 py-2 text-[11px] text-muted-foreground"
                      >
                        <span>{t("otherListing")}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex items-end justify-between border-t border-[rgba(27,107,74,0.1)] pt-4">
                  <div>
                    <p className={cn(font, "text-2xl font-bold text-foreground")}>
                      {formatPrice(boost.price, currency, locale)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("credits", { count: boost.credits })}
                    </p>
                  </div>
                  <Link
                    href="/dashboard"
                    className="rounded-lg bg-card px-4 py-2 text-sm font-semibold text-card-foreground transition-colors hover:bg-[#1B6B4A]"
                  >
                    {t("cta")}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
