"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { passwordStrength, STRENGTH_LEVELS } from "@/lib/password";

// Per score (weak, fair, good, strong): bars filled, bar colour, label colour.
// Weak still fills one bar so its red is visible
const LEVEL_STYLES = [
  { bars: 1, bar: "bg-[#C0453B]", text: "text-[#C0453B]" },
  { bars: 1, bar: "bg-[#E0A526]", text: "text-[#B7841A]" },
  { bars: 2, bar: "bg-[#E0A526]", text: "text-[#B7841A]" },
  { bars: 3, bar: "bg-[#1B6B4A]", text: "text-[#1B6B4A]" },
] as const;

// Strength meter under a new-password field; hidden while it's empty
export default function PasswordStrength({ value }: { value: string }) {
  const t = useTranslations("Auth.Password.strength");

  if (!value) return null;
  const score = passwordStrength(value);
  const style = LEVEL_STYLES[score];

  return (
    <div className="flex items-center gap-2" aria-live="polite">
      <div className="flex flex-1 gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              i < style.bars ? style.bar : "bg-[rgba(27,107,74,0.12)]",
            )}
          />
        ))}
      </div>
      <span className={cn("text-[11px] font-medium", style.text)}>
        {t(STRENGTH_LEVELS[score])}
      </span>
    </div>
  );
}
