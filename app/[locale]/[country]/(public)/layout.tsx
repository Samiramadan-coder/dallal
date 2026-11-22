import Footer from "@/components/shared/footer/footer";
import Header from "@/components/shared/header/header";
import { getCountries } from "@/lib/api/global";
import { AuthGateProvider } from "@/providers/auth-gate";
import { getSelectedCountry } from "@/lib/api/selected-country";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [countries, selectedCountry] = await Promise.all([
    getCountries(),
    getSelectedCountry(),
  ]);

  return (
    // Guests who tap Save / Sell / Post listing get a sign-up modal
    <AuthGateProvider
      countries={countries}
      defaultCountryId={selectedCountry?.id}
    >
      <Header countries={countries} />

      <main>{children}</main>

      <Footer />
    </AuthGateProvider>
  );
}
