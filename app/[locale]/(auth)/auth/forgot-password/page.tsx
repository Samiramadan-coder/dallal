import ForgotPasswordForm from "@/components/auth/forgot-password-form";
import { http } from "@/lib/http";
import { Country } from "@/types/global";

export default async function Page() {
  const { data, ok } = await http.get<{
    data: Country[];
  }>("/api/v1/countries");

  if (!ok) {
    throw new Error("Failed to fetch countries data");
  }

  return (
    <div>
      <ForgotPasswordForm countries={data.data} />
    </div>
  );
}
