// Static sample data for the home page sections.
// Replace with API data once the endpoints are available.

export type Metal = "gold" | "silver" | "platinum";

export type MetalRate = {
  label: string;
  price: number;
  change: number;
};

export const metalRates: Record<Metal, MetalRate[]> = {
  gold: [
    { label: "24K", price: 539, change: 0.72 },
    { label: "22K", price: 499, change: 0.72 },
    { label: "21K", price: 479, change: 0.72 },
    { label: "18K", price: 410, change: -0.26 },
    { label: "14K", price: 315, change: -0.26 },
  ],
  silver: [
    { label: "999", price: 4.1, change: 0.35 },
    { label: "958", price: 3.93, change: 0.35 },
    { label: "925", price: 3.79, change: -0.12 },
    { label: "900", price: 3.69, change: -0.12 },
    { label: "800", price: 3.28, change: -0.12 },
  ],
  platinum: [
    { label: "999", price: 128, change: -0.41 },
    { label: "950", price: 122, change: -0.41 },
    { label: "900", price: 115, change: 0.18 },
    { label: "850", price: 109, change: 0.18 },
    { label: "585", price: 75, change: 0.18 },
  ],
};

export const categories = [
  { key: "goldJewelry", slug: "gold-jewelry", image: "/listing-necklace.webp" },
  { key: "coinsBars", slug: "coins-bars", image: "/listing-coin.webp" },
  { key: "diamonds", slug: "diamonds", image: "/listing-ring.webp" },
  { key: "luxuryWatches", slug: "luxury-watches", image: "/listing-watch.webp" },
  { key: "stonesPearls", slug: "stones-pearls", image: "/listing-earrings.webp" },
] as const;

export type City = "dubai" | "abuDhabi" | "ajman";

export type Store = {
  slug: string;
  name: string;
  logo: string;
  city: City;
  rating: number;
  reviews: number;
  listings: number;
  tier?: string;
};

export const stores: Store[] = [
  { slug: "horological-house", name: "Horological House", logo: "/logos/horological-house.webp", city: "dubai", rating: 4.9, reviews: 421, listings: 2, tier: "Diamond VIP" },
  { slug: "al-faris-jewellers", name: "Al Faris Jewellers", logo: "/logos/al-faris-jewellers.webp", city: "dubai", rating: 4.8, reviews: 312, listings: 7 },
  { slug: "diamond-house-ad", name: "Diamond House AD", logo: "/logos/diamond-house-ad.webp", city: "abuDhabi", rating: 4.7, reviews: 156, listings: 3 },
  { slug: "premium-timepieces", name: "Premium Timepieces", logo: "/logos/premium-timepieces.webp", city: "dubai", rating: 4.6, reviews: 198, listings: 3 },
  { slug: "gulf-bullion", name: "Gulf Bullion Co.", logo: "/logos/gulf-bullion.webp", city: "ajman", rating: 4.5, reviews: 89, listings: 3 },
  { slug: "pearl-gem-gallery", name: "Pearl & Gem Gallery", logo: "/logos/pearl-gem-gallery.webp", city: "dubai", rating: 4.4, reviews: 53, listings: 2 },
];

export const nearbyStores = [
  { slug: "premium-timepieces", distance: 21, open: true },
  { slug: "horological-house", distance: 23, open: false },
  { slug: "pearl-gem-gallery", distance: 27, open: true },
].map((s) => ({ ...s, store: stores.find((x) => x.slug === s.slug)! }));

export type Listing = {
  id: string;
  title: { en: string; ar: string };
  image: string;
  meta: string;
  specs: string[];
  price: number;
  store: string;
  city: City;
  distance: number;
  postedAt: { en: string; ar: string };
  views: number;
  pinned?: boolean;
  reserved?: boolean;
  livePrice?: boolean;
  belowMarket?: number;
};

export const featuredListings: Listing[] = [
  {
    id: "l-001",
    title: { en: "22K Gold Pearl Drop Necklace — Bridal Set", ar: "عقد ذهب عيار 22 بحبات لؤلؤ متدلية — طقم عروس" },
    image: "/listing-set-1.webp",
    meta: "Necklaces · Like New",
    specs: ["22K", "32.5 g", "Yellow"],
    price: 19580,
    store: "al-faris-jewellers",
    city: "dubai",
    distance: 4,
    postedAt: { en: "2 hours ago", ar: "منذ ساعتين" },
    views: 7,
    pinned: true,
    livePrice: true,
  },
  {
    id: "l-002",
    title: { en: "Princess Cut Diamond Solitaire Ring — 1.5ct", ar: "خاتم سوليتير ألماس قصّة أميرة — 1.5 قيراط" },
    image: "/listing-set-2.webp",
    meta: "Rings · New",
    specs: ["1.5 ct", "F", "VS1", "Natural"],
    price: 18500,
    store: "diamond-house-ad",
    city: "abuDhabi",
    distance: 142,
    postedAt: { en: "5 hours ago", ar: "منذ 5 ساعات" },
    views: 8,
  },
  {
    id: "l-004",
    title: { en: "Rolex Datejust 41 — Yellow Gold Champagne Dial", ar: "رولكس ديتجست 41 — ذهب أصفر ومينا شامبانيا" },
    image: "/listing-set-4.webp",
    meta: "Luxury Watches · Like New",
    specs: ["Rolex", "2022", "41 mm"],
    price: 95000,
    store: "premium-timepieces",
    city: "dubai",
    distance: 2,
    postedAt: { en: "3 days ago", ar: "منذ 3 أيام" },
    views: 8,
  },
  {
    id: "l-007",
    title: { en: "18K White Gold Diamond Tennis Bracelet", ar: "سوار تنس ألماس من الذهب الأبيض عيار 18" },
    image: "/listing-set-7.webp",
    meta: "Bracelets · Like New",
    specs: ["3.8 ct", "G", "VS2", "Natural"],
    price: 14800,
    store: "al-faris-jewellers",
    city: "abuDhabi",
    distance: 140,
    postedAt: { en: "2 days ago", ar: "منذ يومين" },
    views: 6,
    belowMarket: 5,
  },
  {
    id: "l-009",
    title: { en: "Patek Philippe Complications — 18K Rose Gold", ar: "باتيك فيليب كومبليكيشنز — ذهب وردي عيار 18" },
    image: "/listing-set-9.webp",
    meta: "Luxury Watches · Good",
    specs: ["Patek Philippe", "2019", "40 mm"],
    price: 220000,
    store: "horological-house",
    city: "dubai",
    distance: 3,
    postedAt: { en: "5 days ago", ar: "منذ 5 أيام" },
    views: 8,
    reserved: true,
  },
  {
    id: "l-019",
    title: { en: "Audemars Piguet Royal Oak 41 — Steel", ar: "أوديمار بيغيه رويال أوك 41 — ستيل" },
    image: "/listing-set-4.webp",
    meta: "Luxury Watches · Like New",
    specs: ["Audemars Piguet", "2020", "41 mm"],
    price: 185000,
    store: "horological-house",
    city: "dubai",
    distance: 3,
    postedAt: { en: "1 day ago", ar: "منذ يوم" },
    views: 8,
  },
];

export const marketCategories = [
  { key: "tools", slug: "tools-equipment" },
  { key: "silver", slug: "silver" },
  { key: "watches", slug: "everyday-watches" },
  { key: "accessories", slug: "accessories-costume" },
  { key: "antiques", slug: "antiques-collectibles" },
  { key: "beads", slug: "prayer-beads" },
] as const;

export function formatPrice(value: number, currency: string, locale: string) {
  const amount = value.toLocaleString("en-US", { maximumFractionDigits: 2 });
  return locale === "ar" ? `${amount} ${currency}` : `${currency} ${amount}`;
}

export function headingFont(locale: string) {
  return locale === "en" ? "font-playfair" : "";
}
