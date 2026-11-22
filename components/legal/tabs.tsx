"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const tabs = [
  { key: "terms", href: "/legal/terms" },
  { key: "privacy", href: "/legal/privacy" },
] as const;

export default function LegalTabs() {
  const t = useTranslations("Legal");
  const pathname = usePathname();

  return (
    <div className="mb-10 flex w-fit items-center gap-1 rounded-xl border border-[rgba(27,107,74,0.1)] bg-white p-1 shadow-sm">
      {tabs.map((tab) => {
        const active = pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.key}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-lg px-6 py-2.5 text-sm font-semibold tracking-wide transition-all duration-200",
              active
                ? "bg-card text-card-foreground shadow-md"
                : "text-[#4A4840] hover:text-[#1B6B4A]",
            )}
          >
            {t(tab.key)}
          </Link>
        );
      })}
    </div>
  );
}
