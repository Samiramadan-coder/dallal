import z from "zod";
import { T } from "@/types/global";

export const signInSchema = (t: T) =>
  z.object({
    email_or_phone: z.string().min(1, t("fields.emailOrPhone.required")),
    password: z.string().min(1, t("fields.password.required")),
  });

export type SignInFormData = z.infer<ReturnType<typeof signInSchema>>;
