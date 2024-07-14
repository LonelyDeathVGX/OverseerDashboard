"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteSession } from "#lib/Server";
import { DropdownMenuItem } from "#ui/DropdownMenu";

export function NavbarLogoutComponent() {
  const router = useRouter();
  const handleLogout = async () => {
    await deleteSession();
    router.refresh();
  };

  return (
    <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-rose-400">
      <LogOut className="size-5" />
      Logout
    </DropdownMenuItem>
  );
}
