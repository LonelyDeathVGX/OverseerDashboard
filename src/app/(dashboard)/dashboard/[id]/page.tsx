import { fetchClientGuild } from "#lib/Requests";
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
      <Card>
        <CardHeader>
          <CardTitle>{guild?.name}</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
