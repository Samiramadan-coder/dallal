import z from "zod";
import { T } from "@/types/global";
import { isStrongPassword } from "@/lib/password";

// A new password. `t` is the form's namespace; the weak message lists every
// rule, since the strength meter only shows how close the password is
export const strongPasswordSchema = (t: T) =>
  z
    .string()
    .min(1, t("fields.password.required"))
    .refine(isStrongPassword, t("fields.password.weak"));
