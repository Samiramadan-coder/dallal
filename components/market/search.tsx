"use client";

import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  debounce,
  defaultRateLimit,
  parseAsString,
  useQueryState,
} from "nuqs";

// Typing waits for a pause; the server re-renders with ?q= (shallow: false)
// so the listings API can search once it lands
const qParser = parseAsString.withDefault("").withOptions({
  history: "replace",
  shallow: false,
  scroll: false,
  limitUrlUpdates: debounce(400),
});

export default function MarketSearch() {
  const t = useTranslations("Market.hero");
  const [q, setQ] = useQueryState("q", qParser);

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        // Submit skips the debounce
        void setQ(q || null, { limitUrlUpdates: defaultRateLimit });
      }}
      className="flex max-w-2xl gap-2"
    >
      <label htmlFor="market-search" className="sr-only">
        {t("searchLabel")}
      </label>
      <div className="relative flex-1">
        <Search
          aria-hidden
          className="pointer-events-none absolute inset-s-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <input
          id="market-search"
          type="search"
          value={q}
          onChange={(e) => void setQ(e.target.value || null)}
          placeholder={t("placeholder")}
          className="h-12 w-full rounded-xl border border-transparent bg-white ps-11 pe-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>
      <button
        type="submit"
        className="h-12 rounded-xl bg-primary px-5 text-sm font-bold text-background hover:bg-[#D4B55A]"
      >
        {t("search")}
      </button>
    </form>
  );
}
