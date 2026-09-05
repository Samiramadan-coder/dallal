import z from "zod";
import { T } from "@/types/global";

export const signInSchema = (t: T) =>
  z.object({
    email: z.string().min(1, t("fields.email.required")),
    password: z.string().min(1, t("fields.password.required")),
  });

export type SignInFormData = z.infer<ReturnType<typeof signInSchema>>;
