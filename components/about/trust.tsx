import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Camera, FileCheck, MessageSquareText } from "lucide-react";
import { headingFont } from "@/constants/marketplace";

const points = [
  { key: "camera", icon: Camera },
  { key: "licence", icon: FileCheck },
  { key: "reviews", icon: MessageSquareText },
] as const;

export default async function Trust() {
  const locale = await getLocale();
  const t = await getTranslations("About.trust");
  const font = headingFont(locale);

  return (
    <section aria-labelledby="trust-title" className="mx-auto max-w-4xl px-6 py-14">
      <h2
        id="trust-title"
        className={cn(font, "text-2xl font-bold text-foreground md:text-3xl")}
      >
        {t("title")}
      </h2>
      <ul className="mt-6 grid gap-5 md:grid-cols-3">
        {points.map(({ key, icon: Icon }) => (
          <li key={key}>
            <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-card text-primary">
              <Icon size={22} aria-hidden />
            </span>
            <h3 className={cn(font, "text-lg font-bold text-foreground")}>
              {t(`${key}.title`)}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-[#4A4840]">
              {t(`${key}.body`)}
            </p>
          </li>
        ))}
      </ul>
      <Link
        href="/verified"
        className="mt-6 inline-block text-sm font-semibold text-[#1B6B4A] hover:underline"
      >
        {t("link")}
      </Link>
    </section>
  );
}
