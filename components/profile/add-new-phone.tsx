"use client";

import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from "../ui/dialog";

import {
  AddNewPhoneFormValues,
  addNewPhoneSchema,
  OTPVerificationFormValues,
} from "@/types/profile";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";

import { toast } from "sonner";
import Input from "../form/input";
import Select from "../form/select";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { useRef, useState } from "react";
import { Country } from "@/types/global";
import { FieldError } from "../ui/field";
import { Phone, Plus } from "lucide-react";
import { addNewPhone, verifyPhone } from "@/lib/profile";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";

export default function AddNewPhone({ countries }: { countries: Country[] }) {
  const t = useTranslations("Profile.myPhones");
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [phoneId, setPhoneId] = useState<number | null>(null);

  const {
    control,
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddNewPhoneFormValues>({
    resolver: zodResolver(addNewPhoneSchema(t)),
    defaultValues: { country_id: "", phone: "" },
  });

  // Watch the selected country ID to dynamically update the phone prefix based on the chosen country.
  const country_id = useWatch({ control, name: "country_id" });
  const choosedCountry = countries.find((c) => c.id.toString() === country_id);

  const onSubmit = async (data: AddNewPhoneFormValues) => {
    const result = await addNewPhone(data);

    if (result.success) {
      toast.success(result.message);
      setPhoneId(result.phone.id);
      setIsDialogOpen(true);
      return;
    }

    if (result.message) {
      toast.error(result.message);
    }

    if (result.errors) {
      Object.entries(result.errors).forEach(([field, message]) => {
        if (!message) return;
        setError(field as keyof AddNewPhoneFormValues, {
          type: "server",
          message,
        });
      });
      return;
    }

    toast.error(t("error"));
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-primary h-9 hover:bg-primary/90"
          >
            <Plus /> {t("addNewPhone")}
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>{t("addNewPhone")}</DialogTitle>
            <DialogDescription>{t("addNewPhoneDescription")}</DialogDescription>
          </DialogHeader>
          <form
            ref={formRef}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <Select
              control={control}
              name="country_id"
              label={t("countryLabel")}
              labelClassName="text-white"
              placeholder={t("countryPlaceholder")}
              triggerClassName="text-foreground"
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
              label={t("phoneLabel")}
              placeholder={t("phonePlaceholder")}
              inputClassName="text-foreground"
              labelClassName="text-white"
              prefix={
                <div className="flex items-center gap-1">
                  <Phone className="size-4" />
                  <span className="text-sm">{choosedCountry?.dial_code}</span>
                </div>
              }
            />
          </form>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">{t("cancel")}</Button>
            </DialogClose>
            <Button
              type="submit"
              onClick={() => formRef.current?.requestSubmit()}
            >
              {isSubmitting && <Spinner className="size-4" />}
              {t("saveChanges")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isDialogOpen && phoneId && (
        <OTPVerificationDialog
          phoneId={phoneId}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </>
  );
}

// OTP Verification Dialog
function OTPVerificationDialog({
  isOpen,
  onClose,
  phoneId,
}: {
  isOpen: boolean;
  onClose: () => void;
  phoneId: number;
}) {
  const t = useTranslations("Profile.myPhones");
  const formRef = useRef<HTMLFormElement>(null);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<OTPVerificationFormValues>();

  const onSubmit = async (data: OTPVerificationFormValues) => {
    const result = await verifyPhone(phoneId, data);

    if (result.success) {
      toast.success(result.message);
      onClose();
      return;
    }

    if (result.message) {
      toast.error(result.message);
    }

    if (result.errors) {
      Object.entries(result.errors).forEach(([field, message]) => {
        if (!message) return;
        setError(field as keyof OTPVerificationFormValues, {
          type: "server",
          message,
        });
      });
      return;
    }

    toast.error(t("otpError"));
  };
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{t("enterVerificationCode")}</DialogTitle>
          <DialogDescription>
            {t("pleaseEnterVerificationCode")}
          </DialogDescription>
        </DialogHeader>
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-center"
        >
          <Controller
            name="verification_code"
            control={control}
            render={({ field }) => (
              <InputOTP
                maxLength={6}
                value={field.value}
                onChange={field.onChange}
                className="bg-white"
              >
                <InputOTPGroup>
                  <InputOTPSlot
                    index={0}
                    className="bg-white text-foreground size-10"
                  />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot
                    index={1}
                    className="bg-white text-foreground size-10"
                  />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot
                    index={2}
                    className="bg-white text-foreground size-10"
                  />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot
                    index={3}
                    className="bg-white text-foreground size-10"
                  />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot
                    index={4}
                    className="bg-white text-foreground size-10"
                  />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot
                    index={5}
                    className="bg-white text-foreground size-10"
                  />
                </InputOTPGroup>
              </InputOTP>
            )}
          />
          <FieldError errors={[errors.verification_code]} />
        </form>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {t("cancel")}
          </Button>
          <Button
            type="submit"
            onClick={() => formRef.current?.requestSubmit()}
          >
            {isSubmitting && <Spinner className="size-4" />}
            {t("verify")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
