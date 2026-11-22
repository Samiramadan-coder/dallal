"use client";

import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Mail, User } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, type FieldPath } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { fieldA11yProps } from "@/components/form/input";
import AuthField from "@/components/auth/auth-field";
import SubmitBtn from "@/components/auth/submit-btn";
import { joinWaitlist } from "@/lib/waitlist";
import { useUser } from "@/providers/user-data";
import { Country } from "@/types/global";
import { WaitlistFormData, waitlistSchema } from "@/types/waitlist";

// "Notify me when <country> launches", for coming-soon countries.
// `country` null = closed
export default function WaitlistDialog({
  country,
  onOpenChange,
}: {
  country: Country | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={!!country} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-2rem)] gap-0 overflow-y-auto bg-card-foreground p-6 text-foreground sm:max-w-105 sm:p-8">
        {/* Keyed so each country starts with a fresh form */}
        {country && (
          <WaitlistForm
            key={country.code}
            country={country}
            onDone={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function WaitlistForm({
  country,
  onDone,
}: {
  country: Country;
  onDone: () => void;
}) {
  const t = useTranslations("Waitlist");
  const { user } = useUser();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema(t)),
    // Signed-in users only need to confirm
    defaultValues: { name: user?.name ?? "", email: user?.email ?? "" },
  });

  const onSubmit: SubmitHandler<WaitlistFormData> = async (data) => {
    const result = await joinWaitlist(country.code, data);

    if (result.ok) {
      toast.success(
        result.data.message || t("success", { country: country.name }),
      );
      onDone();
      return;
    }

    for (const [field, message] of Object.entries(result.fieldErrors ?? {})) {
      setError(field as FieldPath<WaitlistFormData>, {
        type: "server",
        message,
      });
    }
    toast.error(result.message);
  };

  return (
    <>
      <div className="mb-6 pe-6 text-center sm:text-start">
        <span className="mb-3 inline-block rounded-full border border-primary/50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#8A6A1F] rtl:tracking-normal">
          {t("comingSoon")}
        </span>
        <DialogTitle className="text-2xl font-bold text-[#1A1A14] ltr:font-playfair">
          {t("title", { country: country.name })}
        </DialogTitle>
        <DialogDescription className="mt-2 text-sm leading-relaxed text-[#8A8678]">
          {t("description", { country: country.name })}
        </DialogDescription>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <AuthField
          id="waitlist_name"
          label={t("fields.name.label")}
          error={errors.name}
          required
        >
          <InputGroup className="h-11 rounded-xl border-[rgba(27,107,74,0.18)] bg-white">
            <InputGroupAddon>
              <User />
            </InputGroupAddon>
            <InputGroupInput
              {...register("name")}
              {...fieldA11yProps("waitlist_name", errors.name)}
              autoComplete="name"
              placeholder={t("fields.name.placeholder")}
              className="placeholder:text-sm placeholder:text-[#B5B0A0]"
            />
          </InputGroup>
        </AuthField>

        <AuthField
          id="waitlist_email"
          label={t("fields.email.label")}
          error={errors.email}
          required
        >
          <InputGroup className="h-11 rounded-xl border-[rgba(27,107,74,0.18)] bg-white">
            <InputGroupAddon>
              <Mail />
            </InputGroupAddon>
            <InputGroupInput
              {...register("email")}
              {...fieldA11yProps("waitlist_email", errors.email)}
              type="email"
              dir="ltr"
              autoComplete="email"
              placeholder="name@example.com"
              className="placeholder:text-sm placeholder:text-[#B5B0A0]"
            />
          </InputGroup>
        </AuthField>

        <SubmitBtn loading={isSubmitting}>{t("submit")}</SubmitBtn>
      </form>
    </>
  );
}
