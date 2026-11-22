import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import { recentActivity } from "@/constants/account";
import OverviewPanel from "./panel";

export default async function RecentActivity() {
  const t = await getTranslations("Account.overview.activity");

  return (
    <OverviewPanel
      title={t("title")}
      linkLabel={t("all")}
      href="/account/notifications"
    >
      <ul className="space-y-4">
        {recentActivity.map((item) => (
          <li key={item.id} className="flex gap-3">
            <span
              className={cn(
                "mt-1.5 size-1.5 shrink-0 rounded-full",
                item.unread ? "bg-primary" : "bg-[#d9d4c8]",
              )}
            />
            <div>
              <p className="text-sm font-medium text-foreground">
                {t(`types.${item.type}`, { name: item.name ?? "" })}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {t(`ago.${item.ago.unit}`, { count: item.ago.count })}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </OverviewPanel>
  );
}
