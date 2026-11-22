import { getTranslations } from "next-intl/server";
import AccountPageHeader from "./page-header";

// Temporary body for sections that haven't been designed yet
export default async function SectionPlaceholder({
  section,
}: {
  // Key under "Account.pages"
  section: string;
}) {
  const t = await getTranslations("Account");

  return (
    <div>
      <AccountPageHeader
        title={t(`pages.${section}.title`)}
        description={t(`pages.${section}.description`)}
      />
      <div className="rounded-2xl border border-dashed border-[#e2d9c6] bg-white/60 px-6 py-16 text-center text-sm text-muted-foreground">
        {t("comingSoon")}
      </div>
    </div>
  );
}
