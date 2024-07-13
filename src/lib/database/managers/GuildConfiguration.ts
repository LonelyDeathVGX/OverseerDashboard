import { DatabaseManager } from "../Manager";

export const GuildConfigurationManager = new DatabaseManager<GuildConfiguration, GuildConfigurationUpdate>({
  collection: "GuildConfiguration",
});

interface GuildConfiguration {
  guildID: string;
  general: GuildConfigurationGeneral;
  premium: GuildConfigurationPremium;
  createdAt: Date;
}

interface GuildConfigurationUpdate {
  guildID: string;
  general: Partial<GuildConfigurationGeneral>;
  premium: Partial<GuildConfigurationPremium>;
  createdAt: {
    $date: string;
  };
}

interface GuildConfigurationGeneral {
  locale: string;
  timezone: string;
  use12Hours: boolean;
}

interface GuildConfigurationPremium {
  enabled: boolean;
  expiresAt: number;
}
