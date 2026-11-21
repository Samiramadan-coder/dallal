"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";

export default function SaveButton({ label }: { label: string }) {
  const [saved, setSaved] = useState(false);

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={saved}
      onClick={() => setSaved((v) => !v)}
      className={cn(
        "absolute top-3 end-3 z-2 flex size-8 items-center justify-center rounded-full shadow-md backdrop-blur-sm transition-all duration-200",
        saved
          ? "bg-white text-[#C0453B]"
          : "bg-white/85 text-[#8A8678] hover:bg-white hover:text-[#C0453B]",
      )}
    >
      <Heart className={cn("size-4", saved && "fill-current")} />
    </button>
  );
}
