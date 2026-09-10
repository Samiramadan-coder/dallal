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
import { useRef } from "react";
import Input from "../form/input";
import Select from "../form/select";
import { Button } from "../ui/button";
import { Phone, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Country } from "@/types/global";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddNewPhoneFormValues, addNewPhoneSchema } from "@/types/profile";
import { Spinner } from "../ui/spinner";

export default function AddNewPhone({ countries }: { countries: Country[] }) {
  const t = useTranslations("Profile.myPhones");
  const formRef = useRef<HTMLFormElement | null>(null);

  const {
    control,
    register,
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
    console.log(data);
  };

  return (
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
  );
}
