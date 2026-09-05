"use client";

import {
  Star,
  Search,
  Upload,
  Handshake,
  ArrowRight,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Step = {
  key: string;
  badge: string;
  title: string;
  description: string;
};

type Process = {
  steps: Step[];
  ctaTitle: string;
  ctaDescription: string;
  ctaLabel: string;
};

type Props = {
  fontClass?: string;
  translations: {
    buyers: string;
    sellers: string;
  };
  buyers: Process;
  sellers: Process;
};

const buyerIcons = [Search, MessageSquare, Handshake];
const sellerIcons = [Upload, Star, CheckCircle2];

export default function HowItWorksTabs({
  fontClass,
  translations,
  buyers,
  sellers,
}: Props) {
  return (
    <Tabs defaultValue="buyers" className="mt-10 w-full">
      <TabsList
        className="
          mx-auto
          grid
          h-auto!
          w-full
          max-w-74
          grid-cols-2
          rounded-full
          border
          border-primary/30
          bg-secondary
          p-1
        "
      >
        <TabsTrigger
          value="buyers"
          className="
            rounded-full
            px-6
            py-2.5
            text-[10px]
            font-bold
            uppercase
            tracking-[0.16em]
            text-card-foreground/55
            data-[state=active]:bg-primary
            data-[state=active]:text-primary-foreground
            data-[state=active]:shadow-[0_0_18px_rgba(201,164,69,0.25)]
          "
        >
          {translations.buyers}
        </TabsTrigger>

        <TabsTrigger
          value="sellers"
          className="
            rounded-full
            px-6
            py-2.5
            text-[10px]
            font-bold
            uppercase
            tracking-[0.16em]
            text-card-foreground/55
            data-[state=active]:bg-primary
            data-[state=active]:text-primary-foreground
            data-[state=active]:shadow-[0_0_18px_rgba(201,164,69,0.25)]
          "
        >
          {translations.sellers}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="buyers" className="mt-16">
        <ProcessContent
          process={buyers}
          icons={buyerIcons}
          fontClass={fontClass}
          href="/listings"
        />
      </TabsContent>

      <TabsContent value="sellers" className="mt-16">
        <ProcessContent
          process={sellers}
          icons={sellerIcons}
          fontClass={fontClass}
          href="/listings/create"
        />
      </TabsContent>
    </Tabs>
  );
}

function ProcessContent({
  process,
  icons,
  fontClass,
  href,
}: {
  process: Process;
  icons: typeof buyerIcons;
  fontClass?: string;
  href: string;
}) {
  return (
    <>
      <div className="relative grid gap-12 md:grid-cols-3 md:gap-8">
        {/* Connecting line */}
        <div
          aria-hidden
          className="
            absolute
            inset-s-[16.66%]
            inset-e-[16.66%]
            top-10
            hidden
            h-px
            bg-primary/25
            md:block
          "
        />

        {process.steps.map((step, index) => {
          const Icon = icons[index];

          return (
            <article key={step.key} className="group relative z-10 text-center">
              {/* Icon */}
              <div
                className="
                  relative
                  mx-auto
                  flex
                  size-20
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-primary/20
                  bg-secondary
                  text-primary
                  transition-all
                  duration-300
                  group-hover:border-primary/50
                  group-hover:bg-card
                "
              >
                <Icon className="size-7" strokeWidth={1.7} />

                <span
                  className="
                    absolute
                    -bottom-2
                    -inset-e-1
                    flex
                    size-7
                    items-center
                    justify-center
                    rounded-full
                    bg-primary
                    text-[10px]
                    font-bold
                    text-primary-foreground
                    shadow-[0_4px_12px_rgba(201,164,69,0.5)]
                  "
                >
                  {index + 1}
                </span>
              </div>

              {/* Badge */}
              <span
                className="
                  mt-8
                  inline-flex
                  rounded-full
                  border
                  border-primary/30
                  px-3
                  py-1.5
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-primary
                "
              >
                {step.badge}
              </span>

              <h3
                className={`
                  mt-4
                  text-2xl
                  font-bold
                  text-card-foreground
                  ${fontClass ?? ""}
                `}
              >
                {step.title}
              </h3>

              <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
                {step.description}
              </p>
            </article>
          );
        })}
      </div>

      {/* CTA */}
      <div
        className="
          mt-16
          flex
          flex-col
          gap-6
          rounded-xl
          border
          border-primary/20
          bg-card/40
          px-8
          py-7
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div>
          <h3
            className={`
              text-xl
              font-bold
              text-card-foreground
              ${fontClass ?? ""}
            `}
          >
            {process.ctaTitle}
          </h3>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            {process.ctaDescription}
          </p>
        </div>

        <Button
          asChild
          className="
            bg-primary
            h-11
            shrink-0
            rounded-full
            px-8
            text-xs
            font-bold
            uppercase
            tracking-[0.16em]
            text-primary-foreground
            shadow-[0_4px_28px_rgba(201,164,69,0.35)]
            hover:shadow-[0_6px_36px_rgba(201,164,69,0.45)] 
            hover:-translate-y-0.5
          "
        >
          <Link href={href}>
            {process.ctaLabel}
            <ArrowRight className="ms-3 size-4 rtl:rotate-180" />
          </Link>
        </Button>
      </div>
    </>
  );
}
