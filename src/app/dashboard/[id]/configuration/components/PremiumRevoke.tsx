"use client";

import { DialogClose } from "@radix-ui/react-dialog";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "#components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "#components/ui/Dialog";
import { useToast } from "#ui/useToast";

export function PremiumRevokeComponent({
  guildID,
}: {
  guildID: string;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();
  const handleRevoke = async () => {
    setLoading(true);

    await fetch(`/api/dashboard/${guildID}/configuration/premium`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then(async (response) => {
        if (response.ok) {
          router.refresh();
        } else {
          const { data } = await response.json();

          toast({
            description: data,
            variant: "rose",
          });
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <Dialog>
      <DialogTrigger asChild={true}>
        <Button variant="rose">Revoke Membership</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Revoke Server Membership</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This action will make the server no longer able to enjoy the benefits of
            membership
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild={true}>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button disabled={loading} onClick={handleRevoke} className="gap-2">
            {loading && <Loader2 className="size-5 animate-spin" />}
            Revoke
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
