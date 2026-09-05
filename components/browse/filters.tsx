"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";

import { useState } from "react";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Slider } from "../ui/slider";
import { Separator } from "../ui/separator";
import { SlidersHorizontal } from "lucide-react";
import { useBrowseFilters } from "@/providers/browse-filters";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Field, FieldContent, FieldDescription, FieldLabel } from "../ui/field";

export default function Filters() {
  const { filters, setFilters } = useBrowseFilters();

  // Price range draft state to allow for live updates without committing to the query state immediately
  const [minPriceDraft, setMinPriceDraft] = useState<number[] | null>(null);
  const [maxPriceDraft, setMaxPriceDraft] = useState<number[] | null>(null);
  const liveMinPrice = minPriceDraft ?? [filters.min_price];
  const liveMaxPrice = maxPriceDraft ?? [filters.max_price];

  // Weight range draft state to allow for live updates without committing to the query state immediately
  const [minWeightDraft, setMinWeightDraft] = useState<number[] | null>(null);
  const [maxWeightDraft, setMaxWeightDraft] = useState<number[] | null>(null);
  const liveMinWeight = minWeightDraft ?? [filters.min_weight];
  const liveMaxWeight = maxWeightDraft ?? [filters.max_weight];

  return (
    <Card className="bg-white ring-0! border border-[#1b6b4a1f] p-0">
      <CardHeader className="bg-background">
        <CardTitle className="flex items-center gap-2 py-4">
          <SlidersHorizontal className="w-4 h-4" />
          <span className="text-xs uppercase text-card-foreground tracking-[0.18em]">
            Filters
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="px-5">
        <Accordion
          type="multiple"
          defaultValue={["karat", "Price Range (AED)", "Condition"]}
        >
          <FilterAccordion label="karat">
            <div className="flex flex-wrap gap-3">
              {[24, 22, 21, 18, 14].map((karat) => (
                <Button
                  key={karat}
                  variant="outline"
                  className={[
                    "text-xs",
                    "bg-transparent",
                    "rounded-full",
                    "text-[#4a4840]",
                    "border",
                    "border-[#1b6b4a2e]",
                    "hover:bg-accent/20",
                    "hover:border-accent/40",
                    filters.karat.includes(karat) && "bg-accent text-white",
                  ].join(" ")}
                  onClick={() => {
                    setFilters({
                      karat: filters.karat.includes(karat)
                        ? filters.karat.filter((k) => k !== karat)
                        : [...filters.karat, karat].sort((a, b) => a - b),
                    });
                  }}
                >
                  {karat}K
                </Button>
              ))}
            </div>
          </FilterAccordion>
          <Separator className="bg-accent/10" />

          <FilterAccordion label="Price Range (AED)">
            <div className="space-y-4">
              <Badge
                className="
              h-7 
              font-bold 
              w-full 
              bg-accent/10 
              text-accent 
              border 
              border-accent/20
            "
              >
                AED {filters.min_price}K - AED {filters.max_price}K
              </Badge>
              <Slider
                min={0}
                max={300}
                value={liveMinPrice}
                onValueChange={(value) => {
                  setMinPriceDraft(value);
                }}
                onValueCommit={(value) => {
                  if (value[0] > filters.max_price) {
                    setMinPriceDraft(null);
                    setMaxPriceDraft(null);

                    return setFilters({
                      min_price: value[0],
                      max_price: value[0] + 1,
                    });
                  }

                  setFilters({ min_price: value[0] });
                }}
                className="
                **:data-[slot=slider-track]:bg-accent/10 
                **:data-[slot=slider-range]:bg-accent 
                **:data-[slot=slider-track]:h-2
                **:data-[slot=slider-thumb]:size-4
                **:data-[slot=slider-thumb]:bg-accent
                **:data-[slot=slider-thumb]:border-accent
              "
              />
              <Slider
                min={0}
                max={300}
                value={liveMaxPrice}
                onValueChange={(value) => {
                  setMaxPriceDraft(value);
                }}
                onValueCommit={(value) => {
                  if (value[0] < filters.min_price) {
                    setMinPriceDraft(null);
                    setMaxPriceDraft(null);

                    return setFilters({
                      max_price: value[0],
                      min_price: value[0] - 1,
                    });
                  }

                  setFilters({ max_price: value[0] });
                }}
                className="
              **:data-[slot=slider-track]:bg-primary/10 
              **:data-[slot=slider-range]:bg-primary 
              **:data-[slot=slider-track]:h-2
              **:data-[slot=slider-thumb]:size-4
              **:data-[slot=slider-thumb]:bg-primary
              **:data-[slot=slider-thumb]:border-primary
            "
              />
            </div>
          </FilterAccordion>
          <Separator className="bg-accent/10" />

          <FilterAccordion label="Weight Range (g)">
            <div className="space-y-4">
              <Badge
                className="
              h-7 
              font-bold 
              w-full 
              bg-accent/10 
              text-accent 
              border 
              border-accent/20
            "
              >
                {filters.min_weight}g - {filters.max_weight}g
              </Badge>
              <Slider
                min={0}
                max={500}
                value={liveMinWeight}
                onValueChange={(value) => {
                  setMinWeightDraft(value);
                }}
                onValueCommit={(value) => {
                  if (value[0] > filters.max_weight) {
                    setMinWeightDraft(null);
                    setMaxWeightDraft(null);

                    return setFilters({
                      min_weight: value[0],
                      max_weight: value[0] + 1,
                    });
                  }

                  setFilters({ min_weight: value[0] });
                }}
                className="
                **:data-[slot=slider-track]:bg-accent/10 
                **:data-[slot=slider-range]:bg-accent 
                **:data-[slot=slider-track]:h-2
                **:data-[slot=slider-thumb]:size-4
                **:data-[slot=slider-thumb]:bg-accent
                **:data-[slot=slider-thumb]:border-accent
              "
              />
              <Slider
                min={0}
                max={500}
                value={liveMaxWeight}
                onValueChange={(value) => {
                  setMaxWeightDraft(value);
                }}
                onValueCommit={(value) => {
                  if (value[0] < filters.min_weight) {
                    setMinWeightDraft(null);
                    setMaxWeightDraft(null);

                    return setFilters({
                      max_weight: value[0],
                      min_weight: value[0] - 1,
                    });
                  }

                  setFilters({ max_weight: value[0] });
                }}
                className="
              **:data-[slot=slider-track]:bg-primary/10 
              **:data-[slot=slider-range]:bg-primary 
              **:data-[slot=slider-track]:h-2
              **:data-[slot=slider-thumb]:size-4
              **:data-[slot=slider-thumb]:bg-primary
              **:data-[slot=slider-thumb]:border-primary
            "
              />
            </div>
          </FilterAccordion>
          <Separator className="bg-accent/10" />

          <FilterAccordion label="Condition">
            <div className="flex flex-wrap gap-3">
              {["New", "Like New", "Good", "Fair"].map((condition) => (
                <Button
                  key={condition}
                  variant="outline"
                  className={[
                    "text-xs",
                    "bg-transparent",
                    "rounded-full",
                    "text-[#4a4840]",
                    "border",
                    "border-[#1b6b4a2e]",
                    "hover:bg-accent/20",
                    "hover:border-accent/40",
                    filters.condition.includes(condition) &&
                      "bg-accent text-white",
                  ].join(" ")}
                  onClick={() => {
                    setFilters({
                      condition: filters.condition.includes(condition)
                        ? filters.condition.filter((con) => con !== condition)
                        : [...filters.condition, condition],
                    });
                  }}
                >
                  {condition}
                </Button>
              ))}
            </div>
          </FilterAccordion>
          <Separator className="bg-accent/10" />

          <FilterAccordion label="Location">
            <RadioGroup
              value={filters.location}
              onValueChange={(value) => setFilters({ location: value })}
              className="w-fit"
            >
              {[
                "all-uae",
                "Dubai",
                "Abu Dhabi",
                "Sharjah",
                "Ajman",
                "Ras Al Khaimah",
                "Fujairah",
                "Umm Al Quwain",
              ].map((location, index) => (
                <div key={index} className="flex items-center gap-3">
                  <RadioGroupItem
                    id={`r-${index + 2}`}
                    value={location}
                    className="
                    border-accent/30
                    data-unchecked:bg-transparent
                    data-unchecked:border-accent/30
                    data-checked:bg-accent
                    data-checked:border-accent
                    data-checked:shadow-sm
                  "
                  />
                  <Label
                    htmlFor={`r-${index + 2}`}
                    className="text-[#4A4840] text-sm"
                  >
                    {location}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </FilterAccordion>
          <Separator className="bg-accent/10" />

          <FilterAccordion label="Verification">
            <Field orientation="horizontal" className="py-2">
              <FieldContent>
                <FieldLabel
                  htmlFor="verification-condition"
                  className="text-sm text-[#4A4840] font-medium"
                >
                  Verified only
                </FieldLabel>
                <FieldDescription className="text-[10px] text-muted-foreground">
                  Show seller-verified listings
                </FieldDescription>
              </FieldContent>
              <Switch
                id="verification-condition"
                checked={filters.verified}
                onCheckedChange={(checked) => setFilters({ verified: checked })}
                className="
                data-unchecked:bg-accent/10
                data-unchecked:border-accent/20
                data-checked:bg-accent
                data-checked:border-accent
                data-checked:shadow-sm
              "
              />
            </Field>
          </FilterAccordion>
        </Accordion>
      </CardContent>
    </Card>
  );
}

// This is a custom component for the accordion title
// It is used to display the title of each filter section in the filters component.
function FilterAccordion({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <AccordionItem value={label}>
      <AccordionTrigger>
        <span className="text-[10px] text-[#4A4840] uppercase tracking-[0.18em] font-bold">
          {label}
        </span>
      </AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  );
}
