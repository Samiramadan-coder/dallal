import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight, BadgeCheck, Building2, CircleCheck } from "lucide-react";

const verificationTypes = [
  {
    key: "individual",
    icon: BadgeCheck,
    tone: "accent",
  },
  {
    key: "shop",
    icon: Building2,
    tone: "primary",
  },
] as const;

export default async function Trust() {
  const locale = await getLocale();
  const t = await getTranslations("About.trust");
  const fontClass = locale === "en" ? "font-playfair" : "";

  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          opacity-20
          bg-[radial-gradient(rgba(201,164,69,0.15)_0.8px,transparent_0.8px)]
          bg-size-[18px_18px]
        "
      />

      <div className="relative z-10 container max-w-195">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-primary/50" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
              {t("eyebrow")}
            </span>
            <span className="h-px w-10 bg-primary/50" />
          </div>
          <h2
            className={`mx-auto mt-6 max-w-195 text-4xl font-bold leading-[1.1] tracking-[-0.035em] text-card-foreground lg:text-5xl ${fontClass}`}
          >
            {t("title")}{" "}
            <span className="italic gold-text">{t("titleHighlight")}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-155 text-base leading-7 text-card-foreground/65 sm:text-lg">
            {t("description")}
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {verificationTypes.map(({ key, icon: Icon, tone }) => {
            const isIndividual = tone === "accent";

            return (
              <article
                key={key}
                className={[
                  "group relative overflow-hidden rounded-xl border p-8",
                  "bg-card/35",
                  isIndividual ? "border-accent/50" : "border-primary/50",
                ].join(" ")}
              >
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={[
                          "flex size-11 shrink-0 items-center justify-center rounded-xl",
                          isIndividual
                            ? "bg-accent/15 text-accent"
                            : "bg-primary/15 text-primary",
                        ].join(" ")}
                      >
                        <Icon className="size-5" strokeWidth={1.8} />
                      </div>

                      <div>
                        <p
                          className={[
                            "text-[9px] font-semibold uppercase tracking-[0.25em]",
                            isIndividual ? "text-accent" : "text-primary",
                          ].join(" ")}
                        >
                          {t("tier")}
                        </p>

                        <h3
                          className={`mt-1.5 text-lg font-semibold text-card-foreground ${fontClass}`}
                        >
                          {t(`${key}.title`)}
                        </h3>
                      </div>
                    </div>

                    <span
                      className={[
                        "shrink-0 rounded-full px-3 py-1",
                        "text-[9px] font-semibold",
                        isIndividual
                          ? "bg-accent/15 text-accent"
                          : "bg-primary/15 text-primary",
                      ].join(" ")}
                    >
                      {t(`${key}.badge`)}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="mt-7 space-y-4">
                    {[1, 2, 3, 4].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <div
                          className={[
                            "mt-1 flex size-4 shrink-0 items-center justify-center rounded-full",
                            isIndividual
                              ? "bg-accent/15 text-accent"
                              : "bg-primary/15 text-primary",
                          ].join(" ")}
                        >
                          <CircleCheck className="size-3" strokeWidth={2} />
                        </div>

                        <span className="text-sm leading-relaxed text-card-foreground/65">
                          {t(`${key}.features.${item}`)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <Button
            asChild
            className="
              h-12
              rounded-lg
              bg-primary
              px-8
              font-semibold
              text-primary-foreground
              hover:bg-primary/90
            "
          >
            <Link href="/verification">
              {t("cta")}

              <ArrowRight className="ms-3 size-4 rtl:rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
