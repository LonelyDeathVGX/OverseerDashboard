"use client";

import { useRouter } from "next/navigation";
import { Button } from "#components/ui/Button";
import { deleteSession } from "#lib/Server";

export function NavbarLogoutComponent() {
  const router = useRouter();
  const handleLogout = async () => {
    await deleteSession();
    return router.replace("/");
  };

  return (
    <Button variant="rose" onClick={handleLogout}>
      Logout
    </Button>
  );
}
