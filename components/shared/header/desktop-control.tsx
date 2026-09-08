"use client";

import { Button } from "../../ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useUser } from "@/providers/user-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function DesktopControl() {
  const t = useTranslations("Navbar");
  const { user } = useUser();

  return (
    <div className="flex items-center gap-3">
      {user ? (
        <Link href="/profile">
          <Avatar>
            <AvatarImage src={""} alt="@shadcn" className="grayscale" />
            <AvatarFallback className="text-white">
              {user?.name?.[0] ?? "?"}
            </AvatarFallback>
          </Avatar>
        </Link>
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
        className="h-9.5 px-4 py-2.5 rounded bg-primary hover:bg-[#E8D5A0] transition-all duration-200 shadow-[0_4px_16px_rgba(201,164,69,0.28)]"
      >
        <Link href="/post-listing">
          <span className="whitespace-nowrap text-[11px] xl:text-[12px] tracking-widest font-bold uppercase  text-primary-foreground">
            {t("postListing")}
          </span>
        </Link>
      </Button>
    </div>
  );
}
