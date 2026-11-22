import { cn } from "@/lib/utils";
import { getLocale, getTranslations } from "next-intl/server";
import { headingFont } from "@/constants/marketplace";

export default async function Hero() {
  const locale = await getLocale();
  const t = await getTranslations("About.hero");
  const font = headingFont(locale);

  return (
    <section className="mt-30 bg-card pb-16 pt-14 md:pt-20">
      <div className="mx-auto max-w-4xl px-6">
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
          {t("eyebrow")}
        </p>
        <h1
          className={cn(
            font,
            "text-balance text-4xl font-bold leading-tight text-card-foreground md:text-5xl",
          )}
        >
          {t("title")}
        </h1>
        <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-[rgba(245,240,232,0.75)]">
          {t("description")}
        </p>
      </div>
    </section>
  );
}
