"use client";

import { cn } from "@/lib/utils";
import Marquee from "react-fast-marquee";
import { useLocale, useTranslations } from "next-intl";
import { TrendingDown, TrendingUp } from "lucide-react";
import { formatPrice, metalRates } from "@/constants/marketplace";

export default function PriceTicker() {
  const locale = useLocale();
  const t = useTranslations("Navbar.ticker");
  const today = new Date().toLocaleDateString(
    locale === "ar" ? "ar-AE" : "en-GB",
    { day: "2-digit", month: "short", year: "numeric" },
  );

  const items = [
    ...metalRates.gold
      .slice(0, 4)
      .map((r) => ({ ...r, name: t("gold", { karat: r.label }) })),
    { ...metalRates.silver[0], name: t("silver") },
    { ...metalRates.platinum[0], name: t("platinum") },
  ];

  return (
    <div className="flex h-9 w-full overflow-hidden bg-card">
      <div className="flex shrink-0 items-center bg-[#caaa43] px-4 text-[11px] font-bold uppercase tracking-wider text-[#071E14] sm:px-6">
        {t("title")}
      </div>

      <div dir="ltr" className="flex min-w-0 flex-1 items-center overflow-hidden">
        <Marquee
          speed={40}
          pauseOnHover
          gradient={false}
          direction={locale === "ar" ? "right" : "left"}
          className="w-full"
        >
          <div className="flex items-center gap-8 px-6" dir={locale === "ar" ? "rtl" : "ltr"}>
            {items.map((item) => {
              const up = item.change >= 0;
              return (
                <span key={item.name} className="inline-flex items-center gap-2">
                  <span className="text-xs font-medium text-[#e8d5a0]">
                    {item.name}
                  </span>
                  <span className="text-sm font-bold text-white">
                    {formatPrice(item.price, t("currency"), locale)}
                  </span>
                  <span
                    dir="ltr"
                    className={cn(
                      "inline-flex items-center gap-0.5 text-xs",
                      up ? "text-[#3DAF77]" : "text-[#F87171]",
                    )}
                  >
                    {up ? (
                      <TrendingUp className="size-3" />
                    ) : (
                      <TrendingDown className="size-3" />
                    )}
                    {up ? "+" : ""}
                    {item.change.toFixed(2)}%
                  </span>
                </span>
              );
            })}
          </div>
        </Marquee>
      </div>

      {/* Server and browser clocks can differ around midnight. */}
      <div
        suppressHydrationWarning
        className="hidden shrink-0 items-center px-5 text-xs text-[#E8D5A0] sm:flex"
      >
        {today}
      </div>
    </div>
  );
}
