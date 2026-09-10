import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Image from "next/image";
import AddNewPhone from "./add-new-phone";
import { CircleCheck } from "lucide-react";
import { Country, Phone } from "@/types/global";
import { getTranslations } from "next-intl/server";

export default async function MyPhones({
  phones,
  countries,
}: {
  phones: Phone[];
  countries: Country[];
}) {
  const t = await getTranslations("Profile.myPhones");

  return (
    <>
      <div className="flex justify-end mb-4">
        <AddNewPhone countries={countries} />
      </div>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-[#1b6b4a08]">
        <Table>
          <TableHeader className="bg-[#1b6b4a08]">
            <TableRow className="hover:bg-transparent">
              <TableHead className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {t("phone")}
              </TableHead>
              <TableHead className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {t("country")}
              </TableHead>
              <TableHead className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {t("isPrimary")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {phones.map((phone) => (
              <TableRow key={phone.id} className="hover:bg-transparent">
                <TableCell className="px-4 py-3">{phone.phone}</TableCell>
                <TableCell className="px-4 py-3">
                  <Image
                    src={phone.country.flag}
                    alt={phone.country.name}
                    width={20}
                    height={20}
                    className="inline-block mr-2"
                  />
                  {phone.country.name}
                </TableCell>
                <TableCell className="px-4 py-3">
                  {phone.is_primary ? (
                    <CircleCheck className="text-emerald-600 size-5" />
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
