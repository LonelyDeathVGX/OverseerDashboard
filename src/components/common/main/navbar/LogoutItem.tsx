"use client";

import { Exit } from "@/components/Icons";
import { DropdownMenuItem } from "@/components/ui/DropdownMenu";
import { deleteSession } from "@/lib/Server";
import { useRouter } from "next/navigation";

export function LogoutItemComponent() {
  const router = useRouter();
  const handleLogout = async () => {
    await deleteSession();
    router.refresh();
  };

  return (
    <DropdownMenuItem
      onClick={handleLogout}
      className="font-medium flex gap-2 items-center text-danger-400 focus:bg-danger-800/75 focus:text-danger-400"
    >
      <Exit className="size-5" />
      Logout
    </DropdownMenuItem>
  );
}
