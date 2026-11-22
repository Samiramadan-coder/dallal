"use client";

import { Button } from "../../ui/button";
import { Link } from "@/i18n/navigation";
import GatedLink from "@/components/auth/gated-link";
import { Country } from "@/types/global";
import { useTranslations } from "next-intl";
import { useUser } from "@/providers/user-data";
import LanguageSwitcher from "./language-switcher";
import { CountryDropdown } from "./country-switcher";
import AccountMenu from "./account-menu";
import ModeSwitcher from "./mode-switcher";

export function DesktopControl({ countries }: { countries: Country[] }) {
  const t = useTranslations("Navbar");
  const { user } = useUser();

  return (
    <div className="flex items-center gap-3">
      <CountryDropdown countries={countries} />
      <LanguageSwitcher />

      {user ? (
        <>
          <ModeSwitcher className="me-1" />
          <AccountMenu />
        </>
      ) : (
        <Button asChild variant="ghost" className="hover:bg-transparent">
          <Link href="/auth?action=sign-in">
            <span className="whitespace-nowrap text-[11px] tracking-[0.08em] text-[rgba(245,240,232,0.7)] hover:text-primary transition-colors px-3 py-2 uppercase font-semibold">
              {t("signIn")}
            </span>
          </Link>
        </Button>
      )}

      <Button
        asChild
        className="h-9.5 px-4 py-2.5 rounded bg-primary hover:bg-[#E8D5A0] transition-all duration-200 shadow-[0_4px_16px_color-mix(in_srgb,var(--primary)_28%,transparent)]"
      >
        <GatedLink href="/sell">
          <span className="whitespace-nowrap text-[11px] xl:text-[12px] tracking-widest font-bold uppercase  text-primary-foreground">
            {t("sellYourGold")}
          </span>
        </GatedLink>
      </Button>
    </div>
  );
}
