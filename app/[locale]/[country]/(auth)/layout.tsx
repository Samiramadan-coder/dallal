import { getCountries } from "@/lib/api/global";
import { getTranslations } from "next-intl/server";
import Header from "@/components/shared/header/header";
import AuthHeroContent from "@/components/auth/auth-hero-content";

// Signed-in users are sent away from these pages by the proxy
// (see GUEST_ONLY_ROUTES in lib/auth-routes.ts)
export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations("Auth.Forms");
  const countries = await getCountries();

  return (
    <main>
      <Header actLikeIsScroll countries={countries} />

      <div className="grid grid-cols-1 lg:grid-cols-2 mt-21 lg:h-[calc(100vh-84px)]">
        <div className="relative hidden lg:block">
          <div className="absolute inset-0 bg-[url('/auth.png')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-linear-to-br from-background/72 via-card/55 to-background/80"></div>
          <AuthHeroContent />
        </div>
        <div className="bg-card-foreground h-full overflow-auto min-h-[calc(100vh-84px)]">
          <div className="px-6 py-12 min-h-full flex items-center">
            <div className="max-w-110 mx-auto w-full">
              <div className="mb-8 text-center lg:text-start">
                <p className="text-[11px] font-bold tracking-[0.22em] rtl:tracking-normal uppercase text-primary mb-2">
                  {t("welcome")}
                </p>
                <h3 className="text-3xl font-bold ltr:font-playfair">
                  {t("yourAccount")}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {t("accessListening")}
                </p>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
