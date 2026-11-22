import OTPVerify from "@/components/auth/otp-verify";

type SearchParams = {
  phone: string;
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { phone } = await searchParams;

  return <OTPVerify phone={phone} />;
}
