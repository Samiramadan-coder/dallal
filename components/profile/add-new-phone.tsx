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
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { useRef, useState } from "react";
import { Country } from "@/types/global";
import { FieldError } from "../ui/field";
import { Phone, Plus } from "lucide-react";
import { addNewPhone, verifyPhone } from "@/lib/profile";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  useForm,
  useWatch,
  type FieldPath,
} from "react-hook-form";

export default function AddNewPhone({ countries }: { countries: Country[] }) {
  const t = useTranslations("Profile.myPhones");
  const formRef = useRef<HTMLFormElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement | null>(null);
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

    if (result.ok) {
      toast.success(result.data.message);
      setPhoneId(result.data.phone.id);
      setIsDialogOpen(true);
      return;
    }

    for (const [field, message] of Object.entries(result.fieldErrors ?? {})) {
      setError(field as FieldPath<AddNewPhoneFormValues>, {
        type: "server",
        message,
      });
    }
    toast.error(result.message);
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
            <LabeledField
              id="country_id"
              label={t("countryLabel")}
              labelClassName="text-white"
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
                      className="w-full rounded-xl border-[rgba(27,107,74,0.18)] bg-white text-foreground data-[size=default]:h-11"
                    >
                      <SelectValue placeholder={t("countryPlaceholder")} />
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
              label={t("phoneLabel")}
              labelClassName="text-white"
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
                  placeholder={t("phonePlaceholder")}
                  className="text-foreground placeholder:text-sm"
                />
              </InputGroup>
            </LabeledField>
          </form>
          <DialogFooter>
            <DialogClose asChild>
              <Button ref={closeBtn} variant="outline">
                {t("cancel")}
              </Button>
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
          onClose={() => {
            setIsDialogOpen(false);
            closeBtn.current?.click();
          }}
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

    if (result.ok) {
      toast.success(result.data.message);
      onClose();
      return;
    }

    for (const [field, message] of Object.entries(result.fieldErrors ?? {})) {
      setError(field as FieldPath<OTPVerificationFormValues>, {
        type: "server",
        message,
      });
    }
    toast.error(result.message);
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
