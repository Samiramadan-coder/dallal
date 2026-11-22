import z from "zod";
import { T } from "./global";

export const addNewPhoneSchema = (t: T) =>
  z.object({
    country_id: z.string().min(1, t("countryRequired")),
    phone: z.string().min(5, t("phoneRequired")),
  });

export type AddNewPhoneFormValues = z.infer<
  ReturnType<typeof addNewPhoneSchema>
>;

export const otpVerificationSchema = (t: T) =>
  z.object({
    verification_code: z.string().length(6, t("verificationCodeRequired")),
  });

export type OTPVerificationFormValues = z.infer<
  ReturnType<typeof otpVerificationSchema>
>;

export const personalDetailsSchema = (t: T) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(2, t("nameRequired"))
      .max(255, t("nameTooLong")),
    // Select values are strings; converted to a number when sent
    city_id: z.string(),
  });

export type PersonalDetailsFormValues = z.infer<
  ReturnType<typeof personalDetailsSchema>
>;
