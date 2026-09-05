import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import Title from "../reusable/title";
import { Link } from "@/i18n/navigation";
import EyeBrow from "../reusable/eye-brow";
import { Separator } from "../ui/separator";
import { Button } from "@/components/ui/button";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight, RefreshCw, TrendingUp } from "lucide-react";

const goldRates = [
  {
    key: "24k",
    purity: "99.9%",
    price: "243.50",
    change: "+1.2%",
    changeValue: "+2.88 AED",
    tola: "2,840.75",
  },
  {
    key: "22k",
    purity: "91.6%",
    price: "223.20",
    change: "+1.1%",
    changeValue: "+2.64 AED",
    tola: "2,604.70",
  },
  {
    key: "21k",
    purity: "87.5%",
    price: "213.05",
    change: "+1.0%",
    changeValue: "+2.13 AED",
    tola: "2,486.10",
  },
  {
    key: "18k",
    purity: "75.0%",
    price: "182.62",
    change: "+0.9%",
    changeValue: "+1.82 AED",
    tola: "2,131.40",
  },
] as const;

export default async function GoldPrices() {
  const locale = await getLocale();
  const t = await getTranslations("Home.goldPrices");
  const fontClass = locale === "en" ? "font-playfair" : "";

  return (
    <section className="relative overflow-hidden bg-background py-20 text-card-foreground lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_800px_400px_at_50%_0%,rgba(42,138,95,0.06),transparent)]"></div>

      <div className="container relative z-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8 lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#3DAF77]" />
              <EyeBrow className="text-xs text-[#3DAF77]">
                {t("eyebrow")}
              </EyeBrow>
            </div>
            <Title className="text-4xl md:text-5xl">
              {t("title")}{" "}
              <span className="gold-text">{t("titleHighlight")}</span>
            </Title>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
          </div>

          <div className="flex items-center gap-5">
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="h-auto gap-2 px-0 text-xs font-medium uppercase tracking-wider text-muted-foreground hover:bg-transparent hover:text-primary"
            >
              <RefreshCw className="size-3.5" />
              {t("refresh")}
            </Button>

            <Link
              href="/gold-prices"
              className="group flex items-center gap-2 text-sm font-semibold text-primary"
            >
              {t("viewChart")}

              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {goldRates.map((rate) => (
            <Card
              key={rate.key}
              className="group p-6 gap-0 ring-0! border border-[#c9a4452e] transition-all duration-300 hover:-translate-y-1"
            >
              {/* Top */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3
                    className={`text-3xl font-bold leading-none text-primary ${fontClass}`}
                  >
                    {t(`rates.${rate.key}.karat`)}
                  </h3>
                  <p className="mt-2 text-xs uppercase tracking-wide text-muted-foreground">
                    {t(`rates.${rate.key}.type`)}
                  </p>
                </div>

                <Badge className="h-6 border-primary/25 bg-primary/10 text-[10px] font-semibold text-primary">
                  {rate.purity}
                </Badge>
              </div>

              <div className="mt-7">
                <p
                  className={`text-2xl font-bold text-card-foreground ${fontClass}`}
                >
                  {t("currency")} {rate.price}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t("perGram")}
                </p>
              </div>

              {/* Change */}
              <div className="mt-5 flex items-center gap-2">
                <TrendingUp className="size-4 text-[#3DAF77]" />
                <span className="text-sm font-semibold text-[#3DAF77]">
                  {rate.change}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({rate.changeValue})
                </span>
              </div>

              {/* Divider */}
              <Separator className="my-5 bg-[#c9a4451f]" />

              {/* Tola */}
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs text-muted-foreground">
                  {t("perTola")}
                </span>
                <span className="text-xs font-semibold text-[#f5f0e88c]">
                  {t("currency")} {rate.tola}
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom Bar */}
        <Card className="mt-10 flex-col ring-0! border border-primary/15 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3 sm:items-center">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary sm:mt-0" />
            <p className="text-sm text-muted-foreground">{t("source")}</p>
          </div>

          <Link
            href="/gold-calculator"
            className="group flex shrink-0 items-center gap-2 text-sm font-semibold text-primary"
          >
            {t("calculator")}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
          </Link>
        </Card>
      </div>
    </section>
  );
}
