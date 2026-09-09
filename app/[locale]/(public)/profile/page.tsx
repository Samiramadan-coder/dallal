import ProfileInfo from "@/components/profile/profile-info";
import EyeBrow from "@/components/reusable/eye-brow";
import { getLocale, getTranslations } from "next-intl/server";

export default async function Page() {
  const locale = await getLocale();
  const t = await getTranslations("Profile.profileData");
  const fontClass = locale === "en" ? "font-playfair" : "";

  return (
    <div>
      <div>
        <EyeBrow className="text-primary font-bold mb-2">
          {t("accountSettings")}
        </EyeBrow>

        <h3 className={`text-3xl font-bold mb-2 ${fontClass}`}>
          {t("personalInfo")}
        </h3>

        <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
          {t("personalInfoDescription")}
        </p>
      </div>

      <div className="mt-4">
        <ProfileInfo />
      </div>
    </div>
  );
}
