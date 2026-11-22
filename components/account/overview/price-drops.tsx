import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Price from "@/components/reusable/price";
import { latestPriceDrops } from "@/constants/account";
import OverviewPanel from "./panel";

export default async function LatestPriceDrops() {
  const t = await getTranslations("Account.overview.priceDrops");

  return (
    <OverviewPanel
      title={t("title")}
      linkLabel={t("all")}
      href="/account/saved"
    >
      <ul className="space-y-4">
        {latestPriceDrops.map((item) => (
          <li key={item.id} className="flex items-center gap-3">
            <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-[#f4efe6]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground line-clamp-1">
                {item.title}
              </p>
              <p className="text-xs text-accent mt-1">
                {t("down")} <Price value={item.drop} mock digits={0} />
              </p>
            </div>
            <p className="text-sm font-bold text-foreground shrink-0">
              <Price value={item.price} mock digits={0} />
            </p>
          </li>
        ))}
      </ul>
    </OverviewPanel>
  );
}
