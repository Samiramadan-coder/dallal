"use client";

import {
  ResetPasswordFormData,
  resetPasswordSchema,
} from "@/types/reset-password";
import { toast } from "sonner";
import { useState } from "react";
import Input from "../form/input";
import SubmitBtn from "./submit-btn";
import { resetPassword } from "@/lib/auth";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Eye, EyeOff, Lock } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

export default function ResetPassword({ phone }: { phone?: string }) {
  const router = useRouter();
  const t = useTranslations("Auth.ResetPassword");
  const tForms = useTranslations("Auth.Forms");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema(t)),
    defaultValues: {
      phone: phone ? "+" + phone.trim() : "",
      verification_code: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordFormData> = async (data) => {
    const result = await resetPassword(data);

    if (result.success) {
      toast.success(result.message);
      router.push("/auth?action=sign-in");
      return;
    }

    if (result.message) {
      toast.error(result.message);
    }

    if (result.errors) {
      Object.entries(result.errors).forEach(([field, message]) => {
        if (!message) return;
        setError(field as keyof ResetPasswordFormData, {
          type: "server",
          message,
        });
      });
      return;
    }

    toast.error(t("error"));
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        register={register}
        required
        errors={errors}
        name="verification_code"
        label={t("fields.verificationCode.label")}
        placeholder={t("fields.verificationCode.placeholder")}
      />

      <Input
        register={register}
        required
        errors={errors}
        name="password"
        label={t("fields.password.label")}
        placeholder={t("fields.password.placeholder")}
        type={showPassword ? "text" : "password"}
        prefix={<Lock className="size-4" />}
        suffix={
          showPassword ? (
            <EyeOff className="size-4" onClick={() => setShowPassword(false)} />
          ) : (
            <Eye className="size-4" onClick={() => setShowPassword(true)} />
          )
        }
      />

      <Input
        register={register}
        required
        errors={errors}
        name="password_confirmation"
        label={t("fields.passwordConfirmation.label")}
        placeholder={t("fields.passwordConfirmation.placeholder")}
        type={showPassword ? "text" : "password"}
        prefix={<Lock className="size-4" />}
        suffix={
          showPassword ? (
            <EyeOff className="size-4" onClick={() => setShowPassword(false)} />
          ) : (
            <Eye className="size-4" onClick={() => setShowPassword(true)} />
          )
        }
      />

      <SubmitBtn loading={isSubmitting}>{tForms("resetPassword")}</SubmitBtn>
    </form>
  );
}
