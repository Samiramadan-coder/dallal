import Image from "next/image";
import Apple from "../icons/apple";
import { headingFont } from "@/constants/marketplace";
import { Smartphone } from "lucide-react";
import GooglePlay from "../icons/google-play";
import { getLocale, getTranslations } from "next-intl/server";

export default async function MobileApp() {
  const locale = await getLocale();
  const t = await getTranslations("Home.mobileApp");

  const badges = [
    { icon: <Apple />, top: t("downloadOn"), name: t("appStore") },
    { icon: <GooglePlay />, top: t("getItOn"), name: t("googlePlay") },
  ];

  return (
    <section className="relative overflow-hidden bg-[#071E14] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_700px_500px_at_50%_50%,rgba(42,138,95,0.08),transparent)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(201,164,69,0.3),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-2xl border border-[rgba(201,164,69,0.22)] bg-[#0F4A31]">
          <div className="grid grid-cols-1 items-center lg:grid-cols-2">
            <div className="p-10 lg:p-14">
              <div className="mb-6 flex items-center gap-2">
                <div className="flex size-10 items-center justify-center rounded-xl border border-[rgba(201,164,69,0.28)] bg-[rgba(201,164,69,0.12)]">
                  <Smartphone className="size-5 text-[#C9A445]" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A445]">
                  {t("eyebrow")}
                </span>
              </div>

              <h2
                className={`${headingFont(locale)} mb-4 text-4xl font-bold leading-tight text-[#FAF6EF] md:text-5xl`}
              >
                {t("title")}
                <br />
                <span className="gold-text">{t("titleHighlight")}</span>
              </h2>

              <p className="mb-8 text-base leading-relaxed text-[#8A8678]">
                {t("description")}
              </p>

              <div className="flex flex-wrap gap-4">
                {badges.map((badge) => (
                  <button
                    key={badge.name}
                    type="button"
                    className="flex items-center gap-3 rounded-xl bg-[#FAF6EF] px-5 py-3 font-medium text-[#071E14] transition-all duration-200 hover:bg-white"
                  >
                    {badge.icon}
                    <div className="text-start">
                      <div className="text-[10px] tracking-wider opacity-70">
                        {badge.top}
                      </div>
                      <div className="text-sm font-bold tracking-wide">
                        {badge.name}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="relative h-80 overflow-hidden lg:h-auto lg:min-h-130">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,164,69,0.07),transparent_70%)]" />
              <Image
                src="/app-mockup.webp"
                alt={t("imageAlt")}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain object-center p-8 lg:p-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
