"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { PERSONAL_HOME, STORE_HOME } from "@/constants/account-menu";
import { useAccountMode, type AccountMode } from "@/hooks/use-account-mode";

// "Personal | <store name>" pill; only for users who own a store.
// Switching also opens that mode's home (account page / store dashboard)
export default function ModeSwitcher({
  className,
  onSwitch,
}: {
  className?: string;
  // e.g. close the mobile drawer
  onSwitch?: () => void;
}) {
  const t = useTranslations("AccountMenu");
  const router = useRouter();
  const { mode, setMode, store } = useAccountMode();

  if (!store) return null;

  const options: { id: AccountMode; label: string }[] = [
    { id: "personal", label: t("personal") },
    { id: "store", label: store.name },
  ];

  function select(next: AccountMode) {
    if (next === mode) return;
    setMode(next);
    onSwitch?.();
    router.push(next === "store" ? STORE_HOME : PERSONAL_HOME);
  }

  return (
    <div
      role="group"
      aria-label={t("switchLabel")}
      className={cn(
        "flex w-fit items-center rounded-full border border-[rgba(201,164,69,0.3)] bg-[rgba(201,164,69,0.06)] p-0.5",
        className,
      )}
    >
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          aria-pressed={mode === option.id}
          onClick={() => select(option.id)}
          className={cn(
            "max-w-37.5 truncate rounded-full px-3 py-1.5 text-[11px] font-bold transition-colors",
            mode === option.id
              ? "bg-[#C9A445] text-[#071E14]"
              : "text-[rgba(245,240,232,0.7)] hover:text-[#C9A445]",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
