import z from "zod";
import { T } from "@/types/global";

export const forgotPasswordSchema = (t: T) =>
  z.object({
    email: z
      .string()
      .min(1, t("fields.email.required"))
      .pipe(z.email(t("fields.email.invalid"))),
  });

export type ForgotPasswordFormData = z.infer<
  ReturnType<typeof forgotPasswordSchema>
>;
