import client from "@/lib/api/client";
import type {
  OrderCounts,
  OrderParams,
  OrdersResponse,
  ShipOrderParams,
} from "@/types/admin/order";
import { OrderDetail } from "@/types/admin/order";

// 管理画面の注文一覧取得
export const getOrders = async (
  params?: OrderParams,
): Promise<OrdersResponse> => {
  const res = await client.get("/admin/orders", {
    params,
  });

  return res.data;
};

export const getOrderDetail = async (orderId: number): Promise<OrderDetail> => {
  const res = await client.get<OrderDetail>(`/admin/orders/${orderId}`);

  return res.data;
};

export const getOrderCounts = async (): Promise<OrderCounts> => {
  const res = await client.get<OrderCounts>("/admin/orders/counts");

  return res.data;
};

export const shipOrder = async (params: ShipOrderParams): Promise<void> => {
  const { orderId, ...body } = params;

  await client.patch(`/admin/orders/${orderId}/ship`, body);
};
