export type T = (key: string) => string;

export type Country = {
  cities_count: number;
  code: string;
  currency: string;
  dial_code: string;
  flag: string;
  id: number;
  is_active: boolean;
  name: string;
  rounding_step: number;
  status: "live" | "coming_soon";
  status_label: string;
  vat_rate: number;
};

export type City = {
  id: number;
  name: string;
  lat: number;
  lng: number;
};

export type Phone = {
  id: number;
  phone: string;
  national_number: string;
  is_primary: boolean;
  is_verified: boolean;
  country: Country;
};

// The store a user owns
export type UserStore = {
  id: number;
  name: string;
  logo: string | null;
};

// `data.user` of GET /v1/me
export type ApiUser = {
  id: number;
  name: string;
  email: string;
  account_level: string;
  account_level_label: string;
  status: "active" | "inactive" | "suspended";
  status_label: string;
  suspended_until: string | null;
  locale: string;
  avatar_url: string | null;
  primary_country: Country | null;
  browse_country: Country | null;
  city_id: number | null;
  phone_verified_at: string | null;
  phones: Phone[];
};

// GET /v1/me
export type MeResponse = {
  user: ApiUser;
  account_level: string;
  kyc_status: string | null;
  stores: UserStore[];
  active_mode: "personal" | "store";
  unread_counts: { messages: number; notifications: number };
};

// The signed-in user as the app uses it (see getCurrentUser)
export type User = ApiUser & {
  // The user's first store; null = no store
  store: UserStore | null;
  unread_counts: MeResponse["unread_counts"];
};
