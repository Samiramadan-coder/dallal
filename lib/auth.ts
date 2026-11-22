"use server";

import { cookies } from "next/headers";
import { redirect } from "@/i18n/server-navigation";
import { api } from "@/lib/api/client";
import { clearAuthToken, setAuthToken } from "@/lib/api/auth-token";
import { ForbiddenError, runAction } from "@/lib/api/errors";
import type { ActionResult } from "@/lib/api/errors";
import { resolveLocale } from "@/lib/api/locale";
import {
  ACCOUNT_PATH,
  HOME_PATH,
  localizePath,
  safeCallbackUrl,
} from "@/lib/auth-routes";
import { getCountryCode } from "@/lib/api/selected-country";
import { getCountries } from "@/lib/api/global";
import { COUNTRY_COOKIE } from "@/lib/country";
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

// Where to go after signing in: the callbackUrl if it's safe, else
// `fallback`. Already localized, so navigate with next/navigation's router
async function afterSignInUrl(
  callbackUrl?: string | null,
  fallback: string = HOME_PATH,
): Promise<string> {
  return safeCallbackUrl(
    // Action arguments come from the client, so don't trust the type
    typeof callbackUrl === "string" ? callbackUrl : null,
    localizePath(fallback, await resolveLocale(), await getCountryCode()),
  );
}

type RegisterResponse = {
  message: string;
  data?: { phone?: unknown; user?: { phone?: unknown } };
};

// "0501112233" in the UAE → "+971501112233"
async function internationalPhone(
  phone: string,
  countryId: number,
): Promise<string> {
  const country = (await getCountries()).find((c) => c.id === countryId);
  const local = phone.replace(/\D/g, "").replace(/^0+/, "");
  return `${country?.dial_code ?? ""}${local}`;
}

// Live country of a phone ("+971501112233" → "ae"), longest dial code wins
async function phoneCountry(phone: string): Promise<string | null> {
  const full = "+" + String(phone).trim().replace(/^\+/, "");
  const match = (await getCountries())
    .filter(
      (c) =>
        c.status === "live" && c.dial_code && full.startsWith(c.dial_code),
    )
    .sort((a, b) => b.dial_code.length - a.dial_code.length)[0];
  return match ? match.code.toLowerCase() : null;
}

// Sign Up. Returns the phone the OTP was sent to, for the verify page
export async function signUp(
  values: SignUpFormData,
): Promise<ActionResult<{ message: string; phone: string }>> {
  return runAction(async () => {
    const countryId = Number(values.country_id);
    const res = await api.post<RegisterResponse>(
      "/v1/auth/register",
      { ...values, country_id: countryId },
      GUEST,
    );

    // Prefer the number as the API stored it
    const stored = res.data?.phone ?? res.data?.user?.phone;
    return {
      message: res.message,
      phone:
        typeof stored === "string"
          ? stored
          : await internationalPhone(values.phone, countryId),
    };
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

    // The verified phone is the primary one: its country becomes the
    // default browse country (remembered for URLs without a country)
    const home = await phoneCountry(values.phone);
    if (home) {
      (await cookies()).set(COUNTRY_COOKIE, home, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });
    }

    return {
      message: res.message,
      // A newly verified account lands on its account page, in its country
      redirectTo: safeCallbackUrl(
        typeof callbackUrl === "string" ? callbackUrl : null,
        localizePath(
          ACCOUNT_PATH,
          await resolveLocale(),
          home ?? (await getCountryCode()),
        ),
      ),
    };
  });
}

export type SignInResult =
  | { status: "signed-in"; message: string; redirectTo: string }
  // The phone isn't verified yet (the API answers 403 with the phone)
  // `message` says a code was sent, like after sign-up
  | { status: "unverified"; phone: string; message: string };

function unverifiedPhone(error: ForbiddenError): string | undefined {
  const body = error.body as { data?: { phone?: unknown } } | undefined;
  const phone = body?.data?.phone;
  if (typeof phone !== "string" || !phone.trim()) return undefined;

  // Verify and resend take the number with its "+"
  return "+" + phone.trim().replace(/^\+/, "");
}

// Sends a fresh code before the OTP page, as sign-up does, so the page's
// resend countdown matches a code that was really sent. A failure (e.g. a throttled resend) mustn't block the user: the
// page can still resend
async function sendVerificationCode(
  phone: string,
  fallbackMessage: string,
): Promise<string> {
  try {
    const res = await api.post<MessageResponse>(
      "/v1/auth/phone/resend",
      { phone },
      GUEST,
    );
    return res.message;
  } catch (error) {
    console.error("[auth] sending the verification code failed", error);
    return fallbackMessage;
  }
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
      if (phone) {
        return {
          status: "unverified",
          phone,
          message: await sendVerificationCode(
            phone,
            (error as ForbiddenError).message,
          ),
        };
      }
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
