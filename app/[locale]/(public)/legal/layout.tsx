import Hero from "@/components/legal/hero";
import LegalTabs from "@/components/legal/tabs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-card-foreground">
      <Hero />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <LegalTabs />
        {children}
      </div>
    </div>
  );
}
