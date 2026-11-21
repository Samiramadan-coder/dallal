"use client";

import {
  planCardFeatures,
  planPrices,
  YEARLY_SAVING_PERCENT,
  type PaidPlan,
} from "@/constants/packages";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useFeatureText } from "./feature-value";
import { useLocale, useTranslations } from "next-intl";
import { headingFont } from "@/constants/marketplace";

type Period = "monthly" | "yearly";

export default function Pricing() {
  const locale = useLocale();
  const t = useTranslations("Packages");
  const text = useFeatureText();
  const [period, setPeriod] = useState<Period>("monthly");
  const font = headingFont(locale);

  const monthly = (plan: PaidPlan) =>
    period === "monthly"
      ? planPrices[plan]
      : Math.round(planPrices[plan] * (1 - YEARLY_SAVING_PERCENT / 100));
  const yearlyTotal = (plan: PaidPlan) =>
    Math.round(planPrices[plan] * 12 * (1 - YEARLY_SAVING_PERCENT / 100));

  return (
    <div className="bg-[#FAF6EF] pb-16 pt-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex items-center justify-center">
          <div
            role="radiogroup"
            aria-label={t("billing.label")}
            className="inline-flex items-center rounded-full bg-white p-1 shadow-sm ring-1 ring-[rgba(27,107,74,0.12)]"
          >
            {(["monthly", "yearly"] as const).map((p) => (
              <button
                key={p}
                type="button"
                role="radio"
                aria-checked={period === p}
                onClick={() => setPeriod(p)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A445]",
                  period === p
                    ? "bg-[#0F4A31] text-[#FAF6EF]"
                    : "text-[#6B6858] hover:text-[#1A1A14]",
                )}
              >
                {t(`billing.${p}`)}
                {p === "yearly" && (
                  <span className="rounded-full bg-[#C9A445] px-2 py-0.5 text-[10px] font-bold text-[#071E14]">
                    {t("billing.save", { value: YEARLY_SAVING_PERCENT })}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          {(["gold", "vip"] as const).map((plan) => {
            const dark = plan === "gold";
            return (
              <div
                key={plan}
                className={cn(
                  "relative flex flex-col rounded-2xl",
                  dark
                    ? "border-2 border-[#C9A445] bg-[#0F4A31] shadow-[0_0_48px_rgba(201,164,69,0.25)]"
                    : "border border-[rgba(27,107,74,0.15)] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.04)]",
                )}
              >
                <span
                  className={cn(
                    "absolute -top-3.5 start-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1 text-[11px] font-bold uppercase tracking-wider rtl:translate-x-1/2",
                    dark
                      ? "bg-[#C9A445] text-[#071E14]"
                      : "bg-[#0F4A31] text-[#E8D5A0]",
                  )}
                >
                  {t(`plans.${plan}.badge`)}
                </span>

                <div className="p-7 pb-5">
                  <h3
                    className={cn(
                      font,
                      "text-2xl font-bold",
                      dark ? "text-[#FAF6EF]" : "text-[#1A1A14]",
                    )}
                  >
                    {t(`plans.${plan}.name`)}
                  </h3>
                  <p
                    className={cn(
                      "mt-1 text-sm",
                      dark ? "text-[rgba(245,240,232,0.6)]" : "text-[#8A8678]",
                    )}
                  >
                    {t(`plans.${plan}.who`)}
                  </p>

                  <div className="mt-6 flex items-baseline gap-1.5">
                    <span
                      className={cn(
                        "text-sm",
                        dark ? "text-[rgba(245,240,232,0.6)]" : "text-[#8A8678]",
                      )}
                    >
                      {t("billing.currency")}
                    </span>
                    <span
                      className={cn(
                        font,
                        "text-5xl font-bold leading-none",
                        dark ? "text-[#E8D5A0]" : "text-[#1A1A14]",
                      )}
                    >
                      {monthly(plan)}
                    </span>
                    <span
                      className={cn(
                        "text-sm",
                        dark ? "text-[rgba(245,240,232,0.6)]" : "text-[#8A8678]",
                      )}
                    >
                      {t("billing.perMonth")}
                    </span>
                  </div>
                  <p
                    className={cn(
                      "mt-2 min-h-5 text-xs",
                      dark ? "text-[rgba(245,240,232,0.55)]" : "text-[#8A8678]",
                    )}
                  >
                    {period === "monthly"
                      ? t("billing.billedMonthly")
                      : t("billing.billedYearly", {
                          value: yearlyTotal(plan).toLocaleString("en-US"),
                        })}
                  </p>

                  <Link
                    href="/store/open"
                    className={cn(
                      "mt-6 block w-full rounded-xl py-3 text-center text-sm font-bold transition-colors",
                      dark
                        ? "bg-[#C9A445] text-[#071E14] hover:bg-[#E8D5A0]"
                        : "bg-[#1B6B4A] text-white hover:bg-[#0F4A31]",
                    )}
                  >
                    {t(`plans.${plan}.cta`)}
                  </Link>
                </div>

                <ul
                  className={cn(
                    "flex flex-col gap-2.5 border-t p-7 pt-5",
                    dark
                      ? "border-[rgba(255,255,255,0.1)]"
                      : "border-[rgba(27,107,74,0.1)]",
                  )}
                >
                  {planCardFeatures[plan].map(({ feature, value }) => {
                    const off = value === false;
                    return (
                      <li
                        key={feature}
                        className={cn(
                          "flex items-start gap-2.5 text-sm",
                          off && "opacity-45",
                        )}
                      >
                        {off ? (
                          <X
                            className={cn(
                              "mt-0.5 size-4 shrink-0",
                              dark ? "text-[rgba(245,240,232,0.5)]" : "text-[#8A8678]",
                            )}
                          />
                        ) : (
                          <Check
                            className={cn(
                              "mt-0.5 size-4 shrink-0",
                              dark ? "text-[#C9A445]" : "text-[#1B6B4A]",
                            )}
                          />
                        )}
                        <span
                          className={cn(
                            dark ? "text-[rgba(245,240,232,0.85)]" : "text-[#4A4840]",
                            off && "line-through",
                          )}
                        >
                          {t(`features.${feature}`)}
                          {typeof value !== "boolean" && (
                            <>
                              {" "}
                              <span
                                className={cn(
                                  "font-semibold",
                                  dark ? "text-[#E8D5A0]" : "text-[#1A1A14]",
                                )}
                              >
                                {text(value)}
                              </span>
                            </>
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
