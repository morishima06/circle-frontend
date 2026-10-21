// features/admin/order/hooks/useOrders.ts
import useSWR from "swr";

import { getOrders } from "@/api/admin/order";

type OrderParams = {
  keyword?: string;
  orderStatus?: string;
  currentPage?: number;
  page?: number;
  perPage?: number;
};

export const useOrders = (params: OrderParams) => {
  const { data, isLoading, error } = useSWR(
    ["/admin/orders", params],
    ([, p]) => getOrders(p),
  );

  return {
    orders: data?.orders ?? [],
    pagination: data?.pagination,
    isLoading,
    error,
  };
};
