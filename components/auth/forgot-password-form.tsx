"use client";

import {
  forgotPasswordSchema,
  ForgotPasswordFormData,
} from "@/types/forgot-password";
import { toast } from "sonner";
import Input from "../form/input";
import Select from "../form/select";
import { Phone } from "lucide-react";
import SubmitBtn from "./submit-btn";
import { Country } from "@/types/global";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { sendForgotPasswordOTP } from "@/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  SubmitHandler,
  useWatch,
  type FieldPath,
} from "react-hook-form";

export default function ForgotPasswordForm({
  countries,
}: {
  countries: Country[];
}) {
  const router = useRouter();
  const t = useTranslations("Auth.ForgotPassword");

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema(t)),
    defaultValues: {
      country_id: "",
      phone: "",
    },
  });

  const country_id = useWatch({ control, name: "country_id" });
  const choosedCountry = countries.find((c) => c.id === Number(country_id));

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = async (data) => {
    const result = await sendForgotPasswordOTP(data);

    if (result.ok) {
      toast.success(result.data.message);
      router.push(
        `/auth/reset-password?phone=${choosedCountry?.dial_code + data.phone}`,
      );
      return;
    }

    for (const [field, message] of Object.entries(result.fieldErrors ?? {})) {
      setError(field as FieldPath<ForgotPasswordFormData>, {
        type: "server",
        message,
      });
    }
    toast.error(result.message);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
            <span className="text-sm">{choosedCountry?.dial_code}</span>
          </div>
        }
      />

      <SubmitBtn loading={isSubmitting}>{t("SendOtp")}</SubmitBtn>
    </form>
  );
}
