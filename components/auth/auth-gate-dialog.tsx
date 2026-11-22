"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { cn } from "@/lib/utils";
import SignIn from "./sign-in-form";
import SignUp from "./sign-up-form";
import OTPVerify from "./otp-verify";
import { Country } from "@/types/global";
import { useTranslations } from "next-intl";
import { formatPhoneForDisplay } from "@/lib/phone";

type Tab = "sign-up" | "sign-in";

type Step =
  | { name: Tab }
  // `from` is where "Change number" goes back to
  | { name: "otp"; phone: string; from: Tab };

// Quick sign-up / sign-in over the current page, opened by useAuthGate.
// Reuses the auth forms in modal mode, so nothing navigates away
export default function AuthGateDialog({
  open,
  onOpenChange,
  onAuthenticated,
  countries,
  defaultCountryId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthenticated: () => void;
  countries: Country[];
  defaultCountryId?: number;
}) {
  const t = useTranslations("AuthGate");
  const tForms = useTranslations("Auth.Forms");
  const [step, setStep] = useState<Step>({ name: "sign-up" });

  // The forms return the phone with or without "+"
  const toOtp = (phone: string, from: Tab) =>
    setStep({ name: "otp", phone: phone.trim().replace(/^\+/, ""), from });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* text-foreground: the dialog's default popover text is cream (for
          the dark popovers), which the inputs would inherit on white */}
      <DialogContent className="max-h-[calc(100dvh-2rem)] gap-0 overflow-y-auto bg-card-foreground p-6 text-foreground sm:max-w-110 sm:p-8">
        {step.name === "otp" ? (
          <>
            {/* The OTP step has its own visible heading */}
            <DialogTitle className="sr-only">{t("verifyTitle")}</DialogTitle>
            <DialogDescription className="sr-only">
              {t("verifyDescription")}
            </DialogDescription>
            <OTPVerify
              phone={step.phone}
              displayPhone={formatPhoneForDisplay(step.phone, countries)}
              onVerified={onAuthenticated}
              onChangeNumber={() => setStep({ name: step.from })}
            />
          </>
        ) : (
          <>
            <div className="mb-6 pe-6 text-center sm:text-start">
              <DialogTitle className="text-2xl font-bold text-[#1A1A14] ltr:font-playfair">
                {t("title")}
              </DialogTitle>
              <DialogDescription className="mt-2 text-sm leading-relaxed text-[#8A8678]">
                {t("description")}
              </DialogDescription>
            </div>

            <div
              role="tablist"
              className="mb-6 grid h-12 w-full grid-cols-2 rounded-2xl bg-[#F0EBE3] p-1"
            >
              {(["sign-up", "sign-in"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={step.name === tab}
                  onClick={() => setStep({ name: tab })}
                  className={cn(
                    "h-full rounded-xl text-sm font-semibold text-muted-foreground transition-all hover:text-[#4A4840]",
                    step.name === tab &&
                      "bg-white text-[#0F4A31] shadow-sm hover:text-[#0F4A31]",
                  )}
                >
                  {tForms(tab === "sign-up" ? "signUp" : "signIn")}
                </button>
              ))}
            </div>

            {step.name === "sign-up" ? (
              <SignUp
                countries={countries}
                defaultCountryId={defaultCountryId}
                onSignedUp={(phone) => toOtp(phone, "sign-up")}
              />
            ) : (
              <SignIn
                onSignedIn={onAuthenticated}
                onUnverified={(phone) => toOtp(phone, "sign-in")}
              />
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
