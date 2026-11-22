import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getCurrentUser } from "@/lib/session";
import { getCities, getCountries } from "@/lib/api/global";
import { getSelectedCountry } from "@/lib/api/selected-country";
import AccountPageHeader from "@/components/account/page-header";
import ProfileAvatarCard from "@/components/account/profile/avatar-card";
import AccountStatus from "@/components/account/profile/account-status";
import PersonalDetails from "@/components/account/profile/personal-details";
import ChangePassword from "@/components/account/profile/change-password";
import DeleteAccount from "@/components/account/profile/delete-account";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Account.pages.profile");
  return { title: t("title") };
}

export default async function Page() {
  const [t, user] = await Promise.all([
    getTranslations("Profile.profileData"),
    getCurrentUser(),
  ]);

  // The user's city belongs to their primary country; fall back to the
  // country in the URL when they haven't set one
  const countryCode =
    user?.primary_country?.code ?? (await getSelectedCountry())?.code;
  const [cities, countries] = await Promise.all([
    countryCode ? getCities(countryCode) : [],
    getCountries(),
  ]);

  return (
    <div>
      <AccountPageHeader
        eyebrow={t("accountSettings")}
        title={t("profileInformation")}
        description={t("personalInfoDescription")}
      />

      <div className="space-y-5 md:space-y-6">
        <ProfileAvatarCard />
        <AccountStatus />
        <PersonalDetails cities={cities} countries={countries} />
        <ChangePassword />
        <DeleteAccount />
      </div>
    </div>
  );
}
