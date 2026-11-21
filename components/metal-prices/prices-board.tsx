"use client";

import {
  chartRanges,
  formatPrice,
  headingFont,
  metalRates,
  metals,
  priceHistory,
  TOLA_GRAMS,
  TROY_OUNCE_GRAMS,
  weightUnits,
  type ChartRange,
} from "@/constants/marketplace";
import { cn } from "@/lib/utils";
import { useMetal } from "./use-metal";
import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { TrendingDown, TrendingUp } from "lucide-react";

const CURRENCY = { en: "AED", ar: "د.إ" };

function useMoney() {
  const locale = useLocale();
  const currency = CURRENCY[locale === "ar" ? "ar" : "en"];
  return (value: number) => formatPrice(Number(value.toFixed(2)), currency, locale);
}

function Change({ value, className }: { value: number; className?: string }) {
  const up = value >= 0;
  return (
    <span
      dir="ltr"
      className={cn(
        "inline-flex items-center gap-1 font-semibold",
        up ? "text-[#15803D]" : "text-[#C0453B]",
        className,
      )}
    >
      {up ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
      {up ? "+" : ""}
      {value.toFixed(2)}%
    </span>
  );
}

function MetalTabs() {
  const t = useTranslations("MetalPrices");
  const [metal, setMetal] = useMetal();

  return (
    <div
      role="tablist"
      aria-label={t("chooseMetal")}
      className="inline-flex max-w-full gap-1 overflow-x-auto rounded-xl bg-[#F5F0E8] p-1"
    >
      {metals.map((m) => (
        <button
          key={m}
          type="button"
          role="tab"
          aria-selected={metal === m}
          onClick={() => setMetal(m === "gold" ? null : m)}
          className={cn(
            "rounded-lg px-4 py-2 text-sm font-bold transition-colors",
            metal === m
              ? "bg-[#1B6B4A] text-[#FAF6EF] shadow-sm"
              : "text-[#4A4840] hover:text-[#1B6B4A]",
          )}
        >
          {t(`metals.${m}`)}
        </button>
      ))}
    </div>
  );
}

function RateCards() {
  const locale = useLocale();
  const t = useTranslations("MetalPrices.cards");
  const [metal] = useMetal();
  const money = useMoney();
  const rates = metalRates[metal].slice(0, 4);

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {rates.map((rate, i) => (
        <li
          key={rate.label}
          className={cn(
            "rounded-2xl border bg-white p-5 shadow-sm",
            i === 0
              ? "border-[rgba(201,164,69,0.5)] shadow-[0_8px_30px_rgba(201,164,69,0.12)]"
              : "border-[rgba(27,107,74,0.1)]",
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p
                className={cn(
                  headingFont(locale),
                  "text-2xl font-bold text-[#1B6B4A]",
                )}
              >
                {rate.label}
              </p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-[#8A8678]">
                {t("pure", { value: rate.purity })}
              </p>
            </div>
            <Change value={rate.change} className="text-xs" />
          </div>

          <p className="mt-5">
            <span
              className={cn(
                headingFont(locale),
                "text-3xl font-bold text-[#1A1A14]",
              )}
            >
              {money(rate.price)}
            </span>
            <span className="ms-1 text-xs text-[#8A8678]">{t("perGram")}</span>
          </p>
          <p className="mt-1 text-[11px] text-[#8A8678]">{t("vsYesterday")}</p>

          <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-[rgba(27,107,74,0.08)] pt-4 text-xs">
            <div>
              <dt className="text-[#8A8678]">{t("perTola")}</dt>
              <dd className="mt-0.5 font-bold text-[#1A1A14]">
                {money(rate.price * TOLA_GRAMS)}
              </dd>
            </div>
            <div>
              <dt className="text-[#8A8678]">{t("perOunce")}</dt>
              <dd className="mt-0.5 font-bold text-[#1A1A14]">
                {money(rate.price * TROY_OUNCE_GRAMS)}
              </dd>
            </div>
          </dl>
        </li>
      ))}
    </ul>
  );
}

function PriceChart() {
  const locale = useLocale();
  const t = useTranslations("MetalPrices");
  const [metal] = useMetal();
  const money = useMoney();
  const [range, setRange] = useState<ChartRange>("1m");
  const top = metalRates[metal][0];

  const { path, area, min, max, change } = useMemo(() => {
    const data = priceHistory(metal, range, top.price);
    const lo = Math.min(...data);
    const hi = Math.max(...data);
    const w = 600;
    const h = 200;
    const pad = 8;
    const pts = data.map((v, i) => [
      (i / (data.length - 1)) * w,
      pad + (1 - (v - lo) / (hi - lo || 1)) * (h - pad * 2),
    ]);
    const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
    return {
      path: d,
      area: `${d} L${w},${h} L0,${h} Z`,
      min: lo,
      max: hi,
      change: ((data[data.length - 1] - data[0]) / data[0]) * 100,
    };
  }, [metal, range, top.price]);

  return (
    <div className="rounded-2xl border border-[rgba(27,107,74,0.1)] bg-white p-5 shadow-sm md:p-6">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2
            className={cn(
              headingFont(locale),
              "text-xl font-bold text-[#1A1A14]",
            )}
          >
            {t("chart.title")}
          </h2>
          <p className="mt-1 text-xs text-[#8A8678]">
            {t("chart.subtitle", { metal: t(`metals.${metal}`), karat: top.label })}
          </p>
        </div>
        <div
          role="group"
          aria-label={t("chart.rangeLabel")}
          className="inline-flex self-start rounded-lg border border-[rgba(27,107,74,0.15)] p-0.5"
        >
          {chartRanges.map((r) => (
            <button
              key={r}
              type="button"
              aria-pressed={range === r}
              onClick={() => setRange(r)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-bold transition-colors",
                range === r
                  ? "bg-[#1B6B4A] text-[#FAF6EF]"
                  : "text-[#4A4840] hover:text-[#1B6B4A]",
              )}
            >
              {t(`chart.ranges.${r}`)}
            </button>
          ))}
        </div>
      </div>

      <svg
        viewBox="0 0 600 200"
        preserveAspectRatio="none"
        className="h-56 w-full"
        role="img"
        aria-label={t("chart.title")}
      >
        <defs>
          <linearGradient id="mp-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#C9A445" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#C9A445" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((y) => (
          <line
            key={y}
            x1="0"
            x2="600"
            y1={200 * y}
            y2={200 * y}
            stroke="rgba(27,107,74,0.08)"
            strokeDasharray="4 4"
          />
        ))}
        <path d={area} fill="url(#mp-area)" />
        <path
          d={path}
          fill="none"
          stroke="#1B6B4A"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          strokeLinejoin="round"
        />
      </svg>

      <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-[rgba(27,107,74,0.08)] pt-4 text-xs">
        <div>
          <dt className="text-[#8A8678]">
            {t("chart.change", { range: t(`chart.ranges.${range}`) })}
          </dt>
          <dd className="mt-0.5">
            <Change value={change} />
          </dd>
        </div>
        <div>
          <dt className="text-[#8A8678]">{t("chart.low")}</dt>
          <dd className="mt-0.5 font-bold text-[#1A1A14]">{money(min)}</dd>
        </div>
        <div>
          <dt className="text-[#8A8678]">{t("chart.high")}</dt>
          <dd className="mt-0.5 font-bold text-[#1A1A14]">{money(max)}</dd>
        </div>
      </dl>
    </div>
  );
}

function ConversionTable() {
  const locale = useLocale();
  const t = useTranslations("MetalPrices");
  const [metal] = useMetal();
  const money = useMoney();
  const rates = metalRates[metal].slice(0, 4);

  return (
    <div className="rounded-2xl border border-[rgba(27,107,74,0.1)] bg-white p-5 shadow-sm md:p-6">
      <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#1B6B4A]">
        {t("conversion.eyebrow")}
      </p>
      <h2
        className={cn(headingFont(locale), "text-xl font-bold text-[#1A1A14]")}
      >
        {t("conversion.title")}
      </h2>
      <p className="mt-1 text-xs text-[#8A8678]">
        {t("conversion.subtitle", { metal: t(`metals.${metal}`) })}
      </p>

      <div className="-mx-5 mt-5 overflow-x-auto px-5 md:-mx-6 md:px-6">
        <table className="w-full min-w-120 text-sm">
          <thead>
            <tr className="border-b border-[rgba(27,107,74,0.1)] text-[11px] uppercase tracking-wider text-[#8A8678]">
              <th scope="col" className="py-2.5 text-start font-bold">
                {t("conversion.weight")}
              </th>
              {rates.map((r) => (
                <th key={r.label} scope="col" className="py-2.5 text-end font-bold">
                  {r.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weightUnits.map((unit) => (
              <tr
                key={unit.key}
                className="border-b border-[rgba(27,107,74,0.06)] last:border-0"
              >
                <th scope="row" className="py-3 text-start font-semibold text-[#1A1A14]">
                  {t(`conversion.units.${unit.key}`)}
                </th>
                {rates.map((r) => (
                  <td key={r.label} className="py-3 text-end text-[#4A4840]">
                    {money(r.price * unit.grams)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-[11px] text-[#8A8678]">{t("conversion.note")}</p>
    </div>
  );
}

export default function PricesBoard() {
  return (
    <>
      <section className="pb-6 pt-10">
        <MetalTabs />
      </section>

      <section className="pb-10">
        <RateCards />
      </section>

      <section className="grid gap-5 pb-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <PriceChart />
        </div>
        <div className="lg:col-span-2">
          <ConversionTable />
        </div>
      </section>
    </>
  );
}
