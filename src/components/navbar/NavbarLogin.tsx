import { LogIn } from "lucide-react";
import Link from "next/link";
import { Button } from "#components/ui/Button";

export function NavbarLoginComponent() {
  return (
    <Button asChild={true} variant="white">
      <Link href={"/api/auth/login"} aria-label="Login with Discord" className="flex items-center gap-2">
        <LogIn className="size-5" />
        Login
      </Link>
    </Button>
  );
}
