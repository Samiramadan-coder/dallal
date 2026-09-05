import { Badge } from "../ui/badge";
import Title from "../reusable/title";
import EyeBrow from "../reusable/eye-brow";
import { getLocale, getTranslations } from "next-intl/server";
import { BadgeCheck, BarChart3, Eye, ShieldCheck } from "lucide-react";

const features = [
  {
    key: "prices",
    icon: BarChart3,
  },
  {
    key: "verified",
    icon: BadgeCheck,
  },
  {
    key: "safe",
    icon: ShieldCheck,
  },
  {
    key: "free",
    icon: Eye,
  },
] as const;

export default async function Promise() {
  const locale = await getLocale();
  const t = await getTranslations("Home.promise");
  const fontClass = locale === "en" ? "font-playfair" : "";

  return (
    <section className="relative overflow-hidden bg-background py-20 text-card-foreground lg:py-24">
      <div className="container relative z-10 max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-primary/60" />
            <EyeBrow className="text-xs text-primary">{t("eyebrow")}</EyeBrow>
            <span className="h-px w-12 bg-primary/60" />
          </div>
          <Title className={`text-4xl md:text-5xl ${fontClass}`}>
            {t("title")}{" "}
            <span className="gold-text">{t("titleHighlight")}</span>
          </Title>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {features.map(({ key, icon: Icon }, index) => (
            <article
              key={key}
              className={`
                group
                relative
                flex
                min-h-83
                flex-col
                overflow-hidden
                rounded-xl
                border
                border-primary/20
                p-7
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-primary/45
                hover:bg-accent/60
                hover:shadow-[0_18px_45px_rgba(0,0,0,0.16)]
                ${index % 2 === 0 ? "bg-card" : "bg-secondary"}
              `}
            >
              <span
                aria-hidden
                className={`absolute inset-e-6 top-7 ${fontClass} text-5xl font-bold leading-none text-primary/[0.07] transition-colors duration-300 group-hover:text-primary/12`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="size-12 grid place-content-center rounded-xl border border-primary/30 bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-5" strokeWidth={1.7} />
              </div>

              <h3
                className={`mt-7 text-xl font-bold text-card-foreground ${fontClass}`}
              >
                {t(`items.${key}.title`)}
              </h3>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {t(`items.${key}.description`)}
              </p>

              <div className="mt-auto pt-6">
                <Badge className="bg-transparent h-7 gap-2 border-primary/35 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
                  <span className="size-1 rounded-full bg-primary" />
                  {t(`items.${key}.badge`)}
                </Badge>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
