"use client";

import type { Nullish } from "@sapphire/utilities";
import type { APIGuild } from "discord-api-types/v10";
import { type ReactNode, createContext, useContext } from "react";

const GuildContext = createContext<GuildContextProps | Nullish>(null);

export const GuildProvider = ({ children, guild }: Readonly<{ children: ReactNode; guild: APIGuild }>) => {
  return <GuildContext.Provider value={{ guild }}>{children}</GuildContext.Provider>;
};

export const useGuild = (): GuildContextProps => {
  const context = useContext(GuildContext);

  if (!context) {
    throw new Error("useGuild must be used within a GuildProvider");
  }

  return context;
};

interface GuildContextProps {
  guild: APIGuild;
}
