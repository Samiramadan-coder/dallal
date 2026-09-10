import { http } from "@/lib/http";
import { Country, Phone } from "@/types/global";
import MyPhones from "@/components/profile/my-phones";

export default async function Page() {
  const { data: phones, ok: ok1 } = await http.get<{
    data: Phone[];
  }>("/api/v1/me/phones", {
    next: {
      tags: ["phones"],
    },
  });

  const { data: countries, ok: ok2 } = await http.get<{
    data: Country[];
  }>("/api/v1/countries");

  if (!ok1 || !ok2) {
    throw new Error("Failed to fetch phones or countries");
  }

  return (
    <div>
      <MyPhones phones={phones.data} countries={countries.data} />
    </div>
  );
}
