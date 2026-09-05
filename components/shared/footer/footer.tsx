"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Column } from "./column";
import { Mail, MapPin } from "lucide-react";
import Logo from "@/components/reusable/logo";
import { useLocale, useTranslations } from "next-intl";
import { browse, company, sellers, tools } from "@/constants/shared";

export default function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const fontClass = locale === "en" ? "font-playfair" : "";

  return (
    <footer className="bg-[rgb(7,30,20)] text-muted-foreground border-t border-[rgba(201,164,69,0.18)]">
      <div className="container max-w-350 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div>
            <div className="flex flex-col gap-2 mb-6">
              <Logo width={60} />
              <div>
                <p
                  className={cn(
                    "text-lg font-bold tracking-widest gold-text uppercase leading-none",
                    fontClass,
                  )}
                >
                  DALLAL HOOLEE
                </p>
                <p className="text-[10px] tracking-[0.15em] uppercase mt-1">
                  Where trust meets treasure
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed mb-6">{t("description")}</p>

            <div className="mt-5 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="size-3.5 text-primary" />
                <span>{t("location")}</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="size-3.5 text-primary" />
                <a href="mailto:hello@dallalhoolee.ae">hello@dallalhoolee.ae</a>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              {["IG", "X", "FB", "YT"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="flex size-8 items-center justify-center rounded-full border border-primary/30 text-[10px] transition hover:border-primary hover:text-primary"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          <Column
            title={t("browse.title")}
            links={browse}
            t={(key) => t(`browse.${key}`)}
          />

          <Column
            title={t("tools.title")}
            links={tools}
            t={(key) => t(`tools.${key}`)}
          />

          <Column
            title={t("sellers.title")}
            links={sellers}
            t={(key) => t(`sellers.${key}`)}
          />

          <Column
            title={t("company.title")}
            links={company}
            t={(key) => t(`company.${key}`)}
          />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-350 flex-col gap-4 px-6 py-5 text-xs md:flex-row md:items-center md:justify-between">
          <p>{t("copyright")}</p>
          <div className="flex flex-wrap gap-6">
            <Link href="/privacy">{t("privacy")}</Link>
            <Link href="/terms">{t("terms")}</Link>
            <Link href="/cookies">{t("cookies")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
