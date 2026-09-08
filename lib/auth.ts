import type { SignUpFormData } from "@/types/sign-up";
import { http, ValidationError } from "./http";
import { OTPVerifyFormData } from "@/types/otp-verify";
import { SignInFormData } from "@/types/sign-in";
import { ForgotPasswordFormData } from "@/types/forgot-password";

// SignUpResponse represents the possible responses from the sign-up API.
type SignUpResponse =
  | { success: true; message: string }
  | {
      success: false;
      errors?: Partial<Record<keyof SignUpFormData, string>>;
      message?: string;
    };

export async function signUp(
  formData: SignUpFormData,
): Promise<SignUpResponse> {
  try {
    const { data } = await http.post<{ message: string }>(
      "/api/v1/auth/register",
      formData,
    );

    return { success: true, message: data.message };
  } catch (error) {
    console.error("Error In signUp", error);
    if (error instanceof ValidationError) {
      const errors = Object.fromEntries(
        Object.entries(error.errors).map(([field, messages]) => [
          field,
          messages[0] ?? "Invalid value",
        ]),
      ) as Partial<Record<keyof SignUpFormData, string>>;

      return { success: false, errors, message: error.responseMessage };
    }

    return { success: false };
  }
}

// Resend OTP function to request a new OTP for the given phone number.
type ResendOTPResponse =
  | { success: true; message?: string }
  | { success: false; message?: string };

export async function resendOTP(phone: string): Promise<ResendOTPResponse> {
  try {
    const { data } = await http.post<{ message: string }>(
      "/api/v1/auth/phone/resend",
      {
        phone,
      },
    );

    return { success: true, message: data.message };
  } catch (error) {
    console.error("Error in resendOTP", error);
    if (error instanceof ValidationError) {
      return { success: false, message: error.responseMessage };
    }
    return { success: false };
  }
}

// Verify OTP function to validate the OTP for the given phone number.
type VerifyOTPResponse =
  | { success: true; token: string; message: string }
  | {
      success: false;
      errors?: Partial<Record<keyof OTPVerifyFormData, string>>;
      message?: string;
    };

export async function verifyOTP(
  formData: OTPVerifyFormData,
): Promise<VerifyOTPResponse> {
  try {
    const { data } = await http.post<{
      data: { token: string };
      message: string;
    }>("/api/v1/auth/phone/verify", formData);
    return { success: true, token: data.data.token, message: data.message };
  } catch (error) {
    console.error("Error in verifyOTP", error);
    if (error instanceof ValidationError) {
      const errors = Object.fromEntries(
        Object.entries(error.errors).map(([field, messages]) => [
          field,
          messages[0] ?? "Invalid value",
        ]),
      ) as Partial<Record<keyof OTPVerifyFormData, string>>;
      return { success: false, errors, message: error.responseMessage };
    }

    return { success: false };
  }
}

// SignIn
type SignInResponse =
  | { success: true; token: string; message: string }
  | {
      success: false;
      message?: string;
      errors?: Partial<Record<keyof SignInFormData, string>>;
    };

export async function signIn(
  formData: SignInFormData,
): Promise<SignInResponse> {
  try {
    const { data } = await http.post<{
      data: { token: string };
      message: string;
    }>("/api/v1/auth/login", { ...formData, device_name: "web" });
    return { success: true, token: data.data.token, message: data.message };
  } catch (error) {
    console.error("Error in signIn", error);
    if (error instanceof ValidationError) {
      const errors = Object.fromEntries(
        Object.entries(error.errors).map(([field, messages]) => [
          field,
          messages[0] ?? "Invalid value",
        ]),
      ) as Partial<Record<keyof SignInFormData, string>>;
      return { success: false, errors, message: error.responseMessage };
    }

    return { success: false };
  }
}

// Send Forgot Password OTP
type SendForgotPasswordOTPResponse =
  | { success: true; message: string }
  | {
      success: false;
      message?: string;
      errors?: Partial<Record<keyof ForgotPasswordFormData, string>>;
    };

export async function sendForgotPasswordOTP(
  formData: ForgotPasswordFormData,
): Promise<SendForgotPasswordOTPResponse> {
  try {
    const { data } = await http.post<{ message: string }>(
      "/api/v1/auth/password/forgot",
      formData,
    );
    return { success: true, message: data.message };
  } catch (error) {
    console.error("Error in sendForgotPasswordOTP", error);
    if (error instanceof ValidationError) {
      const errors = Object.fromEntries(
        Object.entries(error.errors).map(([field, messages]) => [
          field,
          messages[0] ?? "Invalid value",
        ]),
      ) as Partial<Record<keyof ForgotPasswordFormData, string>>;

      return { success: false, errors, message: error.responseMessage };
    }

    return { success: false };
  }
}
