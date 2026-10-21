import client from "@/lib/api/client";
import type { Order, OrderDetail } from "@/types/customer/order";

// 注文一覧取得
export const getCustomerOrders = async (): Promise<Order[]> => {
  const res = await client.get("customers/orders");

  return res.data;
};

// 注文詳細取得
export const getCustomerOrderDetail = async (
  orderNumber: string,
): Promise<OrderDetail> => {
  const res = await client.get(`customers/orders/${orderNumber}`);

  return res.data;
};
