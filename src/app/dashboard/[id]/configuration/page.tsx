import { fetchGuildConfiguration } from "#lib/Database";
import { GeneralConfigurationComponent } from "./components/GeneralConfiguration";
import { PremiumComponent } from "./components/Premium";

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { document } = await fetchGuildConfiguration(params.id);

  return (
    <div className="flex flex-col gap-6">
      <GeneralConfigurationComponent
        data={{
          locale: document?.general.locale.toLowerCase() ?? "en",
        }}
        guildID={params.id}
      />
      <PremiumComponent
        data={{
          premium: document?.premium.enabled ?? false,
          expiresAt: document?.premium.expiresAt,
        }}
      />
    </div>
  );
}
