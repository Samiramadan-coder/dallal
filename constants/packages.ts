// Mock plan data for the /packages page. Replace with API data later.

export const YEARLY_SAVING_PERCENT = 20;

export const planPrices = { gold: 149, vip: 399 } as const;
export type PaidPlan = keyof typeof planPrices;

/** A cell value: translated label key with optional {n}, a plain string, or included / not included. */
export type FeatureValue =
  | boolean
  | string
  | { key: "unlimited" | "oneHour" | "full" | "priority" | "accountManager" }
  | { key: "plusVideo" | "perMonth" | "individualMarket"; n: number };

/** Feature bullets shown on each plan card, in order. */
export const planCardFeatures: Record<
  PaidPlan,
  { feature: string; value: FeatureValue }[]
> = {
  gold: [
    { feature: "activeListings", value: "150" },
    { feature: "photos", value: { key: "plusVideo", n: 20 } },
    { feature: "branches", value: "3" },
    { feature: "offers", value: { key: "perMonth", n: 30 } },
    { feature: "earlyAccess", value: true },
    { feature: "freeFeatured", value: { key: "perMonth", n: 3 } },
    { feature: "boostCredits", value: { key: "perMonth", n: 5 } },
    { feature: "fullAnalytics", value: true },
    { feature: "bulkUpload", value: true },
    { feature: "exportApi", value: false },
    { feature: "team", value: "3" },
    { feature: "homepagePriority", value: false },
    { feature: "prioritySupport", value: true },
  ],
  vip: [
    { feature: "activeListings", value: { key: "unlimited" } },
    { feature: "photos", value: { key: "plusVideo", n: 30 } },
    { feature: "branches", value: { key: "unlimited" } },
    { feature: "offers", value: { key: "unlimited" } },
    { feature: "earlyAccess", value: { key: "oneHour" } },
    { feature: "freeFeatured", value: { key: "perMonth", n: 10 } },
    { feature: "boostCredits", value: { key: "perMonth", n: 15 } },
    { feature: "fullAnalytics", value: true },
    { feature: "bulkUpload", value: true },
    { feature: "exportApi", value: true },
    { feature: "team", value: "10" },
    { feature: "homepagePriority", value: true },
    { feature: "accountManager", value: true },
  ],
};

/** Rows of the comparison table: [personal, gold, vip]. */
export const compareRows: {
  feature: string;
  values: [FeatureValue, FeatureValue, FeatureValue];
}[] = [
  { feature: "activeListings", values: [{ key: "individualMarket", n: 3 }, "150", { key: "unlimited" }] },
  { feature: "activeSellRequests", values: ["5", "—", "—"] },
  { feature: "photos", values: ["3", { key: "plusVideo", n: 20 }, { key: "plusVideo", n: 30 }] },
  { feature: "merchantCategories", values: [false, true, true] },
  { feature: "branches", values: [false, "3", { key: "unlimited" }] },
  { feature: "offers", values: [false, { key: "perMonth", n: 30 }, { key: "unlimited" }] },
  { feature: "seesEarly", values: [false, false, { key: "oneHour" }] },
  { feature: "freeFeaturedMonth", values: [false, "3", "10"] },
  { feature: "boostCreditsMonth", values: [false, "5", "15"] },
  { feature: "analytics", values: [false, { key: "full" }, { key: "full" }] },
  { feature: "bulkUpload", values: [false, true, true] },
  { feature: "exportApi", values: [false, false, true] },
  { feature: "team", values: [false, "3", "10"] },
  { feature: "homepagePriority", values: [false, false, true] },
  { feature: "support", values: [false, { key: "priority" }, { key: "accountManager" }] },
];

export const boosts = [
  { key: "bump", price: 19, credits: 1, duration: "oneTime" as const },
  { key: "featured", price: 49, credits: 3, duration: 7 },
  { key: "pinned", price: 89, credits: 5, duration: 14 },
] as const;
