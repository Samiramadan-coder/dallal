import {
  ArrowRight,
  BadgeCheck,
  ChartNoAxesCombined,
  MessageCircle,
  Search,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { getLocale, getTranslations } from "next-intl/server";

const steps = [
  {
    key: "browse",
    icon: Search,
  },
  {
    key: "compare",
    icon: ChartNoAxesCombined,
  },
  {
    key: "contact",
    icon: MessageCircle,
  },
  {
    key: "buy",
    icon: BadgeCheck,
  },
] as const;

export default async function Buyers() {
  const locale = await getLocale();
  const t = await getTranslations("About.buyers");
  const fontClass = locale === "en" ? "font-playfair" : "";

  return (
    <section className="bg-card-foreground py-20 text-foreground lg:py-28">
      <div className="container max-w-350">
        {/* Heading */}
        <div className="max-w-180">
          <div className="inline-flex items-center rounded-full border border-accent/20 bg-accent/5 px-4 py-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">
              {t("eyebrow")}
            </span>
          </div>
          <h2
            className={`mt-7 text-4xl font-bold leading-[1.05] tracking-[-0.035em] lg:text-5xl ${fontClass}`}
          >
            {t("title")}{" "}
            <span className="italic text-accent">{t("titleHighlight")}</span>
          </h2>
          <p className="mt-5 max-w-162.5 text-base text-[#4A4840] sm:text-lg leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ key, icon: Icon }, index) => (
            <article
              key={key}
              className="relative min-h-71.25 overflow-hidden rounded-xl border border-accent/15 bg-white p-8"
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute inset-e-6 top-6 text-5xl font-semibold leading-none text-accent/6 ${fontClass}`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex size-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Icon className="size-5" strokeWidth={1.8} />
              </div>
              <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
                {t("step", { number: index + 1 })}
              </p>
              <h3 className="mt-3 text-base font-semibold leading-6 text-foreground">
                {t(`steps.${key}.title`)}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#4A4840]">
                {t(`steps.${key}.description`)}
              </p>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14">
          <Button
            asChild
            className="
              h-13
              rounded-lg
              bg-accent
              px-8
              text-sm
              font-semibold
              text-accent-foreground
              hover:bg-accent/90
            "
          >
            <Link href="/listings">
              {t("cta")}
              <ArrowRight className="ms-3 size-4 rtl:rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
