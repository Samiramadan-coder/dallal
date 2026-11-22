import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { headingFont, metalRates } from "@/constants/marketplace";

export default async function Hero() {
  const locale = await getLocale();
  const t = await getTranslations("Calculator.hero");
  const font = headingFont(locale);

  const chips = [
    ...metalRates.gold.slice(0, 4),
    { ...metalRates.silver[0], label: `${t("silver")} ${metalRates.silver[0].label}` },
    { ...metalRates.platinum[1], label: `${t("platinum")} ${metalRates.platinum[1].label}` },
  ];

  return (
    <div className="relative mt-30 overflow-hidden bg-background">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute end-0 top-0 h-full w-150 opacity-[0.07]"
          style={{
            background:
              "radial-gradient(ellipse at 100% 30%, var(--primary), transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-0 start-0 h-64 w-100 opacity-[0.05]"
          style={{
            background:
              "radial-gradient(ellipse at 0% 100%, #1B6B4A, transparent 70%)",
          }}
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--primary) 1px,transparent 1px),linear-gradient(90deg,var(--primary) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-14">
        <div className="mb-5 flex items-center gap-3">
          <div className="h-px w-8 bg-primary" />
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-primary">
            {t("eyebrow")}
          </span>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1
              className={cn(
                font,
                "text-balance text-5xl font-bold leading-[1.1] text-card-foreground md:text-6xl",
              )}
            >
              {t("title")}{" "}
              <span className="text-primary">{t("titleHighlight")}</span>
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-[rgba(245,240,232,0.55)]">
              {t("description")}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 lg:max-w-xl lg:justify-end">
            {chips.map((chip) => {
              const up = chip.change >= 0;
              return (
                <div
                  key={chip.label}
                  className="flex flex-col rounded-2xl border border-primary/18 bg-[rgba(245,240,232,0.04)] px-4 py-3 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-black tracking-widest text-[#E8D5A0]">
                      {chip.label}
                    </span>
                    <span
                      dir="ltr"
                      className={cn(
                        "flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-bold",
                        up
                          ? "bg-[rgba(109,217,138,0.15)] text-[#6DD98A]"
                          : "bg-[rgba(248,113,113,0.15)] text-[#F87171]",
                      )}
                    >
                      {up ? (
                        <TrendingUp className="size-2.5" />
                      ) : (
                        <TrendingDown className="size-2.5" />
                      )}
                      {up ? "+" : ""}
                      {chip.change.toFixed(2)}%
                    </span>
                  </div>
                  <div className={cn(font, "mt-1 text-xl font-bold text-card-foreground")}>
                    {chip.price.toFixed(2)}
                  </div>
                  <div className="mt-0.5 text-[9px] text-[rgba(245,240,232,0.35)]">
                    {t("perGram")}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex items-center gap-2">
          <div className="size-1.5 animate-pulse rounded-full bg-[#6DD98A]" />
          <span className="text-[10px] text-[rgba(245,240,232,0.35)]">
            {t("updated", { time: "–" })}
          </span>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(to_right,transparent,color-mix(in_srgb,var(--primary)_40%,transparent),transparent)]" />
    </div>
  );
}
