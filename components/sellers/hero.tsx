import { getLocale, getTranslations } from "next-intl/server";
import EyeBrow from "../reusable/eye-brow";

export default async function Hero() {
  const locale = await getLocale();
  const t = await getTranslations("ForSellers.hero");
  const fontClass = locale === "en" ? "font-playfair" : "";

  return (
    <section className="relative overflow-hidden bg-card mt-21">
      <div className="relative z-10 mx-auto flex min-h-62.5 w-full max-w-275 flex-col items-center justify-center px-5 py-16 text-center sm:px-8 lg:py-20">
        <EyeBrow className="text-primary">{t("eyebrow")}</EyeBrow>
        <h1
          className={`mt-5 text-4xl font-semibold text-card-foreground lg:text-5xl text-balance ${fontClass}`}
        >
          {t("title")} <span className="gold-text">{t("titleHighlight")}</span>
        </h1>
        <p className="mt-4 max-w-140 text-sm leading-relaxed text-[#f5f0e88c]">
          {t("description")}
        </p>
      </div>
    </section>
  );
}
