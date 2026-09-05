import {
  ArrowRight,
  BadgeCheck,
  Handshake,
  MessageCircle,
  PencilLine,
} from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { getLocale, getTranslations } from "next-intl/server";

const steps = [
  {
    key: "post",
    icon: PencilLine,
  },
  {
    key: "verify",
    icon: BadgeCheck,
  },
  {
    key: "offers",
    icon: MessageCircle,
  },
  {
    key: "complete",
    icon: Handshake,
  },
] as const;

export default async function Sellers() {
  const locale = await getLocale();
  const t = await getTranslations("About.sellers");
  const fontClass = locale === "en" ? "font-playfair" : "";

  return (
    <section className="bg-[#f5f0e4] py-20 text-foreground lg:py-28">
      <div className="container max-w-350 grid gap-14 lg:grid-cols-[0.9fr_1fr] lg:items-start lg:gap-20">
        <div className="relative mx-auto w-full max-w-140 lg:mx-0">
          <div
            aria-hidden="true"
            className="absolute -inset-s-3 top-3 size-full rounded-[18px] border border-primary/30"
          />

          <div className="relative aspect-[0.8] overflow-hidden rounded-[16px]">
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(7,30,20,0.4)_0%,transparent_50%)]"></div>

            <Image
              src="/about-sellers.png"
              alt={t("imageAlt")}
              fill
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover"
            />

            <div className="absolute inset-x-5 bottom-5 overflow-hidden rounded-xl border border-primary/20 bg-background/95 backdrop-blur-sm">
              <div className="flex items-center px-5 py-4">
                <div className="shrink-0 pe-5">
                  <div
                    className={`text-2xl font-semibold leading-none gold-text ${fontClass}`}
                  >
                    3.8×
                  </div>
                  <p className="mt-1 text-[10px] text-primary/70">
                    {t("stat.label")}
                  </p>
                </div>
                <div className="h-10 w-px bg-primary/20" />
                <p className="ps-5 text-[10px] leading-5 text-primary/70">
                  {t("stat.description")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
              {t("eyebrow")}
            </span>
          </div>
          <h2
            className={`mt-6 max-w-115 text-4xl font-semibold leading-[1.02] tracking-[-0.035em] lg:text-5xl ${fontClass}`}
          >
            <span>{t("title")}</span>
            <br />
            <span className="italic text-primary">{t("titleHighlight")}</span>
          </h2>
          <p className="mt-5 max-w-150 text-base leading-7 text-foreground/75 sm:text-lg sm:leading-8">
            {t("description")}
          </p>

          {/* Steps */}
          <div className="mt-10 space-y-4">
            {steps.map(({ key, icon: Icon }, index) => (
              <article
                key={key}
                className="
                  relative
                  flex
                  gap-4
                  overflow-hidden
                  rounded-xl
                  border
                  border-primary/10
                  bg-white
                  px-5
                  py-5
                "
              >
                <div
                  className="
                    flex
                    size-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-primary/10
                    text-primary
                  "
                >
                  <Icon className="size-4.5" strokeWidth={1.8} />
                </div>

                <div className="min-w-0">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-primary">
                    {t("step", { number: index + 1 })}
                  </p>
                  <h3 className="mt-1.5 text-sm font-semibold text-foreground">
                    {t(`steps.${key}.title`)}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/70">
                    {t(`steps.${key}.description`)}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-9">
            <Button
              asChild
              className="
                h-12
                rounded-lg
                bg-primary
                px-7
                font-semibold
                text-primary-foreground
                hover:bg-primary/90
              "
            >
              <Link href="/listings/create">
                {t("cta")}
                <ArrowRight className="ms-3 size-4 rtl:rotate-180" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
