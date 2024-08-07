"use client";

import { DialogClose } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { revokePremiumVoucher } from "#actions/Configuration";
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
import { PremiumRevokeSubmitComponent } from "./PremiumRevokeSubmit";

export function PremiumRevokeComponent({
  guildID,
}: {
  guildID: string;
}) {
  const { toast } = useToast();
  const { refresh } = useRouter();
  const handleAction = async (formData: FormData) => {
    const { message, success } = await revokePremiumVoucher(formData);

    if (success) {
      refresh();
    } else {
      toast({
        description: message,
        variant: "rose",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild={true}>
        <Button variant="rose">Revoke Membership</Button>
      </DialogTrigger>
      <DialogContent>
        <form action={handleAction} className="flex flex-col gap-4">
          <input type="hidden" name="guildID" value={guildID} />
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
            <PremiumRevokeSubmitComponent />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
