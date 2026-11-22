"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
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

import {
  Controller,
  useForm,
  SubmitHandler,
  useWatch,
  type FieldPath,
} from "react-hook-form";

import Image from "next/image";
import { toast } from "sonner";
import { useState } from "react";
import { Input } from "../ui/input";
import { signUp } from "@/lib/auth";
import SubmitBtn from "./submit-btn";
import { Country } from "@/types/global";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Phone } from "lucide-react";
import { fieldA11yProps, LabeledField } from "../form/input";
import { SignUpFormData, signUpSchema } from "@/types/sign-up";

const inputGroupClass =
  "h-11 rounded-xl border-[rgba(27,107,74,0.18)] bg-white";
const selectTriggerClass =
  "w-full rounded-xl border-[rgba(27,107,74,0.18)] bg-white data-[size=default]:h-11";

export default function SignUp({
  countries,
  defaultCountryId,
}: {
  countries: Country[];
  // Pre-selects the country chosen in the header
  defaultCountryId?: number;
}) {
  const router = useRouter();
  const t = useTranslations("Auth.SignUp");
  const tForms = useTranslations("Auth.Forms");
  const tNav = useTranslations("Navbar");
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema(t)),
    defaultValues: {
      country_id: defaultCountryId ? String(defaultCountryId) : undefined,
    },
  });

  // Watch the phone field to get its value for redirection after successful sign-up
  const phone = useWatch({ control, name: "phone" });
  const country_id = useWatch({ control, name: "country_id" });
  const choosedCountry = countries.find((c) => c.id === Number(country_id));

  // Handle form submission
  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    const result = await signUp(data);

    if (result.ok) {
      toast.success(result.data.message);
      router.push(
        `/auth/otp-verify?phone=${choosedCountry?.dial_code + phone}`,
      );
      return;
    }

    for (const [field, message] of Object.entries(result.fieldErrors ?? {})) {
      setError(field as FieldPath<SignUpFormData>, { type: "server", message });
    }
    toast.error(result.message);
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <LabeledField
        id="account_type"
        label={t("fields.type.label")}
        error={errors.account_type}
        required
      >
        <Controller
          control={control}
          name="account_type"
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
                {...fieldA11yProps("account_type", errors.account_type)}
                className={selectTriggerClass}
              >
                <SelectValue placeholder={t("fields.type.placeholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">
                  {t("fields.type.options.individual")}
                </SelectItem>
                <SelectItem value="shop">
                  {t("fields.type.options.shop")}
                </SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </LabeledField>

      <LabeledField
        id="name"
        label={t("fields.name.label")}
        error={errors.name}
        required
      >
        <Input
          {...register("name")}
          {...fieldA11yProps("name", errors.name)}
          placeholder={t("fields.name.placeholder")}
          className="h-11 rounded-xl border-[rgba(27,107,74,0.18)] bg-white placeholder:text-sm"
        />
      </LabeledField>

      <LabeledField
        id="email"
        label={t("fields.email.label")}
        error={errors.email}
        required
      >
        <InputGroup className={inputGroupClass}>
          <InputGroupAddon>
            <Mail />
          </InputGroupAddon>
          <InputGroupInput
            {...register("email")}
            {...fieldA11yProps("email", errors.email)}
            type="email"
            placeholder={t("fields.email.placeholder")}
            className="placeholder:text-sm"
          />
        </InputGroup>
      </LabeledField>

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
                className={selectTriggerClass}
              >
                <SelectValue placeholder={t("fields.country.placeholder")} />
              </SelectTrigger>
              <SelectContent>
                {countries.map((c) => (
                  <SelectItem
                    key={c.id}
                    value={c.id.toString()}
                    // Sign-up is only open in live countries
                    disabled={c.status !== "live"}
                  >
                    <Image
                      src={c.flag}
                      alt=""
                      width={20}
                      height={14}
                      className="h-3.5 w-5 rounded-xs object-cover"
                    />
                    <span>{c.name}</span>
                    <span dir="ltr" className="text-muted-foreground text-xs">
                      {c.dial_code}
                    </span>
                    {c.status !== "live" && (
                      <span className="ms-auto rounded-full border border-primary/40 px-2 py-0.5 text-[10px] font-bold text-primary">
                        {tNav("comingSoon")}
                      </span>
                    )}
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
        <InputGroup className={inputGroupClass}>
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

      {(["password", "password_confirmation"] as const).map((name) => {
        const key = name === "password" ? "password" : "passwordConfirmation";

        return (
          <LabeledField
            key={name}
            id={name}
            label={t(`fields.${key}.label`)}
            error={errors[name]}
            required
          >
            <InputGroup className={inputGroupClass}>
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

      <SubmitBtn loading={isSubmitting}>{tForms("signUp")}</SubmitBtn>
    </form>
  );
}
