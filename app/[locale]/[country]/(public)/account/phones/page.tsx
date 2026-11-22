import { api } from "@/lib/api/client";
import { Phone } from "@/types/global";
import { getCountries } from "@/lib/api/global";
import MyPhones from "@/components/profile/my-phones";

export default async function Page() {
  const [phones, countries] = await Promise.all([
    api.get<{ data: Phone[] }>("/v1/me/phones", {
      next: { tags: ["phones"] },
    }),
    getCountries(),
  ]);

  return (
    <div>
      <MyPhones phones={phones.data} countries={countries} />
    </div>
  );
}
