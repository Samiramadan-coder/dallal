import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getCurrentUser } from "@/lib/session";
import { accountStats } from "@/constants/account";
import AccountPageHeader from "@/components/account/page-header";
import OverviewStats from "@/components/account/overview/stats";
import LatestPriceDrops from "@/components/account/overview/price-drops";
import RecentActivity from "@/components/account/overview/recent-activity";
import OffersCta from "@/components/account/overview/offers-cta";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Account.overview");
  return { title: t("title") };
}

export default async function Page() {
  const [t, user] = await Promise.all([
    getTranslations("Account.overview"),
    getCurrentUser(),
  ]);
  const firstName = user?.name.split(" ")[0] ?? "";

  return (
    <div>
      <AccountPageHeader title={t("title")} description={t("description")} />

      <p className="text-sm text-foreground/80 -mt-2 mb-6">
        {t.rich("welcome", {
          name: firstName,
          count: accountStats.followedStores,
          b: (chunks) => <b className="font-semibold text-foreground">{chunks}</b>,
        })}
      </p>

      <div className="space-y-5 md:space-y-6">
        <OverviewStats />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 md:gap-6">
          <LatestPriceDrops />
          <RecentActivity />
        </div>

        <OffersCta />
      </div>
    </div>
  );
}
