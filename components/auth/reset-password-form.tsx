"use client";

import {
  ResetPasswordFormData,
  resetPasswordSchema,
} from "@/types/reset-password";
import { toast } from "sonner";
import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import { Input } from "../ui/input";
import { fieldA11yProps, LabeledField } from "../form/input";
import SubmitBtn from "./submit-btn";
import { resetPassword } from "@/lib/auth";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Eye, EyeOff, Lock } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, type FieldPath } from "react-hook-form";

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

    if (result.ok) {
      toast.success(result.data.message);
      router.push("/auth?action=sign-in");
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
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <LabeledField
        id="verification_code"
        label={t("fields.verificationCode.label")}
        error={errors.verification_code}
        required
      >
        <Input
          {...register("verification_code")}
          {...fieldA11yProps("verification_code", errors.verification_code)}
          placeholder={t("fields.verificationCode.placeholder")}
          className="h-11 rounded-xl border-[rgba(27,107,74,0.18)] bg-white placeholder:text-sm"
        />
      </LabeledField>

      {(["password", "password_confirmation"] as const).map((name) => {
        const key =
          name === "password" ? "password" : "passwordConfirmation";

        return (
          <LabeledField
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
                placeholder={t(`fields.${key}.placeholder`)}
                className="placeholder:text-sm"
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
          </LabeledField>
        );
      })}

      <SubmitBtn loading={isSubmitting}>{tForms("resetPassword")}</SubmitBtn>
    </form>
  );
}
