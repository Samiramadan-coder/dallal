import { headingFont } from "@/constants/marketplace";
import { getLocale } from "next-intl/server";

export default async function SectionHeading({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description?: string;
}) {
  const locale = await getLocale();

  return (
    <div className="max-w-2xl">
      <h2
        id={id}
        className={`${headingFont(locale)} text-3xl font-bold text-card-foreground md:text-4xl`}
      >
        {title}
      </h2>
      {description && <p className="mt-2 text-[#B9B5A6]">{description}</p>}
    </div>
  );
}
