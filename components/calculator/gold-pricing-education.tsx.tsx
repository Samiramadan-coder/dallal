import { cn } from "@/lib/utils";
import Title from "../reusable/title";
import EyeBrow from "../reusable/eye-brow";
import { getLocale, getTranslations } from "next-intl/server";
import { BadgePercent, Diamond, Scale, ShieldCheck } from "lucide-react";

const items = [
  {
    key: "karat",
    icon: Diamond,
  },
  {
    key: "spotRate",
    icon: Scale,
  },
  {
    key: "makingCharges",
    icon: BadgePercent,
  },
  {
    key: "vat",
    icon: ShieldCheck,
  },
] as const;

export default async function GoldPricingEducation() {
  const locale = await getLocale();
  const t = await getTranslations("Calculator.education");
  const fontClass = locale === "en" ? "font-playfair" : "";

  return (
    <section className="bg-[#faf6ef] py-20 text-foreground lg:py-28">
      <div className="container max-w-4xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-primary/60" />
            <EyeBrow className="text-xs text-primary">{t("eyebrow")}</EyeBrow>
            <span className="h-px w-10 bg-primary/60" />
          </div>
          <Title
            className={cn(
              "mt-5 text-4xl font-bold text-foreground md:text-5xl",
              fontClass,
            )}
          >
            {t("title")}
          </Title>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {items.map(({ key, icon: Icon }, index) => (
            <article
              key={key}
              className="
                group
                flex
                min-h-44
                items-start
                gap-5
                rounded-3xl
                border
                border-border
                bg-white
                p-7
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-primary/30
                hover:shadow-[0_16px_40px_rgba(7,30,20,0.06)]
              "
            >
              {/* Icon */}
              <div className="relative shrink-0">
                <div
                  className="
                    flex
                    size-14
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-accent/15
                    bg-accent/[0.07]
                    text-accent
                    transition-colors
                    duration-300
                    group-hover:bg-accent
                    group-hover:text-accent-foreground
                  "
                >
                  <Icon className="size-5" strokeWidth={1.7} />
                </div>

                {/* Number */}
                <span
                  className="
                    absolute
                    -inset-e-2
                    -top-2
                    flex
                    size-6
                    items-center
                    justify-center
                    rounded-full
                    bg-primary
                    text-[9px]
                    font-bold
                    text-primary-foreground
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-sm font-bold leading-5 text-foreground">
                  {t(`items.${key}.title`)}
                </h3>

                <p className="mt-3 text-xs leading-6 text-muted-foreground">
                  {t(`items.${key}.description`)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
