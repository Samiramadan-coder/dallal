"use client";

import {
  ResetPasswordFormData,
  resetPasswordSchema,
} from "@/types/reset-password";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import SubmitBtn from "./submit-btn";
import SecureNote from "./secure-note";
import { resetPassword } from "@/lib/auth";
import { Link, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft, Eye, EyeOff, Lock } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { fieldA11yProps } from "../form/input";
import AuthField from "./auth-field";
import { FORGOT_PASSWORD_PATH, SIGN_IN_PATH } from "@/lib/auth-routes";
import PasswordStrength from "../form/password-strength";
import {
  useForm,
  useWatch,
  SubmitHandler,
  type FieldPath,
} from "react-hook-form";

export default function ResetPassword({
  identifier,
}: {
  // The mobile number or email the code was sent to
  identifier: string;
}) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Auth.ResetPassword");
  const tForms = useTranslations("Auth.Forms");
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema(t)),
    defaultValues: {
      identifier,
      code: "",
      password: "",
      password_confirmation: "",
    },
  });

  // Drives the strength meter
  const password = useWatch({ control, name: "password" });

  const onSubmit: SubmitHandler<ResetPasswordFormData> = async (data) => {
    const result = await resetPassword(data);

    if (result.ok) {
      toast.success(result.data.message);
      router.push(SIGN_IN_PATH);
      return;
    }

    for (const [field, message] of Object.entries(result.fieldErrors ?? {})) {
      setError(field as FieldPath<ResetPasswordFormData>, {
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
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Link
          href={FORGOT_PASSWORD_PATH}
          className="flex items-center gap-1.5 self-start text-xs font-semibold text-[#4A4840] hover:text-[#1A1A14]"
        >
          <ArrowLeft size={14} className="rtl:rotate-180" />
          {t("changeIdentifier")}
        </Link>

        <div className="mb-1">
          <h1
            className={cn(
              "text-2xl font-bold text-[#1A1A14]",
              locale === "en" && "font-playfair",
            )}
          >
            {t("title")}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[#8A8678]">
            {t("description")}{" "}
            <span dir="ltr" className="font-semibold text-[#1A1A14]">
              {identifier}
            </span>
          </p>
          {/* The identifier is hidden, so a server error on it shows here */}
          {errors.identifier && (
            <p role="alert" className="mt-2 text-xs text-destructive">
              {errors.identifier.message}
            </p>
          )}
        </div>

        <AuthField
          id="code"
          label={t("fields.verificationCode.label")}
          error={errors.code}
          required
        >
          <Input
            {...register("code")}
            {...fieldA11yProps("code", errors.code)}
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            dir="ltr"
            placeholder={t("fields.verificationCode.placeholder")}
            className="h-11 rounded-xl border-[rgba(27,107,74,0.18)] bg-white tracking-[0.3em] placeholder:tracking-normal placeholder:text-sm placeholder:text-[#B5B0A0]"
          />
        </AuthField>

        {(["password", "password_confirmation"] as const).map((name) => {
          const key = name === "password" ? "password" : "passwordConfirmation";

          return (
            <AuthField
              key={name}
              id={name}
              label={t(`fields.${key}.label`)}
              error={errors[name]}
              required
            >
              <InputGroup className="h-11 rounded-xl border-[rgba(27,107,74,0.18)] bg-white">
                <InputGroupAddon>
                  <Lock />
                </InputGroupAddon>
                <InputGroupInput
                  {...register(name)}
                  {...fieldA11yProps(name, errors[name])}
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder={t(`fields.${key}.placeholder`)}
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
              {name === "password" && <PasswordStrength value={password} />}
            </AuthField>
          );
        })}

        <SubmitBtn loading={isSubmitting}>{tForms("resetPassword")}</SubmitBtn>
      </form>

      <SecureNote className="mt-10" />
    </>
  );
}
