import type { NextRequest } from "next/server";
import { z } from "zod";
import { ClientVoucherManager } from "#database/ClientVoucher";
import { GuildConfigurationManager } from "#database/GuildConfiguration";
import { fetchClientGuild } from "#lib/Requests";
import { NextResponseJSON } from "#lib/Responses";
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

export async function POST(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
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

    const { data, error } = PremiumReedemSchema.safeParse(body);

    if (error) {
      return NextResponseJSON({
        data: error.issues[0].message,
        status: 422,
      });
    }

    const clientVoucher = await ClientVoucherManager.findOne({
      voucherID: data.voucher,
    });

    if (!clientVoucher) {
      return NextResponseJSON({
        data: "The voucher has not been found",
        status: 404,
      });
    }

    const expiresAt = clientVoucher.general.type === "MONTH" ? Date.now() + 2592000000 : 0;
    await GuildConfigurationManager.upsert(
      {
        guildID: params.id,
      },
      {
        premium: {
          enabled: true,
          expiresAt,
        },
      },
      {
        guildID: params.id,
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

export async function DELETE(
  _request: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  },
) {
  try {
    const guildConfiguration = await GuildConfigurationManager.findOne({
      guildID: params.id,
    });

    if (!guildConfiguration?.premium.enabled) {
      return NextResponseJSON({
        data: "The guild does not have a premium membership",
        status: 404,
      });
    }

    const session = (await fetchSession()) as Session;
    const { guild } = await fetchClientGuild(params.id);

    if (session?.userID !== guild?.owner_id) {
      return NextResponseJSON({
        data: "You cannot perform this action",
        status: 403,
      });
    }

    await GuildConfigurationManager.updateOne(
      {
        guildID: params.id,
      },
      {
        premium: {
          enabled: false,
          expiresAt: 0,
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
