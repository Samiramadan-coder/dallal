"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { headingFont } from "@/constants/marketplace";

const items = ["q1", "q2", "q3", "q4", "q5", "q6"] as const;

export default function Faq() {
  const locale = useLocale();
  const t = useTranslations("MetalPrices.faq");
  const [open, setOpen] = useState<string | null>("q1");

  return (
    <section className="border-t border-[rgba(27,107,74,0.08)] py-16">
      <div className="mb-10 text-center">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#1B6B4A]">
          {t("eyebrow")}
        </p>
        <h2
          className={cn(headingFont(locale), "text-3xl font-bold text-[#1A1A14]")}
        >
          {t("title")}
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-[#8A8678]">
          {t("description")}
        </p>
      </div>

      <div className="mx-auto max-w-3xl space-y-3">
        {items.map((id) => {
          const isOpen = open === id;
          return (
            <div
              key={id}
              className={cn(
                "overflow-hidden rounded-2xl border bg-white transition-all duration-200",
                isOpen
                  ? "border-[rgba(27,107,74,0.25)] shadow-[0_4px_20px_rgba(27,107,74,0.08)]"
                  : "border-[rgba(27,107,74,0.1)] hover:border-[rgba(27,107,74,0.2)]",
              )}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : id)}
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-start"
              >
                <span
                  className={cn(
                    "text-sm font-semibold leading-snug transition-colors",
                    isOpen ? "text-[#1B6B4A]" : "text-[#1A1A14]",
                  )}
                >
                  {t(`items.${id}.q`)}
                </span>
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full transition-all duration-200",
                    isOpen
                      ? "rotate-180 bg-[#1B6B4A] text-white"
                      : "bg-[#F5F0E8] text-[#8A8678]",
                  )}
                >
                  <ChevronDown className="size-4" />
                </span>
              </button>
              {isOpen && (
                <div className="px-6 pb-5">
                  <div className="mb-4 h-px bg-[rgba(27,107,74,0.08)]" />
                  <p className="text-sm leading-relaxed text-[#4A4840]">
                    {t(`items.${id}.a`)}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
