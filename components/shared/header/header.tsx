"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../ui/navigation-menu";
import { cn } from "@/lib/utils";
import { NavLink } from "./nav-link";
import Logo from "../../reusable/logo";
import { links } from "@/constants/shared";
import { useTranslations } from "next-intl";
import { DesktopControl } from "./desktop-control";
import { useIsScroll } from "@/hook/use-is-scroll";
import MobileMenu from "./mobile-control";

export default function Header({
  actLikeIsScroll,
}: {
  actLikeIsScroll?: boolean;
}) {
  const isScroll = useIsScroll(84);
  const t = useTranslations("Navbar");

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-transparent",
        (isScroll || actLikeIsScroll) &&
          "bg-background border-b border-[rgba(201,164,69,0.18)] shadow-[0_4px_40px_rgba(0,0,0,0.6)]",
      )}
    >
      <div className="container max-w-350 h-21 text-white flex items-center justify-between">
        <Logo />

        <nav className="hidden lg:block">
          <NavigationMenu>
            <NavigationMenuList className="gap-6">
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

        <div className="hidden lg:block">
          <DesktopControl />
        </div>

        <div className="lg:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
