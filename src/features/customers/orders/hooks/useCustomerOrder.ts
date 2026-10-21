import useSWR from "swr";

import { getCustomerOrders } from "@/api/customers/orders";

export const useCustomerOrders = () => {
  const {
    data: orders = [],
    error,
    isLoading,
  } = useSWR("customers/orders", () => getCustomerOrders());

  return {
    orders,
    error,
    isLoading,
  };
};
