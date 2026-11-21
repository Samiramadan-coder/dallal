"use client";

import { parseAsStringLiteral, useQueryState } from "nuqs";
import { metals } from "@/constants/marketplace";

/** Selected metal, shared through the `?metal=` query param. */
export function useMetal() {
  return useQueryState(
    "metal",
    parseAsStringLiteral(metals).withDefault("gold").withOptions({
      history: "replace",
      scroll: false,
    }),
  );
}
