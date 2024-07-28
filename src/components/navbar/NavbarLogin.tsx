import Link from "next/link";
import { Button } from "#components/ui/Button";
import { OAUTH2_URL } from "#lib/Constants";

export function NavbarLoginComponent() {
  return (
    <Button asChild={true} variant="default">
      <Link href={OAUTH2_URL} aria-label="Login with Discord" className="flex items-center gap-2">
        Login with Discord
      </Link>
    </Button>
  );
}
