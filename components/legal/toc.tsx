"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type Item = { id: string; title: string };

export default function LegalToc({
  items,
  label,
  heading,
}: {
  items: Item[];
  label: string;
  heading: string;
}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label={label}>
      <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
        {heading}
      </p>
      <ul className="space-y-1">
        {items.map((item, i) => {
          const active = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "group flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] transition-all duration-150",
                  active
                    ? "bg-[rgba(27,107,74,0.1)] font-semibold text-[#1B6B4A]"
                    : "text-[#4A4840] hover:bg-[rgba(27,107,74,0.05)] hover:text-[#1B6B4A]",
                )}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[10px] font-bold transition-colors",
                    active
                      ? "bg-[#1B6B4A] text-card-foreground"
                      : "bg-[rgba(27,107,74,0.08)] text-muted-foreground group-hover:bg-[rgba(27,107,74,0.15)] group-hover:text-[#1B6B4A]",
                  )}
                >
                  {i + 1}
                </span>
                <span className="leading-snug">{item.title}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
