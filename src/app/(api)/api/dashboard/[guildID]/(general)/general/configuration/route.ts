import type { NextRequest } from "next/server";
import { z } from "zod";
import { GuildConfigurationManager } from "#database/GuildConfiguration";
import { NextResponseJSON } from "#lib/Responses";

const GeneralConfigurationSchema = z.object({
  locale: z.enum(["en", "es"], {
    message: "The locale property must be a valid enumeration (Expected 'en', 'es')",
    required_error: "The locale property is required",
    invalid_type_error: "The locale property must be a string",
  }),
});

export async function PUT(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      guildID: string;
    };
  },
) {
  try {
    const body = await request.json().catch(() => null);

    if (!JSON.parse(JSON.stringify(body))) {
      return NextResponseJSON({
        data: "The body object is malformed JSON",
        status: 400,
      });
    }

    const { data, error } = GeneralConfigurationSchema.safeParse(body);

    if (error) {
      return NextResponseJSON({
        data: error.issues[0].message,
        status: 422,
      });
    }

    await GuildConfigurationManager.upsert(
      {
        guildID: params.guildID,
      },
      {
        general: {
          locale: data.locale.toUpperCase(),
        },
      },
      {
        guildID: params.guildID,
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

    return NextResponseJSON({
      data: {},
      status: 200,
    });
  } catch (error) {
    console.error(error);

    return NextResponseJSON({
      data: "Something went wrong while processing the request",
      status: 500,
    });
  }
}
