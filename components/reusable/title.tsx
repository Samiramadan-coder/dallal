import { getLocale } from "next-intl/server";

export default async function Title({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const fontClass = locale === "en" ? "font-playfair" : "";

  return (
    <h2
      className={`mt-5 text-3xl font-bold text-balance ${fontClass} ${className}`}
    >
      {children}
    </h2>
  );
}
