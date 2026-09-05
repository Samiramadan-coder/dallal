import Image from "next/image";
import { cn } from "@/lib/utils";
import { getLocale, getTranslations } from "next-intl/server";

const storyItems = ["market", "sellers", "solution"] as const;

export default async function Story() {
  const locale = await getLocale();
  const t = await getTranslations("About.story");
  const fontClass = locale === "en" ? "font-playfair" : "";

  return (
    <section className="bg-card-foreground py-20 text-foreground lg:py-32">
      <div className="container max-w-350 grid w-full items-center gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div>
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-primary">
              {t("eyebrow")}
            </span>
          </div>
          <h2
            className={cn(
              "max-w-110 font-semibold leading-[1.1] tracking-[-0.03em] text-foreground text-4xl lg:text-5xl",
              fontClass,
            )}
          >
            {t("titleFirst")}{" "}
            <span className="italic text-primary">{t("titleEmphasis")}</span>
          </h2>

          <div className="mt-10 space-y-8 lg:mt-12">
            {storyItems.map((item, index) => (
              <div
                key={item}
                className="grid grid-cols-[32px_1fr] items-start gap-4"
              >
                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/80 text-[11px] font-semibold text-primary-foreground">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-1.5">
                    {t(`items.${item}.title`)}
                  </h3>
                  <p className="mt-2 max-w-142.5 text-sm text-[#4A4840] leading-relaxed">
                    {t(`items.${item}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="relative mx-auto w-full max-w-155">
          <div
            aria-hidden
            className="absolute -inset-e-4 -top-4 size-full rounded-[18px] border border-primary/30"
          />

          <div className="relative aspect-[0.8] overflow-hidden rounded-[16px]">
            <Image
              src="/about-story.png"
              alt={t("imageAlt")}
              fill
              sizes="(max-width: 1024px) 100vw, 620px"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background/70 to-transparent" />
            <div className="absolute bottom-5 inset-s-5">
              <div className="flex items-center gap-2 rounded-full border border-primary/40 bg-background/90 px-4 py-2 text-[11px] font-medium text-[#e8d5a0] backdrop-blur">
                <span className="size-1.5 rounded-full bg-primary" />
                {t("imageCaption")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
