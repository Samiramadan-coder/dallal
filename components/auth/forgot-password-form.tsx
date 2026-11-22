"use client";

import {
  forgotPasswordSchema,
  ForgotPasswordFormData,
} from "@/types/forgot-password";
import { toast } from "sonner";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "../ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { fieldA11yProps, LabeledField } from "../form/input";
import { Phone } from "lucide-react";
import SubmitBtn from "./submit-btn";
import { Country } from "@/types/global";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { sendForgotPasswordOTP } from "@/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
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
      <LabeledField
        id="country_id"
        label={t("fields.country.label")}
        error={errors.country_id}
        required
      >
        <Controller
          control={control}
          name="country_id"
          render={({ field }) => (
            <Select
              name={field.name}
              value={field.value ?? ""}
              onValueChange={field.onChange}
              onOpenChange={(open) => {
                if (!open) field.onBlur();
              }}
            >
              <SelectTrigger
                ref={field.ref}
                {...fieldA11yProps("country_id", errors.country_id)}
                className="w-full rounded-xl border-[rgba(27,107,74,0.18)] bg-white data-[size=default]:h-11"
              >
                <SelectValue placeholder={t("fields.country.placeholder")} />
              </SelectTrigger>
              <SelectContent>
                {countries.map((c) => (
                  <SelectItem key={c.id} value={c.id.toString()}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </LabeledField>

      <LabeledField
        id="phone"
        label={t("fields.phone.label")}
        error={errors.phone}
        required
      >
        <InputGroup className="h-11 rounded-xl border-[rgba(27,107,74,0.18)] bg-white">
          <InputGroupAddon>
            <Phone />
            <InputGroupText>{choosedCountry?.dial_code}</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput
            {...register("phone")}
            {...fieldA11yProps("phone", errors.phone)}
            placeholder={t("fields.phone.placeholder")}
            className="placeholder:text-sm"
          />
        </InputGroup>
      </LabeledField>

      <SubmitBtn loading={isSubmitting}>{t("SendOtp")}</SubmitBtn>
    </form>
  );
}
