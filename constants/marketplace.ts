// Static sample data for the home and browse pages.
// Replace with API data once the endpoints are available.

export type Metal = "gold" | "silver" | "platinum";

export type MetalRate = {
  label: string;
  /** Purity in percent, e.g. 99.9. */
  purity: number;
  /** Price per gram in AED. */
  price: number;
  /** Change vs yesterday, in percent. */
  change: number;
};

export const metals: Metal[] = ["gold", "silver", "platinum"];

export const metalRates: Record<Metal, MetalRate[]> = {
  gold: [
    { label: "24K", purity: 99.9, price: 539.25, change: 0.72 },
    { label: "22K", purity: 91.6, price: 499.25, change: 0.72 },
    { label: "21K", purity: 87.5, price: 478.75, change: 0.72 },
    { label: "18K", purity: 75, price: 410.25, change: -0.26 },
    { label: "14K", purity: 58.5, price: 315, change: -0.26 },
  ],
  silver: [
    { label: "999", purity: 99.9, price: 6.2, change: 0.41 },
    { label: "958", purity: 95.8, price: 5.95, change: 0.41 },
    { label: "925", purity: 92.5, price: 5.74, change: 0.41 },
    { label: "900", purity: 90, price: 5.58, change: -0.12 },
    { label: "800", purity: 80, price: 4.96, change: -0.12 },
  ],
  platinum: [
    { label: "999", purity: 99.9, price: 168, change: -0.18 },
    { label: "950", purity: 95, price: 159.75, change: -0.18 },
    { label: "900", purity: 90, price: 151.35, change: -0.18 },
    { label: "850", purity: 85, price: 142.95, change: 0.11 },
    { label: "585", purity: 58.5, price: 98.4, change: 0.11 },
  ],
};

export const TOLA_GRAMS = 11.6638;
export const TROY_OUNCE_GRAMS = 31.1035;

export const weightUnits = [
  { key: "gram", grams: 1 },
  { key: "g10", grams: 10 },
  { key: "g100", grams: 100 },
  { key: "tola", grams: TOLA_GRAMS },
  { key: "ounce", grams: TROY_OUNCE_GRAMS },
  { key: "kg", grams: 1000 },
] as const;

export const chartRanges = ["7d", "1m", "3m", "1y"] as const;
export type ChartRange = (typeof chartRanges)[number];

const rangeDays: Record<ChartRange, number> = { "7d": 7, "1m": 30, "3m": 90, "1y": 365 };

/** Deterministic mock price history ending at `current`. */
export function priceHistory(metal: Metal, range: ChartRange, current: number) {
  const days = rangeDays[range];
  const points = Math.min(days, 60);
  const seed = metal.length * 17 + days;
  const drift = metal === "platinum" ? -0.06 : 0.08; // overall trend over the range
  const out: number[] = [];
  for (let i = 0; i < points; i++) {
    const t = i / (points - 1);
    const wave =
      Math.sin((i + seed) * 0.9) * 0.012 + Math.sin((i + seed) * 0.23) * 0.02;
    out.push(current * (1 - drift * (1 - t) * (days / 365 + 0.15) + wave * (1 - t)));
  }
  out[out.length - 1] = current;
  return out;
}

// Category of the mock listings (real categories come from GET /v1/catalog)
export type CategorySlug =
  | "gold-jewelry"
  | "coins-bars"
  | "diamonds"
  | "luxury-watches"
  | "stones-pearls";

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

export type MarketCategoryKey = (typeof marketCategories)[number]["key"];

/** Listing counts per market category (mock). */
export const marketCategoryCounts: Record<MarketCategoryKey, number> = {
  tools: 3,
  silver: 4,
  watches: 2,
  accessories: 2,
  antiques: 2,
  beads: 2,
};

export type MarketListing = {
  id: string;
  title: { en: string; ar: string };
  image: string;
  category: MarketCategoryKey;
  price: number;
  city: City;
  /** Individual seller name; omitted when listed by a store. */
  seller?: string;
  /** Store slug when the item is listed by a verified store. */
  store?: string;
  badge?: "certified" | "accessory";
};

export const marketListings: MarketListing[] = [
  {
    id: "m-001",
    title: { en: "Sterling silver Arabic coffee dallah with 6 cups", ar: "دلة قهوة عربية من الفضة الإسترلينية مع 6 فناجين" },
    image: "/market/silver-tea-set.webp",
    category: "silver",
    price: 1450,
    city: "dubai",
    seller: "Layla H.",
  },
  {
    id: "m-005",
    title: { en: "Casio G-Shock GA-2100 with box", ar: "كاسيو جي-شوك GA-2100 مع العلبة" },
    image: "/listing-watch.webp",
    category: "watches",
    price: 340,
    city: "dubai",
    seller: "Yousef M.",
  },
  {
    id: "m-s01",
    title: { en: "Hand-engraved 925 sterling silver tray", ar: "صينية فضة إسترلينية عيار 925 بنقش يدوي" },
    image: "/market/silver-tea-set.webp",
    category: "silver",
    price: 1550,
    city: "dubai",
    store: "al-faris-jewellers",
  },
  {
    id: "m-003",
    title: { en: "Digital jewellery scale 0.01 g, up to 500 g", ar: "ميزان مجوهرات رقمي 0.01 غرام، حتى 500 غرام" },
    image: "/market/jewellery-scale.webp",
    category: "tools",
    price: 180,
    city: "sharjah",
    seller: "Omar K.",
  },
  {
    id: "m-011",
    title: { en: "Baltic amber misbaha, 33 beads, with tassel", ar: "مسبحة كهرمان بلطيق، 33 حبة، مع شرابة" },
    image: "/market/amber-misbaha.webp",
    category: "beads",
    price: 850,
    city: "dubai",
    seller: "Mariam A.",
    badge: "certified",
  },
  {
    id: "m-007",
    title: { en: "Gold-plated statement necklace with glass beads", ar: "عقد بارز مطلي بالذهب بخرز زجاجي" },
    image: "/market/costume-necklace.webp",
    category: "accessories",
    price: 120,
    city: "dubai",
    seller: "Mariam A.",
    badge: "accessory",
  },
  {
    id: "m-014",
    title: { en: "Silver bar 100 g, 999 fine", ar: "سبيكة فضة 100 غرام، نقاء 999" },
    image: "/listing-coin.webp",
    category: "silver",
    price: 340,
    city: "dubai",
    seller: "Layla H.",
  },
  {
    id: "m-002",
    title: { en: "Handmade silver chain bracelet, unknown hallmark", ar: "سوار سلسلة فضة بيد، دمغة غير معروفة" },
    image: "/listing-bracelet.webp",
    category: "silver",
    price: 320,
    city: "abuDhabi",
    seller: "Noura S.",
  },
];

export function formatPrice(value: number, currency: string, locale: string) {
  const amount = value.toLocaleString("en-US", { maximumFractionDigits: 2 });
  return locale === "ar" ? `${amount} ${currency}` : `${currency} ${amount}`;
}

export function headingFont(locale: string) {
  return locale === "en" ? "font-playfair" : "";
}
