import AuthHeroContent from "@/components/auth/auth-hero-content";
import Header from "@/components/shared/header/header";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Header actLikeIsScroll />
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-21 lg:h-[calc(100vh-84px)]">
        <div className="relative hidden lg:block">
          <div className="absolute inset-0 bg-[url('/auth.png')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-linear-to-br from-[rgba(7,30,20,0.72)] via-[rgba(15,74,49,0.55)] to-[rgba(7,30,20,0.8)]"></div>
          <AuthHeroContent />
        </div>
        <div className="bg-card-foreground h-full overflow-auto min-h-[calc(100vh-84px)]">
          <div className="px-6 py-12 min-h-full flex items-center">
            <div className="max-w-110 mx-auto w-full">{children}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
