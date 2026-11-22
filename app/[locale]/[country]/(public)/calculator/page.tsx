import Hero from "@/components/calculator/hero";
import Listings from "@/components/calculator/listings";
import Education from "@/components/calculator/education";
import Calculator from "@/components/calculator/calculator";

export default function Page() {
  return (
    <div className="min-h-screen bg-card-foreground">
      <Hero />
      <div className="mx-auto max-w-6xl px-6 py-14">
        <Calculator />
        <Education />
        <Listings />
      </div>
    </div>
  );
}
