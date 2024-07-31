import Link from "next/link";
import { UseMediaQueryComponent } from "#components/UseMediaQuery";
import { Button } from "#components/ui/Button";
import { Links } from "#lib/constants/Links";

export function NavbarLinksComponent({
  isDashboard,
}: {
  isDashboard: boolean;
}) {
  return (
    !isDashboard && (
      <UseMediaQueryComponent mediaQuery="(min-width: 768px)">
        {(["useful_links"] as const).map((group) => (
          <ul key={group} className="flex items-center gap-4">
            {Links({
              useLongText: false,
            })[group].map((link) => (
              <li className="text-sm" key={link.name}>
                <Button asChild={true} variant="ghost">
                  <Link aria-label={link.ariaLabel} href={link.href} target={link.target}>
                    {link.name}
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        ))}
      </UseMediaQueryComponent>
    )
  );
}
