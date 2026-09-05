"use client";

import { useState } from "react";
import Input from "../form/input";
import { Label } from "../ui/label";
import SubmitBtn from "./submit-btn";
import { Link } from "@/i18n/navigation";
import { Checkbox } from "../ui/checkbox";
import { useTranslations } from "next-intl";
import { Field, FieldError } from "../ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Phone } from "lucide-react";
import { SignUpFormData, signUpSchema } from "@/lib/auth/sign-up";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

export default function SignUp() {
  const t = useTranslations("Auth.SignUp");
  const tForms = useTranslations("Auth.Forms");
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema(t)),
  });

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    console.log(data);
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <Input
        register={register}
        required
        errors={errors}
        name="name"
        label={t("fields.name.label")}
        placeholder={t("fields.name.placeholder")}
      />

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
        name="phone"
        label={t("fields.phone.label")}
        placeholder={t("fields.phone.placeholder")}
        prefix={
          <div className="flex items-center gap-1">
            <Phone className="size-4" />
            <span className="text-sm">+971</span>
          </div>
        }
      />

      <Input
        register={register}
        required
        errors={errors}
        name="password"
        label={t("fields.password.label")}
        placeholder={t("fields.password.placeholder")}
        type={showPassword ? "text" : "password"}
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
        suffix={
          showPassword ? (
            <EyeOff className="size-4" onClick={() => setShowPassword(false)} />
          ) : (
            <Eye className="size-4" onClick={() => setShowPassword(true)} />
          )
        }
      />

      <Controller
        control={control}
        name="terms"
        render={({ field }) => {
          const { value, onChange } = field;

          return (
            <>
              <Field orientation="horizontal" data-invalid={!!errors.terms}>
                <Checkbox
                  checked={value}
                  onCheckedChange={(checked) => onChange(checked === true)}
                  id="terms-checkbox"
                  name="terms-checkbox"
                  className="bg-white size-4 border-2 border-secondary/50"
                />
                <Label
                  htmlFor="terms-checkbox"
                  className="gap-1 text-xs text-[#4A4840] leading-relaxed"
                >
                  {t("fields.terms.accept")}{" "}
                  <Link href="/terms" className="text-secondary">
                    {t("fields.terms.terms")}
                  </Link>{" "}
                  {t("fields.terms.and")}{" "}
                  <Link href="/privacy-policy" className="text-secondary">
                    {t("fields.terms.privacy")}
                  </Link>
                </Label>
              </Field>

              <FieldError errors={[errors.terms]} />
            </>
          );
        }}
      />

      <SubmitBtn loading={isSubmitting}>{tForms("signUp")}</SubmitBtn>
    </form>
  );
}
