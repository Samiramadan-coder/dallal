import z from "zod";
import { T } from "./global";
import { strongPasswordSchema } from "./password";

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

// `t` is the Profile.changePassword namespace
export const changePasswordSchema = (t: T) =>
  z
    .object({
      current_password: z.string().min(1, t("fields.currentPassword.required")),
      password: strongPasswordSchema(t),
      password_confirmation: z
        .string()
        .min(1, t("fields.passwordConfirmation.required")),
    })
    .superRefine(
      ({ current_password, password, password_confirmation }, ctx) => {
        if (password && password === current_password) {
          ctx.addIssue({
            code: "custom",
            message: t("fields.password.same"),
            path: ["password"],
          });
        }
        if (password !== password_confirmation) {
          ctx.addIssue({
            code: "custom",
            message: t("fields.passwordConfirmation.match"),
            path: ["password_confirmation"],
          });
        }
      },
    );

export type ChangePasswordFormValues = z.infer<
  ReturnType<typeof changePasswordSchema>
>;
