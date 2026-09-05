import { getLocale, getTranslations } from "next-intl/server";

const stats = ["listings", "sellers", "cities", "transactions"] as const;

export default async function AboutNumbers() {
  const locale = await getLocale();
  const t = await getTranslations("About.numbers");
  const fontClass = locale === "en" ? "font-playfair" : "";

  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-24">
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          opacity-20
          bg-[radial-gradient(rgba(201,164,69,0.16)_0.8px,transparent_0.8px)]
          bg-size-[18px_18px]
        "
      />

      <div className="container max-w-350 relative z-10 w-full">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-primary/50" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-primary">
              {t("eyebrow")}
            </span>
            <span className="h-px w-10 bg-primary/50" />
          </div>
          <h2
            className={`mt-5 text-3xl font-semibold leading-none tracking-[-0.03em] text-card-foreground lg:text-4xl ${fontClass}`}
          >
            {t("title")}
          </h2>
        </div>

        <div className="mt-16 overflow-hidden rounded-2xl lg:mt-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat}
                className={[
                  "group relative flex min-h-48.75 flex-col items-center justify-center overflow-hidden px-6 py-10 text-center",
                  "bg-transparent",
                  "transition-colors duration-300 ease-out",
                  "hover:bg-card",
                  index !== stats.length - 1
                    ? "lg:border-e lg:border-primary/15"
                    : "",
                ].join(" ")}
              >
                {/* Number */}
                <div
                  className={`
                    text-[2.7rem]
                    font-semibold
                    leading-none
                    tracking-[-0.02em]
                    gold-text
                    transition-transform
                    duration-300
                    ease-out
                    group-hover:scale-[1.04]
                    lg:text-[3.1rem]
                    ${fontClass}
                  `}
                >
                  {t(`${stat}.value`)}

                  {t.has(`${stat}.suffix`) && (
                    <span className="ms-1 font-serif font-normal text-primary">
                      {t(`${stat}.suffix`)}
                    </span>
                  )}
                </div>

                {/* Label */}
                <h3 className="mt-3 text-sm font-semibold leading-none text-card-foreground sm:text-base">
                  {t(`${stat}.label`)}
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs leading-none text-[#8A8678]">
                  {t(`${stat}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
