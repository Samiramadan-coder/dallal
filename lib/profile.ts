import { http, ValidationError } from "./http";
import { AddNewPhoneFormValues } from "@/types/profile";

// Add New Phone
type AddNewPhoneResponse =
  | {
      success: true;
      message?: string;
    }
  | {
      success: false;
      message?: string;
      errors?: Partial<Record<keyof AddNewPhoneFormValues, string>>;
    };

export async function addNewPhone(
  formData: AddNewPhoneFormValues,
): Promise<AddNewPhoneResponse> {
  try {
    const { data } = await http.post<{ message: string }>(
      "/api/v1/me/phones",
      formData,
    );
    return { success: true, message: data.message };
  } catch (error) {
    console.error("Error adding new phone:", error);
    if (error instanceof ValidationError) {
      const errors = Object.fromEntries(
        Object.entries(error.errors).map(([field, messages]) => [
          field,
          messages[0] ?? "Invalid value",
        ]),
      ) as Partial<Record<keyof AddNewPhoneFormValues, string>>;

      return {
        success: false,
        errors,
        message: error.responseMessage,
      };
    }
    return { success: false };
  }
}
