import { LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "#components/ui/Button";

export function NavbarLogoutComponent() {
  return (
    <Button asChild={true} variant="rose">
      <Link href={"/api/auth/logout"} aria-label="Login with Discord" className="flex items-center gap-2">
        <LogOut className="size-5" />
        Logout
      </Link>
    </Button>
  );
}
