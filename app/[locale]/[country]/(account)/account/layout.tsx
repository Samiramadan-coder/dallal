import type { Metadata } from "next";
import { getCountries } from "@/lib/api/global";
import Header from "@/components/shared/header/header";
import AccountSidebar, { AccountMobileNav } from "@/components/account/sidebar";

// Private pages: keep them out of search results
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// Signed-out visitors are sent to sign-in by the proxy
// (see PROTECTED_ROUTES in lib/auth-routes.ts)
export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const countries = await getCountries();

  return (
    <>
      <Header actLikeIsScroll countries={countries} />

      {/* mt-30 = header (h-21) + price ticker (h-9) */}
      <div className="mt-30 min-h-[calc(100vh-120px)] bg-card-foreground">
        <div className="container max-w-350 flex items-start gap-8 py-8 lg:py-10">
          <AccountSidebar />

          <div className="flex-1 min-w-0">
            <AccountMobileNav />
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
