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
import { FieldError } from "../ui/field";
import { signUp } from "@/lib/auth";
import { otpVerifyHref } from "@/lib/auth-routes";
import SubmitBtn from "./submit-btn";
import { Country } from "@/types/global";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Phone } from "lucide-react";
import { fieldA11yProps } from "../form/input";
import AuthField from "./auth-field";
import PasswordStrength from "../form/password-strength";
import { SignUpFormData, signUpSchema } from "@/types/sign-up";

const inputGroupClass =
  "h-11 rounded-xl border-[rgba(27,107,74,0.18)] bg-white";
const selectTriggerClass =
  "w-full rounded-xl border-[rgba(27,107,74,0.18)] bg-white data-[size=default]:h-11";

export default function SignUp({
  countries,
  defaultCountryId,
  callbackUrl,
}: {
  countries: Country[];
  // Where to go once the phone is verified
  callbackUrl?: string | null;
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
      accept_terms: false,
    },
  });

  // The chosen country's dial code is shown before the phone input
  const country_id = useWatch({ control, name: "country_id" });
  const choosedCountry = countries.find((c) => c.id === Number(country_id));
  // Drives the strength meter
  const password = useWatch({ control, name: "password" }) ?? "";

  // Handle form submission
  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    const result = await signUp(data);

    if (result.ok) {
      toast.success(result.data.message);
      router.push(otpVerifyHref(result.data.phone, callbackUrl));
      return;
    }

    for (const [field, message] of Object.entries(result.fieldErrors ?? {})) {
      setError(field as FieldPath<SignUpFormData>, { type: "server", message });
    }
    toast.error(result.message);
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <AuthField
        id="name"
        label={t("fields.name.label")}
        error={errors.name}
        required
      >
        <Input
          {...register("name")}
          {...fieldA11yProps("name", errors.name)}
          placeholder={t("fields.name.placeholder")}
          className="h-11 rounded-xl border-[rgba(27,107,74,0.18)] bg-white placeholder:text-sm placeholder:text-[#B5B0A0]"
        />
      </AuthField>

      <AuthField
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
      </AuthField>

      <AuthField
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
            className="placeholder:text-sm placeholder:text-[#B5B0A0]"
          />
        </InputGroup>
      </AuthField>

      <AuthField
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
            className="placeholder:text-sm placeholder:text-[#B5B0A0]"
          />
        </InputGroup>
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
            <InputGroup className={inputGroupClass}>
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

      <div className="flex flex-col gap-1.5">
        {/* Spans wrap the text so the label's flex layout keeps the spaces
            around the links */}
        <label
          htmlFor="accept_terms"
          className="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-[#4A4840]"
        >
          <input
            {...register("accept_terms")}
            {...fieldA11yProps("accept_terms", errors.accept_terms)}
            type="checkbox"
            className="mt-0.5 size-4 shrink-0 accent-[#0F4A31]"
          />
          <span>
            {t.rich("fields.acceptTerms.label", {
              terms: (chunks) => (
                <Link
                  href="/legal/terms"
                  // A new tab keeps what was typed in the form
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline underline-offset-2"
                >
                  {chunks}
                </Link>
              ),
              privacy: (chunks) => (
                <Link
                  href="/legal/privacy"
                  // A new tab keeps what was typed in the form
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline underline-offset-2"
                >
                  {chunks}
                </Link>
              ),
            })}
          </span>
        </label>
        {errors.accept_terms && (
          <FieldError id="accept_terms-error">
            {errors.accept_terms.message}
          </FieldError>
        )}
      </div>

      <SubmitBtn loading={isSubmitting}>{tForms("signUp")}</SubmitBtn>
    </form>
  );
}
