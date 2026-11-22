"use client";

import { toast } from "sonner";
import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import { fieldA11yProps } from "../form/input";
import AuthField from "./auth-field";
import { signIn } from "@/lib/auth";
import { otpVerifyHref } from "@/lib/auth-routes";
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
  onSignedIn,
  onUnverified,
}: {
  callbackUrl?: string | null;
  // Modal mode (see AuthGateDialog): called instead of navigating
  onSignedIn?: () => void;
  onUnverified?: (phone: string) => void;
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
        toast.info(result.data.message);
        if (onUnverified) {
          onUnverified(result.data.phone);
          return;
        }
        router.push(otpVerifyHref(result.data.phone, callbackUrl));
        return;
      }

      toast.success(result.data.message);
      if (onSignedIn) {
        onSignedIn();
        return;
      }
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
      <AuthField
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
            className="placeholder:text-sm placeholder:text-[#B5B0A0]"
          />
        </InputGroup>
      </AuthField>

      <AuthField
        id="password"
        label={t("fields.password.label")}
        error={errors.password}
        required
        labelAction={
          <Link
            href="/auth/forgot-password"
            className="text-xs font-semibold text-[#4A4840] underline underline-offset-2 hover:text-[#1A1A14]"
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
            className="placeholder:text-sm placeholder:text-[#B5B0A0]"
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              size="icon-xs"
              aria-label={tForms(
                showPassword ? "hidePassword" : "showPassword",
              )}
              aria-pressed={showPassword}
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </AuthField>
      <SubmitBtn loading={isSubmitting}>{tForms("signIn")}</SubmitBtn>
    </form>
  );
}
