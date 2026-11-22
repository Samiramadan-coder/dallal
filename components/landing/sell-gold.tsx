import { headingFont } from "@/constants/marketplace";
import { Link } from "@/i18n/navigation";
import SectionHeading from "./section-heading";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight, Camera, Handshake, MessagesSquare } from "lucide-react";

const steps = [
  { key: "photo", icon: Camera },
  { key: "offers", icon: MessagesSquare },
  { key: "meet", icon: Handshake },
] as const;

export default async function SellGold() {
  const locale = await getLocale();
  const t = await getTranslations("Home.sellGold");

  return (
    <section
      aria-labelledby="sell-gold-title"
      className="bg-[#0A2A1C] py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10">
          <SectionHeading
            id="sell-gold-title"
            title={t("title")}
            description={t("description")}
          />
        </div>

        <ol className="grid gap-5 md:grid-cols-3">
          {steps.map(({ key, icon: Icon }, i) => (
            <li
              key={key}
              className="rounded-2xl border border-primary/20 bg-card p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/12 text-primary">
                  <Icon className="size-5" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {t("step", { n: i + 1 })}
                </span>
              </div>
              <h3
                className={`${headingFont(locale)} text-xl font-bold text-card-foreground`}
              >
                {t(`steps.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#B9B5A6]">
                {t(`steps.${key}.body`)}
              </p>
            </li>
          ))}
        </ol>

        <Link
          href="/sell/new"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-bold text-background hover:bg-[#D9B55A]"
        >
          {t("cta")}
          <ArrowRight className="size-4 rtl:rotate-180" />
        </Link>
      </div>
    </section>
  );
}
