"use client";

import { useState } from "react";
import Input from "../form/input";
import SubmitBtn from "./submit-btn";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { SignInFormData, signInSchema } from "@/lib/auth/sign-in";

export default function SignIn() {
  const t = useTranslations("Auth.SignIn");
  const tForms = useTranslations("Auth.Forms");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema(t)),
  });

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
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
      <div>
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
              <EyeOff
                className="size-4"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <Eye className="size-4" onClick={() => setShowPassword(true)} />
            )
          }
        />
        <div className="mt-1 flex justify-end">
          <Link
            href="/auth/forgot-password"
            className="underline text-xs text-secondary cursor-pointer"
          >
            {tForms("forgotPassword")}
          </Link>
        </div>
      </div>
      <SubmitBtn loading={isSubmitting}>{tForms("signIn")}</SubmitBtn>
    </form>
  );
}
