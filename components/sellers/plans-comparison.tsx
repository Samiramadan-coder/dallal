import { Check } from "lucide-react";
import Title from "../reusable/title";
import { Link } from "@/i18n/navigation";
import EyeBrow from "../reusable/eye-brow";
import { Button } from "@/components/ui/button";
import { getLocale, getTranslations } from "next-intl/server";

const plans = ["free", "silver", "gold", "diamond"] as const;

type Plan = (typeof plans)[number];

type CellType = "text" | "check" | "dash";

const rows = [
  {
    key: "activeListings",
    values: {
      free: "text",
      silver: "text",
      gold: "text",
      diamond: "text",
    },
  },
  {
    key: "photos",
    values: {
      free: "text",
      silver: "text",
      gold: "text",
      diamond: "text",
    },
  },
  {
    key: "chat",
    values: {
      free: "check",
      silver: "check",
      gold: "check",
      diamond: "check",
    },
  },
  {
    key: "calculator",
    values: {
      free: "check",
      silver: "check",
      gold: "check",
      diamond: "check",
    },
  },
  {
    key: "verified",
    values: {
      free: "dash",
      silver: "check",
      gold: "check",
      diamond: "check",
    },
  },
  {
    key: "shopProfile",
    values: {
      free: "dash",
      silver: "dash",
      gold: "check",
      diamond: "check",
    },
  },
  {
    key: "featured",
    values: {
      free: "dash",
      silver: "dash",
      gold: "text",
      diamond: "text",
    },
  },
  {
    key: "analytics",
    values: {
      free: "dash",
      silver: "dash",
      gold: "check",
      diamond: "check",
    },
  },
  {
    key: "boostCredits",
    values: {
      free: "dash",
      silver: "text",
      gold: "text",
      diamond: "text",
    },
  },
  {
    key: "support",
    values: {
      free: "dash",
      silver: "dash",
      gold: "check",
      diamond: "text",
    },
  },
  {
    key: "bulkTools",
    values: {
      free: "dash",
      silver: "dash",
      gold: "dash",
      diamond: "check",
    },
  },
  {
    key: "api",
    values: {
      free: "dash",
      silver: "dash",
      gold: "dash",
      diamond: "check",
    },
  },
  {
    key: "banner",
    values: {
      free: "dash",
      silver: "dash",
      gold: "check",
      diamond: "check",
    },
  },
  {
    key: "offers",
    values: {
      free: "dash",
      silver: "check",
      gold: "check",
      diamond: "check",
    },
  },
] as const satisfies readonly {
  key: string;
  values: Record<Plan, CellType>;
}[];

const planLinks: Record<Plan, string> = {
  free: "/register",
  silver: "/register?plan=silver",
  gold: "/register?plan=gold",
  diamond: "/contact",
};

export default async function PlansComparison() {
  const locale = await getLocale();
  const t = await getTranslations("ForSellers.comparison");
  const fontClass = locale === "en" ? "font-playfair" : "";

  return (
    <section className="bg-white py-20 text-foreground lg:py-24">
      <div className="container max-w-7xl">
        <div className="text-center">
          <EyeBrow>{t("eyebrow")}</EyeBrow>
          <Title>{t("title")}</Title>
        </div>

        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-225 border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="w-[28%] px-0 py-5 text-start text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {t("feature")}
                </th>

                {plans.map((plan) => (
                  <th
                    key={plan}
                    className={[
                      "w-[18%] px-5 py-5 text-center text-base font-semibold",
                      plan === "free" && "text-muted-foreground",
                      plan === "silver" && "text-[#9ca3af]",
                      plan === "gold" && "bg-primary/5 text-primary",
                      plan === "diamond" && "text-[#67e8f9]",
                      fontClass,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {t(`plans.${plan}.name`)}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={row.key}
                  className={[
                    "border-b border-border/70",
                    index % 2 === 1 ? "bg-[#faf9f6]" : "bg-white",
                  ].join(" ")}
                >
                  <td className="px-0 py-4 text-sm font-medium font-[#4A4840]">
                    {t(`rows.${row.key}.label`)}
                  </td>

                  {plans.map((plan) => {
                    const type = row.values[plan];
                    const isGold = plan === "gold";

                    return (
                      <td
                        key={plan}
                        className={[
                          "px-5 py-4 text-center text-xs font-medium",
                          isGold && "bg-primary/5",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        <Cell
                          type={type}
                          gold={isGold}
                          value={
                            type === "text"
                              ? t(`rows.${row.key}.${plan}`)
                              : undefined
                          }
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr className="border-t-2 border-[#1b6b4a1f]">
                <td />
                {plans.map((plan) => (
                  <td
                    key={plan}
                    className={["px-3 py-5", plan === "gold" && "bg-primary/5"]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <Button
                      asChild
                      variant={plan === "gold" ? "default" : "outline"}
                      className={[
                        "h-9 w-full rounded-md text-xs font-bold",
                        plan === "gold"
                          ? "bg-primary border-0 text-primary-foreground hover:opacity-90"
                          : "border-accent/30 bg-white text-accent hover:bg-accent hover:text-accent-foreground",
                      ].join(" ")}
                    >
                      <Link href={planLinks[plan]}>
                        {t(`plans.${plan}.cta`)}
                      </Link>
                    </Button>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
}

function Cell({
  type,
  value,
  gold,
}: {
  type: CellType;
  value?: string;
  gold?: boolean;
}) {
  if (type === "dash") {
    return (
      <span className="text-base font-light text-muted-foreground/35">—</span>
    );
  }

  if (type === "check") {
    return (
      <span
        className={[
          "mx-auto flex size-5 items-center justify-center rounded-full",
          gold ? "bg-primary/15 text-primary" : "bg-accent/10 text-accent",
        ].join(" ")}
      >
        <Check className="size-3" strokeWidth={2} />
      </span>
    );
  }

  return (
    <span
      className={["font-semibold", gold ? "text-primary" : "text-accent"].join(
        " ",
      )}
    >
      {value}
    </span>
  );
}
