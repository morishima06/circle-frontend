// import client from '@/lib/api/client';

// // ────────────────────────────────────────────
// // 型定義
// // ────────────────────────────────────────────

// export type SalesSummary = {
//   thisMonth: { amount: number; count: number };
//   today:     { amount: number; count: number };
//   yesterday: { amount: number; count: number };
// };

// export type SalesChartPoint = {
//   label: string;   // 日付 or 月ラベル
//   amount: number;  // 売上金額
// };

// export type SalesChartParams = {
//   period: 'weekly' | 'monthly' | 'yearly';
// };

// export type OrderStatusCounts = {
//   newOrder:   number; // 新規受付
//   paid:       number; // 入金済み
//   inProgress: number; // 対応中
// };

// // ────────────────────────────────────────────
// // API関数
// // ────────────────────────────────────────────

// /** 売上サマリー（今月 / 今日 / 昨日）を取得 */
// export const getSalesSummary = async (): Promise<SalesSummary> => {
//   const res = await client.get('/admin/dashboard/sales/summary');
//   return res.data;
// };

// /** 売上グラフデータを取得（週間 / 月間 / 年間） */
// export const getSalesChart = async (params: SalesChartParams): Promise<SalesChartPoint[]> => {
//   const res = await client.get('/admin/dashboard/sales/chart', { params });
//   return res.data;
// };

// /** 注文ステータス別件数を取得 */
// export const getDashboardOrderCounts = async (): Promise<OrderStatusCounts> => {
//   const res = await client.get('/admin/orders/counts');
//   return res.data;
// };
