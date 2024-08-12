import type { NextRequest } from "next/server";
import { z } from "zod";
import { ClientVoucherManager } from "#database/ClientVoucher";
import { GuildConfigurationManager } from "#database/GuildConfiguration";
import { fetchClientGuild } from "#lib/Requests";
import { NextJSONResponse } from "#lib/Responses";
import { type Session, fetchSession } from "#lib/Server";

const PremiumReedemSchema = z.object({
  voucher: z
    .string({
      message: "The voucher property must be a string",
      required_error: "The voucher property is required",
      invalid_type_error: "The voucher property must be a string",
    })
    .uuid({
      message: "The voucher property must be a valid UUID",
    }),
});

export const POST = async (
  request: NextRequest,
  {
    params,
  }: {
    params: {
      guildID: string;
    };
  },
) => {
  try {
    const body = await request.json().catch(() => null);

    if (!JSON.parse(JSON.stringify(body))) {
      return NextJSONResponse({
        data: "Bad Request",
        status: 400,
      });
    }

    const { data, error } = PremiumReedemSchema.safeParse(body);

    if (error) {
      return NextJSONResponse({
        data: error.issues[0].message,
        status: 422,
      });
    }

    const clientVoucher = await ClientVoucherManager.findOne({
      voucherID: data.voucher,
    });

    if (!clientVoucher) {
      return NextJSONResponse({
        data: "The voucher has not been found",
        status: 404,
      });
    }

    const expiresAt = clientVoucher.general.type === "MONTH" ? Date.now() + 2592000000 : 0;
    await GuildConfigurationManager.upsert(
      {
        guildID: params.guildID,
      },
      {
        premium: {
          enabled: true,
          expiresAt,
        },
      },
      {
        guildID: params.guildID,
        general: {
          locale: "EN",
          timezone: "UTC",
          use12Hours: false,
        },
        premium: {
          enabled: true,
          expiresAt,
        },
        createdAt: {
          $date: new Date().toISOString(),
        },
      },
    );
    await ClientVoucherManager.deleteOne({
      voucherID: clientVoucher.voucherID,
    });

    return NextJSONResponse({
      data: {},
      status: 200,
    });
  } catch (error) {
    console.error(error);

    return NextJSONResponse({
      data: "Internal Server Error",
      status: 500,
    });
  }
};

export const DELETE = async (
  _: NextRequest,
  {
    params,
  }: {
    params: {
      guildID: string;
    };
  },
) => {
  try {
    const guildConfiguration = await GuildConfigurationManager.findOne({
      guildID: params.guildID,
    });

    if (!guildConfiguration?.premium.enabled) {
      return NextJSONResponse({
        data: "The guild does not have a premium membership",
        status: 404,
      });
    }

    const session = (await fetchSession()) as Session;
    const { guild } = await fetchClientGuild(params.guildID);

    if (session?.userID !== guild?.owner_id) {
      return NextJSONResponse({
        data: "You cannot perform this action",
        status: 403,
      });
    }

    await GuildConfigurationManager.updateOne(
      {
        guildID: params.guildID,
      },
      {
        premium: {
          enabled: false,
          expiresAt: 0,
        },
      },
    );

    return NextJSONResponse({
      data: {},
      status: 200,
    });
  } catch (error) {
    console.error(error);

    return NextJSONResponse({
      data: "Internal Server Error",
      status: 500,
    });
  }
};
