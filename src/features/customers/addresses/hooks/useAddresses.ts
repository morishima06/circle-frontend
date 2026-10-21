// hooks/useAddresses.ts

import useSWR from "swr";

import { getAddresses } from "@/api/customers/addresses";

export const useAddresses = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/customers/addresses",
    getAddresses,
  );

  return {
    addresses: data ?? [],
    isLoading,
    error,
    mutate,
  };
};
