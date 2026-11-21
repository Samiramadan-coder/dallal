import { cn } from "@/lib/utils";
import { headingFont } from "@/constants/marketplace";
import { getLocale, getTranslations } from "next-intl/server";
import { Gem, Globe, Hammer, Receipt } from "lucide-react";

const items = [
  { key: "karat", icon: Gem },
  { key: "spot", icon: Globe },
  { key: "making", icon: Hammer },
  { key: "vat", icon: Receipt },
] as const;

export default async function Education() {
  const locale = await getLocale();
  const t = await getTranslations("Calculator.education");

  return (
    <section className="mt-16 border-t border-[rgba(27,107,74,0.08)] py-20">
      <div className="mb-14 text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          <div className="h-px w-10 bg-[#C9A445]" />
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#C9A445]">
            {t("eyebrow")}
          </span>
          <div className="h-px w-10 bg-[#C9A445]" />
        </div>
        <h2
          className={cn(
            headingFont(locale),
            "text-balance text-4xl font-bold text-[#1A1A14]",
          )}
        >
          {t("title")}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#8A8678]">
          {t("description")}
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
        {items.map(({ key, icon: Icon }, i) => (
          <div
            key={key}
            className="group relative rounded-3xl border border-[rgba(27,107,74,0.1)] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(27,107,74,0.12)]"
          >
            <div className="absolute inset-x-7 top-0 h-0.5 rounded-full bg-[#C9A445] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="flex items-start gap-5">
              <div className="relative shrink-0">
                <div className="flex size-14 items-center justify-center rounded-2xl border border-[rgba(27,107,74,0.12)] bg-[rgba(27,107,74,0.07)] text-[#1B6B4A]">
                  <Icon className="size-6" />
                </div>
                <div className="absolute -end-2 -top-2 flex size-6 items-center justify-center rounded-full bg-[#C9A445] shadow-sm">
                  <span className="text-[9px] font-black text-[#071E14]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-black leading-snug text-[#1A1A14]">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="mt-2.5 text-xs leading-relaxed text-[#8A8678]">
                  {t(`items.${key}.body`)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
