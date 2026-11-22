"use client";

import { cn } from "@/lib/utils";
import { useMetal } from "./use-metal";
import { Link } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import { Clock, Radio } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { countries, headingFont } from "@/constants/marketplace";

function LastUpdated() {
  const locale = useLocale();
  const t = useTranslations("MetalPrices.hero");
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex shrink-0 items-center gap-3 rounded-xl border border-primary/20 bg-background/50 px-5 py-4">
      <Clock className="size-5 text-primary" />
      <div>
        <p className="text-[10px] uppercase tracking-wider text-[rgba(245,240,232,0.45)]">
          {t("lastUpdated")}
        </p>
        <p className="mt-0.5 text-sm font-bold text-card-foreground">
          {now
            ? now.toLocaleTimeString(locale === "ar" ? "ar-AE" : "en-AE", {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "–"}
        </p>
        <p className="mt-0.5 inline-flex items-center gap-1 text-[10px] text-[#3DAF77]">
          <span className="size-1.5 animate-pulse rounded-full bg-[#3DAF77]" />
          {t("marketOpen")}
        </p>
      </div>
    </div>
  );
}

export default function Hero() {
  const locale = useLocale();
  const t = useTranslations("MetalPrices");
  const [metal] = useMetal();
  const [country, setCountry] = useState<string>("uae");

  return (
    <div className="relative mt-30 overflow-hidden bg-card pb-14 pt-10">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, var(--primary) 0, var(--primary) 1px, transparent 0, transparent 50%)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 end-0 top-0 w-1/3 bg-linear-to-l from-primary/5 to-transparent rtl:bg-linear-to-r"
      />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <nav
          aria-label={t("hero.breadcrumb")}
          className="mb-5 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[rgba(245,240,232,0.45)]"
        >
          <Link href="/" className="transition-colors hover:text-primary">
            {t("hero.home")}
          </Link>
          <span>›</span>
          <span className="text-[rgba(245,240,232,0.7)]">
            {t("hero.current")}
          </span>
        </nav>

        <div className="mb-7 flex flex-wrap items-center gap-2">
          {countries.map((c) => {
            const active = country === c.key;
            return (
              <button
                key={c.key}
                type="button"
                disabled={!c.available}
                onClick={() => setCountry(c.key)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition-all disabled:cursor-not-allowed disabled:opacity-45",
                  active
                    ? "border-primary bg-primary text-background shadow-[0_2px_12px_color-mix(in_srgb,var(--primary)_40%,transparent)]"
                    : "border-primary/20 bg-transparent text-[rgba(245,240,232,0.6)] enabled:hover:border-primary/50 enabled:hover:text-[rgba(245,240,232,0.9)]",
                )}
              >
                <span className={cn(!c.available && "grayscale")}>{c.flag}</span>
                <span>{c.name}</span>
                {!c.available && (
                  <span className="text-[9px] uppercase tracking-wide text-primary">
                    {t("hero.soon")}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
              <Radio className="size-3.5" />
              {t("hero.eyebrow")}
            </p>
            <h1
              className={cn(
                headingFont(locale),
                "text-balance text-4xl font-bold leading-tight text-card-foreground lg:text-5xl",
              )}
            >
              {t("hero.title", { metal: t(`metals.${metal}`) })}{" "}
              <span className="gold-text">{t("hero.today")}</span>
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[rgba(245,240,232,0.55)]">
              {t(`hero.description.${metal}`)}
              <span className="ms-1 text-primary">{t("hero.vat")}</span>
            </p>
          </div>

          <LastUpdated />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />
    </div>
  );
}
