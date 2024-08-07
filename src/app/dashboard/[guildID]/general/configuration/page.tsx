import { GuildConfigurationManager } from "#lib/database/managers/GuildConfiguration";
import { GeneralConfigurationComponent } from "../_lib/components/GeneralConfiguration";
import { PremiumComponent } from "../_lib/components/Premium";

export default async function Page({
  params,
}: {
  params: {
    guildID: string;
  };
}) {
  const guildConfiguration = await GuildConfigurationManager.findOne({
    guildID: params.guildID,
  });

  return (
    <div className="flex flex-col gap-6">
      <GeneralConfigurationComponent
        data={{
          locale: guildConfiguration?.general.locale.toLowerCase() ?? "en",
        }}
        guildID={params.guildID}
      />
      <PremiumComponent data={guildConfiguration?.premium ?? {}} guildID={params.guildID} />
    </div>
  );
}
