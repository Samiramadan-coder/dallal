import { BadgeCheck, Check, Circle, Store } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

const individualFeatures = [
  "badge",
  "search",
  "listings",
  "profile",
  "trust",
  "support",
] as const;

const individualDocuments = ["idFront", "idBack", "selfie"] as const;

const shopFeatures = [
  "badge",
  "page",
  "search",
  "featured",
  "plans",
  "listings",
  "analytics",
  "contact",
] as const;

const shopDocuments = ["license", "register", "trn", "ownerId"] as const;

export default async function Plans() {
  const locale = await getLocale();
  const t = await getTranslations("GetVerified.plans");
  const fontClass = locale === "en" ? "font-playfair" : "";

  return (
    <section className="bg-card-foreground py-20 text-foreground lg:py-24">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <div className="grid items-start gap-7 md:grid-cols-2">
          <article
            className="
              rounded-2xl
              border
              border-accent/15
              bg-white
              p-7
              lg:p-8
            "
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/[0.07] px-3 py-1.5">
              <BadgeCheck className="size-3.5 text-accent" strokeWidth={1.8} />
              <span className="text-[10px] font-semibold text-accent">
                {t("individual.badge")}
              </span>
            </div>

            <div className="mt-6">
              <h2
                className={`text-2xl font-bold tracking-[-0.02em] ${fontClass}`}
              >
                {t("individual.title")}
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {t("individual.description")}
              </p>
            </div>

            {/* Price */}
            <div className="mt-8">
              <div className="flex items-end gap-1">
                <span className="mb-1 text-sm text-muted-foreground">
                  {t("currency")}
                </span>

                <span
                  className={`text-5xl font-semibold leading-none ${fontClass}`}
                >
                  29
                </span>
              </div>

              <p className="mt-1 text-[11px] text-muted-foreground">
                {t("individual.priceDescription")}
              </p>
            </div>

            <div className="mt-8">
              <SectionTitle className="text-accent">
                {t("whatYouGet")}
              </SectionTitle>

              <ul className="mt-4 space-y-3">
                {individualFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-accent"
                      strokeWidth={1.8}
                    />
                    <span className="text-[13px] leading-snug text-[#4A4840]">
                      {t(`individual.features.${feature}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="my-7 h-px bg-border" />

            <div>
              <SectionTitle className="text-accent">
                {t("documentsRequired")}
              </SectionTitle>

              <ul className="mt-4 space-y-3">
                {individualDocuments.map((document) => (
                  <li key={document} className="flex items-start gap-2.5">
                    <Circle className="mt-1.75 size-1.5 shrink-0 fill-accent text-accent" />
                    <span className="text-[13px] leading-snug text-[#4A4840]">
                      {t(`individual.documents.${document}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              asChild
              variant="outline"
              className="
                mt-7
                h-12
                w-full
                rounded-xl
                border-accent
                bg-transparent
                font-semibold
                text-accent
                hover:bg-accent
                hover:text-accent-foreground
              "
            >
              <Link href="/get-verified/individual">{t("individual.cta")}</Link>
            </Button>
          </article>

          <article
            className="
              relative
              rounded-2xl
              border
              border-primary
              bg-background
              p-7
              text-card-foreground
              shadow-[0_20px_55px_rgba(201,164,69,0.08)]
              lg:p-8
            "
          >
            <div
              className="
                bg-primary
                absolute
                inset-s-1/2
                top-0
                -translate-x-1/2
                -translate-y-1/2
                whitespace-nowrap
                rounded-full
                px-6
                py-1.5
                text-[11px]
                font-bold
                uppercase
                tracking-wide
                text-primary-foreground
                shadow-[0_4px_20px_rgba(201,164,69,0.4)]
              "
            >
              {t("shop.recommended")}
            </div>

            <div className="mt-1 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5">
              <Store className="size-3.5 text-primary" strokeWidth={1.8} />
              <span className="text-[10px] font-semibold text-primary">
                {t("shop.badge")}
              </span>
            </div>

            <div className="mt-6">
              <h2
                className={`text-2xl font-bold tracking-[-0.02em] ${fontClass}`}
              >
                {t("shop.title")}
              </h2>

              <p className="mt-1 text-sm leading-relaxed text-[#f5f0e88c]">
                {t("shop.description")}
              </p>
            </div>

            {/* Price */}
            <div className="mt-8">
              <div className="flex items-end gap-1">
                <span className="mb-1 text-sm text-card-foreground/55">
                  {t("currency")}
                </span>

                <span
                  className={`text-5xl font-semibold leading-none gold-text ${fontClass}`}
                >
                  99
                </span>
              </div>

              <p className="mt-1 text-[11px] text-card-foreground/50">
                {t("shop.priceDescription")}
              </p>
            </div>

            <div className="mt-8">
              <SectionTitle className="text-primary">
                {t("whatYouGet")}
              </SectionTitle>
              <ul className="mt-4 space-y-3">
                {shopFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      strokeWidth={1.8}
                    />
                    <span className="text-[13px] leading-5 text-card-foreground/80">
                      {t(`shop.features.${feature}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="my-7 h-px bg-primary/15" />

            <div>
              <SectionTitle className="text-primary">
                {t("documentsRequired")}
              </SectionTitle>

              <ul className="mt-4 space-y-3">
                {shopDocuments.map((document) => (
                  <li key={document} className="flex items-start gap-2.5">
                    <Circle className="mt-1.75 size-1.5 shrink-0 fill-primary text-primary" />
                    <span className="text-[13px] leading-5 text-card-foreground/75">
                      {t(`shop.documents.${document}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              asChild
              className="
                bg-gold-gradient
                mt-7
                h-12
                w-full
                rounded-xl
                font-semibold
                text-primary-foreground
              "
            >
              <Link href="/get-verified/shop">{t("shop.cta")}</Link>
            </Button>
          </article>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={`text-[10px] font-bold uppercase tracking-[0.18em] ${className ?? ""}`}
    >
      {children}
    </h3>
  );
}
