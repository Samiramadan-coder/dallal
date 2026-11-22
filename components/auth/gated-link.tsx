"use client";

import { Link } from "@/i18n/navigation";
import { useUser } from "@/providers/user-data";
import { useAuthGate } from "@/providers/auth-gate";

type GatedLinkProps = React.HTMLAttributes<HTMLElement> & {
  // Unprefixed, like every Link href
  href: string;
};

// A link to a page that needs an account (Sell, Post listing). Guests get a
// button that opens the sign-up modal and continue to `href` afterwards.
// Forwards props and onClick, so it works inside asChild wrappers
// (e.g. Button, DrawerClose)
export default function GatedLink({ href, ...props }: GatedLinkProps) {
  const { user } = useUser();
  const { enabled, requireAuth } = useAuthGate();

  // No modal here (e.g. the auth pages): a plain link; the page itself
  // asks for sign-in
  if (user || !enabled) return <Link href={href} {...props} />;

  return (
    <button
      type="button"
      {...props}
      onClick={(event) => {
        props.onClick?.(event);
        requireAuth({ type: "navigate", href }, () => {});
      }}
    />
  );
}
