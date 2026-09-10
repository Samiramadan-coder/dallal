"use server";

import {
  AddNewPhoneFormValues,
  OTPVerificationFormValues,
} from "@/types/profile";
import { Phone } from "@/types/global";
import { updateTag } from "next/cache";
import { http, ValidationError } from "./http";

// Add New Phone
type AddNewPhoneResponse =
  | {
      success: true;
      message?: string;
      phone: Phone;
    }
  | {
      success: false;
      message?: string;
      errors?: Partial<Record<keyof AddNewPhoneFormValues, string>>;
    };

export async function addNewPhone(
  formData: AddNewPhoneFormValues,
): Promise<AddNewPhoneResponse> {
  try {
    const { data } = await http.post<{ message: string; data: Phone }>(
      "/api/v1/me/phones",
      formData,
    );
    updateTag("phones");
    return {
      success: true,
      message: data.message,
      phone: data.data,
    };
  } catch (error) {
    console.error("Error adding new phone:", error);
    if (error instanceof ValidationError) {
      const errors = Object.fromEntries(
        Object.entries(error.errors).map(([field, messages]) => [
          field,
          messages[0] ?? "Invalid value",
        ]),
      ) as Partial<Record<keyof AddNewPhoneFormValues, string>>;
      return {
        success: false,
        errors,
        message: error.responseMessage,
      };
    }
    return { success: false };
  }
}

// Delete Phone
type DeletePhoneResponse =
  | {
      success: true;
      message?: string;
    }
  | {
      success: false;
      message?: string;
    };

export async function deletePhone(
  phoneId: number,
): Promise<DeletePhoneResponse> {
  try {
    const { data } = await http.delete<{ message: string }>(
      `/api/v1/me/phones/${phoneId}`,
    );
    updateTag("phones");
    return {
      success: true,
      message: data.message,
    };
  } catch (error) {
    console.error("Error deleting phone:", error);
    if (error instanceof ValidationError) {
      return {
        success: false,
        message: error.responseMessage,
      };
    }
    return { success: false };
  }
}

// Verify Phone
type VerifyPhoneResponse =
  | {
      success: true;
      message?: string;
    }
  | {
      success: false;
      message?: string;
      errors?: Partial<Record<keyof OTPVerificationFormValues, string>>;
    };

export async function verifyPhone(
  phoneId: number,
  formData: OTPVerificationFormValues,
): Promise<VerifyPhoneResponse> {
  try {
    const { data } = await http.post<{ message: string; data: Phone }>(
      `/api/v1/me/phones/${phoneId}/verify`,
      formData,
    );
    updateTag("phones");
    return {
      success: true,
      message: data.message,
    };
  } catch (error) {
    console.error("Error verifying phone:", error);
    if (error instanceof ValidationError) {
      const errors = Object.fromEntries(
        Object.entries(error.errors).map(([field, messages]) => [
          field,
          messages[0] ?? "Invalid value",
        ]),
      ) as Partial<Record<keyof OTPVerificationFormValues, string>>;
      return {
        success: false,
        errors,
        message: error.responseMessage,
      };
    }
    return { success: false };
  }
}
