"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "#ui/Button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "#ui/Dialog";
import { Input } from "#ui/Input";
import { Label } from "#ui/Label";
import { useToast } from "#ui/useToast";

export function PremiumReedemComponent({ guildID }: { guildID: string }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [voucher, setVoucher] = useState<string>("");
  const { toast } = useToast();
  const router = useRouter();
  const handleReedem = async () => {
    setLoading(true);

    await fetch(`/api/dashboard/${guildID}/configuration/premium`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        voucher,
      }),
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
        <Button>Redeem Voucher</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Redeem your Voucher</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Label>Enter your Voucher</Label>
          <Input
            type="text"
            maxLength={36}
            minLength={36}
            placeholder="########-####-####-####-############"
            onChange={(element) => setVoucher(element.target.value)}
          />
        </div>
        <DialogFooter>
          <Button disabled={loading} onClick={handleReedem} className="gap-2">
            {loading && <Loader2 className="size-5 animate-spin" />}
            Reedem Voucher
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
