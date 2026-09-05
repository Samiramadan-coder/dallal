import Title from "../reusable/title";
import { Calculator } from "lucide-react";
import EyeBrow from "../reusable/eye-brow";
import GoldCalculator from "./gold-calculator";
import { getLocale, getTranslations } from "next-intl/server";

export default async function GoldCalculatorPreview() {
  const locale = await getLocale();
  const t = await getTranslations("Home.calculator");
  const fontClass = locale === "en" ? "font-playfair" : "";

  return (
    <section className="relative overflow-hidden bg-[#050f0a] py-24 text-card-foreground lg:py-32">
      <div className="container max-w-350">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <div className="flex items-center gap-2 rounded-full border border-primary/30 px-4 py-2">
              <Calculator className="size-3.5 text-primary" />
              <EyeBrow className="text-[10px] text-primary">
                {t("eyebrow")}
              </EyeBrow>
            </div>
          </div>

          <Title
            className={`
              mt-6
              text-4xl
              font-bold
              text-card-foreground
              md:text-5xl
              ${fontClass}
            `}
          >
            {t("title")}{" "}
            <span className="gold-text">{t("titleHighlight")}</span>
          </Title>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </div>

        <GoldCalculator
          fontClass={fontClass}
          // translations={{
          //   weight: t("weight"),
          //   grams: t("units.grams"),
          //   tola: t("units.tola"),

          //   karat: t("karat"),
          //   makingCharges: t("makingCharges"),

          //   pureGold: t("karats.24k"),
          //   highKarat: t("karats.22k"),
          //   gulfStandard: t("karats.21k"),
          //   fashionGold: t("karats.18k"),

          //   liveRate: t("results.liveRate"),
          //   goldValue: t("results.goldValue"),
          //   makingChargesValue: t("results.makingCharges"),
          //   total: t("results.total"),
          //   fairPrice: t("results.fairPrice"),
          //   info: t("results.info"),

          //   findListings: t("actions.findListings"),
          //   openCalculator: t("actions.openCalculator"),
          //   currency: t("currency"),
          // }}
        />
      </div>
    </section>
  );
}
