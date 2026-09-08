"use client";

import { toast } from "sonner";
import { useState } from "react";
import Input from "../form/input";
import { signIn } from "@/lib/auth";
import SubmitBtn from "./submit-btn";
import { saveToken } from "@/lib/cookies";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { SignInFormData, signInSchema } from "@/types/sign-in";

export default function SignIn() {
  const router = useRouter();
  const t = useTranslations("Auth.SignIn");
  const tForms = useTranslations("Auth.Forms");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema(t)),
  });

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    const result = await signIn(data);

    if (result.success) {
      toast.success(result.message);
      await saveToken(result.token);
      router.push("/");
      return;
    }

    if (result.phone) {
      router.push(`/auth/otp-verify?phone=${result.phone}`);
      return;
    }

    if (result.message) {
      toast.error(result.message);
    }

    if (result.errors) {
      Object.entries(result.errors).forEach(([field, message]) => {
        if (!message) return;
        setError(field as keyof SignInFormData, { type: "server", message });
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
        name="email_or_phone"
        label={t("fields.emailOrPhone.label")}
        placeholder={t("fields.emailOrPhone.placeholder")}
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
