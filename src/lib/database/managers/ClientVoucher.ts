import { DatabaseManager } from "../Manager";

export const ClientVoucherManager = new DatabaseManager<ClientVoucher, ClientVoucherUpdate>({
  collection: "ClientVoucher",
});

interface ClientVoucher {
  voucherID: string;
  general: ClientVoucherGeneral;
  createdAt: Date;
}

interface ClientVoucherUpdate {
  voucherID: string;
  general: Partial<ClientVoucherGeneral>;
  createdAt: {
    $date: string;
  };
}

interface ClientVoucherGeneral {
  type: "MONTH" | "INFINITE";
  isClaimed: boolean;
}
