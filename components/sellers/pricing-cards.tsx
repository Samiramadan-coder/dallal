"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useLocale } from "next-intl";

type PlanKey = "free" | "silver" | "gold" | "diamond";

type Feature = {
  label: string;
  included: boolean;
  highlight: string;
};

type Plan = {
  key: PlanKey;
  monthlyPrice: number;
  annualPrice: number;
  annualTotal: number;
  popular: boolean;
  bestValue: boolean;
  name: string;
  description: string;
  cta: string;
  annualBilling: string;
  features: Feature[];
};

type PricingCardsProps = {
  plans: Plan[];
  translations: {
    monthly: string;
    annual: string;
    save: string;
    currency: string;
    month: string;
    popular: string;
    bestValue: string;
  };
};

export default function PricingCards({
  plans,
  translations: t,
}: PricingCardsProps) {
  const locale = useLocale();
  const [annual, setAnnual] = useState(false);
  const fontClass = locale === "en" ? "font-playfair" : "";

  return (
    <>
      {/* Billing period */}
      <div className="mb-12 flex items-center justify-center gap-4">
        <span
          className={[
            "text-sm transition-colors",
            !annual ? "font-semibold text-foreground" : "text-muted-foreground",
          ].join(" ")}
        >
          {t.monthly}
        </span>

        <Switch
          checked={annual}
          onCheckedChange={setAnnual}
          aria-label={`${t.monthly} / ${t.annual}`}
          className="   
            data-[state=checked]:bg-accent
            data-[state=unchecked]:bg-gray-200
          "
        />

        <span
          className={[
            "text-sm transition-colors",
            annual ? "font-semibold text-foreground" : "text-muted-foreground",
          ].join(" ")}
        >
          {t.annual}
        </span>

        <span
          className="
            rounded-full
            bg-accent/10
            px-3
            py-1
            text-[10px]
            font-semibold
            text-accent
          "
        >
          {t.save}
        </span>
      </div>

      {/* Pricing cards */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => {
          const isFree = plan.key === "free";
          const isGold = plan.key === "gold";
          const price = annual ? plan.annualPrice : plan.monthlyPrice;

          return (
            <article
              key={plan.key}
              className={[
                "group relative flex min-h-147.5 flex-col rounded-2xl border p-6",
                "transition-all duration-300",
                isGold
                  ? [
                      "border-2 border-primary",
                      "bg-card",
                      "text-card-foreground",
                      "shadow-[0_20px_60px_rgba(201,164,69,0.14)]",
                    ].join(" ")
                  : [
                      "border-border",
                      "bg-white",
                      "hover:border-accent/30",
                      "hover:shadow-[0_15px_40px_rgba(7,30,20,0.06)]",
                    ].join(" "),
              ].join(" ")}
            >
              {/* Most popular */}
              {plan.popular && (
                <div
                  className="
                    bg-primary
                    absolute
                    inset-s-1/2
                    top-0
                    -translate-x-1/2
                    -translate-y-1/2
                    whitespace-nowrap
                    rounded-full
                    px-5
                    py-1.5
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.08em]
                    text-primary-foreground
                  "
                >
                  {t.popular}
                </div>
              )}

              {/* Best value */}
              {plan.bestValue && (
                <div
                  className="
                    absolute
                    inset-s-1/2
                    top-0
                    -translate-x-1/2
                    -translate-y-1/2
                    whitespace-nowrap
                    rounded-full
                    bg-card
                    px-5
                    py-1.5
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.08em]
                    text-accent-foreground
                  "
                >
                  {t.bestValue}
                </div>
              )}

              {/* Plan info */}
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={[
                      "size-2.5 shrink-0 rounded-full",
                      plan.key === "free" ? "bg-[#979387]" : "",
                      plan.key === "silver" ? "bg-[#b5bbc3]" : "",
                      plan.key === "gold" ? "bg-primary" : "",
                      plan.key === "diamond" ? "bg-[#64d8e7]" : "",
                    ].join(" ")}
                  />

                  <h2 className={`${fontClass} text-lg font-bold`}>
                    {plan.name}
                  </h2>
                </div>

                <p
                  className={[
                    "mt-2 text-xs leading-5",
                    isGold
                      ? "text-card-foreground/55"
                      : "text-muted-foreground",
                  ].join(" ")}
                >
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mt-5">
                {isFree ? (
                  <p
                    className={[
                      `${fontClass} text-4xl font-bold`,
                      isGold ? "text-card-foreground" : "text-foreground",
                    ].join(" ")}
                  >
                    {plan.name}
                  </p>
                ) : (
                  <>
                    <div className="flex items-end gap-1">
                      <span
                        className={[
                          "mb-1 text-sm",
                          isGold
                            ? "text-card-foreground/55"
                            : "text-muted-foreground",
                        ].join(" ")}
                      >
                        {t.currency}
                      </span>

                      <span
                        className={[
                          "font-serif text-4xl font-semibold leading-none",
                          isGold ? "gold-text" : "text-foreground",
                        ].join(" ")}
                      >
                        {price}
                      </span>

                      <span
                        className={[
                          "mb-1 text-sm",
                          isGold
                            ? "text-card-foreground/50"
                            : "text-muted-foreground",
                        ].join(" ")}
                      >
                        /{t.month}
                      </span>
                    </div>

                    {annual && (
                      <p
                        className={[
                          "mt-2 text-[10px] font-medium",
                          isGold ? "text-primary" : "text-accent",
                        ].join(" ")}
                      >
                        {plan.annualBilling}
                      </p>
                    )}
                  </>
                )}
              </div>

              {/* Features */}
              <ul className="mt-4 flex-1 space-y-3">
                {plan.features.map((feature, index) => (
                  <li
                    key={`${plan.key}-${index}`}
                    className="flex items-start gap-2.5"
                  >
                    {feature.included ? (
                      <Check
                        className={[
                          "mt-0.5 size-3.5 shrink-0",
                          isGold ? "text-primary" : "text-accent",
                        ].join(" ")}
                        strokeWidth={1.8}
                      />
                    ) : (
                      <X
                        className={[
                          "mt-0.5 size-3.5 shrink-0",
                          isGold
                            ? "text-card-foreground/20"
                            : "text-muted-foreground/30",
                        ].join(" ")}
                        strokeWidth={1.5}
                      />
                    )}

                    <span
                      className={[
                        "text-xs leading-5",

                        feature.included
                          ? isGold
                            ? "text-card-foreground/75"
                            : "text-foreground/75"
                          : isGold
                            ? "text-card-foreground/25"
                            : "text-muted-foreground/40",
                      ].join(" ")}
                    >
                      {feature.label}

                      {feature.highlight && (
                        <span
                          className={[
                            "ms-1 font-semibold",

                            isGold ? "text-primary" : "text-accent",
                          ].join(" ")}
                        >
                          — {feature.highlight}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                className={[
                  "mt-8 h-11 w-full rounded-xl font-semibold",
                  isGold
                    ? [
                        "bg-primary",
                        "text-primary-foreground",
                        "hover:opacity-90",
                      ].join(" ")
                    : [
                        "bg-background",
                        "text-card-foreground",
                        "hover:bg-background/90",
                      ].join(" "),
                ].join(" ")}
              >
                {plan.cta}
              </Button>
            </article>
          );
        })}
      </div>
    </>
  );
}
