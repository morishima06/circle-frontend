import useSWR from "swr";

import { getDashboardSummary } from "@/api/admin/dashboard ";

export const useDashboardSummary = () => {
  const { data, error, isLoading } = useSWR(
    "/admin/dashboard",
    getDashboardSummary,
  );

  return {
    summary: data,
    error,
    isLoading,
  };
};
