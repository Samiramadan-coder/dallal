import { getTranslations } from "next-intl/server";

import PricingCards from "./pricing-cards";

const plans = [
  {
    key: "free",
    monthlyPrice: 0,
    annualPrice: 0,
    annualTotal: 0,
    popular: false,
    bestValue: false,
  },
  {
    key: "silver",
    monthlyPrice: 49,
    annualPrice: 39,
    annualTotal: 468,
    popular: false,
    bestValue: false,
  },
  {
    key: "gold",
    monthlyPrice: 149,
    annualPrice: 119,
    annualTotal: 1428,
    popular: true,
    bestValue: false,
  },
  {
    key: "diamond",
    monthlyPrice: 399,
    annualPrice: 319,
    annualTotal: 3828,
    popular: false,
    bestValue: true,
  },
] as const;

const featureKeys = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
] as const;

export default async function Pricing() {
  const t = await getTranslations("ForSellers.pricing");

  const translatedPlans = plans.map((plan) => ({
    ...plan,

    name: t(`plans.${plan.key}.name`),

    description: t(`plans.${plan.key}.description`),

    cta: t(`plans.${plan.key}.cta`),

    annualBilling:
      plan.key === "free"
        ? ""
        : t("billedAnnually", {
            price: plan.annualTotal,
          }),

    features: featureKeys.map((featureKey) => ({
      label: t(`plans.${plan.key}.features.${featureKey}.label`),

      included:
        t(`plans.${plan.key}.features.${featureKey}.included`) === "true",

      highlight: t(`plans.${plan.key}.features.${featureKey}.highlight`),
    })),
  }));

  return (
    <section className="relative overflow-hidden bg-card-foreground py-16 text-foreground lg:py-20">
      <div className="relative z-10 container max-w-7xl">
        <PricingCards
          plans={translatedPlans}
          translations={{
            monthly: t("billing.monthly"),
            annual: t("billing.annual"),
            save: t("billing.save"),
            currency: t("currency"),
            month: t("month"),
            popular: t("popular"),
            bestValue: t("bestValue"),
          }}
        />
      </div>
    </section>
  );
}
