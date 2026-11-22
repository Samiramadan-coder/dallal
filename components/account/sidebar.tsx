"use client";

import { useTransition } from "react";
import { useTranslations } from "next-intl";
import {
  BellRing,
  Bell,
  BookmarkCheck,
  Coins,
  HandCoins,
  LayoutGrid,
  Landmark,
  LogOut,
  MessageSquare,
  Settings,
  Tag,
  User,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "@/lib/auth";
import { useUser } from "@/providers/user-data";
import { Link, usePathname } from "@/i18n/navigation";
import { ACCOUNT_SECTIONS } from "@/constants/account";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Spinner } from "../ui/spinner";

const ICONS: Record<string, LucideIcon> = {
  overview: LayoutGrid,
  saved: BookmarkCheck,
  alerts: BellRing,
  offers: HandCoins,
  sellRequests: Coins,
  messages: MessageSquare,
  notifications: Bell,
  portfolio: Landmark,
  listings: Tag,
  profile: User,
  settings: Settings,
};

function isActive(pathname: string, href: string) {
  if (href === "/account") return pathname === "/account";
  return pathname === href || pathname.startsWith(`${href}/`);
}

// Desktop: full-height column. Mobile: see AccountMobileNav
export default function AccountSidebar() {
  const t = useTranslations("Account");
  const pathname = usePathname();
  const { user } = useUser();
  const [loading, startTransition] = useTransition();

  return (
    // top-40 = header (120px) + 40px gap; the height leaves the same gap below
    <aside className="hidden lg:flex w-64 shrink-0 flex-col overflow-hidden rounded-2xl bg-background text-card-foreground sticky top-40 h-[calc(100vh-200px)] min-h-120">
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/6">
        <Avatar className="size-12 ring-2 ring-primary/40">
          <AvatarImage src={user?.avatar_url ?? undefined} alt={user?.name ?? ""} />
          <AvatarFallback className="bg-secondary text-card-foreground font-semibold">
            {user?.name?.[0] ?? "U"}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="text-sm font-bold truncate">{user?.name}</p>
          <p className="text-[10px] font-bold tracking-[0.08em] rtl:tracking-normal uppercase text-primary mt-0.5">
            {t("accountType.individual")}
          </p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-3">
        <ul>
          {ACCOUNT_SECTIONS.map((item) => {
            const Icon = ICONS[item.key];
            const active = isActive(pathname, item.href);
            const badge = item.unread ? user?.unread_counts[item.unread] : 0;
            return (
              <li key={item.key}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 px-5 h-10 text-sm font-medium border-e-2 border-transparent text-card-foreground/75 transition-colors hover:text-card-foreground hover:bg-white/4",
                    active &&
                      "text-primary bg-white/5 border-primary hover:text-primary",
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  <span className="flex-1 truncate">
                    {t(`nav.${item.key}`)}
                  </span>
                  {badge ? (
                    <span className="grid place-items-center size-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                      {badge}
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-white/6 px-5 py-4">
        <button
          type="button"
          onClick={() => startTransition(() => signOut())}
          disabled={loading}
          className="flex items-center gap-2 text-xs text-card-foreground/60 hover:text-card-foreground transition-colors disabled:opacity-60"
        >
          {loading ? (
            <Spinner className="size-3.5" />
          ) : (
            <LogOut className="size-3.5 rtl:rotate-180" />
          )}
          {t("signOut")}
        </button>
      </div>
    </aside>
  );
}

// Below lg the sidebar collapses into a scrollable strip above the content
export function AccountMobileNav() {
  const t = useTranslations("Account");
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <nav className="lg:hidden -mx-4 sm:-mx-5 mb-6 overflow-x-auto [scrollbar-width:none]">
      <ul className="flex gap-2 px-4 sm:px-5 w-max">
        {ACCOUNT_SECTIONS.map((item) => {
          const Icon = ICONS[item.key];
          const active = isActive(pathname, item.href);
            const badge = item.unread ? user?.unread_counts[item.unread] : 0;
          return (
            <li key={item.key}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2 h-9 px-3.5 rounded-full border text-[13px] font-medium whitespace-nowrap transition-colors",
                  active
                    ? "bg-background text-primary border-background"
                    : "bg-white text-foreground border-[#ebe4d6] hover:border-primary/50",
                )}
              >
                <Icon className="size-3.5" />
                {t(`nav.${item.key}`)}
                {badge ? (
                  <span className="grid place-items-center size-4.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                    {badge}
                  </span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
