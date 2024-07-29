"use client";

import { LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { deleteSession } from "#lib/Server";
import { DropdownMenuItem } from "#ui/DropdownMenu";

export function NavbarDropdownLogoutComponent() {
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
    <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-rose-400">
      <LogOut className="size-5" />
      Logout
    </DropdownMenuItem>
  );
}
