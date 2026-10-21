import useSWR from "swr";

import { getCustomerOrderDetail } from "@/api/customers/orders";

export const useCustomerOrderDetail = (orderNumber?: string) => {
  const { data, error, isLoading } = useSWR(
    orderNumber ? ["/orders", orderNumber] : null,
    ([, number]) => getCustomerOrderDetail(number),
  );

  return {
    data,
    error,
    isLoading,
  };
};
