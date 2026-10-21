// features/admin/order/hooks/useOrderDetail.ts

import useSWR from "swr";

import { getOrderDetail } from "@/api/admin/order";

export const useOrderDetail = (orderId: number | null) => {
  const { data, error, isLoading, mutate } = useSWR(
    orderId ? ["/admin/orders", orderId] : null,
    ([, id]) => getOrderDetail(id),
  );

  return {
    order: data,
    error,
    isLoading,
    mutate,
  };
};
