import Image from "next/image";
import Link from "next/link";
import { bold } from "#components/Fonts";

export function NavbarLogoComponent() {
  return (
    <Link href="/" aria-label="Overseer Main Page" className={`${bold.className} flex items-center gap-2 text-xl`}>
      <Image src="/assets/Transparent.webp" alt="Overseer Logo" width={500} height={500} className="size-10" />
      <span className="xs:block hidden">Overseer</span>
    </Link>
  );
}
