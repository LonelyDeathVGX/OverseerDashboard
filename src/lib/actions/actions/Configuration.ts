"use server";

import { z } from "zod";
import { GuildConfigurationManager } from "#database/GuildConfiguration";
import { getGuildID, middleware } from "../Util";

const GeneralConfigurationSchema = z.object({
  locale: z.enum(["en", "es"], {
    message: "The locale property must be a valid enumeration (Expected 'en', 'es')",
    required_error: "The locale property is required",
    invalid_type_error: "The locale property must be a string",
  }),
});

export async function updateGeneralConfiguration(_prevState: unknown, formData: FormData) {
  try {
    const guildID = getGuildID(formData.get("guildID"));

    await middleware(guildID);

    const { data, error } = GeneralConfigurationSchema.safeParse({
      locale: formData.get("locale"),
    });

    if (error) {
      throw new Error(error.issues[0].message);
    }

    await GuildConfigurationManager.upsert(
      {
        guildID,
      },
      {
        general: {
          locale: data.locale.toUpperCase(),
        },
      },
      {
        guildID,
        general: {
          locale: data.locale.toUpperCase(),
          timezone: "UTC",
          use12Hours: false,
        },
        premium: {
          enabled: false,
          expiresAt: 0,
        },
        createdAt: {
          $date: new Date().toISOString(),
        },
      },
    );

    return {
      message: "The changes have been saved",
      success: true,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: error.message,
        success: false,
      };
    }

    return {
      message: "Internal Server Error",
      success: false,
    };
  }
}
