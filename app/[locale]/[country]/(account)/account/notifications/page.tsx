import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import SectionPlaceholder from "@/components/account/section-placeholder";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Account.pages.notifications");
  return { title: t("title") };
}

export default function Page() {
  return <SectionPlaceholder section="notifications" />;
}
