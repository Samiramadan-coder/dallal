// Account area: sidebar sections and sample data for the overview.
// Replace the mock data with API data once the endpoints are available.

export type AccountSection = {
  // Key under "Account.nav"
  key: string;
  href: string;
  // Unread count from /v1/me shown next to the item
  unread?: "messages" | "notifications";
};

export const ACCOUNT_SECTIONS: readonly AccountSection[] = [
  { key: "overview", href: "/account" },
  { key: "saved", href: "/account/saved" },
  { key: "alerts", href: "/account/alerts" },
  { key: "offers", href: "/account/offers" },
  { key: "sellRequests", href: "/account/sell-requests" },
  { key: "messages", href: "/account/messages", unread: "messages" },
  { key: "notifications", href: "/account/notifications", unread: "notifications" },
  { key: "portfolio", href: "/account/portfolio" },
  { key: "listings", href: "/account/listings" },
  { key: "profile", href: "/account/profile" },
  { key: "settings", href: "/account/settings" },
];

export const accountStats = {
  saved: 8,
  priceDrops: 3,
  activeAlerts: 3,
  unread: 3,
  followedStores: 3,
};

export type PriceDrop = {
  id: number;
  title: string;
  image: string;
  // Prices in AED (mock), converted to the browse currency
  price: number;
  drop: number;
};

export const latestPriceDrops: PriceDrop[] = [
  {
    id: 1,
    title: "22K Gold Pearl Drop Necklace — Bridal Set",
    image: "/listing-necklace.webp",
    price: 19580,
    drop: 390,
  },
  {
    id: 2,
    title: "Rolex Datejust 41 — Yellow Gold Champagne Dial",
    image: "/listing-watch.webp",
    price: 95000,
    drop: 2470,
  },
  {
    id: 3,
    title: "18K White Gold Diamond Tennis Bracelet",
    image: "/listing-bracelet.webp",
    price: 14800,
    drop: 400,
  },
];

export type ActivityItem = {
  id: number;
  // Key under "Account.overview.activity.types"
  type: "message" | "priceDrop" | "offer" | "verification";
  name?: string;
  // How long ago, already split into a unit for translation
  ago: { unit: "minutes" | "hours" | "days"; count: number };
  unread: boolean;
};

export const recentActivity: ActivityItem[] = [
  {
    id: 1,
    type: "message",
    name: "Hassan Mohammed",
    ago: { unit: "minutes", count: 10 },
    unread: true,
  },
  { id: 2, type: "priceDrop", ago: { unit: "hours", count: 1 }, unread: true },
  { id: 3, type: "offer", ago: { unit: "hours", count: 3 }, unread: true },
  {
    id: 4,
    type: "verification",
    ago: { unit: "hours", count: 6 },
    unread: false,
  },
];
