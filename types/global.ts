export type T = (key: string) => string;

export type Country = {
  is_active: boolean;
  dial_code: string;
  code: string;
  flag: string;
  name: string;
  id: number;
};

export type User = {
  id: number;
  name: string;
  email: string;
  account_type: "individual" | "shop";
  status: "active" | "inactive";
  phones: {
    id: number;
    phone: string;
    national_number: string;
    is_primary: boolean;
    is_verified: boolean;
    country: Country;
  }[];
};
