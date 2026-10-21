import { CheckoutAddressData } from "@/features/checkout/schemas/checkoutAddressSchema";
import client from "@/lib/api/client";
import type { Order } from "@/types/order";
import type { OrderComplete } from "@/types/order";

// 注文作成
export const createOrder = async (): Promise<Order> => {
  const res = await client.post("/orders");

  return res.data;
};
// 注文更新

export type CheckoutOrderData =
  | CheckoutAddressData
  | {
      selectedAddressId: number;
    };

export const updateOrder = async (data: CheckoutOrderData): Promise<Order> => {
  const res = await client.patch("/order", {
    order: data,
  });

  return res.data;
};
// 注文完了情報取得

export const getOrderCompleteInfo = async (
  token: string,
): Promise<OrderComplete> => {
  const res = await client.get<OrderComplete>("/orders/complete", {
    params: { token },
  });

  return res.data;
};
