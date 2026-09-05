import Title from "../reusable/title";
import EyeBrow from "../reusable/eye-brow";
import FaqQuestion from "../reusable/faq-question";
import { getTranslations } from "next-intl/server";
import { Accordion } from "@/components/ui/accordion";

const faqItems = [
  "duration",
  "rejected",
  "upgrade",
  "refund",
  "documents",
  "expiry",
] as const;

export default async function VerificationFaq() {
  const t = await getTranslations("GetVerified.faq");

  return (
    <section className="bg-white py-20 text-foreground lg:py-28">
      <div className="container max-w-3xl">
        <div className="text-center">
          <EyeBrow>{t("eyebrow")}</EyeBrow>
          <Title>{t("title")}</Title>
        </div>

        <Accordion type="single" collapsible className="mt-14 w-full">
          {faqItems.map((item) => (
            <FaqQuestion
              key={item}
              value={item}
              question={t(`items.${item}.question`)}
              answer={t(`items.${item}.answer`)}
            />
          ))}
        </Accordion>
      </div>
    </section>
  );
}
