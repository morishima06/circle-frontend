import useSWR from "swr";

import { getAddresses } from "@/api/customers/addresses";

export const useAccountAddresses = () => {
  const { data, error, isLoading } = useSWR("/customers/addresses", () =>
    getAddresses(),
  );

  return {
    addresses: data,
    isLoading,
    error,
  };
};
