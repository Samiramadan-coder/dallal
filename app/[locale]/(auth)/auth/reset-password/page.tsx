import ResetPassword from "@/components/auth/reset-password-form";

type SearchParams = {
  phone?: string;
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { phone } = await searchParams;

  return (
    <div>
      <ResetPassword phone={phone} />
    </div>
  );
}
