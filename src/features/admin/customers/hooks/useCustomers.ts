import useSWR from "swr";

import { getCustomers } from "@/api/admin/customer";
import type { CustomerParams } from "@/types/admin/customer";

export const useCustomers = (params: CustomerParams) => {
  const { data, isLoading, error } = useSWR(
    ["/admin/customers", params],
    ([, p]) => {
      return getCustomers(p);
    },
  );

  return {
    customers: data?.customers ?? [],
    pagination: data?.pagination,
    isLoading,
    error,
  };
};
