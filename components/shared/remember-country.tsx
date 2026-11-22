"use client";

import { useEffect } from "react";
import { COUNTRY_COOKIE } from "@/lib/country";

// Remembers the visited country, so URLs without one ("/", "/browse")
// are sent back to it by the proxy
export default function RememberCountry({ code }: { code: string }) {
  useEffect(() => {
    document.cookie = `${COUNTRY_COOKIE}=${encodeURIComponent(code)}; path=/; max-age=31536000; samesite=lax`;
  }, [code]);

  return null;
}
