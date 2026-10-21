// hooks/useAddress.ts

import useSWR from "swr";

import { getAddress } from "@/api/customers/addresses";

export const useAddress = (id?: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `/customers/addresses/${id}` : null,
    id ? () => getAddress(id) : null,
  );

  return {
    address: data,
    isLoading,
    error,
    mutate,
  };
};
