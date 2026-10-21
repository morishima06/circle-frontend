// features/admin/auth/hooks/useAdminSession.ts

import useSWR from "swr";

import { getCurrentAdmin } from "@/api/admin/auth/session";

export const useAdminSession = () => {
  const {
    data: currentAdmin,
    error,
    isLoading,
    mutate,
  } = useSWR("/current_admin", () => getCurrentAdmin().then((res) => res.data));

  return {
    currentAdmin,
    isLoading,
    error,
    mutate,
  };
};
