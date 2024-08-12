"use client";

import { useRouter } from "next/navigation";
import { Button } from "#components/ui/Button";
import { deleteSession } from "#lib/Server";

export const LogoutComponent = () => {
  const { replace } = useRouter();
  const handleLogout = async () => {
    await deleteSession();
    return replace("/");
  };

  return (
    <Button aria-label="Logout Button" onClick={handleLogout} variant="rose">
      Logout
    </Button>
  );
};
