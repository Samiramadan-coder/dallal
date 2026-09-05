import { LockKeyhole, RotateCcw, ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";

const items = [
  {
    key: "moneyBack",
    icon: RotateCcw,
  },
  {
    key: "cancel",
    icon: ShieldCheck,
  },
  {
    key: "payment",
    icon: LockKeyhole,
  },
] as const;

export default async function Guarantees() {
  const t = await getTranslations("ForSellers.guarantees");

  return (
    <section className="relative overflow-hidden bg-card py-12 lg:py-14">
      {/* <div
        aria-hidden
        className="
          pointer-events-none
          absolute inset-0
          opacity-15
          [background-image:radial-gradient(rgba(201,164,69,0.15)_0.8px,transparent_0.8px)]
          [background-size:18px_18px]
        "
      /> */}

      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 sm:px-8">
        <div className="grid gap-8 md:grid-cols-3 md:gap-10 lg:gap-14">
          {items.map(({ key, icon: Icon }) => (
            <article key={key} className="group flex items-start gap-4">
              <div
                className="
                  flex
                  size-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-primary/20
                  bg-primary/10
                  text-primary
                  transition-all
                  duration-300
                  group-hover:border-primary/40
                  group-hover:bg-primary
                  group-hover:text-primary-foreground
                "
              >
                <Icon className="size-4.5" strokeWidth={1.7} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-card-foreground">
                  {t(`${key}.title`)}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#f5f0e88c]">
                  {t(`${key}.description`)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
