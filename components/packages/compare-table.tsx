"use client";

import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { Check, Minus } from "lucide-react";
import { useFeatureText } from "./feature-value";
import { compareRows } from "@/constants/packages";
import { useLocale, useTranslations } from "next-intl";
import { headingFont } from "@/constants/marketplace";

const columns = [
  { key: "personal", color: "var(--muted-foreground)", text: "text-[#1B6B4A]", check: "bg-[rgba(27,107,74,0.1)] text-[#1B6B4A]", highlight: false },
  { key: "gold", color: "var(--primary)", text: "text-primary", check: "bg-primary/15 text-[#9A7B22]", highlight: true },
  { key: "vip", color: "#0E9FB0", text: "text-[#1B6B4A]", check: "bg-[rgba(27,107,74,0.1)] text-[#1B6B4A]", highlight: false },
] as const;

const footer = [
  { label: "signUp", primary: false },
  { label: "startGold", primary: true },
  { label: "contactSales", primary: false },
] as const;

export default function CompareTable() {
  const locale = useLocale();
  const t = useTranslations("Packages");
  const text = useFeatureText();
  const font = headingFont(locale);
  const goldBg = "bg-primary/4";

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-[#1B6B4A]">
            {t("compare.eyebrow")}
          </p>
          <h2
            className={cn(font, "text-balance text-3xl font-bold text-foreground")}
          >
            {t("compare.title")}
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-160 border-collapse">
            <thead>
              <tr className="border-b-2 border-[rgba(27,107,74,0.12)]">
                <th className="w-48 py-4 pe-6 text-start text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {t("compare.feature")}
                </th>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={cn(
                      "w-40 px-4 py-4 text-center",
                      col.highlight && cn(goldBg, "rounded-t-xl"),
                    )}
                  >
                    <span
                      className={cn(font, "inline-block text-base font-bold")}
                      style={{ color: col.color }}
                    >
                      {t(`plans.${col.key}.name`)}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row, i) => (
                <tr
                  key={row.feature}
                  className={cn(
                    "border-b border-[rgba(27,107,74,0.07)] transition-colors hover:bg-[rgba(27,107,74,0.025)]",
                    i % 2 === 1 && "bg-card-foreground/50",
                  )}
                >
                  <td className="py-3.5 pe-6 text-sm font-medium text-[#4A4840]">
                    {t(`features.${row.feature}`)}
                  </td>
                  {row.values.map((value, c) => {
                    const col = columns[c];
                    return (
                      <td
                        key={col.key}
                        className={cn("px-4 py-3.5 text-center", col.highlight && goldBg)}
                      >
                        {value === true ? (
                          <span
                            className={cn(
                              "inline-flex size-6 items-center justify-center rounded-full",
                              col.check,
                            )}
                          >
                            <Check className="size-3.5" strokeWidth={3} />
                            <span className="sr-only">{t("compare.included")}</span>
                          </span>
                        ) : value === false ? (
                          <>
                            <Minus className="mx-auto size-4 text-[#D4D0C8]" />
                            <span className="sr-only">{t("compare.notIncluded")}</span>
                          </>
                        ) : (
                          <span className={cn("text-[13px] font-semibold", col.text)}>
                            {text(value)}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-[rgba(27,107,74,0.12)]">
                <td className="py-5" />
                {footer.map((f, c) => (
                  <td
                    key={f.label}
                    className={cn(
                      "px-4 py-5",
                      columns[c].highlight && cn(goldBg, "rounded-b-xl"),
                    )}
                  >
                    <Link
                      href="/auth"
                      className={cn(
                        "block rounded-lg py-2.5 text-center text-xs font-bold tracking-wide transition-all duration-200",
                        f.primary
                          ? "bg-primary text-background hover:bg-[#E8D5A0]"
                          : "border border-[rgba(27,107,74,0.25)] text-[#1B6B4A] hover:bg-[rgba(27,107,74,0.05)]",
                      )}
                    >
                      {t(`compare.${f.label}`)}
                    </Link>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
}
