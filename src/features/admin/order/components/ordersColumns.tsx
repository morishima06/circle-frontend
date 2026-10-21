import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { Checkbox } from "@/components/ui/Checkbox";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Order } from "@/types/admin/order";
import {
  ORDER_STATUS_BADGE,
  PAYMENT_METHOD_BADGE,
  PAYMENT_STATUS_BADGE,
  SHIPMENT_STATUS_BADGE,
} from "@/utils/badge";
import { formatDate } from "@/utils/date";

export const orderColumns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="border-gray-300 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600"
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="border-gray-300 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
  },
  {
    accessorKey: "number",
    header: "注文番号",
    cell: ({ row }) => (
      <Link
        href={`/admin/orders/${row.original.id}`}
        className="font-medium text-blue-600 hover:underline"
      >
        #{row.original.number}
      </Link>
    ),
  },
  {
    accessorKey: "orderedAt",
    header: "注文日時",
    cell: ({ row }) => formatDate(row.original.orderedAt),
  },
  {
    accessorKey: "name",
    header: "顧客",
  },
  {
    accessorKey: "orderStatus",
    header: "注文状況",
    cell: ({ row }) => (
      <StatusBadge status={row.original.status} config={ORDER_STATUS_BADGE} />
    ),
  },
  {
    accessorKey: "paymentMethod",
    header: "決済方法",
    cell: ({ row }) => (
      <StatusBadge
        status={row.original.paymentMethod}
        config={PAYMENT_METHOD_BADGE}
      />
    ),
  },
  {
    accessorKey: "paymentStatus",
    header: "決済状況",
    cell: ({ row }) => (
      <StatusBadge
        status={row.original.paymentStatus}
        config={PAYMENT_STATUS_BADGE}
      />
    ),
  },
  {
    accessorKey: "total",
    header: "金額",
    cell: ({ row }) => `¥${row.original.total.toLocaleString()}`,
  },
  {
    accessorKey: "shipmentStatus",
    header: "配送状況",
    cell: ({ row }) => (
      <StatusBadge
        status={row.original.shipmentStatus}
        config={SHIPMENT_STATUS_BADGE}
      />
    ),
  },
];
