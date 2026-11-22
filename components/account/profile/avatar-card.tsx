"use client";

import { toast } from "sonner";
import { updateAvatar } from "@/lib/profile";
import { useUser } from "@/providers/user-data";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Camera, ShieldCheck } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { useEffect, useRef, useState, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
// Keep under serverActions.bodySizeLimit in next.config.ts
const MAX_SIZE_MB = 5;

// First card on the profile page: photo, name, join date, verified badge
export default function ProfileAvatarCard() {
  const t = useTranslations("Profile.profileData");
  const format = useFormatter();
  const { user } = useUser();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Free the object URL when it's replaced or on unmount
  useEffect(() => {
    if (!preview) return;
    return () => URL.revokeObjectURL(preview);
  }, [preview]);

  if (!user) return null;

  const openPicker = () => inputRef.current?.click();

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // Reset so picking the same file again still fires onChange
    event.target.value = "";
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error(t("invalidImage"));
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error(t("imageTooLarge", { size: MAX_SIZE_MB }));
      return;
    }

    setPreview(URL.createObjectURL(file));

    startTransition(async () => {
      const formData = new FormData();
      formData.append("avatar", file);

      const result = await updateAvatar(formData);
      if (result.ok) {
        toast.success(result.data.message ?? t("avatarUpdated"));
      } else {
        toast.error(result.fieldErrors?.avatar ?? result.message);
      }
      // On success the refreshed user carries the new avatar_url
      setPreview(null);
    });
  };

  const initials = user.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const memberSince = user.created_at
    ? format.dateTime(new Date(user.created_at), {
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <section className="rounded-2xl bg-white border border-[#efe8db] p-5 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-5">
        <div className="flex items-center gap-5 flex-1 min-w-0">
          <button
            type="button"
            onClick={openPicker}
            disabled={isPending}
            aria-label={t("changePhoto")}
            className="relative shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B6B4A] focus-visible:ring-offset-2 disabled:cursor-wait"
          >
            <Avatar className="size-18 md:size-21 border-[3px] border-[#e4d3a8] after:hidden">
              <AvatarImage
                src={preview ?? user.avatar_url ?? undefined}
                alt={user.name}
              />
              <AvatarFallback className="bg-[#f3ede1] text-xl font-semibold text-[#1B6B4A] ltr:font-playfair">
                {initials}
              </AvatarFallback>
            </Avatar>

            {isPending && (
              <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40">
                <Spinner className="size-5 text-white" />
              </span>
            )}

            <span className="absolute -bottom-0.5 inset-e-0 flex size-7 items-center justify-center rounded-full bg-[#1B6B4A] text-white ring-[3px] ring-white">
              <Camera className="size-3.5" />
            </span>
          </button>

          <div className="min-w-0">
            <p className="text-lg font-bold text-foreground truncate ltr:font-playfair">
              {user.name}
            </p>
            {memberSince && (
              <p className="text-sm text-muted-foreground mt-0.5">
                {t("memberSince", { date: memberSince })}
              </p>
            )}
            {user.phone_verified_at && (
              <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#e8f2ec] px-2.5 py-1 text-xs font-semibold text-[#1B6B4A]">
                <ShieldCheck className="size-3.5" />
                {t("verified")}
              </span>
            )}
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={openPicker}
          disabled={isPending}
          className="self-start sm:self-center rounded-xl border-[#e2e8e4] bg-transparent text-sm font-semibold text-muted-foreground hover:bg-[#f7f4ee]"
        >
          {isPending ? t("uploading") : t("uploadPhoto")}
        </Button>
      </div>

      <input
        ref={inputRef}
        type="file"
        name="avatar"
        accept={ACCEPTED_TYPES.join(",")}
        onChange={onFileChange}
        className="hidden"
      />
    </section>
  );
}
