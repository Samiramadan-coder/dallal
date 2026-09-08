import { cn } from "@/lib/utils";
import EyeBrow from "../reusable/eye-brow";
import { getLocale, getTranslations } from "next-intl/server";

export default async function Hero() {
  const locale = await getLocale();
  const t = await getTranslations("Profile.hero");
  const fontClass = locale === "en" ? "font-playfair" : "";

  return (
    <div className="mt-30 py-20 lg:py-24">
      <div className="container max-w-7xl">
        <EyeBrow className="text-primary mb-2">{t("eyebrow")}</EyeBrow>

        <h1
          className={cn(
            "text-4xl font-bold text-balance leading-[1.05] max-w-4xl",
            fontClass,
          )}
        >
          <span className="text-secondary-foreground">{t("account")}</span>{" "}
          <span className="gold-text">{t("center")}</span>
        </h1>

        <p className="text-sm leading-8 text-[#f5f0e873] mt-2">
          {t("description")}
        </p>
      </div>
    </div>
  );
}
