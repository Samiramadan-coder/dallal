// Static sample data for the home and browse pages.
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

export type CategoryKey =
  | "goldJewelry"
  | "coinsBars"
  | "diamonds"
  | "luxuryWatches"
  | "stonesPearls";

export const categories = [
  { key: "goldJewelry", slug: "gold-jewelry", image: "/listing-necklace.webp" },
  { key: "coinsBars", slug: "coins-bars", image: "/listing-coin.webp" },
  { key: "diamonds", slug: "diamonds", image: "/listing-ring.webp" },
  { key: "luxuryWatches", slug: "luxury-watches", image: "/listing-watch.webp" },
  { key: "stonesPearls", slug: "stones-pearls", image: "/listing-earrings.webp" },
] as const satisfies readonly { key: CategoryKey; slug: string; image: string }[];

export type CategorySlug = (typeof categories)[number]["slug"];

export type City =
  | "dubai"
  | "abuDhabi"
  | "sharjah"
  | "ajman"
  | "rasAlKhaimah"
  | "fujairah"
  | "ummAlQuwain";

export const cities: { key: City; value: string }[] = [
  { key: "dubai", value: "Dubai" },
  { key: "abuDhabi", value: "Abu Dhabi" },
  { key: "sharjah", value: "Sharjah" },
  { key: "ajman", value: "Ajman" },
  { key: "rasAlKhaimah", value: "Ras Al Khaimah" },
  { key: "fujairah", value: "Fujairah" },
  { key: "ummAlQuwain", value: "Umm Al Quwain" },
];

export type Store = {
  slug: string;
  name: string;
  logo: string;
  city: City;
  rating: number;
  reviews: number;
  listings: number;
  open: boolean;
  tier?: string;
};

export const stores: Store[] = [
  { slug: "horological-house", name: "Horological House", logo: "/logos/horological-house.webp", city: "dubai", rating: 4.9, reviews: 421, listings: 2, open: false, tier: "Diamond VIP" },
  { slug: "al-faris-jewellers", name: "Al Faris Jewellers", logo: "/logos/al-faris-jewellers.webp", city: "dubai", rating: 4.8, reviews: 312, listings: 7, open: true },
  { slug: "diamond-house-ad", name: "Diamond House AD", logo: "/logos/diamond-house-ad.webp", city: "abuDhabi", rating: 4.7, reviews: 156, listings: 3, open: true },
  { slug: "premium-timepieces", name: "Premium Timepieces", logo: "/logos/premium-timepieces.webp", city: "dubai", rating: 4.6, reviews: 198, listings: 3, open: true },
  { slug: "gulf-bullion", name: "Gulf Bullion Co.", logo: "/logos/gulf-bullion.webp", city: "ajman", rating: 4.5, reviews: 89, listings: 3, open: false },
  { slug: "pearl-gem-gallery", name: "Pearl & Gem Gallery", logo: "/logos/pearl-gem-gallery.webp", city: "dubai", rating: 4.4, reviews: 53, listings: 2, open: true },
];

export const nearbyStores = [
  { slug: "premium-timepieces", distance: 21 },
  { slug: "horological-house", distance: 23 },
  { slug: "pearl-gem-gallery", distance: 27 },
].map((s) => {
  const store = stores.find((x) => x.slug === s.slug)!;
  return { ...s, store, open: store.open };
});

export const conditions = ["new", "like-new", "good", "fair"] as const;
export type Condition = (typeof conditions)[number];

export const conditionLabels: Record<Condition, string> = {
  new: "New",
  "like-new": "Like New",
  good: "Good",
  fair: "Fair",
};

export type Listing = {
  id: string;
  title: { en: string; ar: string };
  image: string;
  category: CategorySlug;
  /** Sub-category label shown above the title, e.g. "Necklaces". */
  type: string;
  condition: Condition;
  specs: string[];
  price: number;
  store: string;
  city: City;
  distance: number;
  /** Hours since the listing was posted. */
  ageHours: number;
  postedAt: { en: string; ar: string };
  views: number;
  featured?: boolean;
  pinned?: boolean;
  reserved?: boolean;
  livePrice?: boolean;
  belowMarket?: number;
  negotiable?: boolean;
  delivers?: boolean;
};

export const listings: Listing[] = [
  {
    id: "l-001",
    title: { en: "22K Gold Pearl Drop Necklace — Bridal Set", ar: "عقد ذهب عيار 22 بحبات لؤلؤ متدلية — طقم عروس" },
    image: "/listing-set-1.webp",
    category: "gold-jewelry",
    type: "Necklaces",
    condition: "like-new",
    specs: ["22K", "32.5 g", "Yellow"],
    price: 19580,
    store: "al-faris-jewellers",
    city: "dubai",
    distance: 4,
    ageHours: 2,
    postedAt: { en: "2 hours ago", ar: "منذ ساعتين" },
    views: 7,
    featured: true,
    pinned: true,
    livePrice: true,
    delivers: true,
  },
  {
    id: "l-002",
    title: { en: "Princess Cut Diamond Solitaire Ring — 1.5ct", ar: "خاتم سوليتير ألماس قصّة أميرة — 1.5 قيراط" },
    image: "/listing-set-2.webp",
    category: "diamonds",
    type: "Rings",
    condition: "new",
    specs: ["1.5 ct", "F", "VS1", "Natural"],
    price: 18500,
    store: "diamond-house-ad",
    city: "abuDhabi",
    distance: 142,
    ageHours: 5,
    postedAt: { en: "5 hours ago", ar: "منذ 5 ساعات" },
    views: 8,
    featured: true,
    negotiable: true,
  },
  {
    id: "l-003",
    title: { en: "Gold Bar 100g — PAMP Suisse", ar: "سبيكة ذهب 100 غرام — PAMP سويسرا" },
    image: "/listing-coin.webp",
    category: "coins-bars",
    type: "Bars",
    condition: "new",
    specs: ["24K", "100 g", "999.9"],
    price: 54200,
    store: "gulf-bullion",
    city: "ajman",
    distance: 38,
    ageHours: 8,
    postedAt: { en: "8 hours ago", ar: "منذ 8 ساعات" },
    views: 12,
    livePrice: true,
    delivers: true,
  },
  {
    id: "l-004",
    title: { en: "Rolex Datejust 41 — Yellow Gold Champagne Dial", ar: "رولكس ديتجست 41 — ذهب أصفر ومينا شامبانيا" },
    image: "/listing-set-4.webp",
    category: "luxury-watches",
    type: "Luxury Watches",
    condition: "like-new",
    specs: ["Rolex", "2022", "41 mm"],
    price: 95000,
    store: "premium-timepieces",
    city: "dubai",
    distance: 2,
    ageHours: 72,
    postedAt: { en: "3 days ago", ar: "منذ 3 أيام" },
    views: 8,
    featured: true,
    negotiable: true,
  },
  {
    id: "l-005",
    title: { en: "South Sea Pearl & Diamond Drop Earrings", ar: "أقراط لؤلؤ بحر الجنوب وألماس متدلية" },
    image: "/listing-earrings.webp",
    category: "stones-pearls",
    type: "Earrings",
    condition: "like-new",
    specs: ["South Sea", "0.6 ct", "18K"],
    price: 9750,
    store: "pearl-gem-gallery",
    city: "dubai",
    distance: 6,
    ageHours: 20,
    postedAt: { en: "20 hours ago", ar: "منذ 20 ساعة" },
    views: 5,
    delivers: true,
  },
  {
    id: "l-006",
    title: { en: "21K Gold Arabic Rope Chain", ar: "سلسلة ذهب عيار 21 بتصميم الحبل" },
    image: "/listing-necklace.webp",
    category: "gold-jewelry",
    type: "Chains",
    condition: "good",
    specs: ["21K", "18.4 g", "Yellow"],
    price: 9320,
    store: "al-faris-jewellers",
    city: "dubai",
    distance: 4,
    ageHours: 30,
    postedAt: { en: "1 day ago", ar: "منذ يوم" },
    views: 9,
    livePrice: true,
    negotiable: true,
  },
  {
    id: "l-007",
    title: { en: "18K White Gold Diamond Tennis Bracelet", ar: "سوار تنس ألماس من الذهب الأبيض عيار 18" },
    image: "/listing-set-7.webp",
    category: "diamonds",
    type: "Bracelets",
    condition: "like-new",
    specs: ["3.8 ct", "G", "VS2", "Natural"],
    price: 14800,
    store: "al-faris-jewellers",
    city: "abuDhabi",
    distance: 140,
    ageHours: 48,
    postedAt: { en: "2 days ago", ar: "منذ يومين" },
    views: 6,
    featured: true,
    belowMarket: 5,
  },
  {
    id: "l-008",
    title: { en: "Oval Emerald Ring with Diamond Halo", ar: "خاتم زمرد بيضاوي بهالة ألماس" },
    image: "/listing-ring.webp",
    category: "stones-pearls",
    type: "Rings",
    condition: "like-new",
    specs: ["2.1 ct", "Emerald", "18K"],
    price: 12400,
    store: "diamond-house-ad",
    city: "abuDhabi",
    distance: 142,
    ageHours: 96,
    postedAt: { en: "4 days ago", ar: "منذ 4 أيام" },
    views: 4,
    belowMarket: 3,
  },
  {
    id: "l-009",
    title: { en: "Patek Philippe Complications — 18K Rose Gold", ar: "باتيك فيليب كومبليكيشنز — ذهب وردي عيار 18" },
    image: "/listing-set-9.webp",
    category: "luxury-watches",
    type: "Luxury Watches",
    condition: "good",
    specs: ["Patek Philippe", "2019", "40 mm"],
    price: 220000,
    store: "horological-house",
    city: "dubai",
    distance: 3,
    ageHours: 120,
    postedAt: { en: "5 days ago", ar: "منذ 5 أيام" },
    views: 8,
    featured: true,
    reserved: true,
  },
  {
    id: "l-010",
    title: { en: "Cartier Santos Medium — Steel & Gold", ar: "كارتييه سانتوس ميديوم — ستيل وذهب" },
    image: "/listing-watch.webp",
    category: "luxury-watches",
    type: "Luxury Watches",
    condition: "fair",
    specs: ["Cartier", "2016", "35 mm"],
    price: 38500,
    store: "premium-timepieces",
    city: "dubai",
    distance: 2,
    ageHours: 144,
    postedAt: { en: "6 days ago", ar: "منذ 6 أيام" },
    views: 11,
    negotiable: true,
  },
  {
    id: "l-011",
    title: { en: "Gold Sovereign Coins — Set of 5", ar: "جنيهات ذهب — طقم من 5" },
    image: "/listing-coin.webp",
    category: "coins-bars",
    type: "Coins",
    condition: "new",
    specs: ["22K", "39.9 g", "Coin"],
    price: 21900,
    store: "gulf-bullion",
    city: "ajman",
    distance: 38,
    ageHours: 12,
    postedAt: { en: "12 hours ago", ar: "منذ 12 ساعة" },
    views: 3,
    livePrice: true,
    delivers: true,
  },
  {
    id: "l-019",
    title: { en: "Audemars Piguet Royal Oak 41 — Steel", ar: "أوديمار بيغيه رويال أوك 41 — ستيل" },
    image: "/listing-set-4.webp",
    category: "luxury-watches",
    type: "Luxury Watches",
    condition: "like-new",
    specs: ["Audemars Piguet", "2020", "41 mm"],
    price: 185000,
    store: "horological-house",
    city: "dubai",
    distance: 3,
    ageHours: 24,
    postedAt: { en: "1 day ago", ar: "منذ يوم" },
    views: 8,
    featured: true,
  },
];

export const featuredListings = listings.filter((l) => l.featured);

export function getStore(slug: string) {
  return stores.find((s) => s.slug === slug)!;
}

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
