import { cn } from "@/lib/utils";
import { AlertTriangle, ChevronRight, Info, Shield } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { headingFont } from "@/constants/marketplace";
import {
  legalContent,
  legalEmail,
  legalLastUpdated,
  type LegalBlock,
  type LegalDocument as DocKey,
  type LegalSection,
} from "@/constants/legal";
import LegalToc from "./toc";

const callouts = {
  warning: {
    box: "bg-[rgba(180,83,9,0.06)] border-[rgba(180,83,9,0.25)]",
    icon: <AlertTriangle size={16} className="mt-0.5 shrink-0 text-[#B45309]" aria-hidden />,
  },
  danger: {
    box: "bg-destructive/6 border-destructive/25",
    icon: <Shield size={16} className="mt-0.5 shrink-0 text-destructive" aria-hidden />,
  },
  info: {
    box: "bg-[rgba(27,107,74,0.06)] border-[rgba(27,107,74,0.18)]",
    icon: <Info size={16} className="mt-0.5 shrink-0 text-[#1B6B4A]" aria-hidden />,
  },
};

function Block({ block, font }: { block: LegalBlock; font: string }) {
  switch (block.type) {
    case "p":
      return (
        <p className="mt-4 text-[15px] leading-relaxed text-[#4A4840] first:mt-0">
          {block.text}
        </p>
      );
    case "h4":
      return (
        <h4
          className={cn(
            font,
            "mb-2 mt-7 flex items-center gap-2 text-base font-semibold text-foreground",
          )}
        >
          <span className="h-4 w-1 shrink-0 rounded-full bg-primary" />
          {block.text}
        </h4>
      );
    case "list":
      return (
        <ul className="mt-4 space-y-2.5">
          {block.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-[15px] leading-relaxed text-[#4A4840]"
            >
              <ChevronRight
                size={14}
                className="mt-1 shrink-0 text-[#1B6B4A] rtl:rotate-180"
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "callout": {
      const c = callouts[block.variant];
      return (
        <div className={cn("mt-5 flex gap-3 rounded-xl border p-4", c.box)}>
          {c.icon}
          <p className="text-[14px] leading-relaxed text-[#4A4840]">{block.text}</p>
        </div>
      );
    }
  }
}

function Section({
  section,
  number,
  font,
}: {
  section: LegalSection;
  number: number;
  font: string;
}) {
  return (
    <section
      id={section.id}
      className="scroll-mt-40 border-b border-[rgba(27,107,74,0.08)] pb-10 pt-10 first:pt-0 last:border-0 last:pb-0"
    >
      <div className="mb-5 flex items-start gap-4">
        <span
          className={cn(
            font,
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-card text-sm font-bold text-primary",
          )}
        >
          {number}
        </span>
        <h2
          className={cn(
            font,
            "mt-1 text-2xl font-bold leading-snug text-foreground",
          )}
        >
          {section.title}
        </h2>
      </div>
      <div className="sm:ps-13">
        {section.content.map((block, i) => (
          <Block key={i} block={block} font={font} />
        ))}
      </div>
    </section>
  );
}

export default async function LegalDocument({ doc }: { doc: DocKey }) {
  const locale = await getLocale();
  const t = await getTranslations("Legal");
  const font = headingFont(locale);
  const lang = locale === "en" ? "en" : "ar";
  const sections = legalContent[lang][doc];
  const date = legalLastUpdated[lang];
  const title = t(doc);

  return (
    <div className="flex items-start gap-10">
      <aside className="sticky top-36 hidden w-64 shrink-0 lg:block">
        <div className="mb-5 rounded-xl border border-[rgba(27,107,74,0.1)] bg-white p-4 shadow-sm">
          <p className={cn(font, "mb-1 text-sm font-bold leading-snug text-foreground")}>
            {title}
          </p>
          <p className="text-[11px] text-muted-foreground">{t("company")}</p>
          <div className="mt-3 flex items-center gap-1.5 border-t border-[rgba(27,107,74,0.08)] pt-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3DAF77]" />
            <span className="text-[11px] text-muted-foreground">
              {t("lastUpdatedOn", { date })}
            </span>
          </div>
        </div>
        <LegalToc
          items={sections.map(({ id, title }) => ({ id, title }))}
          label={t("tableOfContents")}
          heading={t("contents")}
        />
      </aside>

      <article className="min-w-0 flex-1">
        <div className="mb-8 rounded-2xl border border-[rgba(27,107,74,0.1)] bg-white px-5 py-7 shadow-sm sm:px-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
                {t("legalEyebrow")}
              </p>
              <h1 className={cn(font, "text-3xl font-bold leading-snug text-foreground")}>
                {title}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("lastUpdated")}{" "}
                <span className="font-medium text-[#4A4840]">{date}</span>
              </p>
            </div>
            <div className="shrink-0 rounded-lg border border-[rgba(27,107,74,0.12)] bg-[rgba(27,107,74,0.07)] px-4 py-2 text-[12px] font-medium text-[#1B6B4A]">
              {t("sections", { count: sections.length })}
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-[#4A4840]">
            {t(doc === "terms" ? "termsIntro" : "privacyIntro")}
          </p>
        </div>

        <div className="rounded-2xl border border-[rgba(27,107,74,0.1)] bg-white px-5 py-8 shadow-sm sm:px-8">
          {sections.map((section, i) => (
            <Section key={section.id} section={section} number={i + 1} font={font} />
          ))}
        </div>

        <p className="mt-8 pb-4 text-center text-[12px] text-muted-foreground">
          {t("contact")}{" "}
          <a href={`mailto:${legalEmail}`} className="text-[#1B6B4A] hover:underline">
            {legalEmail}
          </a>
        </p>
      </article>
    </div>
  );
}
