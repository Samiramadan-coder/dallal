"use client";

import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { ShieldCheck, Star, Users } from "lucide-react";

export default function AuthHeroContent() {
  const locale = useLocale();
  const t = useTranslations("Auth.Hero");
  const fontClass = locale === "en" ? "font-playfair" : "";

  const features = [
    {
      icon: ShieldCheck,
      label: t("features.verified"),
    },
    {
      icon: Star,
      label: t("features.rating"),
    },
    {
      icon: Users,
      label: t("features.members"),
    },
  ];

  return (
    <div className="relative z-10 p-12 h-full flex flex-col justify-between">
      <div>
        <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-primary mb-3">
          {t("eyebrow")}
        </p>

        <h1
          className={cn(
            "text-4xl font-bold text-secondary-foreground leading-tight text-balance",
            fontClass,
          )}
        >
          {t("title")}
          <br />
          {t("titleSecond")} <span className="gold-text">{t("highlight")}</span>
        </h1>

        <p className="mt-4 text-sm text-[rgba(245,240,232,0.6)] leading-relaxed max-w-xs">
          {t("description")}
        </p>
      </div>

      <div className="mt-auto">
        <div className="mb-12 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#b58b27]/40" />
          <div className="size-2 rotate-45 bg-primary" />
          <div className="h-px flex-1 bg-[#b58b27]/40" />
        </div>

        <div className="space-y-4">
          {features.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[rgba(201,164,69,0.15)] border border-[rgba(201,164,69,0.25)] flex items-center justify-center shrink-0">
                <Icon className="size-4 text-primary" />
              </div>
              <p className="text-sm text-[rgba(245,240,232,0.8)] font-medium">
                {label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 border-l-2 border-[rgba(201,164,69,0.4)] pl-4">
          <p className="text-xs italic text-[rgba(245,240,232,0.5)] leading-relaxed">
            “{t("testimonial.text")}”
          </p>
          <p className="block mt-1.5 text-[11px] not-italic text-primary">
            — {t("testimonial.author")}
          </p>
        </div>
      </div>
    </div>
  );
}
