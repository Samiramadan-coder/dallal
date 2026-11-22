import z from "zod";
import { T } from "@/types/global";
import { strongPasswordSchema } from "@/types/password";

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
      phone: z.string().trim().min(5, t("fields.phone.invalid")),
      country_id: z.string().min(1, t("fields.country.required")),
      password: strongPasswordSchema(t),
      password_confirmation: z
        .string()
        .min(1, t("fields.passwordConfirmation.required")),
      accept_terms: z
        .boolean()
        .refine((v) => v, t("fields.acceptTerms.required")),
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
