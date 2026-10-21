import { useEffect, useState } from "react";
import useSWR from "swr";

import { getOrderCompleteInfo } from "@/api/order";

const POLLING_INTERVAL = 4000;
const POLLING_TIMEOUT = 30 * 1000;

export const useOrderComplete = (token?: string) => {
  const [stopPolling, setStopPolling] = useState(false);

  const { data, error, isLoading, mutate } = useSWR(
    token ? ["/orders/complete", token] : null,
    ([, token]) => getOrderCompleteInfo(token),
    {
      refreshInterval: (order) => {
        if (stopPolling) return 0;

        return order?.status === "pending" ? POLLING_INTERVAL : 0;
      },
    },
  );

  useEffect(() => {
    if (!token) return;

    const timer = setTimeout(() => {
      setStopPolling(true);
    }, POLLING_TIMEOUT);

    return () => clearTimeout(timer);
  }, [token]);

  return {
    order: data,
    isLoading,
    error,
    mutate,
    stopPolling,
  };
};
