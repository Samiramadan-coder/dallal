"use server";

import { api } from "@/lib/api/client";
import { runAction } from "@/lib/api/errors";
import type { ActionResult } from "@/lib/api/errors";
import type { WaitlistFormData } from "@/types/waitlist";

type MessageResponse = { message: string };

// Join a coming-soon country's launch waitlist. Open to guests: the token
// is sent when there is one, but a 401 never redirects to sign-in
export async function joinWaitlist(
  countryCode: string,
  values: WaitlistFormData,
): Promise<ActionResult<{ message: string }>> {
  return runAction(async () => {
    // Action arguments come from the client: keep the path segment safe
    const code = String(countryCode)
      .replace(/[^a-z]/gi, "")
      .toUpperCase();
    const res = await api.post<MessageResponse>(
      `/v1/countries/${code}/waitlist`,
      { type: "user", name: values.name, email: values.email },
      { skipAuthRedirect: true },
    );
    return { message: res.message };
  });
}
