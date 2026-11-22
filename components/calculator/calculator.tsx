"use client";

import {
  ArrowLeftRight,
  Calculator as CalculatorIcon,
  Info,
  PlusCircle,
  Scale,
  Search,
  Store,
  Tag,
} from "lucide-react";
import {
  metalRates,
  metals,
  TOLA_GRAMS,
  TROY_OUNCE_GRAMS,
  type Metal,
  type MetalRate,
} from "@/constants/marketplace";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

type Mode = "value" | "sell" | "compare" | "converter";
type Unit = "g" | "tola" | "oz" | "kg";

const VAT = 0.05;
const unitGrams: Record<Unit, number> = {
  g: 1,
  tola: TOLA_GRAMS,
  oz: TROY_OUNCE_GRAMS,
  kg: 1000,
};
const quickWeights = [5, 10, 15, 20, 25, 50];
const makingTicks = [0, 5, 10, 15, 20, 25];

const modes: { key: Mode; icon: typeof CalculatorIcon }[] = [
  { key: "value", icon: CalculatorIcon },
  { key: "sell", icon: Store },
  { key: "compare", icon: Tag },
  { key: "converter", icon: ArrowLeftRight },
];

function useFormat() {
  const locale = useLocale();
  const currency = locale === "ar" ? "د.إ" : "AED";
  return {
    money: (v: number) => {
      const amount = v.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      return locale === "ar" ? `${amount} ${currency}` : `${currency} ${amount}`;
    },
    num: (v: number, digits = 3) =>
      v.toLocaleString("en-US", { maximumFractionDigits: digits }),
  };
}

function parse(value: string) {
  const n = Number(value);
  return value !== "" && Number.isFinite(n) && n >= 0 ? n : null;
}

/* ---------------------------------- Inputs --------------------------------- */

const labelClass =
  "block text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground";

function PurityPicker({
  metal,
  value,
  onChange,
}: {
  metal: Metal;
  value: string;
  onChange: (label: string) => void;
}) {
  const t = useTranslations("Calculator.form");
  const locale = useLocale();
  const { money } = useFormat();

  return (
    <div>
      <label className={cn(labelClass, "mb-4")}>{t(`purity.${metal}`)}</label>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {metalRates[metal].map((rate) => {
          const active = rate.label === value;
          return (
            <button
              key={rate.label}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(rate.label)}
              className={cn(
                "relative rounded-2xl p-4 text-center transition-all duration-200",
                active
                  ? "bg-background shadow-[0_8px_28px_color-mix(in_srgb,var(--background)_30%,transparent)]"
                  : "border-2 border-[rgba(27,107,74,0.12)] bg-white hover:border-[rgba(27,107,74,0.35)] hover:shadow-[0_4px_16px_rgba(27,107,74,0.08)]",
              )}
            >
              {active && (
                <div className="absolute inset-x-3 top-0 h-0.5 rounded-full bg-primary" />
              )}
              <div
                className={cn(
                  locale === "en" && "font-playfair",
                  "text-2xl font-bold",
                  active ? "text-[#E8D5A0]" : "text-[#1B6B4A]",
                )}
              >
                {rate.label}
              </div>
              <div
                className={cn(
                  "mt-1.5 text-[10px] font-semibold",
                  active ? "text-[rgba(232,213,160,0.6)]" : "text-muted-foreground",
                )}
              >
                {t("perGram", { price: money(rate.price) })}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function WeightInput({
  metal,
  unit,
  onUnit,
  value,
  onChange,
}: {
  metal: Metal;
  unit: Unit;
  onUnit: (u: Unit) => void;
  value: string;
  onChange: (v: string) => void;
}) {
  const t = useTranslations("Calculator");

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <label htmlFor="calc-weight" className={labelClass}>
          {t("form.weight")}
        </label>
        <div className="flex items-center rounded-full border border-[rgba(27,107,74,0.1)] bg-[#EDE9E0] p-1">
          {(Object.keys(unitGrams) as Unit[]).map((u) => (
            <button
              key={u}
              type="button"
              aria-pressed={unit === u}
              onClick={() => onUnit(u)}
              className={cn(
                "rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-wider transition-all duration-200",
                unit === u
                  ? "bg-[#1B6B4A] text-white shadow-sm"
                  : "text-muted-foreground hover:text-[#1B6B4A]",
              )}
            >
              {t(`form.units.${u}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        {quickWeights.map((w) => (
          <button
            key={w}
            type="button"
            onClick={() => onChange(String(w))}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-[10px] font-bold transition-all duration-150",
              value === String(w)
                ? "border-[#1B6B4A] bg-[#1B6B4A] text-white"
                : "border-[rgba(27,107,74,0.15)] bg-white text-[#4A4840] hover:border-[rgba(27,107,74,0.35)]",
            )}
          >
            {w} {t(`form.unitShort.${unit}`)}
          </button>
        ))}
      </div>

      <div className="relative">
        <input
          id="calc-weight"
          type="number"
          inputMode="decimal"
          min={0}
          step="any"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t("form.weightPlaceholder")}
          aria-label={t("form.weightLabel", {
            metal: t(`metals.${metal}`),
            unit: t(`form.units.${unit}`),
          })}
          className="w-full rounded-2xl border-2 border-[rgba(27,107,74,0.15)] bg-white px-5 py-4 pe-20 text-3xl font-bold text-foreground shadow-[0_2px_8px_rgba(0,0,0,0.04)] outline-none transition-all duration-200 placeholder:text-[#C4BFB6] focus:border-[#1B6B4A]"
        />
        <span className="absolute end-5 top-1/2 -translate-y-1/2 text-sm font-black uppercase tracking-wider text-muted-foreground">
          {t(`form.unitShort.${unit}`)}
        </span>
      </div>
    </div>
  );
}

function MakingSlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const t = useTranslations("Calculator.form");
  const locale = useLocale();
  const pct = (value / 25) * 100;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <label htmlFor="calc-making" className={labelClass}>
          {t("making")}
        </label>
        <span
          className={cn(
            locale === "en" && "font-playfair",
            "text-2xl font-bold text-[#1B6B4A]",
          )}
        >
          {value}%
        </span>
      </div>
      <input
        id="calc-making"
        type="range"
        min={0}
        max={25}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full accent-[#1B6B4A]"
        style={{
          background: `linear-gradient(to ${locale === "ar" ? "left" : "right"}, #1B6B4A ${pct}%, #E5E0D8 ${pct}%)`,
        }}
      />
      <div className="mt-2 flex justify-between px-0.5">
        {makingTicks.map((tick) => (
          <div key={tick} className="flex flex-col items-center">
            <div className="mb-1 h-1 w-px bg-[#C4BFB6]" />
            <span className="text-[10px] text-muted-foreground">{tick}%</span>
          </div>
        ))}
      </div>
      <p className="mt-1 text-center text-[10px] text-muted-foreground">
        {t("makingRange")} · {t("makingHint")}
      </p>
    </div>
  );
}

function VatToggle({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  const t = useTranslations("Calculator.form");

  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      onClick={() => onChange(!value)}
      className={cn(
        "flex w-full items-center justify-between rounded-2xl border-[1.5px] p-5 transition-all duration-200",
        value
          ? "border-[rgba(27,107,74,0.35)] bg-[rgba(27,107,74,0.04)]"
          : "border-[rgba(27,107,74,0.1)] bg-white",
      )}
    >
      <div className="text-start">
        <div className="text-sm font-bold text-foreground">{t("vat")}</div>
        <div className="mt-0.5 text-[10px] text-muted-foreground">{t("vatHint")}</div>
      </div>
      <div
        className={cn(
          "relative h-6 w-12 rounded-full transition-all duration-300",
          value ? "bg-[#1B6B4A]" : "bg-[#D4D0C8]",
        )}
      >
        <div
          className={cn(
            "absolute top-1 size-4 rounded-full bg-white shadow-sm transition-all duration-300",
            value ? "start-7" : "start-1",
          )}
        />
      </div>
    </button>
  );
}

/* ---------------------------------- Results -------------------------------- */

function ResultCard({
  title,
  amount,
  dim,
  children,
  actions,
}: {
  title: string;
  amount: string | null;
  dim: boolean;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  const locale = useLocale();

  return (
    <div
      className={cn(
        "overflow-hidden rounded-3xl border border-primary/20 transition-all duration-500",
        dim
          ? "opacity-70 shadow-[0_8px_24px_color-mix(in_srgb,var(--background)_8%,transparent)]"
          : "shadow-[0_16px_48px_color-mix(in_srgb,var(--background)_16%,transparent)]",
      )}
    >
      <div className="relative overflow-hidden bg-background px-7 pb-6 pt-7">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            background:
              "radial-gradient(ellipse at 80% 50%, var(--primary), transparent 65%)",
          }}
        />
        <p className="relative text-[10px] font-black uppercase tracking-[0.25em] text-primary/55">
          {title}
        </p>
        <div
          className={cn(
            locale === "en" && "font-playfair",
            "relative mt-2 text-4xl font-bold",
          )}
        >
          {amount ? (
            <span className="text-[#E8D5A0]">{amount}</span>
          ) : (
            <span className="text-[rgba(232,213,160,0.2)]">AED —.——</span>
          )}
        </div>
      </div>
      <div className="space-y-4 bg-white px-7 py-6">{children}</div>
      {actions && (
        <div className="space-y-3 border-t border-primary/12 bg-card-foreground px-7 py-5">
          {actions}
        </div>
      )}
    </div>
  );
}

function Row({
  label,
  hint,
  value,
}: {
  label: string;
  hint?: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <div className="text-xs font-bold text-[#4A4840]">{label}</div>
        {hint && <div className="text-[10px] text-muted-foreground">{hint}</div>}
      </div>
      <div className="shrink-0 text-sm font-bold text-foreground">{value}</div>
    </div>
  );
}

const primaryBtn =
  "flex w-full items-center justify-center gap-2 rounded-xl px-5 py-4 text-[11px] font-black uppercase tracking-widest text-white shadow-[0_4px_20px_rgba(27,107,74,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(27,107,74,0.4)] bg-[linear-gradient(135deg,#1B6B4A_0%,#0F4A31_100%)]";
const secondaryBtn =
  "flex w-full items-center justify-center gap-2 rounded-xl border-[1.5px] border-[rgba(27,107,74,0.3)] px-5 py-4 text-[11px] font-black uppercase tracking-widest text-[#1B6B4A] transition-all duration-200 hover:bg-[rgba(27,107,74,0.05)]";

/* ----------------------------------- Modes --------------------------------- */

type Shared = {
  metal: Metal;
  rate: MetalRate;
  purity: string;
  setPurity: (v: string) => void;
  unit: Unit;
  setUnit: (u: Unit) => void;
  weight: string;
  setWeight: (v: string) => void;
};

function RateFootnote({ metal, rate }: { metal: Metal; rate: MetalRate }) {
  const t = useTranslations("Calculator");
  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      <Info className="size-3 text-muted-foreground" />
      <p className="text-[10px] text-muted-foreground">
        {t("result.rate", {
          price: rate.price.toFixed(2),
          metal: t(`metals.${metal}`),
          purity: rate.label,
        })}
      </p>
    </div>
  );
}

function ValueMode(s: Shared) {
  const t = useTranslations("Calculator");
  const { money, num } = useFormat();
  const [making, setMaking] = useState(8);
  const [vat, setVat] = useState(false);

  const w = parse(s.weight);
  const grams = w != null ? w * unitGrams[s.unit] : null;
  const metalValue = grams != null ? grams * s.rate.price : null;
  const makingValue = metalValue != null ? (metalValue * making) / 100 : null;
  const subtotal =
    metalValue != null && makingValue != null ? metalValue + makingValue : null;
  const vatValue = subtotal != null && vat ? subtotal * VAT : 0;
  const total = subtotal != null ? subtotal + vatValue : null;
  const metalName = t(`metals.${s.metal}`);

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[1fr_380px]">
      <div className="space-y-8">
        <PurityPicker metal={s.metal} value={s.purity} onChange={s.setPurity} />
        <WeightInput
          metal={s.metal}
          unit={s.unit}
          onUnit={s.setUnit}
          value={s.weight}
          onChange={s.setWeight}
        />
        <MakingSlider value={making} onChange={setMaking} />
        <VatToggle value={vat} onChange={setVat} />
      </div>

      <div className="lg:sticky lg:top-37">
        <ResultCard
          title={t("result.estimated")}
          amount={total != null ? money(total) : null}
          dim={total == null}
          actions={
            <>
              <Link
                href={`/browse${total ? `?max_price=${Math.round(total)}` : ""}`}
                className={primaryBtn}
              >
                <Search className="size-4" />
                {t("result.findListings")}
              </Link>
              <Link href="/sell" className={secondaryBtn}>
                <PlusCircle className="size-4" />
                {t("result.postPiece")}
              </Link>
            </>
          }
        >
          <Row
            label={t("result.metalValue", { metal: metalName })}
            hint={t("result.metalValueHint", {
              weight: grams != null ? num(grams) : "—",
              price: money(s.rate.price),
            })}
            value={metalValue != null ? money(metalValue) : "—"}
          />
          <Row
            label={t("result.making")}
            hint={t("result.makingHint", { value: making, metal: metalName })}
            value={makingValue != null ? money(makingValue) : "—"}
          />
          {vat && (
            <Row
              label={t("result.vat")}
              hint={t("result.vatHint")}
              value={subtotal != null ? money(vatValue) : "—"}
            />
          )}
          <div className="h-px bg-primary/20" />
          <div className="flex items-center justify-between">
            <span className="text-sm font-black text-foreground">
              {t("result.total")}
            </span>
            <span className="text-2xl font-bold text-[#1B6B4A]">
              {total != null ? money(total) : "—"}
            </span>
          </div>
          <p className="border-t border-[rgba(27,107,74,0.06)] pt-1 text-[10px] leading-relaxed text-muted-foreground">
            {t("result.disclaimer")}
          </p>
        </ResultCard>
        <RateFootnote metal={s.metal} rate={s.rate} />
      </div>
    </div>
  );
}

function SellMode(s: Shared) {
  const t = useTranslations("Calculator");
  const { money, num } = useFormat();
  const w = parse(s.weight);
  const grams = w != null ? w * unitGrams[s.unit] : null;
  const value = grams != null ? grams * s.rate.price : null;
  const metalName = t(`metals.${s.metal}`);

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[1fr_380px]">
      <div className="space-y-8">
        <PurityPicker metal={s.metal} value={s.purity} onChange={s.setPurity} />
        <WeightInput
          metal={s.metal}
          unit={s.unit}
          onUnit={s.setUnit}
          value={s.weight}
          onChange={s.setWeight}
        />
        <p className="flex items-start gap-2 rounded-2xl border border-primary/30 bg-[#FBF6E9] p-4 text-xs leading-relaxed text-[#6B5E3C]">
          <Info className="mt-0.5 size-4 shrink-0" />
          {t("result.sellNote")}
        </p>
      </div>

      <div className="lg:sticky lg:top-37">
        <ResultCard
          title={t("result.sellValue")}
          amount={value != null ? money(value) : null}
          dim={value == null}
          actions={
            <Link href="/sell" className={primaryBtn}>
              <Store className="size-4" />
              {t("result.getOffers")}
            </Link>
          }
        >
          <Row
            label={t("result.metalValue", { metal: metalName })}
            hint={t("result.metalValueHint", {
              weight: grams != null ? num(grams) : "—",
              price: money(s.rate.price),
            })}
            value={value != null ? money(value) : "—"}
          />
          <Row
            label={t("result.making")}
            hint={t("result.sellHint", { metal: metalName })}
            value="0%"
          />
          <p className="border-t border-[rgba(27,107,74,0.06)] pt-1 text-[10px] leading-relaxed text-muted-foreground">
            {t("result.disclaimer")}
          </p>
        </ResultCard>
        <RateFootnote metal={s.metal} rate={s.rate} />
      </div>
    </div>
  );
}

function CompareMode(s: Shared) {
  const t = useTranslations("Calculator");
  const { money } = useFormat();
  const [asking, setAsking] = useState("");

  const w = parse(s.weight);
  const a = parse(asking);
  const market = w != null ? w * unitGrams[s.unit] * s.rate.price : null;
  const diff = market && a != null ? ((a - market) / market) * 100 : null;

  const verdict =
    diff == null
      ? null
      : diff <= 0
        ? { key: "greatDeal", color: "#6DD98A" }
        : diff <= 15
          ? { key: "fairPrice", color: "#6DD98A" }
          : diff <= 30
            ? { key: "slightlyAbove", color: "#E8C35A" }
            : { key: "significantlyAbove", color: "#F87171" };
  // Position of the marker on a -30%…+30% scale.
  const marker = diff == null ? 50 : Math.min(100, Math.max(0, ((diff + 30) / 60) * 100));

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[1fr_380px]">
      <div className="space-y-8">
        <PurityPicker metal={s.metal} value={s.purity} onChange={s.setPurity} />
        <WeightInput
          metal={s.metal}
          unit={s.unit}
          onUnit={s.setUnit}
          value={s.weight}
          onChange={s.setWeight}
        />
        <div>
          <label htmlFor="calc-asking" className={cn(labelClass, "mb-4")}>
            {t("form.asking")}
          </label>
          <div className="relative">
            <input
              id="calc-asking"
              type="number"
              inputMode="decimal"
              min={0}
              step="any"
              value={asking}
              onChange={(e) => setAsking(e.target.value)}
              placeholder={t("form.askingPlaceholder")}
              className="w-full rounded-2xl border-2 border-[rgba(27,107,74,0.15)] bg-white px-5 py-4 pe-20 text-3xl font-bold text-foreground outline-none transition-all duration-200 placeholder:text-[#C4BFB6] focus:border-[#1B6B4A]"
            />
            <span className="absolute end-5 top-1/2 -translate-y-1/2 text-sm font-black uppercase tracking-wider text-muted-foreground">
              AED
            </span>
          </div>
        </div>
      </div>

      <div className="lg:sticky lg:top-37">
        <div
          className={cn(
            "overflow-hidden rounded-3xl border border-primary/20 bg-white transition-all duration-500",
            verdict
              ? "shadow-[0_16px_48px_color-mix(in_srgb,var(--background)_16%,transparent)]"
              : "opacity-70 shadow-[0_8px_24px_color-mix(in_srgb,var(--background)_8%,transparent)]",
          )}
        >
          <div className="bg-background px-7 pb-6 pt-7">
            {verdict && diff != null ? (
              <>
                <p
                  className="text-2xl font-bold"
                  style={{ color: verdict.color }}
                >
                  {t(`result.${verdict.key}`)}
                </p>
                <p dir="auto" className="mt-1 text-sm text-[rgba(245,240,232,0.6)]">
                  {t("result.vsMarket", {
                    value: `${diff > 0 ? "+" : ""}${diff.toFixed(1)}`,
                  })}
                </p>
              </>
            ) : (
              <>
                <p className="text-base font-bold text-[#E8D5A0]">
                  {t("result.verdictEmpty")}
                </p>
                <p className="mt-1 text-xs text-[rgba(245,240,232,0.5)]">
                  {t("result.verdictHint")}
                </p>
              </>
            )}

            <div className="mt-5">
              <div className="relative h-2 rounded-full bg-[linear-gradient(to_right,#15803D,#6DD98A_40%,#E8C35A_70%,var(--destructive))] rtl:bg-[linear-gradient(to_left,#15803D,#6DD98A_40%,#E8C35A_70%,var(--destructive))]">
                <span
                  className={cn(
                    "absolute top-1/2 size-4 -translate-y-1/2 rounded-full border-2 border-background bg-white shadow transition-all duration-500 ltr:-translate-x-1/2 rtl:translate-x-1/2",
                    !verdict && "opacity-0",
                  )}
                  style={{ insetInlineStart: `${marker}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-[9px] text-[rgba(245,240,232,0.4)]">
                <span>{t("result.below")}</span>
                <span>{t("result.above")}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 px-7 py-6">
            <Row
              label={t("result.marketValue")}
              value={market != null ? money(market) : "—"}
            />
            <Row
              label={t("result.askingPrice")}
              value={a != null ? money(a) : "—"}
            />
            <div className="h-px bg-primary/20" />
            <Row
              label={t("result.difference")}
              value={market != null && a != null ? money(a - market) : "—"}
            />
            <p className="border-t border-[rgba(27,107,74,0.06)] pt-1 text-[10px] leading-relaxed text-muted-foreground">
              {t("result.fairNote", { metal: t(`metals.${s.metal}`) })}
            </p>
          </div>

          <div className="border-t border-primary/12 bg-card-foreground px-7 py-5">
            <Link href="/browse" className={secondaryBtn}>
              <Search className="size-4" />
              {t("result.viewSimilar")}
            </Link>
          </div>
        </div>
        <RateFootnote metal={s.metal} rate={s.rate} />
      </div>
    </div>
  );
}

function ConverterMode({ metal }: { metal: Metal }) {
  const t = useTranslations("Calculator");
  const { num } = useFormat();
  const rates = metalRates[metal];
  const metalName = t(`metals.${metal}`);

  // Weight units: store grams, render every unit from it.
  const [grams, setGrams] = useState<number | null>(10);
  const [editing, setEditing] = useState<{ unit: Unit; raw: string } | null>(
    null,
  );

  // Purity converter
  const [from, setFrom] = useState(rates[0].label);
  const [to, setTo] = useState(rates[1].label);
  const [piece, setPiece] = useState("");
  const fromRate = rates.find((r) => r.label === from) ?? rates[0];
  const toRate = rates.find((r) => r.label === to) ?? rates[1];
  const p = parse(piece);
  const pure = p != null ? (p * fromRate.purity) / 100 : null;
  const equivalent = pure != null ? (pure * 100) / toRate.purity : null;

  const selectClass =
    "h-12 w-full rounded-xl border-2 border-[rgba(27,107,74,0.15)] bg-white px-3 text-sm font-bold text-foreground focus:border-[#1B6B4A] focus:outline-none";

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-2xl border border-[rgba(27,107,74,0.1)] bg-white p-6">
        <div className="mb-5 flex items-start gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[rgba(27,107,74,0.07)] text-[#1B6B4A]">
            <Scale className="size-5" />
          </span>
          <div>
            <h3 className="text-sm font-black text-foreground">
              {t("converter.weightTitle")}
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {t("converter.weightHint")}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {(Object.keys(unitGrams) as Unit[]).map((u) => {
            const shown =
              editing?.unit === u
                ? editing.raw
                : grams != null
                  ? String(Number((grams / unitGrams[u]).toFixed(4)))
                  : "";
            return (
              <label key={u} className="block">
                <span className={cn(labelClass, "mb-2")}>
                  {t(`form.units.${u}`)}
                </span>
                <div className="relative">
                  <input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    step="any"
                    value={shown}
                    onFocus={() => setEditing({ unit: u, raw: shown })}
                    onBlur={() => setEditing(null)}
                    onChange={(e) => {
                      setEditing({ unit: u, raw: e.target.value });
                      const v = parse(e.target.value);
                      setGrams(v != null ? v * unitGrams[u] : null);
                    }}
                    className="h-12 w-full rounded-xl border-2 border-[rgba(27,107,74,0.15)] bg-white px-3 pe-12 text-lg font-bold text-foreground focus:border-[#1B6B4A] focus:outline-none"
                  />
                  <span className="absolute end-3 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase text-muted-foreground">
                    {t(`form.unitShort.${u}`)}
                  </span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-[rgba(27,107,74,0.1)] bg-white p-6">
        <div className="mb-5 flex items-start gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[rgba(27,107,74,0.07)] text-[#1B6B4A]">
            <ArrowLeftRight className="size-5" />
          </span>
          <div>
            <h3 className="text-sm font-black text-foreground">
              {t(`converter.purityTitle.${metal}`)}
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {t("converter.purityHint", { metal: metalName })}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className={cn(labelClass, "mb-2")}>{t("converter.from")}</span>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className={selectClass}
            >
              {rates.map((r) => (
                <option key={r.label} value={r.label}>
                  {r.label} · {r.purity}%
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className={cn(labelClass, "mb-2")}>{t("converter.to")}</span>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className={selectClass}
            >
              {rates.map((r) => (
                <option key={r.label} value={r.label}>
                  {r.label} · {r.purity}%
                </option>
              ))}
            </select>
          </label>
          <label className="col-span-2 block">
            <span className={cn(labelClass, "mb-2")}>
              {t("converter.pieceWeight")}
            </span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              step="any"
              value={piece}
              onChange={(e) => setPiece(e.target.value)}
              placeholder={t("converter.piecePlaceholder")}
              className="h-12 w-full rounded-xl border-2 border-[rgba(27,107,74,0.15)] bg-white px-3 text-lg font-bold text-foreground placeholder:text-[#C4BFB6] focus:border-[#1B6B4A] focus:outline-none"
            />
          </label>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-background p-4">
            <dt className="text-[10px] font-black uppercase tracking-wider text-primary/60">
              {t("converter.pure", { metal: metalName })}
            </dt>
            <dd className="mt-1 text-xl font-bold text-[#E8D5A0]">
              {pure != null ? t("converter.grams", { value: num(pure) }) : "—"}
            </dd>
            <dd className="mt-0.5 text-[10px] text-[rgba(245,240,232,0.45)]">
              {t("converter.pureHint", { value: fromRate.purity })}
            </dd>
          </div>
          <div className="rounded-xl border border-[rgba(27,107,74,0.15)] bg-[#FDFAF5] p-4">
            <dt className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
              {t("converter.equivalent", { purity: toRate.label })}
            </dt>
            <dd className="mt-1 text-xl font-bold text-[#1B6B4A]">
              {equivalent != null
                ? t("converter.grams", { value: num(equivalent) })
                : "—"}
            </dd>
            <dd className="mt-0.5 text-[10px] text-muted-foreground">
              {t("converter.equivalentHint", { metal: metalName })}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

/* ---------------------------------- Shell ---------------------------------- */

export default function Calculator() {
  const t = useTranslations("Calculator");
  const [metal, setMetal] = useState<Metal>("gold");
  const [mode, setMode] = useState<Mode>("value");
  const [purity, setPurity] = useState(metalRates.gold[0].label);
  const [unit, setUnit] = useState<Unit>("g");
  const [weight, setWeight] = useState("");

  const rate =
    metalRates[metal].find((r) => r.label === purity) ?? metalRates[metal][0];

  const shared: Shared = {
    metal,
    rate,
    purity: rate.label,
    setPurity,
    unit,
    setUnit,
    weight,
    setWeight,
  };

  return (
    <div>
      <div className="mb-6">
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
              onClick={() => {
                setMetal(m);
                setPurity(metalRates[m][0].label);
              }}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-bold transition-colors",
                metal === m
                  ? "bg-[#1B6B4A] text-card-foreground shadow-sm"
                  : "text-[#4A4840] hover:text-[#1B6B4A]",
              )}
            >
              {t(`metals.${m}`)}
            </button>
          ))}
        </div>
      </div>

      <div role="tablist" className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {modes.map(({ key, icon: Icon }) => {
          const active = mode === key;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setMode(key)}
              className={cn(
                "group relative rounded-2xl p-5 text-start transition-all duration-300",
                active
                  ? "bg-background shadow-[0_12px_40px_color-mix(in_srgb,var(--background)_25%,transparent)]"
                  : "border border-[rgba(27,107,74,0.12)] bg-white hover:border-[rgba(27,107,74,0.3)] hover:shadow-[0_8px_24px_rgba(27,107,74,0.08)]",
              )}
            >
              {active && (
                <div className="absolute inset-x-6 top-0 h-0.5 rounded-full bg-primary" />
              )}
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "flex size-12 shrink-0 items-center justify-center rounded-2xl transition-all duration-300",
                    active
                      ? "bg-primary text-background shadow-[0_4px_20px_color-mix(in_srgb,var(--primary)_40%,transparent)]"
                      : "border border-[rgba(27,107,74,0.12)] bg-[rgba(27,107,74,0.07)] text-[#1B6B4A] group-hover:bg-[rgba(27,107,74,0.12)]",
                  )}
                >
                  <Icon className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div
                    className={cn(
                      "text-sm font-black leading-tight tracking-wide",
                      active ? "text-[#E8D5A0]" : "text-foreground",
                    )}
                  >
                    {t(`modes.${key}.title`)}
                  </div>
                  <div
                    className={cn(
                      "mt-0.5 text-[10px] font-semibold",
                      active ? "text-[rgba(232,213,160,0.5)]" : "text-muted-foreground",
                    )}
                  >
                    {t(`modes.${key}.subtitle`)}
                  </div>
                  <div
                    className={cn(
                      "mt-2 hidden text-[11px] leading-relaxed sm:block",
                      active ? "text-[rgba(245,240,232,0.45)]" : "text-muted-foreground",
                    )}
                  >
                    {t(`modes.${key}.body`)}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-3xl border border-primary/12 shadow-[0_20px_60px_color-mix(in_srgb,var(--background)_12%,transparent)]">
        <div className="flex items-center justify-between bg-card px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="size-2 animate-pulse rounded-full bg-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[rgba(232,213,160,0.7)]">
              {t(`panel.${mode}`)}
            </span>
          </div>
          <span className="text-[9px] tracking-wider text-[rgba(245,240,232,0.3)]">
            {t("panel.liveRate")}
          </span>
        </div>
        <div className="bg-[#FDFAF5] px-4 py-6 md:px-8 md:py-10">
          {mode === "value" && <ValueMode {...shared} />}
          {mode === "sell" && <SellMode {...shared} />}
          {mode === "compare" && <CompareMode {...shared} />}
          {mode === "converter" && <ConverterMode key={metal} metal={metal} />}
        </div>
      </div>
    </div>
  );
}
