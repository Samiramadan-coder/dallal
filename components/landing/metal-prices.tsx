"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, TrendingDown, TrendingUp } from "lucide-react";
import { formatPrice, headingFont, metalRates, type Metal } from "./data";

const metals: Metal[] = ["gold", "silver", "platinum"];

export default function MetalPrices() {
  const locale = useLocale();
  const t = useTranslations("Home.metals");
  const [metal, setMetal] = useState<Metal>("gold");
  const font = headingFont(locale);

  return (
    <section
      aria-labelledby="metal-strip-title"
      className="border-y border-[rgba(201,164,69,0.18)] bg-[#0A2A1C]"
    >
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <h2
              id="metal-strip-title"
              className={`${font} text-lg font-bold text-[#FAF6EF]`}
            >
              {t("title")}
            </h2>
            <div
              className="flex rounded-full border border-[rgba(201,164,69,0.25)] p-0.5"
              role="tablist"
            >
              {metals.map((m) => (
                <button
                  key={m}
                  type="button"
                  role="tab"
                  aria-selected={metal === m}
                  onClick={() => setMetal(m)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-xs font-semibold transition-colors",
                    metal === m
                      ? "bg-[#C9A445] text-[#071E14]"
                      : "text-[#B9B5A6] hover:text-[#FAF6EF]",
                  )}
                >
                  {t(m)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#8A8678]">
            <span>{t("unit")}</span>
            <Link
              href="/gold-prices"
              className="inline-flex items-center gap-1 font-semibold text-[#C9A445] hover:underline"
            >
              {t("allPrices")}
              <ArrowRight className="size-3.5 rtl:rotate-180" />
            </Link>
          </div>
        </div>

        <ul className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
          {metalRates[metal].map((rate) => {
            const up = rate.change >= 0;
            return (
              <li
                key={rate.label}
                className="rounded-xl border border-[rgba(201,164,69,0.18)] bg-[#0F4A31] px-4 py-3"
              >
                <div className="flex items-center justify-between text-xs text-[#B9B5A6]">
                  <span className="font-semibold text-[#FAF6EF]">
                    {rate.label}
                  </span>
                  <span
                    dir="ltr"
                    className={cn(
                      "inline-flex items-center gap-1",
                      up ? "text-[#4ADE80]" : "text-[#F87171]",
                    )}
                  >
                    {up ? (
                      <TrendingUp className="size-3" />
                    ) : (
                      <TrendingDown className="size-3" />
                    )}
                    {up ? "+" : ""}
                    {rate.change.toFixed(2)}%
                  </span>
                </div>
                <div
                  className={`mt-1 ${font} text-xl font-bold text-[#FAF6EF]`}
                >
                  {formatPrice(rate.price, t("currency"), locale)}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
