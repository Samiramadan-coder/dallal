"use client";

import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { BellRing } from "lucide-react";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { headingFont, metalRates } from "@/constants/marketplace";

const fieldClass =
  "h-11 rounded-lg border border-[rgba(27,107,74,0.2)] bg-white px-3 text-sm text-[#1A1A14] focus:border-[#1B6B4A] focus:outline-none focus:ring-2 focus:ring-[rgba(27,107,74,0.12)]";

export default function PriceAlert() {
  const locale = useLocale();
  const t = useTranslations("MetalPrices.alert");
  const rates = metalRates.gold.slice(0, 4);
  const [purity, setPurity] = useState(rates[0].label);
  const [direction, setDirection] = useState<"above" | "below">("above");
  const [amount, setAmount] = useState("");
  const current = rates.find((r) => r.label === purity)!;

  return (
    <section className="pb-10">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.success(t("saved"));
          setAmount("");
        }}
        className="rounded-2xl border border-[rgba(201,164,69,0.35)] bg-[#FBF6E9] p-5 md:p-6"
      >
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[rgba(201,164,69,0.18)] text-[#8B6914]">
            <BellRing className="size-5" />
          </span>
          <div>
            <h2
              className={cn(
                headingFont(locale),
                "text-xl font-bold text-[#1A1A14]",
              )}
            >
              {t("title")}
            </h2>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-[#6B5E3C]">
              {t("description")}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center">
          <span className="text-sm font-semibold text-[#4A4840]">
            {t("notify")}
          </span>
          <select
            aria-label="Karat"
            value={purity}
            onChange={(e) => setPurity(e.target.value)}
            className={fieldClass}
          >
            {rates.map((r) => (
              <option key={r.label} value={r.label}>
                {r.label}
              </option>
            ))}
          </select>
          <select
            aria-label={t("above")}
            value={direction}
            onChange={(e) => setDirection(e.target.value as "above" | "below")}
            className={fieldClass}
          >
            <option value="above">{t("above")}</option>
            <option value="below">{t("below")}</option>
          </select>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step="0.01"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={t("amount")}
            aria-label={t("amount")}
            className={cn(fieldClass, "md:w-40")}
          />
          <button
            type="submit"
            className="h-11 rounded-lg bg-[#1B6B4A] px-5 text-sm font-bold text-[#FAF6EF] transition-colors hover:bg-[#155A3D]"
          >
            {t("submit")}
          </button>
        </div>
        <p className="mt-2 text-xs text-[#8A8678]">
          {t("now", { value: current.price.toFixed(2) })}
        </p>
      </form>
    </section>
  );
}
