import useSWR from "swr";

import { fetcher } from "@/lib/api/fetcher";
export const useAccount = () => {
  const { data, error, isLoading } = useSWR("/customers/account", fetcher);

  return {
    account: data,
    isLoading,
    error,
  };
};
