"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { signOut } from "@/lib/auth";
import { ChevronDown } from "lucide-react";
import AccountAvatar from "./account-avatar";
import { useTranslations } from "next-intl";
import { useUser } from "@/providers/user-data";
import { Link, useRouter } from "@/i18n/navigation";
import { useAccountMode } from "@/hooks/use-account-mode";
import {
  OPEN_STORE_PATH,
  PERSONAL_HOME,
  STORE_HOME,
} from "@/constants/account-menu";

const itemClass =
  "cursor-pointer rounded-none px-4 py-2.5 text-sm text-[rgba(245,240,232,0.85)] focus:bg-[rgba(201,164,69,0.08)] focus:text-[#C9A445]";

// The signed-in user's avatar menu in the desktop header
export default function AccountMenu() {
  const t = useTranslations("AccountMenu");
  const router = useRouter();
  const { user } = useUser();
  const { mode, setMode, store, items } = useAccountMode();
  const [signingOut, startSignOut] = useTransition();

  if (!user) return null;

  function switchTo(next: "personal" | "store") {
    setMode(next);
    router.push(next === "store" ? STORE_HOME : PERSONAL_HOME);
  }

  // The action clears the cookie and redirects home; the root layout then
  // re-renders with no user
  function handleSignOut() {
    setMode("personal");
    startSignOut(() => signOut());
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t("label")}
        className="flex items-center gap-1 rounded-full pe-1 outline-none transition-colors hover:bg-[rgba(201,164,69,0.08)] focus-visible:ring-2 focus-visible:ring-[#C9A445]/50 data-[state=open]:[&>svg]:rotate-180"
      >
        <AccountAvatar />
        <ChevronDown
          size={11}
          className="text-[rgba(245,240,232,0.6)] transition-transform"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-60 rounded-2xl border border-[rgba(201,164,69,0.2)] bg-[#0D3525] p-0 py-1 text-[#FAF6EF] shadow-[0_16px_48px_rgba(0,0,0,0.6)] ring-0"
      >
        {items.map((item) => (
          <DropdownMenuItem key={item.href} asChild className={itemClass}>
            <Link href={item.href}>{t(`items.${item.key}`)}</Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator className="mx-0 my-1 bg-[rgba(201,164,69,0.12)]" />

        {store ? (
          <DropdownMenuItem
            className={itemClass}
            onSelect={() => switchTo(mode === "store" ? "personal" : "store")}
          >
            {mode === "store" ? t("switchToPersonal") : t("switchToStore")}
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem asChild className={itemClass}>
            <Link href={OPEN_STORE_PATH}>{t("openStore")}</Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem
          className={itemClass}
          disabled={signingOut}
          onSelect={handleSignOut}
        >
          {t("signOut")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
