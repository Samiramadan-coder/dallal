"use client";

import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

const options = [
  { locale: "ar", label: "ع" },
  { locale: "en", label: "EN" },
] as const;

export default function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("Navbar");
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  const switchTo = (next: "ar" | "en") => {
    if (next === locale) return;
    // Keep the current query string (filters, tabs…) when switching.
    const search = typeof window !== "undefined" ? window.location.search : "";
    startTransition(() => {
      router.replace(`${pathname}${search}`, { locale: next });
    });
  };

  return (
    <div
      role="group"
      aria-label={t("language")}
      className={cn(
        "flex items-center rounded-lg border border-[rgba(201,164,69,0.25)] bg-[rgba(201,164,69,0.07)] p-0.5",
        pending && "opacity-60",
        className,
      )}
    >
      {options.map((option) => {
        const active = option.locale === locale;
        return (
          <button
            key={option.locale}
            type="button"
            lang={option.locale}
            aria-pressed={active}
            onClick={() => switchTo(option.locale)}
            className={cn(
              "min-w-8 rounded-md px-2 py-1 text-[11px] font-bold leading-none transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-[rgba(245,240,232,0.75)] hover:text-primary",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
