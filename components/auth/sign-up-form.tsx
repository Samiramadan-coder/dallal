"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
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
import { Eye, EyeOff, Mail } from "lucide-react";
import { fieldA11yProps } from "../form/input";
import AuthField from "./auth-field";
import PasswordStrength from "../form/password-strength";
import { SignUpFormData, signUpSchema } from "@/types/sign-up";

const inputGroupClass =
  "h-11 rounded-xl border-[rgba(27,107,74,0.18)] bg-white";

export default function SignUp({
  countries,
  defaultCountryId,
  callbackUrl,
  onSignedUp,
}: {
  countries: Country[];
  // Where to go once the phone is verified
  callbackUrl?: string | null;
  // Pre-selects the country chosen in the header
  defaultCountryId?: number;
  // Modal mode (see AuthGateDialog): called instead of opening the OTP page
  onSignedUp?: (phone: string) => void;
}) {
  const router = useRouter();
  const t = useTranslations("Auth.SignUp");
  const tForms = useTranslations("Auth.Forms");
  const [showPassword, setShowPassword] = useState(false);

  // Sign-up is only open in live (GCC) countries
  const liveCountries = countries.filter((c) => c.status === "live");
  const dialCountries = liveCountries.length ? liveCountries : countries;
  // The header's country if it's open for sign-up, else the first one
  const initialCountryId =
    dialCountries.find((c) => c.id === defaultCountryId)?.id ??
    dialCountries[0]?.id;

  const {
    control,
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema(t)),
    defaultValues: {
      country_id: initialCountryId ? String(initialCountryId) : undefined,
      accept_terms: false,
    },
  });

  // The chosen country's flag and dial code show in the picker
  const country_id = useWatch({ control, name: "country_id" });
  const selectedCountry = countries.find((c) => c.id === Number(country_id));
  // Drives the strength meter
  const password = useWatch({ control, name: "password" }) ?? "";

  // Handle form submission
  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    const result = await signUp(data);

    if (result.ok) {
      toast.success(result.data.message);
      if (onSignedUp) {
        onSignedUp(result.data.phone);
        return;
      }
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

      {/* Dial-code picker + number, like the prototype. The picker sets
          country_id, which the API needs */}
      <AuthField
        id="phone"
        label={t("fields.phone.label")}
        error={errors.phone ?? errors.country_id}
        required
      >
        <div className="flex gap-2">
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
                  aria-label={t("fields.country.codeLabel")}
                  aria-invalid={errors.country_id ? true : undefined}
                  className="w-29 shrink-0 rounded-xl border-[rgba(27,107,74,0.18)] bg-white px-3 data-[size=default]:h-11"
                >
                  <SelectValue placeholder="+">
                    {selectedCountry && (
                      <span dir="ltr" className="flex items-center gap-1.5">
                        <Image
                          src={selectedCountry.flag}
                          alt=""
                          width={20}
                          height={14}
                          className="h-3.5 w-5 rounded-xs object-cover"
                        />
                        <span className="text-sm text-[#1A1A14]">
                          {selectedCountry.dial_code}
                        </span>
                      </span>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {dialCountries.map((c) => (
                    <SelectItem key={c.id} value={c.id.toString()}>
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
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <Input
            {...register("phone")}
            {...fieldA11yProps("phone", errors.phone)}
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder={t("fields.phone.placeholder")}
            className="h-11 min-w-0 flex-1 rounded-xl border-[rgba(27,107,74,0.18)] bg-white placeholder:text-sm placeholder:text-[#B5B0A0]"
          />
        </div>
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
