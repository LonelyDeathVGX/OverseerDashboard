import Link from "next/link";
import { Button } from "#components/ui/Button";
import { OAUTH2_URL } from "#lib/Constants";

export const LoginComponent = () => {
  return (
    <Button asChild={true} variant="default">
      <Link aria-label="Login with Discord Button" className="flex items-center gap-2" href={OAUTH2_URL}>
        Login with Discord
      </Link>
    </Button>
  );
};
