export interface GuildConfiguration {
  id: string;
  guild_id: string;
  general: {
    locale: string;
    timezone: string;
    use_12_hours: boolean;
  };
  premium: {
    enabled: boolean;
    expires_at: number;
  };
  created_at: Date;
}

export type Schemas = GuildConfiguration;
