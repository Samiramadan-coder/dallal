import { base } from "./base-navigation";

// Write paths without the country ("/browse"): it's added automatically.
// On the server, use `redirect` from "./server-navigation"
export { Link } from "./link";
export {
  useCountryParam,
  usePathname,
  useRouter,
} from "./client-navigation";
export const { getPathname } = base;
