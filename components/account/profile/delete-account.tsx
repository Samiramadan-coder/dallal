"use client";

import { toast } from "sonner";
import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { Eye, EyeOff, TriangleAlert } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { FieldError } from "@/components/ui/field";
import CodeBoxes, { CODE_LENGTH } from "@/components/auth/code-boxes";
import { fieldA11yProps, LabeledField } from "@/components/form/input";
import { deleteAccount, sendDeleteAccountCode } from "@/lib/profile";
import { cardClass, controlClass, labelClass } from "./styles";

type Values = { code: string; password: string };

const dangerClass =
  "h-10 rounded-xl bg-[#C0453B] px-5 text-sm font-semibold text-white hover:bg-[#a83a31]";
const cancelClass =
  "h-10 rounded-xl border-[#e2d9c6] bg-white px-5 text-foreground hover:bg-[#f3ede1] hover:text-foreground";
const footerClass = "-mx-6 -mb-6 gap-2 border-[#efe8db] bg-[#faf7f1] px-6 py-4";

// Last card on the profile page
export default function DeleteAccount() {
  const t = useTranslations("Profile.deleteAccount");
  const [open, setOpen] = useState(false);
  // false: the warning; true: the code was sent, asking for code + password
  const [codeSent, setCodeSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSending, startSending] = useTransition();

  const {
    control,
    register,
    setError,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ defaultValues: { code: "", password: "" } });

  const close = () => {
    setOpen(false);
    // Wait for the close animation before resetting
    setTimeout(() => {
      setCodeSent(false);
      setShowPassword(false);
      reset();
    }, 150);
  };

  const sendCode = () =>
    startSending(async () => {
      const result = await sendDeleteAccountCode();
      if (!result.ok) {
        toast.error(result.message);
        return;
      }
      toast.success(result.data.message ?? t("codeSent"));
      setCodeSent(true);
    });

  // Only returns on failure: success redirects home
  const onSubmit = handleSubmit(async (values) => {
    const result = await deleteAccount(values);
    if (result.ok) return;

    const fieldErrors = result.fieldErrors ?? {};
    if (fieldErrors.password) {
      setError("password", { message: fieldErrors.password });
    }
    if (fieldErrors.code) setError("code", { message: fieldErrors.code });
    toast.error(result.message);
  });

  return (
    <section className={cn(cardClass, "border-[#f1d9d6]")}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="h-5 w-1 rounded-full bg-[#C0453B]" aria-hidden />
            <h2 className="text-lg font-bold text-foreground ltr:font-playfair">
              {t("title")}
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">{t("description")}</p>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => setOpen(true)}
          className="self-start sm:self-center h-10 shrink-0 rounded-xl border-[#e8c3be] bg-white px-5 text-sm font-semibold text-[#C0453B] hover:bg-[#fbefed] hover:text-[#C0453B]"
        >
          {t("button")}
        </Button>
      </div>

      <Dialog open={open} onOpenChange={(next) => (next ? null : close())}>
        <DialogContent className="sm:max-w-md bg-white text-foreground p-6 gap-5">
          <DialogHeader>
            <div className="mb-1 flex size-11 items-center justify-center rounded-full bg-[#fbefed] text-[#C0453B]">
              <TriangleAlert className="size-5" />
            </div>
            <DialogTitle className="text-xl font-bold ltr:font-playfair">
              {t("dialogTitle")}
            </DialogTitle>
            <DialogDescription>
              {codeSent ? t("confirmDescription") : t("warning")}
            </DialogDescription>
          </DialogHeader>

          {!codeSent ? (
            <DialogFooter className={footerClass}>
              <Button
                type="button"
                variant="outline"
                onClick={close}
                className={cancelClass}
              >
                {t("cancel")}
              </Button>
              <Button
                type="button"
                onClick={sendCode}
                disabled={isSending}
                className={dangerClass}
              >
                {isSending && <Spinner />}
                {t("sendCode")}
              </Button>
            </DialogFooter>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid gap-5">
              <div className="grid gap-2">
                <span className={labelClass}>{t("code")}</span>
                <div className="grid justify-items-center gap-2">
                  <Controller
                    control={control}
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
                        label={t("code")}
                        invalid={!!errors.code}
                        disabled={isSubmitting}
                      />
                    )}
                  />
                  <FieldError errors={[errors.code]} className="text-[13px]" />
                </div>
                <button
                  type="button"
                  onClick={sendCode}
                  disabled={isSending}
                  className="inline-flex items-center gap-1.5 self-center justify-self-center text-sm font-semibold text-[#1B6B4A] hover:underline disabled:opacity-60"
                >
                  {isSending && <Spinner className="size-3.5" />}
                  {t("resend")}
                </button>
              </div>

              <LabeledField
                id="delete_password"
                label={t("password")}
                error={errors.password}
                labelClassName={labelClass}
              >
                <div className="relative">
                  <Input
                    {...register("password", {
                      required: t("passwordRequired"),
                    })}
                    {...fieldA11yProps("delete_password", errors.password)}
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder={t("passwordPlaceholder")}
                    className={cn(controlClass, "pe-12")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={t(
                      showPassword ? "hidePassword" : "showPassword",
                    )}
                    aria-pressed={showPassword}
                    className="absolute inset-y-0 end-0 flex w-12 items-center justify-center text-muted-foreground hover:text-foreground [&_svg]:size-4"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </LabeledField>

              <DialogFooter className={footerClass}>
                <Button
                  type="button"
                  variant="outline"
                  onClick={close}
                  className={cancelClass}
                >
                  {t("cancel")}
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={dangerClass}
                >
                  {isSubmitting && <Spinner />}
                  {t("confirm")}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
