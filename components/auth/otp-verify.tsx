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
import { Spinner } from "../ui/spinner";
import { FieldError } from "../ui/field";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { resendOTP, verifyOTP } from "@/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  Controller,
  SubmitHandler,
  type FieldPath,
} from "react-hook-form";
import { OTPVerifyFormData, otpVerifySchema } from "@/types/otp-verify";

export default function OTPVerify({ phone }: { phone: string }) {
  const router = useRouter();
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
      phone: "+" + phone.trim(),
      verification_code: "",
    },
  });

  // Function to handle resending the OTP code
  async function resendCode() {
    setLoading(true);
    const result = await resendOTP(phone);
    setLoading(false);

    if (result.ok) {
      toast.success(result.data.message);
      return;
    }

    toast.error(result.message);
  }

  // Handle form submission for OTP verification
  const onSubmit: SubmitHandler<OTPVerifyFormData> = async (data) => {
    const result = await verifyOTP(data);

    if (result.ok) {
      toast.success(result.data.message);
      // Already localized (home of the current locale)
      router.push(result.data.redirectTo);
      return;
    }

    for (const [field, message] of Object.entries(result.fieldErrors ?? {})) {
      setError(field as FieldPath<OTPVerifyFormData>, {
        type: "server",
        message,
      });
    }
    toast.error(result.message);
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
