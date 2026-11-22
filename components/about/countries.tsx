import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { countries, headingFont } from "@/constants/marketplace";

export default async function Countries() {
  const locale = await getLocale();
  const t = await getTranslations("About.countries");
  const font = headingFont(locale);

  return (
    <section aria-labelledby="countries-title" className="bg-white py-14">
      <div className="mx-auto max-w-4xl px-6">
        <h2
          id="countries-title"
          className={cn(font, "text-2xl font-bold text-foreground md:text-3xl")}
        >
          {t("title")}
        </h2>
        <ul className="mt-6 flex flex-wrap gap-3">
          {countries.map((c) => (
            <li
              key={c.key}
              className={cn(
                "flex items-center gap-2 rounded-full border px-4 py-2 text-sm",
                c.available
                  ? "border-[rgba(27,107,74,0.4)] bg-card-foreground text-card"
                  : "border-[rgba(27,107,74,0.12)] text-muted-foreground",
              )}
            >
              <span aria-hidden="true">{c.flag}</span>
              {c.name}
              {!c.available && (
                <span className="text-[11px] font-semibold uppercase">{t("soon")}</span>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-[#4A4840]">
          {t("questions")}{" "}
          <Link href="/support" className="font-semibold text-[#1B6B4A] hover:underline">
            {t("support")}
          </Link>
        </p>
      </div>
    </section>
  );
}
