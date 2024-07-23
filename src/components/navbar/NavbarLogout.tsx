"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "#components/ui/Button";
import { deleteSession } from "#lib/Server";

export function NavbarLogoutComponent() {
  const router = useRouter();
  const handleLogout = async () => {
    await deleteSession();
    router.refresh();
  };

  return (
    <Button variant="rose" onClick={handleLogout} className="flex items-center gap-2">
      <LogOut className="size-5" />
      Logout
    </Button>
  );
}
