"use client";

import Image from "next/image";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";
import { Controller, useForm, useWatch } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Country } from "@/types/global";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { FieldError } from "@/components/ui/field";
import CodeBoxes, { CODE_LENGTH } from "@/components/auth/code-boxes";
import { fieldA11yProps, LabeledField } from "@/components/form/input";
import { confirmPhoneChange, requestPhoneChange } from "@/lib/profile";

type PhoneValues = { country_id: string; phone: string };
type CodeValues = { code: string };

// "+971" + "0559876543" → "+971559876543"
function toInternational(dialCode: string, phone: string) {
  const dial = dialCode.replace(/\D/g, "");
  const national = phone.replace(/\D/g, "").replace(/^0+/, "");
  return `+${dial}${national}`;
}

// Two steps in one dialog: the new number (sends an OTP), then the code
export default function ChangePhoneDialog({
  open,
  onOpenChange,
  countries,
  defaultCountryId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  countries: Country[];
  defaultCountryId?: number;
}) {
  const t = useTranslations("Profile.changePhone");
  // Set once the OTP is sent; switches the dialog to the code step
  const [pendingPhone, setPendingPhone] = useState<string | null>(null);
  const [isResending, startResend] = useTransition();

  const liveCountries = countries.filter((c) => c.status === "live");
  const dialCountries = liveCountries.length ? liveCountries : countries;
  const initialCountryId =
    dialCountries.find((c) => c.id === defaultCountryId)?.id ??
    dialCountries[0]?.id;

  const phoneForm = useForm<PhoneValues>({
    defaultValues: {
      country_id: initialCountryId ? String(initialCountryId) : "",
      phone: "",
    },
  });
  const codeForm = useForm<CodeValues>({ defaultValues: { code: "" } });
  const selectedCountryId = useWatch({
    control: phoneForm.control,
    name: "country_id",
  });

  const selectedCountry = dialCountries.find(
    (c) => String(c.id) === selectedCountryId,
  );

  const close = () => {
    onOpenChange(false);
    // Wait for the close animation before resetting
    setTimeout(() => {
      setPendingPhone(null);
      phoneForm.reset();
      codeForm.reset();
    }, 150);
  };

  const sendCode = async (values: PhoneValues) => {
    const result = await requestPhoneChange({
      country_id: Number(values.country_id),
      phone: values.phone.trim(),
    });

    if (!result.ok) {
      const { fieldErrors = {} } = result;
      if (fieldErrors.country_id) {
        phoneForm.setError("country_id", { message: fieldErrors.country_id });
      }
      if (fieldErrors.phone) {
        phoneForm.setError("phone", { message: fieldErrors.phone });
      }
      toast.error(result.message);
      return false;
    }

    toast.success(result.data.message ?? t("codeSent"));
    setPendingPhone(
      result.data.phone ??
        toInternational(selectedCountry?.dial_code ?? "", values.phone),
    );
    return true;
  };

  const onSubmitPhone = phoneForm.handleSubmit(async (values) => {
    if (await sendCode(values)) codeForm.reset();
  });

  const onSubmitCode = codeForm.handleSubmit(async ({ code }) => {
    if (!pendingPhone) return;

    const result = await confirmPhoneChange({ phone: pendingPhone, code });
    if (!result.ok) {
      codeForm.setError("code", {
        message: result.fieldErrors?.code ?? result.message,
      });
      return;
    }

    toast.success(result.data.message ?? t("phoneChanged"));
    close();
  });

  const resend = () =>
    startResend(async () => {
      await sendCode(phoneForm.getValues());
    });

  const phoneErrors = phoneForm.formState.errors;
  const codeErrors = codeForm.formState.errors;

  return (
    <Dialog open={open} onOpenChange={(next) => (next ? null : close())}>
      <DialogContent className="sm:max-w-md bg-white text-foreground p-6 gap-5">
        {!pendingPhone ? (
          <form onSubmit={onSubmitPhone} noValidate className="grid gap-5">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold ltr:font-playfair">
                {t("title")}
              </DialogTitle>
              <DialogDescription>{t("description")}</DialogDescription>
            </DialogHeader>

            <LabeledField
              id="new_phone"
              label={t("newPhone")}
              error={phoneErrors.phone ?? phoneErrors.country_id}
            >
              <div className="flex gap-2" dir="ltr">
                <Controller
                  control={phoneForm.control}
                  name="country_id"
                  rules={{ required: t("countryRequired") }}
                  render={({ field }) => (
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        aria-label={t("country")}
                        aria-invalid={phoneErrors.country_id ? true : undefined}
                        className="w-29 shrink-0 rounded-xl border-[#dbe7e1] bg-white px-3 text-foreground focus-visible:border-[#1B6B4A] focus-visible:ring-[#1B6B4A]/15 data-[size=default]:h-12"
                      >
                        <SelectValue placeholder="+">
                          {selectedCountry && (
                            <span className="flex items-center gap-1.5">
                              <Image
                                src={selectedCountry.flag}
                                alt=""
                                width={20}
                                height={14}
                                className="h-3.5 w-5 rounded-xs object-cover"
                              />
                              <span className="text-sm">
                                {selectedCountry.dial_code}
                              </span>
                            </span>
                          )}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {dialCountries.map((c) => (
                          <SelectItem key={c.id} value={String(c.id)}>
                            <Image
                              src={c.flag}
                              alt=""
                              width={20}
                              height={14}
                              className="h-3.5 w-5 rounded-xs object-cover"
                            />
                            <span>{c.name}</span>
                            <span className="text-muted-foreground text-xs">
                              {c.dial_code}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <Input
                  {...phoneForm.register("phone", {
                    required: t("phoneRequired"),
                    pattern: {
                      value: /^[\d\s-]{6,15}$/,
                      message: t("phoneInvalid"),
                    },
                  })}
                  {...fieldA11yProps("new_phone", phoneErrors.phone)}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  placeholder="0559876543"
                  autoFocus
                  className="h-12 flex-1 rounded-xl border-[#dbe7e1] bg-white px-4 text-[15px] text-foreground focus-visible:border-[#1B6B4A] focus-visible:ring-[#1B6B4A]/15"
                />
              </div>
            </LabeledField>

            <DialogFooter className="-mx-6 -mb-6 gap-2 border-[#efe8db] bg-[#faf7f1] px-6 py-4">
              <Button
                type="button"
                variant="outline"
                onClick={close}
                className="h-10 rounded-xl border-[#e2d9c6] bg-white px-5 text-foreground hover:bg-[#f3ede1] hover:text-foreground"
              >
                {t("cancel")}
              </Button>
              <Button
                type="submit"
                disabled={phoneForm.formState.isSubmitting}
                className="h-10 rounded-xl bg-[#1B6B4A] px-5 text-white hover:bg-[#155a3d]"
              >
                {phoneForm.formState.isSubmitting && <Spinner />}
                {t("sendCode")}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <form onSubmit={onSubmitCode} noValidate className="grid gap-5">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold ltr:font-playfair">
                {t("verifyTitle")}
              </DialogTitle>
              <DialogDescription>
                {t.rich("verifyDescription", {
                  phone: () => (
                    <bdi dir="ltr" className="font-semibold text-foreground">
                      {pendingPhone}
                    </bdi>
                  ),
                })}
              </DialogDescription>
            </DialogHeader>

            <div className="grid justify-items-center gap-2">
              <Controller
                control={codeForm.control}
                name="code"
                rules={{
                  validate: (v) =>
                    v.length === CODE_LENGTH || t("codeRequired"),
                }}
                render={({ field }) => (
                  <CodeBoxes
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    onComplete={() => onSubmitCode()}
                    label={t("code")}
                    invalid={!!codeErrors.code}
                    disabled={codeForm.formState.isSubmitting}
                  />
                )}
              />
              <FieldError errors={[codeErrors.code]} className="text-[13px]" />
            </div>

            <div className="flex items-center justify-between text-sm">
              <button
                type="button"
                onClick={() => setPendingPhone(null)}
                className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="size-3.5 rtl:rotate-180" />
                {t("changeNumber")}
              </button>
              <button
                type="button"
                onClick={resend}
                disabled={isResending}
                className="inline-flex items-center gap-1.5 font-semibold text-[#1B6B4A] hover:underline disabled:opacity-60"
              >
                {isResending && <Spinner className="size-3.5" />}
                {t("resend")}
              </button>
            </div>

            <DialogFooter className="-mx-6 -mb-6 gap-2 border-[#efe8db] bg-[#faf7f1] px-6 py-4">
              <Button
                type="button"
                variant="outline"
                onClick={close}
                className="h-10 rounded-xl border-[#e2d9c6] bg-white px-5 text-foreground hover:bg-[#f3ede1] hover:text-foreground"
              >
                {t("cancel")}
              </Button>
              <Button
                type="submit"
                disabled={codeForm.formState.isSubmitting}
                className="h-10 rounded-xl bg-[#1B6B4A] px-5 text-white hover:bg-[#155a3d]"
              >
                {codeForm.formState.isSubmitting && <Spinner />}
                {t("confirm")}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
