export default function EyeBrow({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={`text-[11px] font-bold uppercase tracking-[0.25em] text-accent ${className}`}
    >
      {children}
    </p>
  );
}
