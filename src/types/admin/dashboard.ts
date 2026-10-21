export type DashboardSummary = {
  orderTasks: {
    awaitingShipment: number;
    paymentPending: number;
    onHold: number;
  };
  salesSummary: {
    thisMonth: SalesSummary;
    today: SalesSummary;
    yesterday: SalesSummary;
  };
};

export type SalesSummary = {
  amount: number;
  count: number;
};

export type SalesPoint = {
  label: string;
  amount: number;
};

export type DashboardChart = SalesPoint[];

export type Period = "weekly" | "monthly" | "yearly";

export type SalesChartParams = {
  period: Period;
};

export type OrderStatusCounts = {
  newOrder: number;
  paid: number;
  inProgress: number;
};
