import ForgotPasswordForm from "@/components/auth/forgot-password-form";
import { getCountries } from "@/lib/api/global";

export default async function Page() {
  const countries = await getCountries();

  return (
    <div>
      <ForgotPasswordForm countries={countries} />
    </div>
  );
}
