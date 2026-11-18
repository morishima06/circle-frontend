import client from "@/lib/api/client";
import type {
  DashboardChart,
  DashboardSummary,
  OrderStatusCounts,
  Period,
  SalesChartParams,
  SalesPoint,
  SalesSummary,
} from "@/types/admin/dashboard";

// ダッシュボードのサマリー・注文数
export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  const res = await client.get<DashboardSummary>("/api/v1/admin/dashboard");

  return res.data;
};

// ダッシュボードの売上グラフ
export const getDashboardChart = async (
  period: Period,
): Promise<DashboardChart> => {
  const res = await client.get<DashboardChart>(
    "/api/v1/admin/dashboard/chart",
    {
      params: { period },
    },
  );

  return res.data;
};

// 売上サマリー（今月 / 今日 / 昨日）
export const getSalesSummary = async (): Promise<SalesSummary> => {
  const res = await client.get<SalesSummary>(
    "/api/v1/admin/dashboard/sales/summary",
  );

  return res.data;
};

// 売上グラフデータ（週間 / 月間 / 年間）
export const getSalesChart = async (
  params: SalesChartParams,
): Promise<SalesPoint[]> => {
  const res = await client.get<SalesPoint[]>(
    "/api/v1/admin/dashboard/sales/chart",
    {
      params,
    },
  );

  return res.data;
};

// 注文ステータス別件数
export const getDashboardOrderCounts = async (): Promise<OrderStatusCounts> => {
  const res = await client.get<OrderStatusCounts>(
    "/api/v1/admin/orders/counts",
  );

  return res.data;
};
