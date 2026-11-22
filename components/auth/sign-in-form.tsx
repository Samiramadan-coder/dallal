"use client";

import { toast } from "sonner";
import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import { fieldA11yProps, LabeledField } from "../form/input";
import { signIn } from "@/lib/auth";
import SubmitBtn from "./submit-btn";
import { useTranslations } from "next-intl";
import { useRouter as useNextRouter } from "next/navigation";
import { Link, useRouter } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useForm, SubmitHandler, type FieldPath } from "react-hook-form";
import { SignInFormData, signInSchema } from "@/types/sign-in";

export default function SignIn({
  callbackUrl,
}: {
  callbackUrl?: string | null;
}) {
  const router = useRouter();
  // `redirectTo` is already localized, so it skips next-intl's router
  const nextRouter = useNextRouter();
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
    const result = await signIn(data, callbackUrl);

    if (result.ok) {
      if (result.data.status === "unverified") {
        router.push(`/auth/otp-verify?phone=${result.data.phone}`);
        return;
      }

      toast.success(result.data.message);
      nextRouter.push(result.data.redirectTo);
      return;
    }

    for (const [field, message] of Object.entries(result.fieldErrors ?? {})) {
      setError(field as FieldPath<SignInFormData>, { type: "server", message });
    }
    toast.error(result.message);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <LabeledField
        id="email_or_phone"
        label={t("fields.emailOrPhone.label")}
        error={errors.email_or_phone}
        required
      >
        <InputGroup className="h-11 rounded-xl border-[rgba(27,107,74,0.18)] bg-white">
          <InputGroupAddon>
            <Mail />
          </InputGroupAddon>
          <InputGroupInput
            {...register("email_or_phone")}
            {...fieldA11yProps("email_or_phone", errors.email_or_phone)}
            placeholder={t("fields.emailOrPhone.placeholder")}
            className="placeholder:text-sm"
          />
        </InputGroup>
      </LabeledField>

      <LabeledField
        id="password"
        label={t("fields.password.label")}
        error={errors.password}
        required
        labelAction={
          <Link
            href="/auth/forgot-password"
            className="text-xs text-secondary underline"
          >
            {tForms("forgotPassword")}
          </Link>
        }
      >
        <InputGroup className="h-11 rounded-xl border-[rgba(27,107,74,0.18)] bg-white">
          <InputGroupAddon>
            <Lock />
          </InputGroupAddon>
          <InputGroupInput
            {...register("password")}
            {...fieldA11yProps("password", errors.password)}
            type={showPassword ? "text" : "password"}
            placeholder={t("fields.password.placeholder")}
            className="placeholder:text-sm"
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              size="icon-xs"
              aria-label={tForms(showPassword ? "hidePassword" : "showPassword")}
              aria-pressed={showPassword}
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </LabeledField>
      <SubmitBtn loading={isSubmitting}>{tForms("signIn")}</SubmitBtn>
    </form>
  );
}
