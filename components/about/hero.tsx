import { cn } from "@/lib/utils";
import { getLocale, getTranslations } from "next-intl/server";

export default async function Hero() {
  const locale = await getLocale();
  const t = await getTranslations("About.hero");
  const fontClass = locale === "en" ? "font-playfair" : "";

  return (
    <section className="relative isolate overflow-hidden mt-20">
      <div
        aria-hidden
        className="
          pointer-events-none
          absolute inset-0
          opacity-40
          bg-[repeating-linear-gradient(45deg,transparent,transparent_17px,rgba(201,164,69,0.08)_18px,transparent_19px)]
        "
      />

      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-e-1 top-1/2 hidden -translate-y-1/2 select-none text-[28rem] font-semibold leading-none text-primary/[0.035] xl:block",
          fontClass,
        )}
      >
        AI
      </div>

      <div className=" relative z-10 container flex w-full max-w-350 items-center py-20">
        <div className="w-full max-w-172.5">
          <div className="mb-10 flex items-center gap-3">
            <span className="h-px w-12 bg-primary" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-primary">
              {t("eyebrow")}
            </span>
            <span className="h-px w-12 bg-primary" />
          </div>

          <h1
            className={cn(
              "text-5xl lg:text-7xl font-bold text-balance leading-[1.05] mb-8 max-w-4xl",
              fontClass,
            )}
          >
            <span className="text-secondary-foreground">{t("titleFirst")}</span>
            <br />
            <span className="gold-text">{t("titleSecond")}</span>
          </h1>

          <p className="mt-9 mb-12 max-w-2xl text-base leading-8 text-primary/75 sm:text-lg">
            {t("description")}
          </p>

          <div className="h-px bg-[linear-gradient(to_right,rgba(201,164,69,0.5),transparent)] max-w-md"></div>
        </div>
      </div>
    </section>
  );
}
