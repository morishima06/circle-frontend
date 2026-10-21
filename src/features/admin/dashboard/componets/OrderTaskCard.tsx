import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Separator } from "@/components/ui/Separator";
import type { DashboardSummary } from "@/types/admin/dashboard";

type OrderTaskCardProps = {
  orderTasks?: DashboardSummary["orderTasks"];
};

export const OrderTaskCard = ({ orderTasks }: OrderTaskCardProps) => {
  const statuses = [
    {
      label: "発送待ち",
      count: orderTasks?.awaitingShipment,
      variant: "secondary" as const,
    },
    {
      label: "入金待ち(振込)",
      count: orderTasks?.paymentPending,
      variant: "secondary" as const,
    },
    {
      label: "対応保留",
      count: orderTasks?.onHold,
      variant: "secondary" as const,
    },
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-muted-foreground text-sm font-medium tracking-wide">
          処理状況
        </CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="pt-0">
        <ul className="divide-border divide-y">
          {statuses.map(({ label, count, variant }) => (
            <li
              key={label}
              className="flex items-center justify-between px-1 py-4"
            >
              <span className="text-foreground text-sm">{label}</span>

              <Badge
                variant={variant}
                className="min-w-8 justify-center text-sm font-semibold"
              >
                {count ?? "-"}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
