import z from "zod";
import { T } from "./global";

export const otpVerifySchema = (t: T) =>
  z.object({
    phone: z.string().min(1),
    verification_code: z.string().regex(/^\d{6}$/, t("invalid")),
  });

export type OTPVerifyFormData = z.infer<ReturnType<typeof otpVerifySchema>>;
