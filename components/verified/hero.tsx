import { ShieldCheck } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

const stats = ["messages", "views", "review"] as const;

export default async function Hero() {
  const locale = await getLocale();
  const t = await getTranslations("GetVerified.hero");
  const fontClass = locale === "en" ? "font-playfair" : "";

  return (
    <section className="relative overflow-hidden bg-card mt-21">
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          opacity-20
          bg-[radial-gradient(rgba(201,164,69,0.15)_0.8px,transparent_0.8px)]
          bg-size-[18px_18px]
        "
      />

      <div className="container max-w-350 relative z-10 flex min-h-82.5 flex-col items-center justify-center py-16 text-center lg:py-20">
        <div className="flex items-center justify-center gap-2 text-primary">
          <ShieldCheck className="size-3.5" strokeWidth={1.8} />
          <span className="text-[11px] font-bold uppercase tracking-[0.25em]">
            {t("eyebrow")}
          </span>
        </div>

        {/* Title */}
        <h1
          className={`mt-7 font-serif text-4xl font-bold leading-tight text-balance text-card-foreground lg:text-5xl ${fontClass}`}
        >
          <span>{t("title")}</span>{" "}
          <span className="gold-text">{t("titleHighlight")}</span>
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-2xl text-base text-[#f5f0e8a6] leading-relaxed text-pretty">
          {t("description")}
        </p>

        {/* Stats */}
        <div className="mt-9 grid grid-cols-3 gap-8 sm:gap-12">
          {stats.map((stat) => (
            <div key={stat} className="group text-center">
              <p
                className={`text-3xl font-bold leading-none gold-text ${fontClass}`}
              >
                {t(`stats.${stat}.value`)}
              </p>

              <p className="mt-2 text-[11px] font-medium uppercase tracking-wide text-[#f5f0e8a6]">
                {t(`stats.${stat}.label`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
