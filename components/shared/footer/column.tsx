import { Link } from "@/i18n/navigation";

export function Column({
  title,
  links,
  t,
}: {
  title: string;
  links: {
    key: string;
    href: string;
  }[];
  t: (key: string) => string;
}) {
  return (
    <div>
      <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
        {title}
      </h3>

      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.key}>
            <Link
              href={link.href}
              className="text-sm transition hover:text-white"
            >
              {t(link.key)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
