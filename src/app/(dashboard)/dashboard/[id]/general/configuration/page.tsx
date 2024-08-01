import { GuildConfigurationManager } from "#lib/database/managers/GuildConfiguration";
import { GeneralConfigurationComponent } from "./_components/GeneralConfiguration";
import { PremiumComponent } from "./_components/Premium";

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const guildConfiguration = await GuildConfigurationManager.findOne({
    guildID: params.id,
  });

  return (
    <div className="flex flex-col gap-6">
      <GeneralConfigurationComponent
        data={{
          locale: guildConfiguration?.general.locale.toLowerCase() ?? "en",
        }}
        guildID={params.id}
      />
      <PremiumComponent data={guildConfiguration?.premium ?? {}} guildID={params.id} />
    </div>
  );
}
