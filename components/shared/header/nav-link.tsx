import * as React from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export const NavLink = React.forwardRef<
  React.ComponentRef<typeof Link>,
  React.ComponentProps<typeof Link>
>(function NavLink({ href, className, children, ...props }, ref) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      ref={ref}
      href={href}
      className={cn(
        "uppercase p-0! text-[rgba(245,240,232,0.65)] font-semibold text-xs! tracking-[0.08em] hover:bg-transparent hover:text-primary",
        isActive && "text-primary",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
});
