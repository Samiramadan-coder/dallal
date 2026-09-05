import Image from "next/image";
import Apple from "../icons/apple";
import Title from "../reusable/title";
import EyeBrow from "../reusable/eye-brow";
import GooglePlay from "../icons/google-play";
import { Smartphone, Star } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

export default async function MobileApp() {
  const locale = await getLocale();
  const t = await getTranslations("Home.mobileApp");
  const fontClass = locale === "en" ? "font-playfair" : "";

  return (
    <section className="relative overflow-hidden py-20 text-card-foreground lg:py-24">
      <div className="container max-w-7xl">
        <div
          className="
            overflow-hidden
            rounded-xl
            border
            border-primary/20
            bg-card
          "
        >
          <div
            className="
              grid
              items-center
              gap-12
              px-7
              py-10
              md:px-12
              lg:grid-cols-2
              lg:gap-16
              lg:px-14
              lg:py-14
            "
          >
            <div>
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    size-10
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-primary/30
                    bg-primary/10
                    text-primary
                  "
                >
                  <Smartphone className="size-4" strokeWidth={1.8} />
                </div>
                <EyeBrow className="text-xs text-primary">
                  {t("eyebrow")}
                </EyeBrow>
              </div>

              <Title
                className={`
                  mt-7
                  max-w-lg
                  text-4xl
                  font-bold
                  leading-tight
                  text-card-foreground
                  md:text-5xl
                  ${fontClass}
                `}
              >
                {t("title")}
                <br />
                <span className="gold-text">{t("titleHighlight")}</span>
              </Title>

              <p
                className="
                  mt-5
                  max-w-xl
                  text-base
                  leading-relaxed
                  text-muted-foreground
                  md:text-lg
                "
              >
                {t("description")}
              </p>

              {/* Stats */}
              <div className="mt-8 flex flex-wrap items-stretch gap-4">
                <RatingCard rating="4.9" label={t("stats.appStore")} />
                <RatingCard rating="4.8" label={t("stats.googlePlay")} />

                <div className="flex min-w-28 flex-col justify-center px-2">
                  <p className="text-base font-bold text-card-foreground">
                    50,000+
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {t("stats.downloads")}
                  </p>
                </div>
              </div>

              {/* Stores */}
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#"
                  aria-label={t("stores.appStore")}
                  className="
                    flex
                    min-w-41
                    items-center
                    gap-3
                    rounded-lg
                    bg-[#faf6ef]
                    px-5
                    py-3
                    text-foreground
                    transition-transform
                    hover:-translate-y-0.5
                  "
                >
                  <Apple />

                  <div className="text-start">
                    <p className="text-[9px] leading-none text-muted-foreground">
                      {t("stores.downloadOn")}
                    </p>

                    <p className="mt-1 text-sm font-bold">
                      {t("stores.appStore")}
                    </p>
                  </div>
                </a>

                <a
                  href="#"
                  aria-label={t("stores.googlePlay")}
                  className="
                    flex
                    min-w-41
                    items-center
                    gap-3
                    rounded-lg
                    bg-[#faf6ef]
                    px-5
                    py-3
                    text-foreground
                    transition-transform
                    hover:-translate-y-0.5
                  "
                >
                  <GooglePlay />

                  <div className="text-start">
                    <p className="text-[9px] leading-none text-muted-foreground">
                      {t("stores.getItOn")}
                    </p>

                    <p className="mt-1 text-sm font-bold">
                      {t("stores.googlePlay")}
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative aspect-square w-full max-w-110 overflow-hidden">
                <Image
                  src="/landing-mobile.png"
                  alt={t("imageAlt")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 440px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RatingCard({ rating, label }: { rating: string; label: string }) {
  return (
    <div
      className="
        min-w-27
        rounded-lg
        border
        border-primary/20
        bg-card/20
        px-4
        py-3
        text-center
      "
    >
      <div className="flex items-center justify-center gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} className="size-3 fill-primary text-primary" />
        ))}
      </div>
      <p className="mt-2 text-lg font-bold text-card-foreground">{rating}</p>
      <p className="mt-0.5 text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}
