import { cn } from "@/lib/utils";
import { Camera, HandCoins, Store } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { headingFont } from "@/constants/marketplace";

const steps = [
  { key: "describe", icon: Camera },
  { key: "offers", icon: HandCoins },
  { key: "sell", icon: Store },
] as const;

export default async function HowItWorks() {
  const locale = await getLocale();
  const t = await getTranslations("Sell.howItWorks");
  const font = headingFont(locale);

  return (
    <section
      aria-labelledby="how-it-works"
      className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16"
    >
      <h2
        id="how-it-works"
        className={cn(font, "mb-8 text-2xl font-bold text-[#1A1A14]")}
      >
        {t("title")}
      </h2>

      <ol className="grid gap-5 md:grid-cols-3">
        {steps.map(({ key, icon: Icon }, i) => (
          <li
            key={key}
            className="flex flex-col gap-3 rounded-2xl border border-[rgba(27,107,74,0.12)] bg-white p-6"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(27,107,74,0.1)] text-[#1B6B4A]">
                <Icon size={20} aria-hidden />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8A8678]">
                {t("step", { n: i + 1 })}
              </span>
            </div>
            <h3 className={cn(font, "text-lg font-bold text-[#1A1A14]")}>
              {t(`steps.${key}.title`)}
            </h3>
            <p className="text-sm leading-relaxed text-[#6B6858]">
              {t(`steps.${key}.body`)}
            </p>
          </li>
        ))}
      </ol>

      <p className="mt-8 text-sm text-[#8A8678]">{t("note")}</p>
    </section>
  );
}
