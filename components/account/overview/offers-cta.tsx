import { HandCoins } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function OffersCta() {
  const t = await getTranslations("Account.overview.cta");

  return (
    <div className="rounded-2xl bg-white border border-[#efe8db] px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex items-center gap-3 flex-1">
        <HandCoins className="size-5 text-primary shrink-0" />
        <p className="text-sm text-foreground/80">{t("text")}</p>
      </div>
      <div className="flex gap-2">
        <Link
          href="/account/offers"
          className="inline-flex items-center h-9 px-4 rounded-full border border-[#e5dece] text-xs font-semibold text-[#1B6B4A] hover:bg-[#1B6B4A]/5 transition-colors"
        >
          {t("offers")}
        </Link>
        <Link
          href="/account/sell-requests"
          className="inline-flex items-center h-9 px-4 rounded-full bg-[#1B6B4A] text-xs font-semibold text-white hover:bg-[#1B6B4A]/90 transition-colors"
        >
          {t("sellRequests")}
        </Link>
      </div>
    </div>
  );
}
