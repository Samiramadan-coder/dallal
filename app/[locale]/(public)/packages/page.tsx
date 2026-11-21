import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { ChevronDown, Dot } from "lucide-react";
import Boosts from "@/components/packages/boosts";
import Pricing from "@/components/packages/pricing";
import { headingFont } from "@/constants/marketplace";
import { getLocale, getTranslations } from "next-intl/server";
import CompareTable from "@/components/packages/compare-table";

const faqs = ["q1", "q2", "q3", "q4", "q5", "q6"] as const;

export default async function Page() {
  const locale = await getLocale();
  const t = await getTranslations("Packages");
  const font = headingFont(locale);

  return (
    <div>
      {/* Hero */}
      <div className="mt-30 bg-[#0F4A31] pb-16 pt-14">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-[#C9A445]/70">
            {t("hero.eyebrow")}
          </p>
          <h1
            className={cn(
              font,
              "text-balance text-4xl font-bold text-[#FAF6EF] md:text-5xl",
            )}
          >
            {t("hero.title")}
          </h1>
          <p className="mt-5 inline-flex flex-wrap items-center justify-center text-sm text-[rgba(245,240,232,0.7)]">
            {t("hero.individual")}
            <Dot className="size-5" />
            <Link
              href="/sell"
              className="font-semibold text-[#E8D5A0] underline underline-offset-4 hover:text-white"
            >
              {t("hero.sellLink")}
            </Link>
          </p>
        </div>
      </div>

      <Pricing />
      <CompareTable />
      <Boosts />

      {/* FAQ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-12 text-center">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-[#1B6B4A]">
              {t("faq.eyebrow")}
            </p>
            <h2
              className={cn(font, "text-balance text-3xl font-bold text-[#1A1A14]")}
            >
              {t("faq.title")}
            </h2>
          </div>
          <div className="flex flex-col divide-y divide-[rgba(27,107,74,0.1)]">
            {faqs.map((id) => (
              <details key={id} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-start font-semibold text-[#1A1A14] [&::-webkit-details-marker]:hidden">
                  {t(`faq.items.${id}.q`)}
                  <ChevronDown className="size-4 shrink-0 text-[#8A8678] transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[#4A4840]">
                  {t(`faq.items.${id}.a`)}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#071E14] py-16">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2
            className={cn(
              font,
              "mb-3 text-balance text-3xl font-bold text-[#FAF6EF]",
            )}
          >
            {t("cta.title")}
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-[rgba(245,240,232,0.5)]">
            {t("cta.description")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/store/open"
              className="rounded-xl bg-[#C9A445] px-8 py-3.5 text-sm font-bold tracking-wide text-[#071E14] shadow-[0_4px_24px_rgba(201,164,69,0.35)] transition-all duration-200 hover:bg-[#E8D5A0]"
            >
              {t("cta.open")}
            </Link>
            <Link
              href="/browse"
              className="rounded-xl border border-[rgba(201,164,69,0.25)] px-8 py-3.5 text-sm font-medium tracking-wide text-[rgba(245,240,232,0.7)] transition-all duration-200 hover:border-[rgba(201,164,69,0.5)] hover:text-[#C9A445]"
            >
              {t("cta.browse")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
