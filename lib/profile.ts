"use server";

import { refresh, updateTag } from "next/cache";

import { api, toFormData } from "@/lib/api/client";
import { clearAuthToken } from "@/lib/api/auth-token";
import { resolveLocale } from "@/lib/api/locale";
import { HOME_PATH } from "@/lib/auth-routes";
import { redirect } from "@/i18n/server-navigation";
import { runAction } from "@/lib/api/errors";
import type { ActionResult } from "@/lib/api/errors";
import type { Phone } from "@/types/global";
import type {
  AddNewPhoneFormValues,
  OTPVerificationFormValues,
} from "@/types/profile";

type MessageResponse = { message: string };

// Add New Phone
export async function addNewPhone(
  values: AddNewPhoneFormValues,
): Promise<ActionResult<{ message: string; phone: Phone }>> {
  return runAction(async () => {
    const res = await api.post<{ message: string; data: Phone }>(
      "/v1/me/phones",
      values,
    );
    updateTag("phones");
    return { message: res.message, phone: res.data };
  });
}

// Delete Phone
export async function deletePhone(
  phoneId: number,
): Promise<ActionResult<{ message: string }>> {
  return runAction(async () => {
    const res = await api.delete<MessageResponse>(`/v1/me/phones/${phoneId}`);
    updateTag("phones");
    return { message: res.message };
  });
}

// Verify Phone
export async function verifyPhone(
  phoneId: number,
  values: OTPVerificationFormValues,
): Promise<ActionResult<{ message: string }>> {
  return runAction(async () => {
    const res = await api.post<MessageResponse>(
      `/v1/me/phones/${phoneId}/verify`,
      values,
    );
    updateTag("phones");
    return { message: res.message };
  });
}

// Set Primary Phone
export async function setPrimaryPhone(
  phoneId: number,
): Promise<ActionResult<{ message: string }>> {
  return runAction(async () => {
    const res = await api.post<MessageResponse>(
      `/v1/me/phones/${phoneId}/primary`,
    );
    updateTag("phones");
    return { message: res.message };
  });
}

// Update Avatar
// Multipart upload, so it goes through POST (PHP doesn't parse multipart
// bodies on PUT/PATCH). refresh() re-renders the layout, which refetches
// /me and pushes the new avatar_url into UserProvider
export async function updateAvatar(
  formData: FormData,
): Promise<ActionResult<{ message: string | null }>> {
  return runAction(async () => {
    const avatar = formData.get("avatar");
    const res = await api.post<{ message?: string }>(
      "/v1/me",
      toFormData({ avatar }),
    );
    refresh();
    return { message: res?.message ?? null };
  });
}

// Update Personal Details
export async function updatePersonalDetails(values: {
  name: string;
  city_id: number | null;
  locale: string;
}): Promise<ActionResult<{ message: string | null }>> {
  return runAction(async () => {
    const res = await api.post<{ message?: string }>("/v1/me", values);
    refresh();
    return { message: res?.message ?? null };
  });
}

// Change Phone, step 1: sends an OTP to the new number. `phone` is the
// number in international format ("+971559876543") for step 2, or null if
// the API didn't return it
export async function requestPhoneChange(values: {
  country_id: number;
  phone: string;
}): Promise<ActionResult<{ message: string | null; phone: string | null }>> {
  return runAction(async () => {
    const res = await api.post<{
      message?: string;
      // `data.phone` is the Phone resource ({ id, phone, ... }), though
      // accept a plain string too
      data?: { phone?: Phone | string } | null;
    }>("/v1/me/phone/change", values);

    const phone = res?.data?.phone;
    const international =
      typeof phone === "string" ? phone : (phone?.phone ?? null);

    return { message: res?.message ?? null, phone: international };
  });
}

// Change Phone, step 2: confirms the new number with the OTP
export async function confirmPhoneChange(values: {
  phone: string;
  code: string;
}): Promise<ActionResult<{ message: string | null }>> {
  return runAction(async () => {
    const res = await api.post<{ message?: string }>(
      "/v1/me/phone/confirm",
      values,
    );
    updateTag("phones");
    refresh();
    return { message: res?.message ?? null };
  });
}

// Change Password
export async function changePassword(values: {
  current_password: string;
  password: string;
  password_confirmation: string;
}): Promise<ActionResult<{ message: string | null }>> {
  return runAction(async () => {
    const res = await api.put<{ message?: string }>("/v1/me/password", values);
    return { message: res?.message ?? null };
  });
}

// Delete Account, step 1: emails/texts a verification code
export async function sendDeleteAccountCode(): Promise<
  ActionResult<{ message: string | null }>
> {
  return runAction(async () => {
    const res = await api.post<{ message?: string }>("/v1/me/delete/code");
    return { message: res?.message ?? null };
  });
}

// Delete Account, step 2. On success the token is cleared and the user is
// sent home (like signOut), so this only returns on failure
export async function deleteAccount(values: {
  password: string;
  code: string;
}): Promise<ActionResult<{ message: string | null }>> {
  const result = await runAction(async () => {
    const res = await api.delete<{ message?: string }>("/v1/me", values);
    return { message: res?.message ?? null };
  });
  if (!result.ok) return result;

  await clearAuthToken();
  return redirect({ href: HOME_PATH, locale: await resolveLocale() });
}
