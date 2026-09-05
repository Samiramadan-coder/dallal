"use client";

import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ArrowRight, Info, Scale, TrendingUp } from "lucide-react";

const TOLA_IN_GRAMS = 11.6638;
const BASE_24K_RATE = 243.5;

const karats = [
  {
    key: "24k",
    karat: 24,
    purity: 99.9,
  },
  {
    key: "22k",
    karat: 22,
    purity: 91.6,
  },
  {
    key: "21k",
    karat: 21,
    purity: 87.5,
  },
  {
    key: "18k",
    karat: 18,
    purity: 75,
  },
] as const;

const quickWeights = [5, 10, 15, 20, 50];

type Unit = "grams" | "tola";

type Props = {
  fontClass?: string;
};

export default function GoldCalculator({ fontClass }: Props) {
  const [unit, setUnit] = useState<Unit>("tola");
  const [weight, setWeight] = useState(5);
  const [selectedKarat, setSelectedKarat] = useState(24);
  const [makingCharges, setMakingCharges] = useState(0);
  const t = useTranslations("Home.calculator");

  const selectedGold = karats.find((item) => item.karat === selectedKarat)!;

  const values = useMemo(() => {
    const weightInGrams = unit === "tola" ? weight * TOLA_IN_GRAMS : weight;

    const purityFactor = selectedGold.purity / 99.9;

    const rate = BASE_24K_RATE * purityFactor;

    const goldValue = weightInGrams * rate;

    const makingChargesValue = goldValue * (makingCharges / 100);

    const total = goldValue + makingChargesValue;

    return {
      weightInGrams,
      rate,
      goldValue,
      makingChargesValue,
      total,
    };
  }, [unit, weight, selectedGold.purity, makingCharges]);

  const formatMoney = (value: number) =>
    new Intl.NumberFormat("en-AE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

  return (
    <div
      className="
        mt-16
        overflow-hidden
        rounded-2xl
        border
        border-primary/20
        bg-[linear-gradient(145deg,rgb(13,61,36)_0%,rgb(7,30,20)_60%)]
        shadow-[0_40px_100px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(201,164,69,0.12)]
      "
    >
      <div className="grid lg:grid-cols-[1.45fr_0.95fr]">
        <div className="p-7 sm:p-10 lg:p-12">
          <div>
            <div className="flex items-center justify-between gap-5">
              <label className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
                {t("weight")}
              </label>

              <div className="flex overflow-hidden rounded-md border border-primary/30">
                <button
                  type="button"
                  onClick={() => setUnit("grams")}
                  className={cn(
                    "px-4 py-2 text-[11px] font-semibold transition-colors",
                    unit === "grams"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {t("units.grams")}
                </button>

                <button
                  type="button"
                  onClick={() => setUnit("tola")}
                  className={cn(
                    "px-4 py-2 text-[11px] font-semibold transition-colors",
                    unit === "tola"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {t("units.tola")}
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {quickWeights.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setWeight(value);
                    setUnit("grams");
                  }}
                  className="
                    rounded-full
                    border
                    border-primary/20
                    px-3
                    py-1.5
                    text-[11px]
                    text-muted-foreground
                    transition-colors
                    hover:border-primary/50
                    hover:text-primary
                  "
                >
                  {value}g
                </button>
              ))}
            </div>

            {/* Weight input */}
            <div className="relative mt-3">
              <Input
                type="number"
                min={0}
                value={weight}
                onChange={(e) => setWeight(Math.max(0, Number(e.target.value)))}
                className="
                  h-14
                  rounded-lg
                  border-primary/20
                  bg-secondary/40
                  pe-16
                  text-xl
                  font-semibold
                  text-card-foreground
                  focus-visible:border-primary
                  focus-visible:ring-0
                "
              />

              <span className="pointer-events-none absolute inset-e-5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                {unit === "grams" ? t("units.grams") : t("units.tola")}
              </span>
            </div>
          </div>

          {/* Karat */}
          <div className="mt-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              {t("karat")}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {karats.map((item) => {
                const active = selectedKarat === item.karat;

                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setSelectedKarat(item.karat)}
                    className={cn(
                      "rounded-xl border px-4 py-5 text-center transition-all duration-200",
                      active
                        ? "bg-primary border-primary text-primary-foreground shadow-[0_8px_25px_rgba(201,164,69,0.18)]"
                        : "border-primary/20 bg-secondary/30 text-card-foreground hover:border-primary/50",
                    )}
                  >
                    <p className="text-lg font-bold">{item.karat}K</p>

                    <p
                      className={cn(
                        "mt-1 text-[10px]",
                        active
                          ? "text-primary-foreground/60"
                          : "text-muted-foreground",
                      )}
                    >
                      {item.purity}%
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Making charges */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                {t("makingCharges")}
              </p>

              <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                {makingCharges}%
              </span>
            </div>

            <Slider
              value={[makingCharges]}
              onValueChange={([value]) => setMakingCharges(value)}
              min={0}
              max={25}
              step={1}
              className="mt-5"
            />

            <div className="mt-2 flex justify-between text-[9px] text-muted-foreground">
              {[0, 5, 10, 15, 20, 25].map((value) => (
                <span key={value}>{value}%</span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-primary/15 bg-background/30 p-7 sm:p-10 lg:border-s lg:border-t-0 lg:p-12">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#3DAF77]">
            <span className="size-2 rounded-full bg-[#43c78a]" />
            {t("results.liveRate")} — {t("currency")} {values.rate.toFixed(2)}/G
            ({selectedKarat}K)
          </div>

          {/* Result rows */}
          <div className="mt-7 space-y-4">
            <ResultRow
              icon={Scale}
              label={t("results.goldValue")}
              value={`${t("currency")} ${formatMoney(values.goldValue)}`}
            />

            <ResultRow
              icon={TrendingUp}
              label={t("results.makingCharges")}
              value={`${t("currency")} ${formatMoney(values.makingChargesValue)}`}
            />
          </div>

          {/* Total */}
          <div className="mt-7 rounded-xl border border-primary/35 bg-[linear-gradient(135deg,rgba(201,164,69,0.12),rgba(201,164,69,0.06))] p-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-card-foreground/50">
              {t("results.total")}
            </p>
            <p
              className={cn("mt-3 text-4xl font-bold text-primary", fontClass)}
            >
              {t("currency")} {formatMoney(values.total)}
            </p>
            <p className="mt-2 text-xs text-[#4A4840]">
              {values.weightInGrams.toFixed(2)}g · {selectedKarat}K ·{" "}
              {t("currency")} {values.rate.toFixed(2)}/g
            </p>
          </div>

          {/* Fair price */}
          <div className="mt-5 flex items-start gap-2 text-xs leading-5">
            <TrendingUp className="mt-0.5 size-3 shrink-0 text-[#3DAF77]" />
            <p className="text-[#4A4840]">{t("results.fairPrice")}</p>
          </div>

          {/* Info */}
          <div className="mt-5 flex items-start gap-3 rounded-lg border border-primary/15 px-4 py-3">
            <Info className="mt-0.5 size-4 shrink-0 text-primary" />
            <p className="text-[10px] leading-5 text-[#4A4840]">
              {t("results.info")}
            </p>
          </div>

          {/* Actions */}
          <Button
            asChild
            className="
              bg-[linear-gradient(135deg,rgb(201,164,69)_0%,rgb(232,213,160)_50%,rgb(201,164,69)_100%)]
              mt-6
              h-12
              w-full
              rounded-lg
              text-xs
              font-bold
              uppercase
              tracking-widest
              text-primary-foreground
              hover:opacity-90
            "
          >
            <Link href={`/listings?karat=${selectedKarat}`}>
              {t("actions.findListings")}
              <ArrowRight className="ms-2 size-4 rtl:rotate-180" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="
              mt-3
              h-11
              w-full
              rounded-lg
              border-primary/30
              bg-transparent
              text-[10px]
              font-bold
              uppercase
              tracking-widest
              text-primary
              hover:bg-primary/10
              hover:text-primary
            "
          >
            <Link href="/gold-calculator">
              {t("actions.openCalculator")}

              <ArrowRight className="ms-2 size-4 rtl:rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function ResultRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Scale;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-primary/15 px-4 py-4">
      <div className="flex items-center gap-3">
        <Icon className="size-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <span className="text-sm font-bold text-card-foreground">{value}</span>
    </div>
  );
}
