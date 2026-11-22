import Cta from "@/components/sellers/cta";
import Faq from "@/components/sellers/faq";
import Hero from "@/components/sellers/hero";
import Pricing from "@/components/sellers/pricing";
import Guarantees from "@/components/sellers/guarantees";
import ListingBoosts from "@/components/sellers/listing-boosts";
import PlansComparison from "@/components/sellers/plans-comparison";

export default function Page() {
  return (
    <div>
      <Hero />
      <Pricing />
      <PlansComparison />
      <ListingBoosts />
      <Guarantees />
      <Faq />
      <Cta />
    </div>
  );
}
