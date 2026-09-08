"use client";

import {
  InputOTP,
  InputOTPSlot,
  InputOTPGroup,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

import { toast } from "sonner";
import { useState } from "react";
import SubmitBtn from "./submit-btn";
import { Button } from "../ui/button";
import { resendOTP, verifyOTP } from "@/lib/auth";
import { Spinner } from "../ui/spinner";
import { FieldError } from "../ui/field";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { OTPVerifyFormData, otpVerifySchema } from "@/types/otp-verify";
import { saveToken } from "@/lib/cookies";

export default function OTPVerify({ phone }: { phone: string }) {
  const t = useTranslations("Auth.OTP");
  const [loading, setLoading] = useState(false);

  // Initialize the form using react-hook-form with zod validation
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<OTPVerifyFormData>({
    resolver: zodResolver(otpVerifySchema(t)),
    defaultValues: {
      phone,
      verification_code: "",
    },
  });

  // Function to handle resending the OTP code
  async function resendCode() {
    setLoading(true);
    const result = await resendOTP(phone);
    setLoading(false);

    if (result.success) {
      toast.success(result.message);
      return;
    }

    if (result.message) {
      toast.error(result.message);
      return;
    }

    toast.error(t("errorInResend"));
  }

  // Handle form submission for OTP verification
  const onSubmit: SubmitHandler<OTPVerifyFormData> = async (data) => {
    const result = await verifyOTP(data);

    if (result.success) {
      toast.success(result.message);
      saveToken(result.token);
      return;
    }

    if (result.message) {
      toast.error(result.message);
    }

    if (result.errors) {
      Object.entries(result.errors).forEach(([field, message]) => {
        if (!message) return;
        toast.error(message);
        setError(field as keyof OTPVerifyFormData, { type: "server", message });
      });
      return;
    }

    toast.error(t("errorInVerify"));
  };

  return (
    <form
      className="flex flex-col gap-2 items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-center text-2xl font-semibold text-accent">
        {t("title")}
      </h1>

      <p className="text-center text-base mb-4">{t("enterCode")}</p>

      <Controller
        name="verification_code"
        control={control}
        render={({ field }) => (
          <InputOTP
            maxLength={6}
            value={field.value}
            onChange={field.onChange}
            className="bg-white"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} className="bg-white size-10" />
              <InputOTPSlot index={1} className="bg-white size-10" />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={2} className="bg-white size-10" />
              <InputOTPSlot index={3} className="bg-white size-10" />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={4} className="bg-white size-10" />
              <InputOTPSlot index={5} className="bg-white size-10" />
            </InputOTPGroup>
          </InputOTP>
        )}
      />

      <FieldError errors={[errors.verification_code]} />

      <SubmitBtn loading={isSubmitting}>{t("continue")}</SubmitBtn>

      <Button
        type="button"
        onClick={resendCode}
        className="w-full h-11 uppercase rounded-xl font-semibold text-white"
        disabled={loading}
      >
        {loading && <Spinner />} {t("resend")}
      </Button>
    </form>
  );
}
