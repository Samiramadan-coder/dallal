"use client";

import { Search } from "lucide-react";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useBrowseFilters } from "@/providers/browse-filters";

export default function SearchBar() {
  const t = useTranslations("Browse.search");
  const { filters, setFilters } = useBrowseFilters();
  const inputRef = useRef<HTMLInputElement>(null);

  // ⌘K / Ctrl+K focuses the search field.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="group relative">
      <div className="relative flex items-center overflow-hidden rounded-2xl border border-[rgba(27,107,74,0.14)] bg-white shadow-sm transition-all duration-200 group-focus-within:border-[#1B6B4A] group-focus-within:shadow-[0_0_0_3px_rgba(27,107,74,0.1)]">
        <Search
          aria-hidden
          className="pointer-events-none absolute start-5 size-4.25 text-[#8A8678] transition-colors group-focus-within:text-[#1B6B4A]"
        />
        <input
          ref={inputRef}
          type="search"
          value={filters.q}
          onChange={(e) => setFilters({ q: e.target.value || null })}
          placeholder={t("placeholder")}
          aria-label={t("label")}
          className="w-full bg-transparent py-4 ps-13 pe-14 text-sm font-medium text-[#1A1A14] placeholder:text-[#8A8678] focus:outline-none [&::-webkit-search-cancel-button]:hidden"
        />
        <div className="absolute end-4 hidden select-none items-center rounded-md border border-[rgba(27,107,74,0.12)] px-1.5 py-0.5 font-mono text-[10px] tracking-wide text-[#8A8678] sm:flex">
          ⌘ K
        </div>
      </div>
    </div>
  );
}
