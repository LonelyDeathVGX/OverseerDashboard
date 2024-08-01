"use client";

import { DialogClose } from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
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
import { makeClientRequest } from "#lib/Client";
import { useToast } from "#ui/useToast";

export function PremiumRevokeComponent({
  guildID,
}: {
  guildID: string;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: async () =>
      await makeClientRequest(`/api/dashboard/${guildID}/general/configuration/premium`, {
        method: "DELETE",
      }),
    onError: (error) => {
      toast({
        description: error.message,
        title: "Request Error",
        variant: "rose",
      });
    },
    onSuccess: () => {
      router.refresh();
    },
  });

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
          <Button className="gap-2" disabled={isPending} onClick={() => mutate()}>
            {isPending && <Loader2 className="size-5 animate-spin" />}
            Revoke
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
