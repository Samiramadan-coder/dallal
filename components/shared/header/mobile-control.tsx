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
import { useUser } from "@/providers/user-data";

export default function MobileMenu() {
  const { user } = useUser();
  const t = useTranslations("Navbar");

  return (
    <Drawer direction="top">
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
                        <NavLink href={link.href}>{t(link.key)}</NavLink>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </nav>

            <Separator className="my-4" />

            <div className="flex flex-col gap-3">
              {user ? (
                <Button
                  asChild
                  className="h-9.5 px-4 py-2.5 rounded bg-white hover:bg-[#E8D5A0] transition-all duration-200 shadow-[0_4px_16px_rgba(201,164,69,0.28)]"
                >
                  <Link href="/post-listing">
                    <span className="whitespace-nowrap text-[11px] xl:text-[12px] tracking-widest font-bold uppercase  text-primary-foreground">
                      {t("manageProfile")}
                    </span>
                  </Link>
                </Button>
              ) : (
                <Button
                  asChild
                  variant="ghost"
                  className="hover:bg-transparent"
                >
                  <Link href="/auth?action=sign-in">
                    <span className="whitespace-nowrap text-[11px] tracking-[0.08em] text-[rgba(245,240,232,0.7)] hover:text-primary transition-colors px-3 py-2 uppercase font-semibold">
                      {t("signIn")}
                    </span>
                  </Link>
                </Button>
              )}

              <Button
                asChild
                className="h-9.5 px-4 py-2.5 rounded bg-primary hover:bg-[#E8D5A0] transition-all duration-200 shadow-[0_4px_16px_rgba(201,164,69,0.28)]"
              >
                <Link href="/post-listing">
                  <span className="whitespace-nowrap text-[11px] xl:text-[12px] tracking-widest font-bold uppercase  text-primary-foreground">
                    {t("postListing")}
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
