"use server";

import { z } from "zod";
import { ClientVoucherManager } from "#database/ClientVoucher";
import { GuildConfigurationManager } from "#database/GuildConfiguration";
import { fetchClientGuild } from "#lib/Requests";
import { fetchSession } from "#lib/Server";
import { getGuildID, middleware } from "../Util";

const PremiumReedemSchema = z.object({
  voucher: z
    .string({
      invalid_type_error: "The voucher property must be a string",
      required_error: "The voucher property is required",
    })
    .uuid({
      message: "The voucher property must be a valid UUID",
    }),
});

export async function reedemPremiumVoucher(formData: FormData) {
  try {
    const guildID = getGuildID(formData.get("guildID"));

    await middleware(guildID);

    const { data, error } = PremiumReedemSchema.safeParse({
      voucher: formData.get("voucher"),
    });

    if (error) {
      throw new Error(error.issues[0].message);
    }

    const clientVoucher = await ClientVoucherManager.findOne({
      voucherID: data.voucher,
    });

    if (!clientVoucher) {
      throw new Error("The voucher has not been found");
    }

    const expiresAt = clientVoucher.general.type === "MONTH" ? Date.now() + 2592000000 : 0;

    await GuildConfigurationManager.upsert(
      {
        guildID,
      },
      {
        premium: {
          enabled: true,
          expiresAt,
        },
      },
      {
        guildID,
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

export async function revokePremiumVoucher(formData: FormData) {
  try {
    const guildID = getGuildID(formData.get("guildID"));

    await middleware(guildID);

    const guildConfiguration = await GuildConfigurationManager.findOne({
      guildID,
    });

    if (!guildConfiguration?.premium.enabled) {
      throw new Error("The guild does not have a premium membership");
    }

    const session = await fetchSession();
    const { guild } = await fetchClientGuild(guildID);

    if (session?.userID !== guild?.owner_id) {
      throw new Error("You cannot perform this action");
    }

    await GuildConfigurationManager.updateOne(
      {
        guildID,
      },
      {
        premium: {
          enabled: false,
          expiresAt: 0,
        },
      },
    );

    return {
      message: "The membership has been revoked",
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
