"use client";

import { DialogClose } from "@radix-ui/react-dialog";
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
import { PremiumRevokeSubmitComponent } from "./PremiumRevokeComponents";

export const PremiumRevokeComponent = ({
  guildID,
}: {
  guildID: string;
}) => {
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
          <PremiumRevokeSubmitComponent guildID={guildID} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
