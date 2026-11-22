"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, ShieldCheck, Store } from "lucide-react";

import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { useUser } from "@/providers/user-data";
import { cardClass } from "./styles";

// TODO: point at the KYC flow once it exists
const VERIFY_IDENTITY_HREF = "/verified";

type Tone = "neutral" | "success" | "warning" | "danger";

const TONES: Record<Tone, string> = {
  neutral: "bg-[#ece6d6] text-[#6b6450]",
  success: "bg-[#e8f2ec] text-[#1B6B4A]",
  warning: "bg-[#fbf1dc] text-[#9a6b12]",
  danger: "bg-[#fbefed] text-[#C0453B]",
};

type KycState = "verified" | "pending" | "rejected" | "notVerified";

// The API's kyc_status (null = never submitted) → what the badge shows
function kycState(status: string | null): KycState {
  switch (status?.toLowerCase()) {
    case "approved":
    case "verified":
      return "verified";
    case "pending":
    case "submitted":
    case "in_review":
    case "under_review":
      return "pending";
    case "rejected":
    case "declined":
      return "rejected";
    default:
      return "notVerified";
  }
}

const KYC_TONES: Record<KycState, Tone> = {
  verified: "success",
  pending: "warning",
  rejected: "danger",
  notVerified: "neutral",
};

function StatusRow({
  icon,
  title,
  badge,
  tone,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  badge: string;
  tone: Tone;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#e8f2ec] text-[#1B6B4A] [&_svg]:size-4.5">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-bold text-foreground">{title}</p>
        <span
          className={cn(
            "mt-1 inline-block max-w-full truncate rounded-full px-2.5 py-0.5 text-xs font-semibold",
            TONES[tone],
          )}
        >
          {badge}
        </span>
      </div>
      {action}
    </div>
  );
}

// Under the avatar card: identity verification and store
export default function AccountStatus() {
  const t = useTranslations("Profile.accountStatus");
  const { user } = useUser();
  if (!user) return null;

  const kyc = kycState(user.kyc_status);
  // Verify (or retry) when there's nothing approved or in review
  const canVerify = kyc === "notVerified" || kyc === "rejected";

  return (
    <section className={cn(cardClass, "divide-y divide-[#efe8db]")}>
      <StatusRow
        icon={<ShieldCheck />}
        title={t("identity")}
        badge={t(`kyc.${kyc}`)}
        tone={KYC_TONES[kyc]}
        action={
          canVerify && (
            <Link
              href={VERIFY_IDENTITY_HREF}
              className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[#1B6B4A] hover:underline"
            >
              {t(kyc === "rejected" ? "verifyAgain" : "verifyIdentity")}
              <ArrowRight className="size-3.5 rtl:rotate-180" />
            </Link>
          )
        }
      />
      <StatusRow
        icon={<Store />}
        title={t("store")}
        badge={user.store?.name ?? t("noStore")}
        tone={user.store ? "success" : "neutral"}
      />
    </section>
  );
}
