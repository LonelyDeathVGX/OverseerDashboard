"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "#components/ui/Button";
import { deleteSession } from "#lib/Server";

export function NavbarLogoutComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const handleLogout = async () => {
    await deleteSession();

    if (pathname.startsWith("/dashboard")) {
      return router.replace("/");
    }

    return router.refresh();
  };

  return (
    <Button variant="rose" onClick={handleLogout}>
      Logout
    </Button>
  );
}
