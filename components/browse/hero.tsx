import { cn } from "@/lib/utils";
import { headingFont } from "@/constants/marketplace";
import { getLocale, getTranslations } from "next-intl/server";

const stats = ["listings", "sellers", "cities"] as const;

export default async function Hero() {
  const locale = await getLocale();
  const t = await getTranslations("Browse.hero");
  const font = headingFont(locale);

  return (
    <div className="relative mt-30 overflow-hidden bg-card">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute end-0 top-0 h-full select-none opacity-[0.06]"
        viewBox="0 0 400 200"
        fill="none"
      >
        <circle cx="350" cy="0" r="180" stroke="#E8D5A0" strokeWidth="1" />
        <circle cx="350" cy="0" r="220" stroke="#E8D5A0" strokeWidth="0.5" />
        <circle cx="350" cy="0" r="260" stroke="#E8D5A0" strokeWidth="0.5" />
        <line x1="170" y1="0" x2="400" y2="200" stroke="#E8D5A0" strokeWidth="0.5" />
        <line x1="220" y1="0" x2="400" y2="150" stroke="#E8D5A0" strokeWidth="0.5" />
      </svg>

      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-8 md:px-6 md:pb-10 md:pt-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end md:gap-8">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-primary/80">
              <span className="h-px w-8 bg-primary/50" />
              {t("eyebrow")}
            </p>
            <h1
              className={cn(
                font,
                "text-balance text-5xl font-bold leading-tight text-card-foreground",
              )}
            >
              {t("title")}{" "}
              <span className="gold-text italic">{t("titleHighlight")}</span>
            </h1>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-[rgba(245,240,232,0.5)]">
              {t("description")}
            </p>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            {stats.map((stat) => (
              <div key={stat} className="text-center">
                <p className={cn(font, "gold-text text-3xl font-bold")}>
                  {t(`stats.${stat}.value`)}
                </p>
                <p className="mt-0.5 text-[10px] uppercase tracking-widest text-[rgba(245,240,232,0.45)]">
                  {t(`stats.${stat}.label`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />
    </div>
  );
}
