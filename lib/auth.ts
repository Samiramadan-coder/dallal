"use server";

import { redirect } from "@/i18n/server-navigation";
import { api } from "@/lib/api/client";
import { clearAuthToken, setAuthToken } from "@/lib/api/auth-token";
import { ForbiddenError, runAction } from "@/lib/api/errors";
import type { ActionResult } from "@/lib/api/errors";
import { resolveLocale } from "@/lib/api/locale";
import { HOME_PATH, localizePath, safeCallbackUrl } from "@/lib/auth-routes";
import { getCountryCode } from "@/lib/api/selected-country";
import type { ForgotPasswordFormData } from "@/types/forgot-password";
import type { OTPVerifyFormData } from "@/types/otp-verify";
import type { ResetPasswordFormData } from "@/types/reset-password";
import type { SignInFormData } from "@/types/sign-in";
import type { SignUpFormData } from "@/types/sign-up";

type MessageResponse = { message: string };
type TokenResponse = { message: string; data: { token: string } };

// Guest endpoints: no token is sent, and a 401 (e.g. wrong credentials)
// is shown as an error instead of redirecting to sign-in
const GUEST = { auth: false, skipAuthRedirect: true } as const;

// Where to go after signing in: the callbackUrl if it's safe, else home.
// Already localized, so navigate with next/navigation's router
async function afterSignInUrl(callbackUrl?: string | null): Promise<string> {
  return safeCallbackUrl(
    // Action arguments come from the client, so don't trust the type
    typeof callbackUrl === "string" ? callbackUrl : null,
    localizePath(HOME_PATH, await resolveLocale(), await getCountryCode()),
  );
}

// Sign Up
export async function signUp(
  values: SignUpFormData,
): Promise<ActionResult<{ message: string }>> {
  return runAction(async () => {
    const res = await api.post<MessageResponse>(
      "/v1/auth/register",
      values,
      GUEST,
    );
    return { message: res.message };
  });
}

// Resend the phone verification OTP
export async function resendOTP(
  phone: string,
): Promise<ActionResult<{ message: string }>> {
  return runAction(async () => {
    const res = await api.post<MessageResponse>(
      "/v1/auth/phone/resend",
      { phone },
      GUEST,
    );
    return { message: res.message };
  });
}

// Verify the phone OTP; signs the user in on success
export async function verifyOTP(
  values: OTPVerifyFormData,
  callbackUrl?: string | null,
): Promise<ActionResult<{ message: string; redirectTo: string }>> {
  return runAction(async () => {
    const res = await api.post<TokenResponse>(
      "/v1/auth/phone/verify",
      values,
      GUEST,
    );
    await setAuthToken(res.data.token);
    return {
      message: res.message,
      redirectTo: await afterSignInUrl(callbackUrl),
    };
  });
}

export type SignInResult =
  | { status: "signed-in"; message: string; redirectTo: string }
  // The phone isn't verified yet (the API answers 403 with the phone)
  | { status: "unverified"; phone: string };

function unverifiedPhone(error: ForbiddenError): string | undefined {
  const body = error.body as { data?: { phone?: unknown } } | undefined;
  return typeof body?.data?.phone === "string" ? body.data.phone : undefined;
}

// Sign In
export async function signIn(
  values: SignInFormData,
  callbackUrl?: string | null,
): Promise<ActionResult<SignInResult>> {
  return runAction(async (): Promise<SignInResult> => {
    try {
      const res = await api.post<TokenResponse>(
        "/v1/auth/login",
        { ...values, device_name: "web" },
        GUEST,
      );
      await setAuthToken(res.data.token);
      return {
        status: "signed-in",
        message: res.message,
        redirectTo: await afterSignInUrl(callbackUrl),
      };
    } catch (error) {
      const phone =
        error instanceof ForbiddenError ? unverifiedPhone(error) : undefined;
      if (phone) return { status: "unverified", phone };
      // runAction turns everything else into an ActionFailure
      throw error;
    }
  });
}

// Send the forgot-password OTP
export async function sendForgotPasswordOTP(
  values: ForgotPasswordFormData,
): Promise<ActionResult<{ message: string }>> {
  return runAction(async () => {
    const res = await api.post<MessageResponse>(
      "/v1/auth/password/forgot",
      values,
      GUEST,
    );
    return { message: res.message };
  });
}

// Reset Password
export async function resetPassword(
  values: ResetPasswordFormData,
): Promise<ActionResult<{ message: string }>> {
  return runAction(async () => {
    const res = await api.post<MessageResponse>(
      "/v1/auth/password/reset",
      values,
      GUEST,
    );
    return { message: res.message };
  });
}

// Revokes the token on the API (best effort), clears the cookie and goes
// home. Redirecting from here avoids re-rendering the current (protected)
// page without a token, which would bounce to sign-in
export async function signOut(): Promise<void> {
  try {
    await api.post("/v1/auth/logout", undefined, {
      skipAuthRedirect: true,
    });
  } catch (error) {
    // An expired token or an API hiccup shouldn't keep the user signed in
    console.error("[auth] logout request failed", error);
  }

  await clearAuthToken();
  await redirect({ href: HOME_PATH, locale: await resolveLocale() });
}
