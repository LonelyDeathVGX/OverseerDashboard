import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import useMutation from "swr/mutation";
import { Button } from "#components/ui/Button";
import { Input } from "#components/ui/Input";
import { Label } from "#components/ui/Label";
import { useToast } from "#components/ui/useToast";
import { makeClientRequest } from "#lib/Client";

const reedemPremiumVoucher = async (
  url: string,
  {
    arg,
  }: {
    arg: object;
  },
) =>
  await makeClientRequest(url, {
    json: arg,
    method: "POST",
  }).then(async (response) => response.json());

export const PremiumReedemSubmitComponent = ({
  guildID,
  voucherState,
}: {
  guildID: string;
  voucherState: VoucherState;
}) => {
  const { toast } = useToast();
  const { refresh } = useRouter();
  const { isMutating, trigger } = useMutation(
    `/api/dashboard/${guildID}/general/configuration/premium`,
    reedemPremiumVoucher,
    {
      throwOnError: false,
      onSuccess: () => refresh(),
      onError: (error) =>
        toast({
          description: error.message,
          variant: "rose",
        }),
    },
  );
  const handleReedem = async () =>
    await trigger({
      voucher: voucherState[0],
    });

  return (
    <Button className="gap-2" disabled={isMutating} onClick={handleReedem}>
      {isMutating ? (
        <>
          <Loader2 className="size-5 animate-spin" />
          Loading...
        </>
      ) : (
        "Reedem"
      )}
    </Button>
  );
};

export const PremiumReedemVoucherInputComponent = ({
  voucherState,
}: {
  voucherState: VoucherState;
}) => {
  const [_, setVoucher] = voucherState;

  return (
    <div className="flex flex-col gap-2">
      <Label>Enter your Voucher</Label>
      <Input
        maxLength={36}
        minLength={36}
        name="voucher"
        onChange={(event) => setVoucher(event.target.value)}
        placeholder="########-####-####-####-############"
        type="text"
      />
    </div>
  );
};

type VoucherState = [string, Dispatch<SetStateAction<string>>];
