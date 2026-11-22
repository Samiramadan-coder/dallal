import "server-only";

import { cache } from "react";
import { api } from "@/lib/api/client";
import type { User } from "@/types/global";
import { unstable_rethrow } from "next/navigation";
import { getAuthToken } from "@/lib/api/auth-token";

// The signed-in user for Server Components, Server Actions and Route
// Handlers. `cache` dedupes it per request, so the layout and any page or
// component can call it and /me is only hit once
export const getCurrentUser = cache(async (): Promise<User | null> => {
  if (!(await getAuthToken())) return null;

  try {
    // A 401 redirects to sign-in with ?session=expired, which makes the
    // proxy delete the stale cookie
    const res = await api.get<{ data: User }>("/v1/me");
    return res.data;
  } catch (error) {
    unstable_rethrow(error);
    // Any other API failure shouldn't take the whole site down
    console.error("[session] failed to load the current user", error);
    return null;
  }
});

// Cheap check (cookie only, no API call). Fine for UI decisions like
// showing a "Sign in" button; use getCurrentUser() when you need the data
// or a verified session
export async function hasSession(): Promise<boolean> {
  return Boolean(await getAuthToken());
}
