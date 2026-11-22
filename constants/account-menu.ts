// Avatar menu items (header and mobile drawer). `key` is under
// "AccountMenu.items". The /account sections live in constants/account.ts

export type AccountMenuItem = { key: string; href: string };

export const PERSONAL_MENU: readonly AccountMenuItem[] = [
  { key: "myAccount", href: "/account" },
  { key: "saved", href: "/account/saved" },
  { key: "myOffers", href: "/account/offers" },
  { key: "searchAlerts", href: "/account/alerts" },
  { key: "mySellRequests", href: "/account/sell-requests" },
  { key: "myListings", href: "/account/listings" },
  { key: "settings", href: "/account/settings" },
];

export function storeMenu(storeId: number): readonly AccountMenuItem[] {
  return [
    { key: "storeDashboard", href: "/dashboard" },
    { key: "listings", href: "/dashboard/listings" },
    { key: "offersReservations", href: "/dashboard/offers" },
    { key: "sellRequests", href: "/dashboard/sell-requests" },
    { key: "storeMessages", href: "/messages" },
    { key: "storePage", href: `/store/${storeId}` },
    { key: "planBilling", href: "/dashboard/billing" },
  ];
}

// Where each mode starts
export const PERSONAL_HOME = "/account";
export const STORE_HOME = "/dashboard";
export const OPEN_STORE_PATH = "/store/open";
