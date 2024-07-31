"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteSession } from "#lib/Server";
import { DropdownMenuGroup, DropdownMenuItem } from "#ui/DropdownMenu";

export function NavbarDropdownLogoutComponent() {
  const router = useRouter();
  const handleLogout = async () => {
    await deleteSession();
    return router.replace("/");
  };

  return (
    <DropdownMenuGroup>
      <DropdownMenuItem className="flex items-center gap-2 text-rose-400 focus:bg-rose-950/75" onClick={handleLogout}>
        <LogOut className="size-5" />
        Logout
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
}