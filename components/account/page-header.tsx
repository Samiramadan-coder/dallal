// Title + subtitle at the top of every account page
export default function AccountPageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-7">
      <h1 className="text-3xl md:text-[34px] font-bold text-foreground leading-tight ltr:font-playfair">
        {title}
      </h1>
      {description && (
        <p className="text-sm text-muted-foreground mt-1.5">{description}</p>
      )}
    </div>
  );
}
