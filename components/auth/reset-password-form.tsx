"use client";

import { useState } from "react";
import Input from "../form/input";
import SubmitBtn from "./submit-btn";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  ResetPasswordFormData,
  resetPasswordSchema,
} from "@/types/reset-password";

export default function ResetPassword() {
  const t = useTranslations("Auth.ResetPassword");
  const tForms = useTranslations("Auth.Forms");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema(t)),
  });

  const onSubmit: SubmitHandler<ResetPasswordFormData> = async (data) => {
    console.log(data);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        register={register}
        required
        errors={errors}
        name="email"
        label={t("fields.email.label")}
        placeholder={t("fields.email.placeholder")}
        prefix={<Mail className="size-4" />}
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
