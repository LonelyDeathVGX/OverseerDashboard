"use client";

import { useState } from "react";
import { Button } from "#ui/Button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "#ui/Dialog";
import { PremiumReedemSubmitComponent, PremiumReedemVoucherInputComponent } from "./PremiumReedemComponents";

export const PremiumReedemComponent = ({
  guildID,
}: {
  guildID: string;
}) => {
  const voucherState = useState<string>("");

  return (
    <Dialog>
      <DialogTrigger asChild={true}>
        <Button>Redeem Voucher</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Redeem your Voucher</DialogTitle>
        </DialogHeader>
        <PremiumReedemVoucherInputComponent voucherState={voucherState} />
        <DialogFooter>
          <PremiumReedemSubmitComponent guildID={guildID} voucherState={voucherState} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
