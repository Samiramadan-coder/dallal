import Footer from "@/components/shared/footer/footer";
import Header from "@/components/shared/header/header";
import { getCountries } from "@/lib/api/global";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const countries = await getCountries();

  return (
    <>
      <Header countries={countries} />

      <main>{children}</main>

      <Footer />
    </>
  );
}
