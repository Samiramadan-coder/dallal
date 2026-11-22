import z from "zod";
import { T } from "@/types/global";
import { strongPasswordSchema } from "@/types/password";

export const resetPasswordSchema = (t: T) =>
  z
    .object({
      // The mobile number or email from forgot-password (hidden)
      identifier: z.string().trim().min(1),

      code: z
        .string()
        .trim()
        .min(1, t("fields.verificationCode.required"))
        .regex(/^\d{6}$/, t("fields.verificationCode.invalid")),

      password: strongPasswordSchema(t),

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
