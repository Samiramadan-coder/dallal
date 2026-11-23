import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ShieldCheck } from "lucide-react";
import GatedLink from "@/components/auth/gated-link";
import { getTranslations } from "next-intl/server";
import { getSelectedCountryCities } from "@/lib/api/selected-country";

export default async function Hero() {
  const t = await getTranslations("Sell.hero");
  const cities = await getSelectedCountryCities();

  return (
    <section className="mt-30 bg-card px-4 py-14 text-card-foreground sm:px-6 sm:py-20">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          {t("eyebrow")}
        </p>
        <h1 className="max-w-3xl text-balance text-4xl font-bold leading-tight sm:text-5xl ltr:font-playfair">
          {t("title")}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-[rgba(245,240,232,0.75)]">
          {t("description")}
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* Guests get the sign-up modal, then continue to the form */}
          <GatedLink
            href="/sell/new"
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold tracking-wide text-background transition-colors hover:bg-[#E8D5A0]"
          >
            {t("start")}
          </GatedLink>

          <div className="flex flex-wrap items-center gap-2 text-sm text-[rgba(245,240,232,0.85)]">
            <ShieldCheck size={18} className="text-primary" aria-hidden />
            <span>{t("storesIn", { count: 4 })}</span>
            <Select
              name="city"
              defaultValue={cities[0] ? String(cities[0].id) : undefined}
            >
              <SelectTrigger
                size="sm"
                aria-label={t("city")}
                className="rounded-lg border-primary/40 bg-[#0B3A26] px-2 text-sm font-semibold text-card-foreground dark:bg-[#0B3A26] dark:hover:bg-[#0B3A26] [&_svg]:text-primary!"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper">
                {cities.map((city) => (
                  <SelectItem key={city.id} value={String(city.id)}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span>{t("buyingGold")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
