"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Country } from "@/types/global";
import { Button } from "@/components/ui/button";
import { suggestCountry } from "@/lib/api/geo-suggest";
import { useSelectedCountry } from "@/hook/use-selected-country";
import { readCountryCookie, writeCountryCookie } from "@/lib/country-cookie";

// Remembers the visited country, and on a first visit (nothing remembered)
// suggests the visitor's own country instead of redirecting: the URL's
// country always wins, so shared links and search engines see what they asked for
export default function CountrySuggestion({
  code,
  countries,
}: {
  code: string;
  countries: Country[];
}) {
  const t = useTranslations("CountrySuggestion");
  const { select } = useSelectedCountry(countries);
  const [suggested, setSuggested] = useState<Country | null>(null);

  useEffect(() => {
    const saved = readCountryCookie();
    if (saved) {
      // Visiting another country (link, header) becomes the new preference
      if (saved !== code) writeCountryCookie(code);
      return;
    }

    // Called from the browser so the API sees the visitor's real IP
    let cancelled = false;
    suggestCountry(null).then((suggestion) => {
      if (cancelled) return;
      const match =
        suggestion && suggestion !== code
          ? countries.find(
              (c) => c.code.toLowerCase() === suggestion && c.status === "live",
            )
          : undefined;

      if (match) setSuggested(match);
      // Nothing better to suggest: this country is the preference
      else writeCountryCookie(code);
    });

    return () => {
      cancelled = true;
    };
  }, [code, countries]);

  if (!suggested) return null;

  const current = countries.find((c) => c.code.toLowerCase() === code);

  const stay = () => {
    writeCountryCookie(code);
    setSuggested(null);
  };

  const switchCountry = () => {
    setSuggested(null);
    select(suggested);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t("title")}
      className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-xl items-center gap-3 rounded-xl border border-primary/25 bg-card p-3 shadow-lg sm:p-4"
    >
      <Image
        src={suggested.flag}
        alt=""
        width={28}
        height={20}
        className="h-5 w-7 shrink-0 rounded-xs object-cover"
      />
      <p className="flex-1 text-sm text-card-foreground">
        {t("message", { country: suggested.name })}
      </p>
      <Button size="sm" onClick={switchCountry}>
        {t("switch")}
      </Button>
      <Button
        size="icon-sm"
        variant="ghost"
        onClick={stay}
        aria-label={t("stay", { country: current?.name ?? "" })}
        title={t("stay", { country: current?.name ?? "" })}
      >
        <X />
      </Button>
    </div>
  );
}
