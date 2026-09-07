"use client";

import {
  InputOTP,
  InputOTPSlot,
  InputOTPGroup,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import SubmitBtn from "./submit-btn";
import { Button } from "../ui/button";
import { FieldError } from "../ui/field";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { OTPVerifyFormData, otpVerifySchema } from "@/types/otp-verify";

export default function OTPVerify() {
  const t = useTranslations("Auth.OTP");
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OTPVerifyFormData>({
    defaultValues: {
      verification_code: "",
    },
    resolver: zodResolver(otpVerifySchema(t)),
  });

  const onSubmit: SubmitHandler<OTPVerifyFormData> = async (data) => {
    console.log("Verification code submitted:", data);
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
        className="w-full h-11 uppercase rounded-xl font-semibold text-white"
      >
        {t("resend")}
      </Button>
    </form>
  );
}
