import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Separator } from "@/components/ui/Separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import type {
  DashboardChart,
  DashboardSummary,
  Period,
} from "@/types/admin/dashboard";

type SalesStatusCardProps = {
  summary?: DashboardSummary["salesSummary"];
  chart?: DashboardChart;
  period: Period;
  setPeriod: (period: Period) => void;
};

type TooltipProps = {
  active?: boolean;
  payload?: {
    value: number;
  }[];
  label?: string;
};

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="text-xs">
      <p>{label}</p>
      <p>¥{payload[0].value.toLocaleString()}</p>
    </div>
  );
};

export const SalesStatusCard = ({
  summary,
  chart,
  period,
  setPeriod,
}: SalesStatusCardProps) => {
  const summaryItems = [
    {
      amount: summary?.today?.amount,
      count: summary?.today?.count,
      label: "今日の売上金額 / 売上件数",
    },
    {
      amount: summary?.yesterday?.amount,
      count: summary?.yesterday?.count,
      label: "昨日の売上金額 / 売上件数",
    },
    {
      amount: summary?.thisMonth?.amount,
      count: summary?.thisMonth?.count,
      label: "今月の売上金額 / 売上件数",
    },
  ];
  const tabLabels: {
    value: Period;
    label: string;
  }[] = [
    {
      value: "weekly",
      label: "週間",
    },
    {
      value: "monthly",
      label: "月間",
    },
    {
      value: "yearly",
      label: "年間",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>売上状況</CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="flex flex-1 flex-col space-y-6 pt-4 pb-0">
        {/* 売上サマリー */}
        <div className="divide-border grid grid-cols-3 divide-x">
          {summaryItems.map(({ amount, count, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 px-4 first:pl-0 last:pr-0"
            >
              <p className="text-foreground text-xl font-bold tracking-tight">
                {amount !== undefined ? `¥${amount.toLocaleString()}` : "-"}

                <span className="text-muted-foreground text-base font-semibold">
                  {count !== undefined ? ` / ${count}件` : " / -"}
                </span>
              </p>

              <p className="text-muted-foreground text-center text-[11px] leading-tight">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* 期間タブ */}
        <div className="flex justify-center">
          <Tabs
            value={period}
            onValueChange={(value) => {
              setPeriod(value as Period);
            }}
          >
            <TabsList className="h-8">
              {tabLabels.map(({ value, label }) => (
                <TabsTrigger key={value} value={value} className="px-4 text-xs">
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div></div>

        {/* グラフ */}
        <div className="flex-1 pb-4">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={chart ?? []}
              margin={{
                top: 8,
                right: 8,
                left: 0,
                bottom: 0,
              }}
              barSize={period === "weekly" ? 28 : 18}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--border))"
              />

              <XAxis
                dataKey="label"
                tick={{
                  fontSize: 10,
                  fill: "hsl(var(--muted-foreground))",
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fontSize: 10,
                  fill: "hsl(var(--muted-foreground))",
                }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value: number) =>
                  value === 0 ? "¥0" : `¥${(value / 1000).toFixed(0)}k`
                }
                width={44}
              />

              <Tooltip content={<CustomTooltip />} cursor={false} />

              <Bar
                dataKey="amount"
                fill="hsl(221.2 83.2% 53.3%)"
                radius={[3, 3, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
