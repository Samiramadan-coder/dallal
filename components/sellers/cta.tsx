import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { getLocale, getTranslations } from "next-intl/server";

export default async function Cta() {
  const locale = await getLocale();
  const t = await getTranslations("ForSellers.cta");
  const fontClass = locale === "en" ? "font-playfair" : "";

  return (
    <section className="relative overflow-hidden bg-background py-16 lg:py-20">
      <div className="relative z-10 mx-auto w-full max-w-190 px-5 text-center sm:px-8">
        <h2
          className={`text-3xl font-bold text-card-foreground text-balance ${fontClass}`}
        >
          {t("title")}
        </h2>
        <p className="mx-auto mt-4 max-w-150 text-sm leading-relaxed text-[#f5f0e880]">
          {t("description")}
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            className="
              bg-primary
              h-12
              min-w-45
              rounded-xl
              px-7
              font-semibold
              text-primary-foreground
              shadow-[0_10px_30px_rgba(201,164,69,0.16)]
              transition-all
              hover:-translate-y-0.5
              hover:opacity-90
            "
          >
            <Link href="/register">{t("primary")}</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="
              h-12
              min-w-45
              rounded-xl
              border-primary/25
              bg-transparent
              px-7
              font-semibold
              text-card-foreground/75
              hover:border-primary/50
              hover:bg-primary/5
              hover:text-card-foreground
            "
          >
            <Link href="/listings">{t("secondary")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
