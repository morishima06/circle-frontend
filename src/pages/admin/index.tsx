import { useState } from "react";
import { ReactNode } from "react";

import { AdminLayout } from "@/components/layout/admin/AdminLayout";
import { OrderTaskCard } from "@/features/admin/dashboard/componets/OrderTaskCard";
import { SalesStatusCard } from "@/features/admin/dashboard/componets/SalesStatusCard";
import { useDashboardChart } from "@/features/admin/dashboard/hooks/useDashboardChart";
import { useDashboardSummary } from "@/features/admin/dashboard/hooks/useDashboardSummary";
import type { Period } from "@/types/admin/dashboard";

const DashboardPage = () => {
  const [period, setPeriod] = useState<Period>("weekly");
  const { summary } = useDashboardSummary();
  const { chart } = useDashboardChart(period);

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <div className="mx-auto max-w-screen-xl px-6 py-8">
        <div className="mb-10">
          <h1 className="text-2xl font-bold tracking-tight">ダッシュボード</h1>
        </div>
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[280px_1fr]">
          <div className="space-y-6">
            <OrderTaskCard orderTasks={summary?.orderTasks} />
          </div>

          <SalesStatusCard
            summary={summary?.salesSummary}
            period={period}
            chart={chart}
            setPeriod={setPeriod}
          />
        </div>
      </div>
    </div>
  );
};
DashboardPage.getLayout = (page: ReactNode) => (
  <AdminLayout>{page}</AdminLayout>
);

export default DashboardPage;
