import { api } from "@/lib/api/client";
import { Country, Phone } from "@/types/global";
import MyPhones from "@/components/profile/my-phones";

export default async function Page() {
  const [phones, countries] = await Promise.all([
    api.get<{ data: Phone[] }>("/v1/me/phones", {
      next: { tags: ["phones"] },
    }),
    api.get<{ data: Country[] }>("/v1/countries", { auth: false }),
  ]);

  return (
    <div>
      <MyPhones phones={phones.data} countries={countries.data} />
    </div>
  );
}
