"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useAuthGate, useResumeAction } from "@/providers/auth-gate";

export default function SaveButton({
  label,
  listingId,
}: {
  label: string;
  listingId: string;
}) {
  const { requireAuth } = useAuthGate();
  // TODO: load and persist with the saved-listings API once it exists
  const [saved, setSaved] = useState(false);

  // A guest tapped Save, then signed up: save it without another tap
  useResumeAction(
    (action) =>
      action.type === "save-listing" && action.listingId === listingId,
    () => setSaved(true),
  );

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={saved}
      onClick={() =>
        requireAuth({ type: "save-listing", listingId }, () =>
          setSaved((v) => !v),
        )
      }
      className={cn(
        "absolute top-3 end-3 z-2 flex size-8 items-center justify-center rounded-full shadow-md backdrop-blur-sm transition-all duration-200",
        saved
          ? "bg-white text-destructive"
          : "bg-white/85 text-muted-foreground hover:bg-white hover:text-destructive",
      )}
    >
      <Heart className={cn("size-4", saved && "fill-current")} />
    </button>
  );
}
