"use client";

import { useMutation } from "@tanstack/react-query";
import ky from "ky";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { afterResponseHook } from "#lib/Client";
import { Button } from "#ui/Button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "#ui/Dialog";
import { Input } from "#ui/Input";
import { Label } from "#ui/Label";
import { useToast } from "#ui/useToast";

export function PremiumReedemComponent({ guildID }: { guildID: string }) {
  const [voucher, setVoucher] = useState<string>("");
  const { toast } = useToast();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await ky.post(`/api/dashboard/${guildID}/general/configuration/premium`, {
        hooks: {
          afterResponse: [afterResponseHook],
        },
        json: {
          voucher,
        },
        retry: 0,
      });
    },
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
        <Button>Redeem Voucher</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Redeem your Voucher</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Label>Enter your Voucher</Label>
          <Input
            maxLength={36}
            minLength={36}
            onChange={(element) => setVoucher(element.target.value)}
            placeholder="########-####-####-####-############"
            type="text"
          />
        </div>
        <DialogFooter>
          <Button className="gap-2" disabled={isPending} onClick={() => mutate()}>
            {isPending && <Loader2 className="size-5 animate-spin" />}
            Reedem Voucher
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
