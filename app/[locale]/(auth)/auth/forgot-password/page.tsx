import ForgotPasswordForm from "@/components/auth/forgot-password-form";
import { api } from "@/lib/api/client";
import { Country } from "@/types/global";

export default async function Page() {
  const countries = await api.get<{ data: Country[] }>("api/v1/countries", {
    auth: false,
  });

  return (
    <div>
      <ForgotPasswordForm countries={countries.data} />
    </div>
  );
}
