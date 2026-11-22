import z from "zod";
import { T } from "@/types/global";

// A phone number: digits with an optional leading "+", spaces and dashes
const PHONE = /^\+?[\d\s-]{6,20}$/;

export const forgotPasswordSchema = (t: T) =>
  z.object({
    identifier: z
      .string()
      .trim()
      .min(1, t("fields.identifier.required"))
      .refine(
        (value) => PHONE.test(value) || z.email().safeParse(value).success,
        t("fields.identifier.invalid"),
      ),
  });

export type ForgotPasswordFormData = z.infer<
  ReturnType<typeof forgotPasswordSchema>
>;
