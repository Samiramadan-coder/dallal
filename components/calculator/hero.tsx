import { TrendingDown, TrendingUp } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import EyeBrow from "../reusable/eye-brow";
import Title from "../reusable/title";
import { cn } from "@/lib/utils";

const rates = [
  {
    key: "24k",
    price: "243.50",
    change: "+0.72%",
    positive: true,
  },
  {
    key: "22k",
    price: "223.20",
    change: "+0.72%",
    positive: true,
  },
  {
    key: "21k",
    price: "213.06",
    change: "+0.72%",
    positive: true,
  },
  {
    key: "18k",
    price: "182.62",
    change: "-0.26%",
    positive: false,
  },
] as const;

export default async function Hero() {
  const locale = await getLocale();
  const t = await getTranslations("Calculator.hero");

  const fontClass = locale === "en" ? "font-playfair" : "";

  return (
    <section className="relative overflow-hidden bg-background py-16 text-card-foreground lg:py-20 mt-30">
      {/* Grid background */}
      <div
        aria-hidden
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-25
          bg-[linear-gradient(to_right,rgba(201,164,69,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,164,69,0.06)_1px,transparent_1px)]
          bg-size-[40px_40px]
        "
      />

      <div className="container relative z-10 max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          {/* Content */}
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-primary/70" />
              <EyeBrow className="text-xs text-primary">{t("eyebrow")}</EyeBrow>
            </div>

            <Title
              className={cn(
                "mt-5 text-5xl font-bold leading-tight text-card-foreground lg:text-6xl",
                fontClass,
              )}
            >
              {t("title")}{" "}
              <span className="gold-text">{t("titleHighlight")}</span>
            </Title>

            <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#f5f0e88c]">
              {t("description")}
            </p>

            <div className="mt-8 flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#6dd98a]" />
              <p className="text-[10px] text-[#f5f0e859]">{t("liveStatus")}</p>
            </div>
          </div>

          {/* Rates */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4">
            {rates.map((rate) => (
              <article
                key={rate.key}
                className="
                  rounded-xl
                  border
                  border-primary/20
                  bg-card/20
                  px-4
                  py-4
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-primary/40
                  hover:bg-card/35
                "
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-bold text-primary">
                    {t(`rates.${rate.key}.label`)}
                  </span>

                  <span
                    className={cn(
                      "flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-semibold",
                      rate.positive
                        ? "bg-accent/15 text-[#58d58f]"
                        : "bg-destructive/15 text-destructive",
                    )}
                  >
                    {rate.positive ? (
                      <TrendingUp className="size-3" />
                    ) : (
                      <TrendingDown className="size-3" />
                    )}

                    {rate.change}
                  </span>
                </div>

                <p
                  className={cn(
                    "mt-1 text-xl font-bold text-card-foreground",
                    fontClass,
                  )}
                >
                  {rate.price}
                </p>

                <p className="mt-0.5 text-[9px] text-[#f5f0e859]">
                  {t("perGram")}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
