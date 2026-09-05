import Image from "next/image";
import { Link } from "@/i18n/navigation";

export default function Logo({
  width = 100,
  height = 100,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <Link href="/">
      <Image src="/logo.png" alt="Logo" width={width} height={height} />
    </Link>
  );
}
