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
import {
  useForm,
  useWatch,
  Controller,
  SubmitHandler,
  type FieldPath,
} from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import AuthField from "./auth-field";
import SecureNote from "./secure-note";
import { fieldA11yProps } from "../form/input";
import CodeBoxes, { CodeError } from "./code-boxes";
import SubmitBtn, { submitBtnClass } from "./submit-btn";
import PasswordStrength from "../form/password-strength";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPassword, sendForgotPasswordOTP } from "@/lib/auth";
import { useResendCountdown } from "@/hooks/use-resend-countdown";
import { FORGOT_PASSWORD_PATH, SIGN_IN_PATH } from "@/lib/auth-routes";
import { Check, Eye, EyeOff, Lock, Mail, Smartphone } from "lucide-react";

// Forgot password, steps 2–4 (step 1, the identifier, is its own page):
// the code → the new password → done. The API checks the code together with
// the new password, so a wrong code comes back at the password step and
// sends the user back to the code
type Step = "code" | "password" | "done";

const headingClass = "text-2xl font-bold text-[#1A1A14] ltr:font-playfair";
const linkButtonClass =
  "font-semibold underline underline-offset-2 disabled:opacity-40";

export default function ResetPassword({
  identifier,
}: {
  // The mobile number or email the code was sent to
  identifier: string;
}) {
  const t = useTranslations("Auth.ResetPassword");
  const tOtp = useTranslations("Auth.OTP");
  const tForms = useTranslations("Auth.Forms");
  const [step, setStep] = useState<Step>("code");
  const [showPassword, setShowPassword] = useState(false);
  const [resending, setResending] = useState(false);
  const countdown = useResendCountdown();
  const isEmail = identifier.includes("@");

  const {
    control,
    register,
    trigger,
    handleSubmit,
    setError,
    resetField,
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

  // Only the format is checked here; the API checks the code on submit
  async function continueToPassword() {
    if (await trigger("code")) setStep("password");
  }

  async function resendCode() {
    setResending(true);
    const result = await sendForgotPasswordOTP({ identifier });
    setResending(false);

    if (result.ok) {
      countdown.restart();
      resetField("code");
      toast.success(result.data.message);
      return;
    }

    toast.error(result.message);
  }

  const onSubmit: SubmitHandler<ResetPasswordFormData> = async (data) => {
    const result = await resetPassword(data);

    if (result.ok) {
      toast.success(result.data.message);
      setStep("done");
      return;
    }

    const fieldErrors = result.fieldErrors ?? {};
    for (const [field, message] of Object.entries(fieldErrors)) {
      setError(field as FieldPath<ResetPasswordFormData>, {
        type: "server",
        message,
      });
    }

    // A wrong or expired code: back to the code step, showing why
    if (fieldErrors.code || fieldErrors.identifier) {
      resetField("code", { keepError: true });
      setError("code", {
        type: "server",
        message: fieldErrors.code ?? fieldErrors.identifier ?? result.message,
      });
      setStep("code");
      return;
    }

    toast.error(result.message);
  };

  if (step === "done") {
    return (
      <div className="flex flex-col items-center gap-4 py-4 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-[rgba(27,107,74,0.1)]">
          <Check size={26} className="text-[#1B6B4A]" />
        </div>
        <h1 className={headingClass}>{t("doneTitle")}</h1>
        <p className="text-sm text-[#8A8678]">{t("doneDescription")}</p>
        <Button asChild variant="ghost" className={submitBtnClass}>
          <Link href={SIGN_IN_PATH}>{t("backToSignIn")}</Link>
        </Button>
      </div>
    );
  }

  const ChannelIcon = isEmail ? Mail : Smartphone;

  return (
    <>
      <form
        noValidate
        className="flex flex-col gap-4"
        // Enter on the code step moves on instead of submitting
        onSubmit={
          step === "code"
            ? (event) => {
                event.preventDefault();
                continueToPassword();
              }
            : handleSubmit(onSubmit)
        }
      >
        {step === "code" ? (
          <div className="flex flex-col gap-6">
            <div className="text-center">
              <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-[rgba(27,107,74,0.1)]">
                <ChannelIcon size={26} className="text-[#1B6B4A]" />
              </div>
              <h1 className={headingClass}>{tOtp("title")}</h1>
              <p className="mt-2 text-sm leading-relaxed text-[#8A8678]">
                {t(isEmail ? "sentByEmail" : "sentToPhone")}{" "}
                <span dir="ltr" className="font-semibold text-[#1A1A14]">
                  {identifier}
                </span>
              </p>
            </div>

            <Controller
              name="code"
              control={control}
              render={({ field }) => (
                <CodeBoxes
                  inputRef={field.ref}
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  // Moves on as soon as the last digit is entered
                  onComplete={continueToPassword}
                  invalid={Boolean(errors.code)}
                  label={tOtp("verificationCode")}
                />
              )}
            />

            <CodeError message={errors.code?.message} />

            <div className="flex flex-col items-center gap-2 text-xs">
              {countdown.canResend ? (
                <button
                  type="button"
                  onClick={resendCode}
                  disabled={resending}
                  className={cn(
                    linkButtonClass,
                    "text-[#1B6B4A] hover:text-[#145C3C]",
                  )}
                >
                  {tOtp("resend")}
                </button>
              ) : (
                <p className="text-[#8A8678]">
                  {tOtp("resendIn", { time: countdown.label })}
                </p>
              )}
              <Link
                href={FORGOT_PASSWORD_PATH}
                className={cn(
                  linkButtonClass,
                  "text-[#4A4840] hover:text-[#1A1A14]",
                )}
              >
                {isEmail ? t("changeEmail") : tOtp("changeNumber")}
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-1">
              <h1 className={headingClass}>{t("title")}</h1>
              <p className="mt-2 text-sm text-[#8A8678]">{t("description")}</p>
            </div>

            {(["password", "password_confirmation"] as const).map((name) => {
              const key =
                name === "password" ? "password" : "passwordConfirmation";

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
                      // The first field is focused when the step opens
                      autoFocus={name === "password"}
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

            <SubmitBtn loading={isSubmitting}>{t("updatePassword")}</SubmitBtn>
          </>
        )}
      </form>

      <SecureNote className="mt-10" />
    </>
  );
}
