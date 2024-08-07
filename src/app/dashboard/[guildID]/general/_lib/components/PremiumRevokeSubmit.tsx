import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "#components/ui/Button";

export function PremiumRevokeSubmitComponent() {
  const { pending } = useFormStatus();

  return (
    <Button className="gap-2" disabled={pending} type="submit">
      {pending ? (
        <>
          <Loader2 className="size-5 animate-spin" />
          Loading...
        </>
      ) : (
        "Revoke"
      )}
    </Button>
  );
}
