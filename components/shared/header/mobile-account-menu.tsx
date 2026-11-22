"use client";

import { useTransition } from "react";
import { signOut } from "@/lib/auth";
import ModeSwitcher from "./mode-switcher";
import AccountAvatar from "./account-avatar";
import { useTranslations } from "next-intl";
import { Spinner } from "@/components/ui/spinner";
import { useUser } from "@/providers/user-data";
import { DrawerClose } from "@/components/ui/drawer";
import { Link, useRouter } from "@/i18n/navigation";
import { useAccountMode } from "@/hooks/use-account-mode";
import {
  OPEN_STORE_PATH,
  PERSONAL_HOME,
  STORE_HOME,
} from "@/constants/account-menu";

const itemClass =
  "block w-full py-2 text-start text-sm text-[rgba(245,240,232,0.85)] transition-colors hover:text-[#C9A445] disabled:opacity-50";

// The avatar menu's items inside the mobile drawer
export default function MobileAccountMenu({
  onNavigate,
}: {
  // Closes the drawer
  onNavigate: () => void;
}) {
  const t = useTranslations("AccountMenu");
  const router = useRouter();
  const { user } = useUser();
  const { mode, setMode, store, items } = useAccountMode();
  const [signingOut, startSignOut] = useTransition();

  if (!user) return null;

  function switchTo(next: "personal" | "store") {
    setMode(next);
    onNavigate();
    router.push(next === "store" ? STORE_HOME : PERSONAL_HOME);
  }

  function handleSignOut() {
    setMode("personal");
    startSignOut(() => signOut());
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <AccountAvatar className="size-10" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[#FAF6EF]">
            {mode === "store" && store ? store.name : user.name}
          </p>
          <p className="truncate text-[11px] text-[rgba(245,240,232,0.5)]">
            {user.email}
          </p>
        </div>
      </div>

      <ModeSwitcher onSwitch={onNavigate} />

      <nav aria-label={t("label")} className="flex flex-col">
        {items.map((item) => (
          <DrawerClose key={item.href} asChild>
            <Link href={item.href} className={itemClass}>
              {t(`items.${item.key}`)}
            </Link>
          </DrawerClose>
        ))}

        <div className="my-2 border-t border-[rgba(201,164,69,0.12)]" />

        {store ? (
          <button
            type="button"
            className={itemClass}
            onClick={() => switchTo(mode === "store" ? "personal" : "store")}
          >
            {mode === "store" ? t("switchToPersonal") : t("switchToStore")}
          </button>
        ) : (
          <DrawerClose asChild>
            <Link href={OPEN_STORE_PATH} className={itemClass}>
              {t("openStore")}
            </Link>
          </DrawerClose>
        )}

        <button
          type="button"
          className={itemClass}
          disabled={signingOut}
          onClick={handleSignOut}
        >
          {signingOut && <Spinner className="me-2 inline size-3" />}
          {t("signOut")}
        </button>
      </nav>
    </div>
  );
}
