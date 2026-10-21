import useSWR from "swr";

import { getOrderCounts } from "@/api/admin/order";

export const useOrderCounts = () => {
  const { data, isLoading, error } = useSWR(
    "/admin/orders/counts",
    getOrderCounts,
    {
      refreshInterval: 30000,
    },
  );

  return {
    counts: data,
    isLoading,
    error,
  };
};
