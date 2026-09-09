"use client";

import { useUser } from "@/providers/user-data";
import { useTranslations } from "next-intl";
import { Card } from "../ui/card";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Camera } from "lucide-react";
import { useLocale } from "next-intl";
import { Button } from "../ui/button";
import Input from "../form/input";
import { useForm } from "react-hook-form";

export default function ProfileInfo() {
  const { user } = useUser();
  const locale = useLocale();
  const t = useTranslations("Profile.profileData");
  const fontClass = locale === "en" ? "font-playfair" : "";

  const {
    register,
    formState: { errors },
  } = useForm<{ name: string; email: string }>({
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
    },
  });

  return (
    <div className="space-y-4">
      <Card className="bg-white text-foreground ring-0! border border-card/10">
        <div className="flex items-center gap-4 justify-between px-6">
          <div className="flex-1 flex items-center gap-4">
            <div>
              <Avatar className="size-14">
                <AvatarImage src="" alt="@evilrabbit" />
                <AvatarFallback className="text-white">
                  {user?.name?.[0] ?? "?"}
                </AvatarFallback>
                <AvatarBadge className="bg-card size-5!">
                  <Camera className="text-white size-3!" />
                </AvatarBadge>
              </Avatar>
            </div>
            <div>
              <p className={`text-base font-bold ${fontClass}`}>{user?.name}</p>
            </div>
          </div>
          <div>
            <Button
              variant="outline"
              className="bg-transparent text-muted-foreground text-xs hover:bg-transparent"
            >
              {t("uploadPhoto")}
            </Button>
          </div>
        </div>
      </Card>

      <Card className="bg-white text-foreground ring-0! border border-card/10">
        <div className="px-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-1 h-5 rounded-full bg-primary"></div>
            <h3 className={`text-base font-bold ${fontClass}`}>
              Personal Details
            </h3>
          </div>

          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              register={register}
              name="name"
              label="full name"
              required
              errors={errors}
            />

            <Input
              register={register}
              name="email"
              label="email address"
              required
              errors={errors}
            />
          </form>
        </div>
      </Card>
    </div>
  );
}
