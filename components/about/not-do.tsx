import { cn } from "@/lib/utils";
import { getLocale, getTranslations } from "next-intl/server";
import { headingFont } from "@/constants/marketplace";

const items = ["payments", "commission", "shipping"] as const;

export default async function NotDo() {
  const locale = await getLocale();
  const t = await getTranslations("About.notDo");
  const font = headingFont(locale);

  return (
    <section aria-labelledby="not-title" className="mx-auto max-w-4xl px-6 py-14">
      <h2
        id="not-title"
        className={cn(font, "text-2xl font-bold text-foreground md:text-3xl")}
      >
        {t("title")}
      </h2>
      <ul className="mt-5 grid gap-4 sm:grid-cols-3">
        {items.map((key) => (
          <li
            key={key}
            className="rounded-xl border border-[rgba(27,107,74,0.15)] bg-white px-5 py-4 font-semibold text-card"
          >
            {t(`items.${key}`)}
          </li>
        ))}
      </ul>
      <p className="mt-4 leading-relaxed text-[#4A4840]">{t("note")}</p>
    </section>
  );
}
