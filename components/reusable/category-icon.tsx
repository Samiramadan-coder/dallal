import {
  Amphora,
  CircleDotDashed,
  Coins,
  Crown,
  Diamond,
  Gem,
  LayoutGrid,
  Sparkles,
  UtensilsCrossed,
  Watch,
  Wrench,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

// Catalog icon names (GET /v1/catalog → categories[].icon) → icons
const icons: Record<string, LucideIcon> = {
  ring: Crown,
  bar: Coins,
  diamond: Diamond,
  watch: Watch,
  smartwatch: Watch,
  gem: Gem,
  tools: Wrench,
  silver: UtensilsCrossed,
  accessory: Sparkles,
  antique: Amphora,
  beads: CircleDotDashed,
};

// Unknown or missing names fall back to a generic grid icon
export default function CategoryIcon({
  icon,
  ...props
}: { icon?: string | null } & LucideProps) {
  const Icon = (icon && icons[icon]) || LayoutGrid;
  return <Icon aria-hidden {...props} />;
}
