import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AccountPageHeader from "@/components/account/page-header";
import ProfileAvatarCard from "@/components/account/profile/avatar-card";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Account.pages.profile");
  return { title: t("title") };
}

export default async function Page() {
  const t = await getTranslations("Profile.profileData");

  return (
    <div>
      <AccountPageHeader
        eyebrow={t("accountSettings")}
        title={t("profileInformation")}
        description={t("personalInfoDescription")}
      />

      <div className="space-y-5 md:space-y-6">
        <ProfileAvatarCard />
      </div>
    </div>
  );
}
