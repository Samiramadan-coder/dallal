import GoldCalculatorPreview from "@/components/landing/gold-calculator-preview";
import GoldPrices from "@/components/landing/gold-prices";
import Hero from "@/components/landing/hero";
import HowItWorks from "@/components/landing/how-it-works";
import LatestListings from "@/components/landing/latest-listings";
import MobileApp from "@/components/landing/mobile-app";
import Promise from "@/components/landing/promise";
import VerifiedShops from "@/components/landing/verified-shops";

export default async function Page() {
  return (
    <div>
      <Hero />
      <GoldPrices />
      <LatestListings />
      <Promise />
      <VerifiedShops />
      <HowItWorks />
      <GoldCalculatorPreview />
      <MobileApp />
    </div>
  );
}
