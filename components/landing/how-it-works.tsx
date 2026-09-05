import Title from "../reusable/title";
import EyeBrow from "../reusable/eye-brow";
import HowItWorksTabs from "./how-it-works-tabs";
import { getLocale, getTranslations } from "next-intl/server";

const buyerSteps = ["browse", "connect", "complete"] as const;
const sellerSteps = ["post", "offers", "close"] as const;

export default async function HowItWorks() {
  const locale = await getLocale();
  const t = await getTranslations("Home.howItWorks");
  const fontClass = locale === "en" ? "font-playfair" : "";

  const buyers = buyerSteps.map((step) => ({
    key: step,
    badge: t(`buyers.steps.${step}.badge`),
    title: t(`buyers.steps.${step}.title`),
    description: t(`buyers.steps.${step}.description`),
  }));

  const sellers = sellerSteps.map((step) => ({
    key: step,
    badge: t(`sellers.steps.${step}.badge`),
    title: t(`sellers.steps.${step}.title`),
    description: t(`sellers.steps.${step}.description`),
  }));

  return (
    <section className="relative overflow-hidden bg-background py-20 text-card-foreground lg:py-24">
      <div className="container max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-primary/60" />
            <EyeBrow className="text-xs text-primary">{t("eyebrow")}</EyeBrow>
            <span className="h-px w-12 bg-primary/60" />
          </div>

          <Title className={`text-4xl md:text-5xl ${fontClass}`}>
            {t("title")}{" "}
            <span className="gold-text">{t("titleHighlight")}</span>
          </Title>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#f5f0e8a6]">
            {t("description")}
          </p>
        </div>

        <HowItWorksTabs
          fontClass={fontClass}
          translations={{
            buyers: t("tabs.buyers"),
            sellers: t("tabs.sellers"),
          }}
          buyers={{
            steps: buyers,
            ctaTitle: t("buyers.cta.title"),
            ctaDescription: t("buyers.cta.description"),
            ctaLabel: t("buyers.cta.label"),
          }}
          sellers={{
            steps: sellers,
            ctaTitle: t("sellers.cta.title"),
            ctaDescription: t("sellers.cta.description"),
            ctaLabel: t("sellers.cta.label"),
          }}
        />
      </div>
    </section>
  );
}
