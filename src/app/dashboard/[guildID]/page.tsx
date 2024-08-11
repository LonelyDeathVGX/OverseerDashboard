import { fetchClientGuild } from "#lib/Requests";
import { Card, CardHeader, CardTitle } from "#ui/Card";

export default async ({
  params,
}: {
  params: {
    guildID: string;
  };
}) => {
  const { guild } = await fetchClientGuild(params.guildID);

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{guild?.name}</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};
