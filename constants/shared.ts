export const links = [
  { key: "browse", href: "/browse" },
  { key: "individualMarket", href: "/market" },
  { key: "metalPrices", href: "/metal-prices" },
  { key: "calculator", href: "/calculator" },
  { key: "forMerchants", href: "/packages" },
];

export const footerColumns = [
  {
    key: "explore",
    links: [
      { key: "browse", href: "/browse" },
      { key: "nearbyStores", href: "/browse?view=map" },
      { key: "individualMarket", href: "/market" },
      { key: "metalPrices", href: "/metal-prices" },
      { key: "calculator", href: "/calculator" },
    ],
  },
  {
    key: "sell",
    links: [
      { key: "sellGold", href: "/sell" },
      { key: "forStores", href: "/packages" },
      { key: "openStore", href: "/store/open" },
    ],
  },
  {
    key: "company",
    links: [
      { key: "about", href: "/about" },
      { key: "support", href: "/support" },
      { key: "terms", href: "/legal#terms" },
      { key: "privacy", href: "/legal#privacy" },
      { key: "prohibited", href: "/legal#prohibited-items" },
    ],
  },
] as const;
