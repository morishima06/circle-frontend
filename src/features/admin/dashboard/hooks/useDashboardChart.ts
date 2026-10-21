import useSWR from "swr";

import { getDashboardChart } from "@/api/admin/dashboard ";

type Period = "weekly" | "monthly" | "yearly";

export const useDashboardChart = (period: Period) => {
  const { data, error, isLoading } = useSWR(
    ["/admin/dashboard/chart", period],
    () => getDashboardChart(period),
  );
  console.log(data);

  return {
    chart: data,
    error,
    isLoading,
  };
};
