"use client";

import {
  useForm,
  Controller,
  SubmitHandler,
  type FieldPath,
} from "react-hook-form";

import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useState } from "react";
import CodeBoxes, { CodeError } from "./code-boxes";
import { useResendCountdown } from "@/hooks/use-resend-countdown";
import { useRouter } from "next/navigation";
import SecureNote from "./secure-note";
import { useLocale, useTranslations } from "next-intl";
import { resendOTP, verifyOTP } from "@/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircle, Smartphone } from "lucide-react";
import { OTPVerifyFormData, otpVerifySchema } from "@/types/otp-verify";

type Channel = "whatsapp" | "sms";

const linkButtonClass =
  "font-semibold underline underline-offset-2 disabled:opacity-40";

export default function OTPVerify({
  phone,
  displayPhone,
  callbackUrl,
  onVerified,
  onChangeNumber,
}: {
  // International number without the leading "+"
  phone: string;
  // The same number formatted for display, e.g. "+971 501112233"
  displayPhone: string;
  // Where to go once verified; verifyOTP drops it if unsafe
  callbackUrl?: string | null;
  // Modal mode (see AuthGateDialog): called instead of navigating
  onVerified?: () => void;
  onChangeNumber?: () => void;
}) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Auth.OTP");
  // Verify and resend both take the number with its "+"
  const fullPhone = "+" + phone;
  const [channel, setChannel] = useState<Channel>("whatsapp");
  const countdown = useResendCountdown();
  const [resending, setResending] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<OTPVerifyFormData>({
    resolver: zodResolver(otpVerifySchema(t)),
    defaultValues: {
      phone: fullPhone,
      verification_code: "",
    },
  });

  // TODO: the API has no channel option yet; switching only changes the label
  async function resendCode(nextChannel: Channel = channel) {
    setResending(true);
    const result = await resendOTP(fullPhone);
    setResending(false);

    if (result.ok) {
      setChannel(nextChannel);
      countdown.restart();
      resetField("verification_code");
      toast.success(result.data.message);
      return;
    }

    toast.error(result.message);
  }

  const onSubmit: SubmitHandler<OTPVerifyFormData> = async (data) => {
    const result = await verifyOTP(data, callbackUrl);

    if (result.ok) {
      toast.success(result.data.message);
      if (onVerified) {
        onVerified();
        return;
      }
      // Already localized (the callbackUrl or home)
      router.push(result.data.redirectTo);
      return;
    }

    resetField("verification_code");
    for (const [field, message] of Object.entries(result.fieldErrors ?? {})) {
      setError(field as FieldPath<OTPVerifyFormData>, {
        type: "server",
        message,
      });
    }
    toast.error(result.message);
  };

  // The phone field is hidden, so its errors are shown under the code too
  const error = errors.verification_code ?? errors.phone;
  const ChannelIcon = channel === "whatsapp" ? MessageCircle : Smartphone;

  return (
    <>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-[rgba(27,107,74,0.1)]">
            <ChannelIcon size={26} className="text-[#1B6B4A]" />
          </div>
          <h1
            className={cn(
              "text-2xl font-bold text-[#1A1A14]",
              locale === "en" && "font-playfair",
            )}
          >
            {t("title")}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[#8A8678]">
            {t(channel === "whatsapp" ? "sentViaWhatsapp" : "sentBySms")}{" "}
            <span dir="ltr" className="font-semibold text-[#1A1A14]">
              {displayPhone}
            </span>
          </p>
        </div>

        <Controller
          name="verification_code"
          control={control}
          render={({ field }) => (
            <CodeBoxes
              inputRef={field.ref}
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              // Submits as soon as the last digit is entered
              onComplete={() => handleSubmit(onSubmit)()}
              disabled={isSubmitting}
              invalid={Boolean(error)}
              label={t("verificationCode")}
            />
          )}
        />

        <CodeError message={error?.message} />

        {isSubmitting && (
          <p className="text-center text-xs text-[#8A8678]">{t("verifying")}</p>
        )}

        <div className="flex flex-col items-center gap-2 text-xs">
          {!countdown.canResend ? (
            <p className="text-[#8A8678]">
              {t("resendIn", { time: countdown.label })}
            </p>
          ) : (
            <button
              type="button"
              onClick={() => resendCode()}
              disabled={resending}
              className={cn(
                linkButtonClass,
                "text-[#1B6B4A] hover:text-[#145C3C]",
              )}
            >
              {t("resend")}
            </button>
          )}
          <button
            type="button"
            onClick={() =>
              resendCode(channel === "whatsapp" ? "sms" : "whatsapp")
            }
            disabled={!countdown.canResend || resending}
            className={cn(
              linkButtonClass,
              "text-[#4A4840] hover:text-[#1A1A14] disabled:no-underline",
            )}
          >
            {t(channel === "whatsapp" ? "sendBySms" : "sendViaWhatsapp")}
          </button>
          <button
            type="button"
            onClick={onChangeNumber ?? (() => router.back())}
            className={cn(
              linkButtonClass,
              "text-[#4A4840] hover:text-[#1A1A14]",
            )}
          >
            {t("changeNumber")}
          </button>
        </div>
      </form>

      <SecureNote className="mt-10" />
    </>
  );
}
