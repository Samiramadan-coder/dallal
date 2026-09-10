import z from "zod";
import { T } from "./global";

export const addNewPhoneSchema = (t: T) =>
  z.object({
    country_id: z.string().min(1, t("countryRequired")),
    phone: z.string().min(5, t("phoneRequired")),
  });

export type AddNewPhoneFormValues = z.infer<
  ReturnType<typeof addNewPhoneSchema>
>;
