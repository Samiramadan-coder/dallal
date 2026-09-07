"use client";

import { useState } from "react";
import Input from "../form/input";
import Select from "../form/select";
import SubmitBtn from "./submit-btn";
import { Country } from "@/types/global";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Phone } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { SignUpFormData, signUpSchema } from "@/types/sign-up";
import { signUp } from "@/lib/auth/sign-up";
import { toast } from "sonner";

export default function SignUp({ countries }: { countries: Country[] }) {
  const t = useTranslations("Auth.SignUp");
  const tForms = useTranslations("Auth.Forms");
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema(t)),
  });

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    const result = await signUp(data);

    if (result.success) {
      toast.success(result.message);
      return;
    }

    if (result.errors) {
      Object.entries(result.errors).forEach(([field, message]) => {
        if (!message) return;
        toast.error(message);
        setError(field as keyof SignUpFormData, { type: "server", message });
      });
      return;
    }

    toast.error(t("error"));
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

      <Select
        control={control}
        name="country_id"
        label={t("fields.country.label")}
        placeholder={t("fields.country.placeholder")}
        required
        errors={errors}
        options={countries.map((c) => ({
          label: c.name,
          value: c.id.toString(),
        }))}
      />

      <Select
        control={control}
        name="account_type"
        label={t("fields.type.label")}
        placeholder={t("fields.type.placeholder")}
        required
        errors={errors}
        options={[
          {
            label: t("fields.type.options.individual"),
            value: "individual",
          },
          {
            label: t("fields.type.options.shop"),
            value: "shop",
          },
        ]}
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

      <SubmitBtn loading={isSubmitting}>{tForms("signUp")}</SubmitBtn>
    </form>
  );
}
