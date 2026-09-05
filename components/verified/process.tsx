import { BadgeCheck, Search, TrendingUp, Upload } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import EyeBrow from "../reusable/eye-brow";
import Title from "../reusable/title";

const steps = [
  {
    key: "submit",
    icon: Upload,
  },
  {
    key: "review",
    icon: Search,
  },
  {
    key: "activated",
    icon: BadgeCheck,
  },
  {
    key: "sell",
    icon: TrendingUp,
  },
] as const;

export default async function Process() {
  const locale = await getLocale();
  const t = await getTranslations("GetVerified.process");
  const fontClass = locale === "en" ? "font-playfair" : "";

  return (
    <section className="bg-white py-16 text-foreground lg:py-24">
      <div className="container max-w-5xl">
        <div className="text-center">
          <EyeBrow>{t("eyebrow")}</EyeBrow>
          <Title>{t("title")}</Title>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {steps.map(({ key, icon: Icon }, index) => (
            <article key={key} className="relative lg:px-5">
              {index !== steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="
                    absolute
                    inset-s-17
                    top-6
                    hidden
                    h-px
                    w-[calc(100%-48px)]
                    bg-primary/20
                    lg:block
                  "
                />
              )}

              <div
                className="
                  relative
                  z-10
                  flex
                  size-12
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-accent/15
                  bg-accent/[0.07]
                  text-accent
                "
              >
                <Icon className="size-5" strokeWidth={1.8} />
              </div>

              <p className="mt-5 text-[11px] font-bold tracking-[0.2em] text-primary">
                {String(index + 1).padStart(2, "0")}
              </p>

              <h3 className={`mt-3 text-base font-bold ${fontClass}`}>
                {t(`steps.${key}.title`)}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t(`steps.${key}.description`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
