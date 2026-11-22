import { cn } from "@/lib/utils";
import { getLocale, getTranslations } from "next-intl/server";
import { headingFont } from "@/constants/marketplace";

export default async function Hero() {
  const locale = await getLocale();
  const t = await getTranslations("Legal");
  const font = headingFont(locale);

  return (
    <div className="relative mt-30 overflow-hidden bg-card">
      <svg
        aria-hidden
        className="pointer-events-none absolute end-0 top-0 h-full select-none opacity-[0.05]"
        viewBox="0 0 400 120"
        fill="none"
      >
        <circle cx="360" cy="0" r="160" stroke="#E8D5A0" strokeWidth="1" />
        <circle cx="360" cy="0" r="200" stroke="#E8D5A0" strokeWidth="0.5" />
        <line x1="200" y1="0" x2="400" y2="120" stroke="#E8D5A0" strokeWidth="0.5" />
      </svg>

      <div className="relative mx-auto max-w-7xl px-6 pb-9 pt-10">
        <p className="mb-3 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-primary/80">
          <span className="h-px w-8 bg-primary/50" />
          {t("eyebrow")}
        </p>
        <h1
          className={cn(
            font,
            "text-balance text-4xl font-bold leading-tight text-card-foreground",
          )}
        >
          {t("titleStart")} <span className="gold-text italic">{t("titleHighlight")}</span>
        </h1>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-[rgba(245,240,232,0.5)]">
          {t("subtitle")}
        </p>
      </div>
      <div className="h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />
    </div>
  );
}
