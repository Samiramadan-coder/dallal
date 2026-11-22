// Title + subtitle at the top of every account page
export default function AccountPageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-7">
      {eyebrow && (
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#C9A24D] mb-1.5">
          {eyebrow}
        </p>
      )}
      <h1 className="text-3xl md:text-[34px] font-bold text-foreground leading-tight ltr:font-playfair">
        {title}
      </h1>
      {description && (
        <p className="text-sm text-muted-foreground mt-1.5">{description}</p>
      )}
    </div>
  );
}
