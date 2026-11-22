import { cn } from "@/lib/utils";
import { getLocale, getTranslations } from "next-intl/server";
import { headingFont } from "@/constants/marketplace";

const audiences = ["buyers", "sellers", "stores"] as const;

export default async function Audiences() {
  const locale = await getLocale();
  const t = await getTranslations("About.audiences");
  const font = headingFont(locale);

  return (
    <section aria-labelledby="who-title" className="bg-white py-14">
      <div className="mx-auto max-w-4xl px-6">
        <h2
          id="who-title"
          className={cn(font, "text-2xl font-bold text-foreground md:text-3xl")}
        >
          {t("title")}
        </h2>
        <ul className="mt-6 grid gap-5 md:grid-cols-3">
          {audiences.map((key) => (
            <li
              key={key}
              className="rounded-2xl border border-[rgba(27,107,74,0.15)] bg-card-foreground p-6"
            >
              <h3 className={cn(font, "text-lg font-bold text-card")}>
                {t(`${key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#4A4840]">
                {t(`${key}.body`)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
