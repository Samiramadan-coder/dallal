import { AtSign, Mail, MessageCircle } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

const contactItems = [
  {
    key: "email",
    icon: Mail,
    href: "mailto:contact@dallalhoolee.com",
  },
  {
    key: "whatsapp",
    icon: MessageCircle,
    href: "https://wa.me/971501234567",
  },
  {
    key: "instagram",
    icon: AtSign,
    href: "https://instagram.com/dallalhoolee",
  },
] as const;

export default async function Contact() {
  const locale = await getLocale();
  const t = await getTranslations("About.contact");
  const fontClass = locale === "en" ? "font-playfair" : "";

  return (
    <section className="bg-[#faf6ef] py-20 text-foreground lg:py-28">
      <div className="mx-auto w-full max-w-237.5 px-5 sm:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-9 bg-primary/50" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-primary">
              {t("eyebrow")}
            </span>
            <span className="h-px w-9 bg-primary/50" />
          </div>
          <h2
            className={`mt-6 text-4xl font-semibold leading-none tracking-[-0.035em] sm:text-5xl ${fontClass}`}
          >
            {t("title")}
          </h2>
          <p className="mt-5 text-base text-[#4a4840] sm:text-lg">
            {t("description")}
          </p>
        </div>

        {/* Contact cards */}
        <div className="mx-auto mt-16 grid max-w-180 gap-5 sm:grid-cols-3">
          {contactItems.map(({ key, icon: Icon, href }) => (
            <a
              key={key}
              href={href}
              target={key === "email" ? undefined : "_blank"}
              rel={key === "email" ? undefined : "noreferrer"}
              className="
                relative
                flex
                min-h-47.5
                flex-col
                items-center
                justify-center
                overflow-hidden
                rounded-xl
                border
                border-primary/15
                bg-white
                px-5
                py-8
                text-center
              "
            >
              {/* Icon */}
              <div
                className="
                  flex
                  size-12
                  items-center
                  justify-center
                  rounded-full
                  bg-background
                  text-primary
                "
              >
                <Icon className="size-5" strokeWidth={1.7} />
              </div>

              <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
                {t(`${key}.label`)}
              </p>

              <p className="mt-3 text-base font-semibold text-foreground">
                {t(`${key}.value`)}
              </p>

              <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
                {t(`${key}.description`)}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
