import { GuildConfigurationManager } from "#lib/database/managers/GuildConfiguration";
import { GeneralConfigurationComponent } from "../_lib/components/configuration/GeneralConfiguration";
import { PremiumComponent } from "../_lib/components/configuration/Premium";

export default async ({
  params,
}: {
  params: {
    guildID: string;
  };
}) => {
  const guildConfiguration = await GuildConfigurationManager.findOne({
    guildID: params.guildID,
  });

  return (
    <div className="flex flex-col gap-6">
      <GeneralConfigurationComponent data={guildConfiguration?.general ?? {}} guildID={params.guildID} />
      <PremiumComponent data={guildConfiguration?.premium ?? {}} guildID={params.guildID} />
    </div>
  );
};
