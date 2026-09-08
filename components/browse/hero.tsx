import { cn } from "@/lib/utils";
import Title from "../reusable/title";
import EyeBrow from "../reusable/eye-brow";
import { getLocale, getTranslations } from "next-intl/server";

const stats = ["listings", "sellers", "cities"] as const;

export default async function Hero() {
  const locale = await getLocale();
  const t = await getTranslations("Browse.hero");
  const fontClass = locale === "en" ? "font-playfair" : "";

  return (
    <section className="relative overflow-hidden bg-card py-14 text-card-foreground lg:py-16 mt-30">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-e-32 -top-52 size-120 rounded-full border border-primary/6"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -inset-e-16 -top-40 size-96 rounded-full border border-primary/6"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-e-2 -top-28 size-72 rounded-full border border-primary/6"
      />

      <div className="container relative z-10 max-w-7xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-primary/70" />
              <EyeBrow className="text-xs text-primary">{t("eyebrow")}</EyeBrow>
            </div>
            <Title
              className={cn(
                "mt-5 text-4xl font-bold leading-tight text-card-foreground md:text-5xl",
                fontClass,
              )}
            >
              {t("title")}{" "}
              <span className="gold-text italic">{t("titleHighlight")}</span>
            </Title>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 lg:gap-12">
            {stats.map((stat) => (
              <div key={stat} className="text-center lg:min-w-24">
                <p
                  className={cn(
                    "text-3xl font-bold leading-none gold-text",
                    fontClass,
                  )}
                >
                  {t(`stats.${stat}.value`)}
                </p>
                <p className="mt-2 text-[10px] font-medium uppercase tracking-widest text-[#f5f0e873]">
                  {t(`stats.${stat}.label`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
