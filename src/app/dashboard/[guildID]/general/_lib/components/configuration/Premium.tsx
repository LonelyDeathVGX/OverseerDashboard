import { Info } from "lucide-react";
import { Alert, AlertDescription } from "#ui/Alert";
import { Card, CardContent, CardHeader, CardTitle } from "#ui/Card";
import { Separator } from "#ui/Separator";
import { PremiumReedemComponent } from "./PremiumReedem";
import { PremiumRevokeComponent } from "./PremiumRevoke";

export const PremiumComponent = ({
  data,
  guildID,
}: {
  data: {
    enabled?: boolean;
    expiresAt?: number;
  };
  guildID: string;
}) => {
  if (!data.enabled) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Premium</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="flex flex-col gap-4">
          <Alert variant="cyan">
            <Info className="size-5" />
            <div className="flex flex-col gap-1">
              <AlertDescription>This server does not have a premium membership</AlertDescription>
            </div>
          </Alert>
          <PremiumReedemComponent guildID={guildID} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative before:absolute before:top-[-2px] before:right-[-2px] before:bottom-[-2px] before:left-[-2px] before:z-[-1] before:animate-gradient before:rounded-lg before:bg-[length:200%_200%] before:bg-gradient-to-br before:from-indigo-500 before:via-purple-500 before:to-pink-500 before:content-['']">
      <CardHeader>
        <CardTitle>Premium</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-4">
        <PremiumRevokeComponent guildID={guildID} />
      </CardContent>
    </Card>
  );
};
