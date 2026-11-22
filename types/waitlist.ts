import z from "zod";
import { T } from "@/types/global";

// A phone number: digits with an optional leading "+", spaces and dashes
const PHONE = /^\+?[\d\s-]{6,20}$/;

export const isWaitlistPhone = (value: string) => PHONE.test(value.trim());

export const waitlistSchema = (t: T) =>
  z.object({
    name: z.string().trim().min(1, t("fields.name.required")),
    // Email or phone, whichever the visitor prefers to be notified on
    contact: z
      .string()
      .trim()
      .min(1, t("fields.contact.required"))
      .refine(
        (value) => PHONE.test(value) || z.email().safeParse(value).success,
        t("fields.contact.invalid"),
      ),
  });

export type WaitlistFormData = z.infer<ReturnType<typeof waitlistSchema>>;
