import z from "zod";
import { T } from "@/types/global";

export const waitlistSchema = (t: T) =>
  z.object({
    name: z.string().trim().min(1, t("fields.name.required")),
    email: z
      .string()
      .trim()
      .min(1, t("fields.email.required"))
      .pipe(z.email(t("fields.email.invalid"))),
  });

export type WaitlistFormData = z.infer<ReturnType<typeof waitlistSchema>>;
