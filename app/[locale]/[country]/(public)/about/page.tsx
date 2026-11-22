import Hero from "@/components/about/hero";
import NotDo from "@/components/about/not-do";
import Audiences from "@/components/about/audiences";
import Trust from "@/components/about/trust";
import Countries from "@/components/about/countries";

export default function Page() {
  return (
    <div className="bg-card-foreground">
      <Hero />
      <NotDo />
      <Audiences />
      <Trust />
      <Countries />
    </div>
  );
}
