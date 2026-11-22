import Assurances from "@/components/verified/assurances";
import Faq from "@/components/verified/faq";
import Hero from "@/components/verified/hero";
import Plans from "@/components/verified/plans";
import Process from "@/components/verified/process";

export default function Page() {
  return (
    <div>
      <Hero />
      <Plans />
      <Process />
      <Assurances />
      <Faq />
    </div>
  );
}
