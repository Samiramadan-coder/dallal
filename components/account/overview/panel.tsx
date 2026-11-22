import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

// White card with a title and a "see all" link, used by the overview
export default function OverviewPanel({
  title,
  linkLabel,
  href,
  children,
}: {
  title: string;
  linkLabel: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-white border border-[#efe8db] p-5 md:p-6">
      <div className="flex items-center justify-between gap-4 mb-5">
        <h2 className="text-lg font-bold text-foreground ltr:font-playfair">
          {title}
        </h2>
        <Link
          href={href}
          className="flex items-center gap-1 text-xs font-semibold text-[#1B6B4A] hover:underline shrink-0"
        >
          {linkLabel}
          <ArrowRight className="size-3 rtl:rotate-180" />
        </Link>
      </div>
      {children}
    </section>
  );
}
