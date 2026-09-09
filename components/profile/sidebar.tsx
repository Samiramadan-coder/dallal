"use client";

import { useState } from "react";
import { http } from "@/lib/http";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { deleteToken } from "@/lib/cookies";
import { LogOut, Phone, User } from "lucide-react";
import { useUser } from "@/providers/user-data";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Item, ItemContent, ItemMedia, ItemTitle } from "../ui/item";

export default function SideBar() {
  const pathname = usePathname();
  const locale = useLocale();
  const { user, setUser } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const t = useTranslations("Profile.profileData");
  const fontClass = locale === "en" ? "font-playfair" : "";

  async function handleLogout() {
    setLoading(true);
    await http.post("/api/v1/auth/logout");
    await deleteToken();
    setUser(null);
    router.push(`/`);
  }

  const items = [
    {
      title: t("profileInfo"),
      href: "/profile",
      icon: User,
    },
    {
      title: t("myPhones"),
      href: "/profile/phones",
      icon: Phone,
    },
  ];

  return (
    <div>
      <Card className="flex-col items-center bg-background px-6 py-6 shadow-[0px_4px_24px_rgba(0,0,0,0.18)]">
        <div className="flex flex-col items-center">
          <Avatar className="size-16 mb-2">
            <AvatarImage src={""} alt={user?.name || "User Avatar"} />
            <AvatarFallback className="text-white font-semibold text-xl">
              {user?.name?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
          <p
            className={`text-sm font-bold text-card-foreground leading-tight ${fontClass}`}
          >
            {user?.name}
          </p>
          <p className="text-[10px] text-[#f5f0e866] mt-1 truncate px-2">
            {user?.email}
          </p>
        </div>
      </Card>

      <div className="mt-4">
        {items.map((item) => (
          <Item
            key={item.href}
            variant="default"
            className={`hover:text-[#1B6B4A] hover:bg-[#1B6B4A]/10! ${item.href === pathname ? "text-white bg-[#1B6B4A] hover:bg-[#1B6B4A]! hover:text-white" : ""}`}
            size="sm"
            asChild
          >
            <Link href={item.href}>
              <ItemMedia>
                <item.icon className="size-4" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="text-[13px] font-normal">
                  {item.title}
                </ItemTitle>
              </ItemContent>
              {/* <ItemActions>
                <ChevronRightIcon className="size-4" />
              </ItemActions> */}
            </Link>
          </Item>
        ))}
      </div>

      <Button
        className="mt-4 w-full h-11"
        variant="destructive"
        onClick={handleLogout}
        disabled={loading}
      >
        {loading ? <Spinner /> : <LogOut />}
        {t("logout")}
      </Button>
    </div>
  );
}
