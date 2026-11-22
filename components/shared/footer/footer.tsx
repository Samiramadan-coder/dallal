"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { footerColumns } from "@/constants/shared";
import { useCountries } from "@/providers/countries";

export default function Footer() {
  const t = useTranslations("Footer");
  // From the API, in the page's language
  const countries = useCountries();
  const locale = useLocale();
  const fontClass = locale === "en" ? "font-playfair" : "";

  return (
    <footer className="border-t border-primary/18 bg-background">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-14">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/logo.png"
                alt=""
                width={56}
                height={56}
                className="object-contain"
              />
              <span>
                <span
                  className={cn(
                    "gold-text block text-lg font-bold uppercase leading-none tracking-widest",
                    fontClass,
                  )}
                >
                  {t("brand")}
                </span>
                <span className="mt-1 block text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  {t("tagline")}
                </span>
              </span>
            </Link>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.key} aria-label={t(`${column.key}.title`)}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {t(`${column.key}.title`)}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#B9B5A6] transition-colors hover:text-card-foreground"
                    >
                      {t(`${column.key}.${link.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 border-t border-primary/12 pt-6">
          <h3 className="sr-only">{t("countries")}</h3>
          <ul className="flex flex-wrap gap-3">
            {countries.map((c) => (
              <li
                key={c.code}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-4 py-2 text-sm",
                  c.status === "live"
                    ? "border-primary/40 text-card-foreground"
                    : "border-primary/12 text-muted-foreground",
                )}
              >
                {c.flag && (
                <Image
                  src={c.flag}
                  alt=""
                  width={20}
                  height={14}
                  className="h-3.5 w-5 rounded-xs object-cover"
                />
              )}
                {c.name}
                {c.status !== "live" && (
                  <span className="rounded-full bg-primary/12 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                    {t("soon")}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">{t("disclaimer")}</p>
        </div>
      </div>
    </footer>
  );
}
