"use client";

import { useRouter } from "next/navigation";
import { reedemPremiumVoucher } from "#actions/Configuration";
import { Button } from "#ui/Button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "#ui/Dialog";
import { Input } from "#ui/Input";
import { Label } from "#ui/Label";
import { useToast } from "#ui/useToast";
import { PremiumReedemSubmitComponent } from "./PremiumReedemSubmit";

export function PremiumReedemComponent({
  guildID,
}: {
  guildID: string;
}) {
  const { toast } = useToast();
  const { refresh } = useRouter();
  const handleAction = async (formData: FormData) => {
    const { message, success } = await reedemPremiumVoucher(formData);

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
        <Button>Redeem Voucher</Button>
      </DialogTrigger>
      <DialogContent>
        <form action={handleAction} className="flex flex-col gap-4">
          <input type="hidden" name="guildID" value={guildID} />
          <DialogHeader>
            <DialogTitle>Redeem your Voucher</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Label>Enter your Voucher</Label>
            <Input
              maxLength={36}
              minLength={36}
              name="voucher"
              placeholder="########-####-####-####-############"
              type="text"
            />
          </div>
          <DialogFooter>
            <PremiumReedemSubmitComponent />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
