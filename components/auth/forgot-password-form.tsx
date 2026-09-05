"use client";

import {
  forgotPasswordSchema,
  ForgotPasswordFormData,
} from "@/lib/auth/forgot-password";
import Input from "../form/input";
import { Mail } from "lucide-react";
import SubmitBtn from "./submit-btn";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

export default function ForgotPasswordForm() {
  const t = useTranslations("Auth.ForgotPassword");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema(t)),
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = async (data) => {
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

      <SubmitBtn loading={isSubmitting}>{t("SendResetLink")}</SubmitBtn>
    </form>
  );
}
