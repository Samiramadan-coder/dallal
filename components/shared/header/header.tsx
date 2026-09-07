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
import Marquee from "react-fast-marquee";
import MobileMenu from "./mobile-control";
import { links } from "@/constants/shared";
import { useTranslations } from "next-intl";
import { DesktopControl } from "./desktop-control";
import { useIsScroll } from "@/hook/use-is-scroll";
import { usePathname } from "@/i18n/navigation";

export default function Header({
  actLikeIsScroll,
}: {
  actLikeIsScroll?: boolean;
}) {
  const isScroll = useIsScroll(84);
  const t = useTranslations("Navbar");
  const pathname = usePathname();

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

      {!pathname.includes("/auth") && (
        <div className="flex h-9 w-full overflow-hidden bg-card">
          <div className="text-[11px] shrink-0 bg-[#caaa43] px-6 flex items-center">
            GOLD TODAY · SAR
          </div>

          <div className="min-w-0 flex items-center flex-1 overflow-hidden">
            <Marquee
              speed={40}
              pauseOnHover
              gradient={false}
              className="w-full"
            >
              <div className="flex items-center gap-8 px-6">
                {Array.from({ length: 10 }).map((_, index) => (
                  <span key={index} className="inline-flex items-center gap-2">
                    <span className="text-xs text-[#e8d5a0] font-medium">
                      GOLD 18K
                    </span>
                    <span className="text-sm font-bold text-white">
                      SAR 236.90
                    </span>
                    <span className="text-xs text-[#3DAF77]">↗ +0.9%</span>
                  </span>
                ))}
              </div>
            </Marquee>
          </div>

          <div className="text-[#E8D5A0] text-xs shrink-0 px-5 flex items-center">
            05 Sep 2026
          </div>
        </div>
      )}
    </header>
  );
}
