import { Plus, Minus } from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { AccordionItem, AccordionContent } from "../ui/accordion";

export default function FaqQuestion({
  value,
  question,
  answer,
}: {
  value: string;
  question: string;
  answer: string;
}) {
  return (
    <AccordionItem value={value} className="border-border/70">
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
          className="
            group
            flex
            w-full
            items-center
            justify-between
            gap-5
            py-5
            text-start
            outline-none
          "
        >
          <span
            className="
              text-sm
              font-semibold
              text-foreground
              transition-colors
              duration-200
              group-data-[state=open]:text-accent
            "
          >
            {question}
          </span>

          <span
            className="
              relative
              flex
              size-7
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-accent/8
              text-accent
              transition-colors
              duration-200
              group-data-[state=open]:bg-accent
              group-data-[state=open]:text-accent-foreground
            "
          >
            <Plus
              className="
                absolute
                size-4
                transition-opacity
                duration-200
                group-data-[state=open]:opacity-0
              "
              strokeWidth={1.8}
            />

            <Minus
              className="
                absolute
                size-4
                opacity-0
                transition-opacity
                duration-200
                group-data-[state=open]:opacity-100
              "
              strokeWidth={1.8}
            />
          </span>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>

      <AccordionContent className="max-w-162.5 pb-6 pe-12 text-sm leading-relaxed text-muted-foreground">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
}
