import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

const goldRates = [
  {
    karat: "24K",
    purity: "99.9%",
    price: "243.50",
    change: "+1.2%",
  },
  {
    karat: "22K",
    purity: "91.6%",
    price: "223.20",
    change: "+1.1%",
  },
  {
    karat: "21K",
    purity: "87.5%",
    price: "213.05",
    change: "+1.0%",
  },
  {
    karat: "18K",
    purity: "75.0%",
    price: "182.62",
    change: "+0.9%",
  },
] as const;

export default async function Prices() {
  const locale = await getLocale();
  const t = await getTranslations("About.prices");
  const fontClass = locale === "en" ? "font-playfair" : "";

  return (
    <section className="bg-card-foreground py-20 text-foreground lg:py-28">
      <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1fr] lg:gap-20 container max-w-350">
        <div className="max-w-142.5">
          <div className="inline-flex items-center rounded-full border border-primary/25 bg-primary/6 px-4 py-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
              {t("eyebrow")}
            </span>
          </div>
          <h2
            className={`mt-6 max-w-130 text-4xl font-bold leading-[1.1] tracking-[-0.035em] lg:text-5xl ${fontClass}`}
          >
            {t("title")}
            <br />
            <span className="italic text-primary">{t("titleHighlight")}</span>
          </h2>
          <p className="mt-6 max-w-140 text-base leading-relaxed text-[#4A4840] sm:text-lg sm:leading-8">
            {t("description")}
          </p>

          <div className="mt-10 overflow-hidden rounded-xl border border-primary/20 bg-white shadow-[0_14px_40px_rgba(7,30,20,0.04)]">
            <div className="flex items-center justify-between bg-background px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-accent" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E8D5A0]">
                  {t("rates.title")}
                </span>
              </div>
              <span className="text-[11px] text-muted-foreground">
                {t("rates.unit")}
              </span>
            </div>

            {/* Rates */}
            <div>
              {goldRates.map((rate) => (
                <div
                  key={rate.karat}
                  className="
                    grid
                    grid-cols-[auto_1fr_auto]
                    items-center
                    gap-4
                    border-b
                    border-border/70
                    px-5
                    py-4
                    last:border-b-0
                  "
                >
                  {/* Karat */}
                  <div className="flex size-9 items-center justify-center rounded-lg bg-[linear-gradient(135deg,rgb(201,164,69),rgb(232,213,160))] text-xs font-bold text-primary-foreground">
                    {rate.karat}
                  </div>

                  {/* Gold info */}
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {t("rates.gold", {
                        karat: rate.karat,
                      })}
                    </p>

                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                      {t("rates.purity", {
                        purity: rate.purity,
                      })}
                    </p>
                  </div>

                  <div className="text-end">
                    <p className="text-sm font-bold text-foreground sm:text-base">
                      {t("rates.currency")} {rate.price}
                    </p>

                    <div className="mt-0.5 flex items-center justify-end gap-1 text-[10px] font-semibold text-accent">
                      <ArrowUpRight className="size-3" />

                      {rate.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border/50 bg-[#faf6ef] px-4 py-3 text-center">
              <p className="text-[9px] tracking-wide text-muted-foreground">
                {t("rates.footer")}
              </p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-142.5 lg:mx-0 lg:ms-auto">
          <div
            aria-hidden="true"
            className="absolute -inset-e-4 -top-4 size-full rounded-[18px] border border-primary/25"
          />
          <div className="relative aspect-square overflow-hidden rounded-[16px]">
            <Image
              src="/about-prices.png"
              alt={t("imageAlt")}
              fill
              sizes="(max-width: 1024px) 100vw, 570px"
              className="object-cover transition-transform duration-700 hover:scale-[1.02]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-background/5"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
