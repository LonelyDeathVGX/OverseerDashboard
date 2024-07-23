import Link from "next/link";
import { Overseer } from "#components/Icons";
import { UseMediaQueryComponent } from "#components/UseMediaQuery";

export function NavbarLogoComponent({
  shouldHideText,
}: {
  shouldHideText: boolean;
}) {
  return (
    <Link href="/" aria-label="Overseer Main Page" className="flex items-center gap-2 font-extrabold text-xl">
      <Overseer className="size-7" />
      {shouldHideText ? (
        <UseMediaQueryComponent mediaQuery="(min-width: 512px)">Overseer</UseMediaQueryComponent>
      ) : (
        "Overseer"
      )}
    </Link>
  );
}
