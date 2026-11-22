import { getTranslations } from "next-intl/server";
import { Bell, BellRing, BookmarkCheck, TrendingDown } from "lucide-react";
import { accountStats } from "@/constants/account";

export default async function OverviewStats() {
  const t = await getTranslations("Account.overview.stats");

  const stats = [
    { key: "saved", value: accountStats.saved, icon: BookmarkCheck },
    { key: "priceDrops", value: accountStats.priceDrops, icon: TrendingDown },
    { key: "activeAlerts", value: accountStats.activeAlerts, icon: BellRing },
    { key: "unread", value: accountStats.unread, icon: Bell },
  ];

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
      {stats.map((stat) => (
        <div
          key={stat.key}
          className="rounded-2xl bg-white border border-[#efe8db] px-4 pt-4 pb-5"
        >
          <stat.icon className="size-4 text-primary" />
          <p className="mt-5 text-[28px] leading-none font-bold text-foreground ltr:font-playfair">
            {stat.value}
          </p>
          <p className="mt-1.5 text-xs text-muted-foreground">{t(stat.key)}</p>
        </div>
      ))}
    </div>
  );
}
