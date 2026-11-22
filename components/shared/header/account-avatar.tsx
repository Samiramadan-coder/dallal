"use client";

import { cn } from "@/lib/utils";
import { useUser } from "@/providers/user-data";
import { useAccountMode } from "@/hooks/use-account-mode";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// The user's photo (or initial), or the store logo in store mode
export default function AccountAvatar({ className }: { className?: string }) {
  const { user } = useUser();
  const { mode, store } = useAccountMode();
  const inStore = mode === "store" && store;
  const name = (inStore ? store.name : user?.name) ?? "";
  const image = inStore ? store.logo : user?.avatar_url;

  return (
    <Avatar
      className={cn("size-8 ring-1 ring-[rgba(201,164,69,0.3)]", className)}
    >
      {image && (
        // key: remount on change so Radix reloads instead of keeping the
        // old image's loaded state
        <AvatarImage key={image} src={image} alt="" className="object-cover" />
      )}
      <AvatarFallback className="bg-[#0D3525] text-sm font-semibold text-[#C9A445]">
        {name[0]?.toUpperCase() ?? "?"}
      </AvatarFallback>
    </Avatar>
  );
}
