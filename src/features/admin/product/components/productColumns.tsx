import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";

import { Checkbox } from "@/components/ui/Checkbox";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Product } from "@/types/admin/product";
import { PUBLISH_STATUS_BADGE } from "@/utils/badge";

export const productColumns: ColumnDef<Product>[] = [
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
    accessorKey: "imageUrl",
    header: "画像",
    cell: ({ row }) =>
      row.original.imageUrl ? (
        <div className="flex h-16 w-16 items-center overflow-hidden rounded-sm bg-gray-100">
          <Image
            src={row.original.imageUrl}
            alt={row.original.name}
            width={56}
            height={56}
            unoptimized
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="h-16 w-16 rounded-sm bg-gray-100 object-cover" />
      ),
  },
  {
    accessorKey: "styleCode",
    header: "商品コード",
    cell: ({ row }) => (
      <Link
        href={`/admin/products/${row.original.id}/edit`}
        className="font-medium text-blue-600 hover:underline"
      >
        {row.original.styleCode}
      </Link>
    ),
  },
  {
    accessorKey: "designer",
    header: "デザイナー",
  },
  {
    accessorKey: "name",
    header: "商品名",
    cell: ({ row }) => (
      <Link
        href={`/admin/products/${row.original.id}/edit`}
        className="hover:underline"
      >
        {row.original.name}
      </Link>
    ),
  },
  {
    accessorKey: "price",
    header: "価格",
    cell: ({ row }) => `¥${row.original.price.toLocaleString()}`,
  },
  {
    accessorKey: "createdAt",
    header: "作成日",
    cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleDateString("ja-JP"),
  },
  {
    accessorKey: "status",
    header: "公開状態",
    cell: ({ row }) => (
      <StatusBadge status={row.original.status} config={PUBLISH_STATUS_BADGE} />
    ),
  },
];
