"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { City, Country } from "@/types/global";
import ChangePhoneDialog from "./change-phone-dialog";
import { cardClass, controlClass, labelClass, submitClass } from "./styles";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useUser } from "@/providers/user-data";
import { updatePersonalDetails } from "@/lib/profile";
import { fieldA11yProps, LabeledField } from "@/components/form/input";
import {
  personalDetailsSchema,
  type PersonalDetailsFormValues,
} from "@/types/profile";

// Second card on the profile page: name, email, phone and city.
// Only name and city are editable here; email is fixed and phones are
// managed in their own section
export default function PersonalDetails({
  cities,
  countries,
}: {
  cities: City[];
  countries: Country[];
}) {
  const t = useTranslations("Profile.profileData");
  const { user } = useUser();
  const [isChangingPhone, setIsChangingPhone] = useState(false);

  const {
    control,
    register,
    setError,
    reset,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<PersonalDetailsFormValues>({
    resolver: zodResolver(personalDetailsSchema(t)),
    values: {
      name: user?.name ?? "",
      city_id: user?.city_id ? String(user.city_id) : "",
    },
  });

  if (!user) return null;

  const primaryPhone =
    user.phones.find((phone) => phone.is_primary) ?? user.phones[0];

  const onSubmit = async (values: PersonalDetailsFormValues) => {
    const result = await updatePersonalDetails({
      name: values.name,
      city_id: values.city_id ? Number(values.city_id) : null,
      locale: user.locale,
    });

    if (!result.ok) {
      const fieldErrors = result.fieldErrors ?? {};
      for (const field of ["name", "city_id"] as const) {
        if (fieldErrors[field]) {
          setError(field, { message: fieldErrors[field] });
        }
      }
      toast.error(result.message);
      return;
    }

    // Mark the saved values as the new baseline
    reset(values);
    toast.success(result.data.message ?? t("profileUpdated"));
  };

  return (
    <section className={cardClass}>
      <div className="flex items-center gap-2.5 mb-5">
        <span className="h-5 w-1 rounded-full bg-[#C9A24D]" aria-hidden />
        <h2 className="text-lg font-bold text-foreground ltr:font-playfair">
          {t("personalDetails")}
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
          <LabeledField
            id="name"
            label={t("fullName")}
            error={errors.name}
            labelClassName={labelClass}
          >
            <Input
              {...register("name")}
              {...fieldA11yProps("name", errors.name)}
              autoComplete="name"
              className={controlClass}
            />
          </LabeledField>

          <LabeledField
            id="email"
            label={t("emailAddress")}
            labelClassName={labelClass}
          >
            <Input
              id="email"
              type="email"
              value={user.email}
              readOnly
              dir="ltr"
              className={`${controlClass} rtl:text-end`}
            />
          </LabeledField>

          <LabeledField
            id="phone"
            label={t("phoneNumber")}
            labelClassName={labelClass}
          >
            <div className="relative">
              <Input
                id="phone"
                type="tel"
                value={primaryPhone?.phone ?? ""}
                placeholder={t("noPhone")}
                readOnly
                dir="ltr"
                className={`${controlClass} pe-24 rtl:ps-24 rtl:pe-4 rtl:text-end`}
              />
              <button
                type="button"
                onClick={() => setIsChangingPhone(true)}
                className="absolute inset-y-0 inset-e-1.5 my-1.5 rounded-lg px-3 text-xs font-semibold text-[#1B6B4A] hover:bg-[#e8f2ec]"
              >
                {primaryPhone ? t("changePhone") : t("addPhone")}
              </button>
            </div>
          </LabeledField>

          <LabeledField
            id="city_id"
            label={t("cityEmirate")}
            error={errors.city_id}
            labelClassName={labelClass}
          >
            <Controller
              control={control}
              name="city_id"
              render={({ field }) => (
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    {...fieldA11yProps("city_id", errors.city_id)}
                    onBlur={field.onBlur}
                    className={`${controlClass} w-full data-[size=default]:h-12`}
                  >
                    <SelectValue placeholder={t("selectCity")} />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {cities.map((city) => (
                      <SelectItem key={city.id} value={String(city.id)}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </LabeledField>
        </div>

        {isDirty && (
          <div className="mt-6 flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className={submitClass}
            >
              {isSubmitting && <Spinner />}
              {isSubmitting ? t("saving") : t("saveChanges")}
            </Button>
          </div>
        )}
      </form>

      <ChangePhoneDialog
        open={isChangingPhone}
        onOpenChange={setIsChangingPhone}
        countries={countries}
        defaultCountryId={
          primaryPhone?.country.id ?? user.primary_country?.id ?? undefined
        }
      />
    </section>
  );
}
