import z from "zod";
import { T } from "@/types/global";

export const resetPasswordSchema = (t: T) =>
  z
    .object({
      email: z
        .string()
        .min(1, t("fields.email.required"))
        .pipe(z.email(t("fields.email.invalid"))),

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

export type ResetPasswordFormData = z.infer<
  ReturnType<typeof resetPasswordSchema>
>;
