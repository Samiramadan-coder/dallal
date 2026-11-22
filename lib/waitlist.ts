"use server";

import { api } from "@/lib/api/client";
import { runAction } from "@/lib/api/errors";
import type { ActionResult } from "@/lib/api/errors";
import { isWaitlistPhone, type WaitlistFormData } from "@/types/waitlist";

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
    const contact = String(values.contact).trim();
    // Either `email` or `phone` is sent, never both.
    // TODO: confirm the `phone` field name / format with the API
    const channel = isWaitlistPhone(contact)
      ? { phone: contact.replace(/[\s-]/g, "") }
      : { email: contact };
    const res = await api.post<MessageResponse>(
      `/v1/countries/${code}/waitlist`,
      { type: "user", name: values.name, ...channel },
      { skipAuthRedirect: true },
    );
    return { message: res.message };
  });
}
