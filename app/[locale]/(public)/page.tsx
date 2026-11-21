import Hero from "@/components/landing/hero";
import MobileApp from "@/components/landing/mobile-app";
import SellGold from "@/components/landing/sell-gold";
import Categories from "@/components/landing/categories";
import HowItWorks from "@/components/landing/how-it-works";
import StoresNear from "@/components/landing/stores-near";
import MetalPrices from "@/components/landing/metal-prices";
import MarketTeaser from "@/components/landing/market-teaser";
import VerifiedStores from "@/components/landing/verified-stores";
import FeaturedListings from "@/components/landing/featured-listings";

export default async function Page() {
  return (
    <div className="overflow-x-hidden bg-[#071E14]">
      <Hero />
      <MetalPrices />
      <Categories />
      <StoresNear />
      <FeaturedListings />
      <SellGold />
      <MarketTeaser />
      <VerifiedStores />
      <HowItWorks />
      <MobileApp />
    </div>
  );
}
