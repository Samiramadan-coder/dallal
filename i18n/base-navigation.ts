import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware navigation from next-intl. Don't import it directly:
// use "./navigation" (client) or "./server-navigation" (server), which
// also add the current country to every path
export const base = createNavigation(routing);
