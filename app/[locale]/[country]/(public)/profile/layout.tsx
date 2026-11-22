import Hero from "@/components/profile/hero";
import SideBar from "@/components/profile/sidebar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Hero />
      <div className="bg-card-foreground">
        <div className="container max-w-7xl py-20 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <SideBar />
            </div>
            <div className="md:col-span-3">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
