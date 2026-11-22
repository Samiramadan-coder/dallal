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

// Where the visitor is, asked once per browser session
const DETECTED_KEY = "dallal:detected-country";
// Travel banners dismissed per detected country: { sa: expiresAt }
const DISMISSED_KEY = "dallal:travel-dismissed";
const DISMISS_FOR = 7 * 24 * 60 * 60 * 1000;

// Storage can be blocked (private mode, disabled site data)
function readStorage(storage: "local" | "session", key: string) {
  try {
    return (storage === "local" ? localStorage : sessionStorage).getItem(key);
  } catch {
    return null;
  }
}
function writeStorage(storage: "local" | "session", key: string, value: string) {
  try {
    (storage === "local" ? localStorage : sessionStorage).setItem(key, value);
  } catch {
    // Not remembered: the banner may show again, which is harmless
  }
}

function readDismissed(): Record<string, number> {
  try {
    return JSON.parse(readStorage("local", DISMISSED_KEY) ?? "{}");
  } catch {
    return {};
  }
}

// Detected country code ("sa"), cached for the session. "" = unknown
async function detectCountry(): Promise<string> {
  const cached = readStorage("session", DETECTED_KEY);
  if (cached !== null) return cached;
  // Called from the browser so the API sees the visitor's real IP
  const code = (await suggestCountry(null)) ?? "";
  writeStorage("session", DETECTED_KEY, code);
  return code;
}

type Suggestion = { country: Country; kind: "first-visit" | "travel" };

// Never switches the country by itself: the URL's country always wins, so
// shared links and search engines see what they asked for.
// - First visit (nothing remembered): suggests the visitor's own country
// - Later visits: when the visitor is somewhere else than the country they
//   browse (e.g. travelling), offers that country, until dismissed
export default function CountrySuggestion({
  code,
  countries,
}: {
  code: string;
  countries: Country[];
}) {
  const t = useTranslations("CountrySuggestion");
  const { select } = useSelectedCountry(countries);
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);

  useEffect(() => {
    const saved = readCountryCookie();
    // Visiting another country (link, header) becomes the new preference
    if (saved && saved !== code) writeCountryCookie(code);

    let cancelled = false;
    detectCountry().then((detected) => {
      if (cancelled) return;
      const match =
        detected && detected !== code
          ? countries.find(
              (c) => c.code.toLowerCase() === detected && c.status === "live",
            )
          : undefined;

      if (!saved) {
        if (match) setSuggestion({ country: match, kind: "first-visit" });
        // Nothing better to suggest: this country is the preference
        else writeCountryCookie(code);
        return;
      }

      const dismissedUntil = match ? readDismissed()[detected] : undefined;
      if (match && !(dismissedUntil && dismissedUntil > Date.now())) {
        setSuggestion({ country: match, kind: "travel" });
      } else {
        setSuggestion(null);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [code, countries]);

  if (!suggestion) return null;

  const { country: suggested, kind } = suggestion;
  const current = countries.find((c) => c.code.toLowerCase() === code);

  const dismiss = () => {
    if (kind === "first-visit") {
      writeCountryCookie(code);
    } else {
      writeStorage(
        "local",
        DISMISSED_KEY,
        JSON.stringify({
          ...readDismissed(),
          [suggested.code.toLowerCase()]: Date.now() + DISMISS_FOR,
        }),
      );
    }
    setSuggestion(null);
  };

  const switchCountry = () => {
    setSuggestion(null);
    select(suggested);
  };

  const message =
    kind === "travel"
      ? t("travel", { country: suggested.name })
      : t("message", { country: suggested.name });
  const dismissLabel =
    kind === "travel"
      ? t("dismiss")
      : t("stay", { country: current?.name ?? "" });

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t("title")}
      className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-xl items-center gap-3 rounded-xl border border-primary/25 bg-card p-3 shadow-lg sm:p-4"
    >
      {suggested.flag && (
        <Image
          src={suggested.flag}
          alt=""
          width={28}
          height={20}
          className="h-5 w-7 shrink-0 rounded-xs object-cover"
        />
      )}
      <p className="flex-1 text-sm text-card-foreground">{message}</p>
      <Button size="sm" onClick={switchCountry}>
        {t("switch")}
      </Button>
      <Button
        size="icon-sm"
        variant="ghost"
        onClick={dismiss}
        aria-label={dismissLabel}
        title={dismissLabel}
      >
        <X />
      </Button>
    </div>
  );
}
