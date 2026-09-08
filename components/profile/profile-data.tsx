"use client";

import { Card } from "../ui/card";
import { useLocale } from "next-intl";
import { useUser } from "@/providers/user-data";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import EyeBrow from "../reusable/eye-brow";
import { useTranslations } from "use-intl";

export default function ProfileData() {
  const locale = useLocale();
  const { user } = useUser();
  const fontClass = locale === "en" ? "font-playfair" : "";
  const t = useTranslations("Profile.profileData");

  return (
    <div className="bg-card-foreground">
      <div className="container max-w-7xl py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
          </div>

          <div className="md:col-span-3">
            <EyeBrow className="text-primary font-bold mb-2">
              {t("accountSettings")}
            </EyeBrow>

            <h3 className={`text-3xl font-bold mb-2 ${fontClass}`}>
              {t("personalInfo")}
            </h3>

            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
              {t("personalInfoDescription")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
