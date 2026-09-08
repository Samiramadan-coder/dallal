import z from "zod";
import { T } from "@/types/global";

export const forgotPasswordSchema = (t: T) =>
  z.object({
    country_id: z.string().min(1, t("fields.country.required")),
    phone: z
      .string()
      .min(1, t("fields.phone.required"))
      .min(5, t("fields.phone.invalid")),
  });

export type ForgotPasswordFormData = z.infer<
  ReturnType<typeof forgotPasswordSchema>
>;
