"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import {
  Coins,
  Gem,
  Grid,
  Logs,
  Map,
  Radius,
  Search,
  Sparkle,
  Watch,
} from "lucide-react";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useBrowseFilters } from "@/providers/browse-filters";

const categories = [
  { icon: Sparkle, label: "All", value: "all" },
  { icon: Gem, label: "Gold", value: "gold" },
  { icon: Radius, label: "Diamonds", value: "diamonds" },
  { icon: Watch, label: "Watches", value: "watches" },
  { icon: Coins, label: "Coins & Bars", value: "coins-bars" },
] as const;

export default function QueryFilters() {
  const { filters, setFilters } = useBrowseFilters();

  return (
    <>
      {/* Search By Name */}
      <InputGroup className="w-full h-13.5 bg-white rounded-xl border border-accent/20 shadow-sm">
        <InputGroupInput
          value={filters.q}
          onChange={(e) => setFilters({ q: e.target.value })}
          placeholder="Search — e.g. 22K necklace, Rolex Datejust, diamond solitaire…"
        />
        <InputGroupAddon className="ms-3">
          <Search />
        </InputGroupAddon>
        <InputGroupAddon
          align="inline-end"
          className="border border-accent/20 text-[10px] me-3! px-1 py-1 rounded-md"
        >
          ⌘ K
        </InputGroupAddon>
      </InputGroup>

      {/* Category Filters */}
      <Tabs
        defaultValue="all"
        value={filters.category}
        onValueChange={(value) => setFilters({ category: value })}
      >
        <TabsList
          className="
            h-auto!
            border
            p-1
            w-fit
            gap-1
            shadow-sm
            rounded-xl
            bg-white
            border-accent/20
          "
        >
          {categories.map((category) => (
            <TabsTrigger
              key={category.label}
              value={category.value}
              className="
                rounded-xl
                px-5
                py-2.5
                text-xs
                h-9.5
                font-semibold
                uppercase
                tracking-wide
                cursor-pointer
                text-[#4A4840]
                transition-colors
                hover:text-card
                hover:bg-accent/10
                data-[state=active]:bg-card
                data-[state=active]:text-white
                data-[state=active]:shadow-none
              "
            >
              <category.icon className="me-2 h-4 w-4" />
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Newest Filters */}
      <div className="flex items-center justify-between gap-6">
        <p className="text-[#4A4840] text-sm">
          <b>9</b> listings found
        </p>

        <div className="flex items-stretch gap-2">
          <Select
            value={filters.sort}
            onValueChange={(value) => setFilters({ sort: value })}
          >
            <SelectTrigger className="h-full! w-full max-w-44 min-w-44 bg-white shadow-sm border border-accent/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="price-low-high">
                  Price: Low to High
                </SelectItem>
                <SelectItem value="price-high-low">
                  Price: High to Low
                </SelectItem>
                <SelectItem value="best-vs-market">Best vs Market</SelectItem>
                <SelectItem value="verified-first">Verified First</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="p-1 bg-white border border-accent/20 shadow-sm rounded-lg flex gap-2">
            <Button
              size="icon"
              className={[
                "rounded-sm",
                "h-6.5!",
                "w-6.5!",
                "text-muted-foreground",
                "hover:text-white",
                "hover:bg-accent",
                filters.show_type === "grid" && "bg-accent text-white",
              ].join(" ")}
              variant="ghost"
              onClick={() => setFilters({ show_type: "grid" })}
            >
              <Grid className="size-4" />
            </Button>
            <Separator orientation="vertical" />
            <Button
              size="icon"
              className={[
                "rounded-sm",
                "h-6.5!",
                "w-6.5!",
                "text-muted-foreground",
                "hover:text-white",
                "hover:bg-accent",
                filters.show_type === "list" && "bg-accent text-white",
              ].join(" ")}
              variant="ghost"
              onClick={() => setFilters({ show_type: "list" })}
            >
              <Logs className="size-4" />
            </Button>
            <Button
              className={[
                "rounded-sm",
                "h-6.5!",
                "text-muted-foreground",
                "hover:text-white",
                "hover:bg-accent",
                filters.show_type === "map" && "bg-accent text-white",
              ].join(" ")}
              variant="ghost"
              onClick={() => setFilters({ show_type: "map" })}
            >
              <Map className="size-4" />
              <span className="text-xs">Map View</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
