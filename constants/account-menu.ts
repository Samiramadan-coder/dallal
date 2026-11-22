// Avatar menu items (header and mobile drawer). `key` is under
// "AccountMenu.items". Pages other than /profile don't exist yet

export type AccountMenuItem = { key: string; href: string };

export const PERSONAL_MENU: readonly AccountMenuItem[] = [
  { key: "myAccount", href: "/profile" },
  { key: "saved", href: "/profile/saved" },
  { key: "myOffers", href: "/profile/offers" },
  { key: "searchAlerts", href: "/profile/alerts" },
  { key: "mySellRequests", href: "/profile/sell-requests" },
  { key: "myListings", href: "/profile/listings" },
  { key: "settings", href: "/profile/settings" },
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
export const PERSONAL_HOME = "/profile";
export const STORE_HOME = "/dashboard";
export const OPEN_STORE_PATH = "/store/open";
