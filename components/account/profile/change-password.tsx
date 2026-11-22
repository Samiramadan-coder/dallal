"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Eye, EyeOff, Lock } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch, type FieldPath } from "react-hook-form";

import { cn } from "@/lib/utils";
import { changePassword } from "@/lib/profile";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import PasswordStrength from "@/components/form/password-strength";
import { fieldA11yProps, LabeledField } from "@/components/form/input";
import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from "@/types/profile";
import { cardClass, controlClass, labelClass, submitClass } from "./styles";

const EMPTY: ChangePasswordFormValues = {
  current_password: "",
  password: "",
  password_confirmation: "",
};

// Password input with a show/hide toggle
function PasswordInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  const t = useTranslations("Profile.changePassword");
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        {...props}
        type={visible ? "text" : "password"}
        className={cn(className, "pe-12")}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={t(visible ? "hidePassword" : "showPassword")}
        aria-pressed={visible}
        className="absolute inset-y-0 end-0 flex w-12 items-center justify-center text-muted-foreground hover:text-foreground [&_svg]:size-4"
      >
        {visible ? <EyeOff /> : <Eye />}
      </button>
    </div>
  );
}

// Third card on the profile page
export default function ChangePassword() {
  const t = useTranslations("Profile.changePassword");

  const {
    control,
    register,
    setError,
    reset,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema(t)),
    defaultValues: EMPTY,
  });

  const password = useWatch({ control, name: "password" });

  const onSubmit = async (values: ChangePasswordFormValues) => {
    const result = await changePassword(values);

    if (!result.ok) {
      for (const [field, message] of Object.entries(result.fieldErrors ?? {})) {
        if (field in EMPTY) {
          setError(field as FieldPath<ChangePasswordFormValues>, { message });
        }
      }
      toast.error(result.message);
      return;
    }

    reset(EMPTY);
    toast.success(result.data.message ?? t("updated"));
  };

  return (
    <section className={cardClass}>
      <div className="flex items-center gap-2.5 mb-5">
        <span className="h-5 w-1 rounded-full bg-[#C9A24D]" aria-hidden />
        <h2 className="text-lg font-bold text-foreground ltr:font-playfair">
          {t("title")}
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
          <LabeledField
            id="current_password"
            label={t("fields.currentPassword.label")}
            error={errors.current_password}
            labelClassName={labelClass}
            className="sm:col-span-2"
          >
            <PasswordInput
              {...register("current_password")}
              {...fieldA11yProps("current_password", errors.current_password)}
              autoComplete="current-password"
              placeholder={t("fields.currentPassword.placeholder")}
              className={controlClass}
            />
          </LabeledField>

          <LabeledField
            id="password"
            label={t("fields.password.label")}
            error={errors.password}
            labelClassName={labelClass}
          >
            <PasswordInput
              {...register("password")}
              {...fieldA11yProps("password", errors.password)}
              autoComplete="new-password"
              placeholder={t("fields.password.placeholder")}
              className={controlClass}
            />
            <PasswordStrength value={password} />
          </LabeledField>

          <LabeledField
            id="password_confirmation"
            label={t("fields.passwordConfirmation.label")}
            error={errors.password_confirmation}
            labelClassName={labelClass}
          >
            <PasswordInput
              {...register("password_confirmation")}
              {...fieldA11yProps(
                "password_confirmation",
                errors.password_confirmation,
              )}
              autoComplete="new-password"
              placeholder={t("fields.passwordConfirmation.placeholder")}
              className={controlClass}
            />
          </LabeledField>
        </div>

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
            <Lock className="size-3.5 shrink-0 mt-px" aria-hidden />
            {t("hint")}
          </p>

          {isDirty && (
            <Button
              type="submit"
              disabled={isSubmitting}
              className={cn(submitClass, "self-end shrink-0")}
            >
              {isSubmitting && <Spinner />}
              {isSubmitting ? t("saving") : t("submit")}
            </Button>
          )}
        </div>
      </form>
    </section>
  );
}
