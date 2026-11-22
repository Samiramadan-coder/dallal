"use client";

import {
  forgotPasswordSchema,
  ForgotPasswordFormData,
} from "@/types/forgot-password";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import SubmitBtn from "./submit-btn";
import SecureNote from "./secure-note";
import { ArrowLeft } from "lucide-react";
import { Input } from "../ui/input";
import { Link, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { sendForgotPasswordOTP } from "@/lib/auth";
import { SIGN_IN_PATH } from "@/lib/auth-routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { fieldA11yProps } from "../form/input";
import AuthField from "./auth-field";
import { useForm, SubmitHandler, type FieldPath } from "react-hook-form";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Auth.ForgotPassword");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema(t)),
    defaultValues: { identifier: "" },
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = async (data) => {
    const result = await sendForgotPasswordOTP(data);

    if (result.ok) {
      toast.success(result.data.message);
      const params = new URLSearchParams({ identifier: data.identifier });
      router.push(`/auth/reset-password?${params}`);
      return;
    }

    for (const [field, message] of Object.entries(result.fieldErrors ?? {})) {
      setError(field as FieldPath<ForgotPasswordFormData>, {
        type: "server",
        message,
      });
    }
    toast.error(result.message);
  };

  return (
    <>
      <form
        noValidate
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Link
          href={SIGN_IN_PATH}
          className="flex items-center gap-1.5 self-start text-xs font-semibold text-[#4A4840] hover:text-[#1A1A14]"
        >
          <ArrowLeft size={14} className="rtl:rotate-180" />
          {t("backToSignIn")}
        </Link>

        <div>
          <h1
            className={cn(
              "text-2xl font-bold text-[#1A1A14]",
              locale === "en" && "font-playfair",
            )}
          >
            {t("title")}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[#8A8678]">
            {t("description")}
          </p>
        </div>

        <AuthField
          id="identifier"
          label={t("fields.identifier.label")}
          error={errors.identifier}
        >
          <Input
            {...register("identifier")}
            {...fieldA11yProps("identifier", errors.identifier)}
            autoComplete="username"
            className="h-auto rounded-xl border-[rgba(27,107,74,0.18)] bg-white px-4 py-3 text-sm text-[#1A1A14] placeholder:text-[#B5B0A0] focus-visible:border-[#1B6B4A] focus-visible:ring-0 focus-visible:shadow-[0_0_0_3px_rgba(27,107,74,0.1)]"
          />
        </AuthField>

        <SubmitBtn loading={isSubmitting}>{t("sendCode")}</SubmitBtn>
      </form>

      <SecureNote className="mt-10" />
    </>
  );
}
