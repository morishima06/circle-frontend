import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { Checkbox } from "@/components/ui/Checkbox";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Customer } from "@/types/admin/customer";
import { CUSTOMER_STATUS_BADGE } from "@/utils/badge";
import { formatDate } from "@/utils/date";

export const customerColumns: ColumnDef<Customer>[] = [
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
    accessorKey: "name",
    header: "氏名",
    cell: ({ row }) => (
      <Link
        href={`/admin/customers/${row.original.id}`}
        className="font-medium text-blue-600 hover:underline"
      >
        {row.original.name}
      </Link>
    ),
  },
  {
    accessorKey: "email",
    header: "メールアドレス",
  },
  {
    accessorKey: "phoneNumber",
    header: "電話番号",
    cell: ({ row }) => row.original.phoneNumber || "未登録",
  },
  {
    accessorKey: "status",
    header: "ステータス",
    cell: ({ row }) => (
      <StatusBadge
        status={row.original.status}
        config={CUSTOMER_STATUS_BADGE}
      />
    ),
  },
  {
    accessorKey: "createdAt",
    header: "登録日",
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
];
