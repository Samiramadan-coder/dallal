import Hero from "@/components/about/hero";
import Story from "@/components/about/story";
import Buyers from "@/components/about/buyers";
import Numbers from "@/components/about/Numbers";
import Sellers from "@/components/about/sellers";
import Trust from "@/components/about/trust";
import Prices from "@/components/about/prices";
import Contact from "@/components/about/contact";

export default function Page() {
  return (
    <div>
      <Hero />
      <Story />
      <Numbers />
      <Buyers />
      <Sellers />
      <Trust />
      <Prices />
      <Contact />
    </div>
  );
}
