import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import useMutation from "swr/mutation";
import { Button } from "#components/ui/Button";
import { useToast } from "#components/ui/useToast";
import { makeClientRequest } from "#lib/Client";

const revokePremiumMembership = async (
  url: string,
  {
    arg,
  }: {
    arg: object;
  },
) =>
  await makeClientRequest(url, {
    json: arg,
    method: "DELETE",
  }).then(async (response) => response.json());

export const PremiumRevokeSubmitComponent = ({
  guildID,
}: {
  guildID: string;
}) => {
  const { toast } = useToast();
  const { refresh } = useRouter();
  const { isMutating, trigger } = useMutation(
    `/api/dashboard/${guildID}/general/configuration/premium`,
    revokePremiumMembership,
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
  const handleRevoke = async () => await trigger({});

  return (
    <Button className="gap-2" disabled={isMutating} onClick={handleRevoke}>
      {isMutating ? (
        <>
          <Loader2 className="size-5 animate-spin" />
          Loading...
        </>
      ) : (
        "Revoke"
      )}
    </Button>
  );
};
