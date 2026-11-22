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

export type User = {
  id: number;
  name: string;
  email: string;
  account_type: "individual" | "shop";
  status: "active" | "inactive";
  phones: Phone[];
  // TODO: not returned by /v1/me yet; the store switcher stays hidden until
  // it is. Null / missing = no store
  store?: UserStore | null;
};
