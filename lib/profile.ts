"use server";

import { updateTag } from "next/cache";

import { api } from "@/lib/api/client";
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
      "api/v1/me/phones",
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
    const res = await api.delete<MessageResponse>(
      `api/v1/me/phones/${phoneId}`,
    );
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
      `api/v1/me/phones/${phoneId}/verify`,
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
      `api/v1/me/phones/${phoneId}/primary`,
    );
    updateTag("phones");
    return { message: res.message };
  });
}
