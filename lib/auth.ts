import type { SignUpFormData } from "@/types/sign-up";
import { http, ValidationError } from "./http";

// SignUpResponse represents the possible responses from the sign-up API.
type SignUpResponse =
  | { success: true; message: string }
  | {
      success: false;
      errors?: Partial<Record<keyof SignUpFormData, string>>;
      message?: string;
    };

export async function signUp(
  formData: SignUpFormData,
): Promise<SignUpResponse> {
  try {
    const { data } = await http.post<{ message: string }>(
      "/api/v1/auth/register",
      formData,
    );

    return { success: true, message: data.message };
  } catch (error) {
    console.error("Error In signUp", error);
    if (error instanceof ValidationError) {
      const errors = Object.fromEntries(
        Object.entries(error.errors).map(([field, messages]) => [
          field,
          messages[0] ?? "Invalid value",
        ]),
      ) as Partial<Record<keyof SignUpFormData, string>>;

      return { success: false, errors, message: error.responseMessage };
    }

    return { success: false };
  }
}
