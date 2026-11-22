"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { NavLink } from "./nav-link";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { links } from "@/constants/shared";
import { useTranslations } from "next-intl";
import Logo from "@/components/reusable/logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import LanguageSwitcher from "./language-switcher";
import { useUser } from "@/providers/user-data";
import { Country } from "@/types/global";
import GatedLink from "@/components/auth/gated-link";
import { CountryGrid } from "./country-switcher";
import MobileAccountMenu from "./mobile-account-menu";
import { useState } from "react";

export default function MobileMenu({ countries }: { countries: Country[] }) {
  const { user } = useUser();
  const t = useTranslations("Navbar");
  // Controlled, so the account menu can close it after switching mode
  const [open, setOpen] = useState(false);

  return (
    <Drawer direction="top" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="size-5" />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="h-[92vh]! rounded-none! border-none bg-background p-0">
        <div className="flex h-full flex-col overflow-y-auto">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <Logo width={60} />
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="text-primary">
                <X className="size-6" />
              </Button>
            </DrawerClose>
          </div>

          <div className="p-4">
            <nav>
              <NavigationMenu>
                <NavigationMenuList className="gap-6 flex-col items-start">
                  {links.map((link) => (
                    <NavigationMenuItem key={link.href}>
                      <NavigationMenuLink asChild>
                        <DrawerClose asChild>
                          <NavLink href={link.href}>{t(link.key)}</NavLink>
                        </DrawerClose>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </nav>

            <Separator className="my-4" />

            <LanguageSwitcher className="mb-4 w-fit" />

            <CountryGrid countries={countries} />

            <Separator className="my-4" />

            <div className="flex flex-col gap-3">
              {user ? (
                <>
                  <MobileAccountMenu onNavigate={() => setOpen(false)} />
                  <Separator className="my-1" />
                </>
              ) : (
                <Button
                  asChild
                  variant="ghost"
                  className="hover:bg-transparent"
                >
                  <DrawerClose asChild>
                    <Link href="/auth?action=sign-in">
                      <span className="whitespace-nowrap text-[11px] tracking-[0.08em] text-[rgba(245,240,232,0.7)] hover:text-primary transition-colors px-3 py-2 uppercase font-semibold">
                        {t("signIn")}
                      </span>
                    </Link>
                  </DrawerClose>
                </Button>
              )}

              <Button
                asChild
                className="h-9.5 px-4 py-2.5 rounded bg-primary hover:bg-[#E8D5A0] transition-all duration-200 shadow-[0_4px_16px_color-mix(in_srgb,var(--primary)_28%,transparent)]"
              >
                <DrawerClose asChild>
                  <GatedLink href="/post-listing">
                    <span className="whitespace-nowrap text-[11px] xl:text-[12px] tracking-widest font-bold uppercase  text-primary-foreground">
                      {t("postListing")}
                    </span>
                  </GatedLink>
                </DrawerClose>
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
