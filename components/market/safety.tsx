import { cn } from "@/lib/utils";
import { ShieldCheck } from "lucide-react";
import { headingFont } from "@/constants/marketplace";
import { getLocale, getTranslations } from "next-intl/server";

// "Buy and sell safely" tips, at the bottom of the market pages
export default async function Safety() {
  const locale = await getLocale();
  const t = await getTranslations("Market.safety");

  return (
    <section
      aria-labelledby="market-safety"
      className="flex gap-4 rounded-2xl border border-[#E6CF8C] bg-[#FBF3DA] p-5 text-[#5C4710]"
    >
      <ShieldCheck className="size-6 shrink-0" />
      <div className="text-sm leading-relaxed">
        <h2
          id="market-safety"
          className={cn(headingFont(locale), "text-lg font-bold")}
        >
          {t("title")}
        </h2>
        <ul className="mt-2 flex list-disc flex-col gap-1 ps-5">
          <li>{t("tips.meet")}</li>
          <li>{t("tips.inspect")}</li>
          <li>{t("tips.stores")}</li>
        </ul>
      </div>
    </section>
  );
}
