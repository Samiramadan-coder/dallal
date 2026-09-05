import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "uppercase p-0! text-[rgba(245,240,232,0.65)] font-semibold text-xs tracking-[0.08em] hover:bg-transparent hover:text-primary",
        isActive && "text-primary",
      )}
    >
      {children}
    </Link>
  );
}
