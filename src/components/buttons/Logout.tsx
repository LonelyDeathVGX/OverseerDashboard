"use client";

import { useRouter } from "next/navigation";
import { Button } from "#components/ui/Button";
import { deleteSession } from "#lib/Server";

export function LogoutComponent() {
  const router = useRouter();
  const handleLogout = async () => {
    await deleteSession();
    return router.replace("/");
  };

  return (
    <Button aria-label="Logout Button" onClick={handleLogout} variant="rose">
      Logout
    </Button>
  );
}
