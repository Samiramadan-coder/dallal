import z from "zod";
import { T } from "@/types/global";

export const signUpSchema = (t: T) =>
  z
    .object({
      name: z
        .string()
        .min(1, t("fields.name.required"))
        .min(2, t("fields.name.minLength")),
      email: z
        .string()
        .min(1, t("fields.email.required"))
        .pipe(z.email(t("fields.email.invalid"))),
      phone: z
        .string()
        .trim()
        .regex(/^5[024568]\d{7}$/, t("fields.phone.invalid")),
      country_id: z.string().min(1, t("fields.country.required")),
      type: z.string().min(1, t("fields.type.required")),
      password: z
        .string()
        .min(1, t("fields.password.required"))
        .min(8, t("fields.password.minLength")),
      password_confirmation: z
        .string()
        .min(1, t("fields.passwordConfirmation.required")),
    })
    .superRefine(({ password, password_confirmation }, ctx) => {
      if (password !== password_confirmation) {
        ctx.addIssue({
          code: "custom",
          message: t("fields.passwordConfirmation.match"),
          path: ["password_confirmation"],
        });
      }
    });

export type SignUpFormData = z.infer<ReturnType<typeof signUpSchema>>;
