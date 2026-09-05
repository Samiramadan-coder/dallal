import FooterNote from "@/components/calculator/footer-note";
import GoldPricingEducation from "@/components/calculator/gold-pricing-education.tsx";
import Hero from "@/components/calculator/hero";
import Marketplace from "@/components/calculator/marketplace";

export default function Page() {
  return (
    <div>
      <Hero />
      <GoldPricingEducation />
      <Marketplace />
      <FooterNote />
    </div>
  );
}
