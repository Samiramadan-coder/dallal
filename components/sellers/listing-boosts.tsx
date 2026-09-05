import { ArrowUpRight, Pin, Star } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import EyeBrow from "../reusable/eye-brow";
import Title from "../reusable/title";

const boosts = [
  {
    key: "featured",
    icon: Star,
    featured: false,
  },
  {
    key: "bump",
    icon: ArrowUpRight,
    featured: true,
  },
  {
    key: "pinned",
    icon: Pin,
    featured: false,
  },
] as const;

export default async function ListingBoosts() {
  const locale = await getLocale();
  const t = await getTranslations("ForSellers.boosts");
  const fontClass = locale === "en" ? "font-playfair" : "";

  return (
    <section className="bg-card-foreground py-20 text-foreground lg:py-24">
      <div className="container max-w-4xl">
        <div className="text-center">
          <EyeBrow>{t("eyebrow")}</EyeBrow>
          <Title>{t("title")}</Title>
          <p className="mx-auto mt-4 max-w-145 text-sm leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {boosts.map(({ key, icon: Icon, featured }) => (
            <article
              key={key}
              className={[
                "group relative flex min-h-108.75 flex-col items-center rounded-2xl px-7 py-8 text-center transition-all duration-300",
                featured
                  ? [
                      "border-2 border-primary",
                      "bg-card",
                      "text-card-foreground",
                      "shadow-[0_18px_50px_rgba(201,164,69,0.14)]",
                    ].join(" ")
                  : [
                      "border border-border",
                      "bg-white",
                      "hover:-translate-y-1",
                      "hover:border-accent/30",
                      "hover:shadow-[0_16px_40px_rgba(7,30,20,0.06)]",
                    ].join(" "),
              ].join(" ")}
            >
              {featured && (
                <div
                  className="
                    bg-primary
                    absolute
                    inset-s-1/2
                    top-0
                    -translate-x-1/2
                    -translate-y-1/2
                    whitespace-nowrap
                    rounded-full
                    px-5
                    py-1.5
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.08em]
                    text-primary-foreground
                  "
                >
                  {t("bestValue")}
                </div>
              )}

              <div
                className={[
                  "flex size-14 items-center justify-center rounded-xl transition-all duration-300",
                  featured
                    ? "bg-primary/10 text-primary"
                    : "bg-accent/8 text-accent group-hover:bg-accent group-hover:text-accent-foreground",
                ].join(" ")}
              >
                <Icon className="size-6" strokeWidth={1.7} />
              </div>

              <h3
                className={[
                  "mt-5 text-xl font-bold",
                  featured ? "text-card-foreground" : "text-foreground",
                  fontClass,
                ].join(" ")}
              >
                {t(`items.${key}.title`)}
              </h3>

              <p
                className={[
                  "mt-1 text-xs",
                  featured
                    ? "text-card-foreground/55"
                    : "text-muted-foreground",
                ].join(" ")}
              >
                {t(`items.${key}.duration`)}
              </p>

              <p
                className={[
                  "mt-7 min-h-21 text-sm leading-relaxed",
                  featured ? "text-card-foreground/75" : "text-[#4A4840]",
                ].join(" ")}
              >
                {t(`items.${key}.description`)}
              </p>

              <div className="mt-auto pt-7">
                <div className="flex items-end justify-center gap-1">
                  <span
                    className={[
                      "mb-1 text-sm",
                      featured
                        ? "text-card-foreground/55"
                        : "text-muted-foreground",
                    ].join(" ")}
                  >
                    {t("currency")}
                  </span>

                  <span
                    className={[
                      "text-4xl font-bold leading-none",
                      featured ? "text-primary" : "text-foreground",
                      fontClass,
                    ].join(" ")}
                  >
                    {t(`items.${key}.price`)}
                  </span>
                </div>

                <p
                  className={[
                    "mt-1 text-[10px]",
                    featured
                      ? "text-card-foreground/45"
                      : "text-muted-foreground",
                  ].join(" ")}
                >
                  {t("oneTime")}
                </p>
              </div>

              {/* CTA */}
              <Button
                asChild
                variant={featured ? "default" : "outline"}
                className={[
                  "mt-6 h-11 w-full rounded-xl font-semibold",

                  featured
                    ? [
                        "bg-primary",
                        "border-0",
                        "text-primary-foreground",
                        "hover:opacity-90",
                      ].join(" ")
                    : [
                        "border-accent/30",
                        "bg-transparent",
                        "text-accent",
                        "hover:bg-accent",
                        "hover:text-accent-foreground",
                      ].join(" "),
                ].join(" ")}
              >
                <Link href={`/boost?type=${key}`}>{t(`items.${key}.cta`)}</Link>
              </Button>
            </article>
          ))}
        </div>

        {/* Footer */}
        <p className="mt-7 text-center text-[11px] text-muted-foreground">
          {t("footer")}
        </p>
      </div>
    </section>
  );
}
