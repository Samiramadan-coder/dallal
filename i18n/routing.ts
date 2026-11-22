import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ar", "en"],
  // Arabic (RTL) is the default: its URLs have no prefix ("/sa/browse"),
  // English ones do ("/en/sa/browse")
  defaultLocale: "ar",
  localePrefix: "as-needed",
  // The visitor's chosen language, remembered for a year
  localeCookie: {
    name: "lang",
    maxAge: 60 * 60 * 24 * 365,
  },
});
