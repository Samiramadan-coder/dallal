"use client";

import { useTranslations } from "next-intl";
import type { FeatureValue } from "@/constants/packages";

/** Text for a non-boolean feature value. */
export function useFeatureText() {
  const t = useTranslations("Packages.values");
  return (value: Exclude<FeatureValue, boolean>) => {
    if (typeof value === "string") return value;
    if ("n" in value) return t(value.key, { n: value.n });
    return t(value.key);
  };
}
