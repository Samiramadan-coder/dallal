"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { headingFont } from "@/constants/marketplace";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

const tabs = [
  { key: "buyers", href: "/browse" },
  { key: "selling", href: "/sell" },
  { key: "stores", href: "/sellers" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

export default function HowItWorks() {
  const locale = useLocale();
  const t = useTranslations("Home.howItWorks");
  const [active, setActive] = useState<TabKey>("buyers");
  const font = headingFont(locale);
  const current = tabs.find((tab) => tab.key === active)!;

  return (
    <section aria-labelledby="how-title" className="bg-[#071E14] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <h2
            id="how-title"
            className={`${font} text-3xl font-bold text-[#FAF6EF] md:text-4xl`}
          >
            {t("title")}
          </h2>
          <div
            role="tablist"
            className="flex flex-wrap gap-1 self-start rounded-full border border-[rgba(201,164,69,0.25)] p-1"
          >
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                id={`how-tab-${tab.key}`}
                aria-selected={active === tab.key}
                aria-controls="how-panel"
                onClick={() => setActive(tab.key)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-semibold transition-colors",
                  active === tab.key
                    ? "bg-[#C9A445] text-[#071E14]"
                    : "text-[#B9B5A6] hover:text-[#FAF6EF]",
                )}
              >
                {t(`tabs.${tab.key}`)}
              </button>
            ))}
          </div>
        </div>

        <div
          id="how-panel"
          role="tabpanel"
          aria-labelledby={`how-tab-${active}`}
        >
          <ol className="grid gap-5 md:grid-cols-3">
            {(["s1", "s2", "s3"] as const).map((step, i) => (
              <li
                key={`${active}-${step}`}
                className="rounded-2xl border border-[rgba(201,164,69,0.2)] bg-[#0F4A31] p-6"
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A445]">
                  {t("step", { n: i + 1 })}
                </span>
                <h3 className={`mt-2 ${font} text-xl font-bold text-[#FAF6EF]`}>
                  {t(`${active}.${step}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#B9B5A6]">
                  {t(`${active}.${step}.body`)}
                </p>
              </li>
            ))}
          </ol>

          <Link
            href={current.href}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#C9A445] px-7 py-3 text-sm font-bold text-[#071E14] hover:bg-[#D9B55A]"
          >
            {t(`${active}.cta`)}
            <ArrowRight className="size-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </section>
  );
}
