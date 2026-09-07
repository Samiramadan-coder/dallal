import z from "zod";
import { T } from "./global";

export const otpVerifySchema = (t: T) =>
  z.object({
    verification_code: z.string().regex(/^\d{6}$/, t("invalid")),
  });

export type OTPVerifyFormData = z.infer<ReturnType<typeof otpVerifySchema>>;
