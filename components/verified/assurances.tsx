import { getTranslations } from "next-intl/server";
import { LockKeyhole, RefreshCw, UsersRound } from "lucide-react";

const assurances = [
  {
    key: "manualReview",
    icon: UsersRound,
  },
  {
    key: "dataSecurity",
    icon: LockKeyhole,
  },
  {
    key: "renewal",
    icon: RefreshCw,
  },
] as const;

export default async function Assurances() {
  const t = await getTranslations("GetVerified.assurances");

  return (
    <section className="bg-card-foreground py-14 text-foreground lg:py-16">
      <div className="container max-w-5xl">
        <div className="grid gap-8 md:grid-cols-3 md:gap-10 lg:gap-12">
          {assurances.map(({ key, icon: Icon }) => (
            <article key={key} className="flex items-start gap-4">
              <div
                className="
                  flex
                  size-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-accent/15
                  bg-accent/[0.07]
                  text-accent
                "
              >
                <Icon className="size-4.5" strokeWidth={1.7} />
              </div>

              <div>
                <h3 className="text-sm font-semibold">{t(`${key}.title`)}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
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
