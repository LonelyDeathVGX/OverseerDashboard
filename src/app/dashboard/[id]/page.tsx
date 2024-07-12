import { Info } from "lucide-react";
import { fetchClientGuild } from "#lib/Requests";
import { Alert, AlertDescription, AlertTitle } from "#ui/Alert";
import { Card, CardHeader, CardTitle } from "#ui/Card";

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { guild } = await fetchClientGuild(params.id);

  return (
    <div className="flex flex-col gap-6">
      <Alert>
        <Info className="size-5" />
        <div>
          <AlertTitle>Welcome to the Overseer Dashboard</AlertTitle>
          <AlertDescription>
            This Dashboard is still under development, so we welcome feedback from all our users.
          </AlertDescription>
        </div>
      </Alert>
      <Card>
        <CardHeader>
          <CardTitle>{guild?.name}</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
