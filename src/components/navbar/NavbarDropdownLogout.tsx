"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteSession } from "#lib/Server";
import { DropdownMenuItem } from "#ui/DropdownMenu";

export function NavbarDropdownLogoutComponent() {
  const router = useRouter();
  const handleLogout = async () => {
    await deleteSession();
    return router.replace("/");
  };

  return (
    <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-rose-400 focus:bg-rose-950/75">
      <LogOut className="size-5" />
      Logout
    </DropdownMenuItem>
  );
}
