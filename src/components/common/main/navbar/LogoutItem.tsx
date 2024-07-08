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
    <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-rose-400">
      <Exit className="size-5" />
      Logout
    </DropdownMenuItem>
  );
}
