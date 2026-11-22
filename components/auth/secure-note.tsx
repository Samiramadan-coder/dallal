import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

// "Protected by 256-bit SSL encryption." under the auth forms
export default function SecureNote({ className }: { className?: string }) {
  const t = useTranslations("Auth.Forms");

  return (
    <p
      className={cn("text-center text-[11px] text-muted-foreground", className)}
    >
      {t("protectedBy")}{" "}
      <Link href="/legal/privacy" className="underline underline-offset-2">
        {t("privacyPolicy")}
      </Link>
    </p>
  );
}
