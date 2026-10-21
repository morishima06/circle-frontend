// pages/admin/shipments/index.tsx

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { ReactNode, useMemo } from "react";

import { AdminLayout } from "@/components/layout/admin/AdminLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

type Shipment = {
  id: number;
  shipmentNumber: string;
  orderNumber: string;
  customerName: string;
  shippingCompany: "yamato" | "sagawa" | "japan_post";
  trackingNumber: string | null;
  status: "pending" | "preparing" | "shipped";
  shippedAt: string | null;
};

const shipments: Shipment[] = [
  {
    id: 1,
    shipmentNumber: "S20260520001",
    orderNumber: "20260520001",
    customerName: "山田太郎",
    shippingCompany: "yamato",
    trackingNumber: null,
    status: "pending",
    shippedAt: null,
  },
  {
    id: 2,
    shipmentNumber: "S20260520002",
    orderNumber: "20260520002",
    customerName: "佐藤花子",
    shippingCompany: "sagawa",
    trackingNumber: "1234-5678-9999",
    status: "shipped",
    shippedAt: "2026-05-20 15:30",
  },
  {
    id: 3,
    shipmentNumber: "S20260520003",
    orderNumber: "20260520003",
    customerName: "ゲスト注文",
    shippingCompany: "yamato",
    trackingNumber: null,
    status: "preparing",
    shippedAt: null,
  },
];

const ShippingCompanyBadge = ({
  company,
}: {
  company: Shipment["shippingCompany"];
}) => {
  const labels = {
    yamato: "ヤマト",
    sagawa: "佐川",
    japan_post: "日本郵便",
  };

  return (
    <span className="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
      {labels[company]}
    </span>
  );
};

const ShipmentStatusBadge = ({ status }: { status: Shipment["status"] }) => {
  const styles = {
    pending: "bg-gray-100 text-gray-700",
    preparing: "bg-blue-100 text-blue-700",
    shipped: "bg-green-100 text-green-700",
  };

  const labels = {
    pending: "未発送",
    preparing: "発送準備中",
    shipped: "発送済",
  };

  return (
    <span
      className={`rounded px-2 py-1 text-xs font-medium ${styles[status]} `}
    >
      {labels[status]}
    </span>
  );
};

const AdminShipmentsPage = () => {
  const columns = useMemo<ColumnDef<Shipment>[]>(
    () => [
      {
        accessorKey: "shipmentNumber",
        header: "発送番号",
        cell: ({ row }) => {
          return (
            <Link
              href={`/admin/shipments/${row.original.id}`}
              className="font-medium text-blue-600 hover:underline"
            >
              #{row.original.shipmentNumber}
            </Link>
          );
        },
      },

      {
        accessorKey: "orderNumber",
        header: "注文番号",
        cell: ({ row }) => {
          return (
            <Link
              href={`/admin/orders/${row.original.id}`}
              className="text-slate-700 hover:underline"
            >
              #{row.original.orderNumber}
            </Link>
          );
        },
      },

      {
        accessorKey: "customerName",
        header: "顧客",
      },

      {
        accessorKey: "shippingCompany",
        header: "配送会社",
        cell: ({ row }) => {
          return (
            <ShippingCompanyBadge company={row.original.shippingCompany} />
          );
        },
      },

      {
        accessorKey: "trackingNumber",
        header: "追跡番号",
        cell: ({ row }) => {
          return row.original.trackingNumber ?? "-";
        },
      },

      {
        accessorKey: "status",
        header: "発送状態",
        cell: ({ row }) => {
          return <ShipmentStatusBadge status={row.original.status} />;
        },
      },

      {
        accessorKey: "shippedAt",
        header: "発送日時",
        cell: ({ row }) => {
          return row.original.shippedAt ?? "-";
        },
      },
    ],
    [],
  );

  const table = useReactTable({
    data: shipments,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      {/* header */}
      <header className="border-b bg-white px-8 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">配送管理</h1>

          <div className="flex gap-3">
            <button className="rounded-md border bg-white px-4 py-2 text-sm transition hover:bg-slate-50">
              CSV取込
            </button>

            <button className="rounded-md bg-slate-800 px-4 py-2 text-sm text-white transition hover:bg-slate-700">
              伝票CSV出力
            </button>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* search */}
        <div className="mb-6 rounded-lg border bg-white p-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <input
              type="text"
              placeholder="発送番号・注文番号検索"
              className="rounded-md border px-3 py-2 text-sm"
            />

            <select className="rounded-md border px-3 py-2 text-sm">
              <option>配送会社</option>
            </select>

            <select className="rounded-md border px-3 py-2 text-sm">
              <option>発送状態</option>
            </select>

            <button className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500">
              検索
            </button>
          </div>
        </div>

        {/* table */}
        <div className="overflow-hidden rounded-lg border bg-white">
          <Table>
            <TableHeader className="bg-slate-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="h-12 px-4 text-xs font-bold text-gray-600"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-slate-50">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-4 text-sm">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

AdminShipmentsPage.getLayout = (page: ReactNode) => (
  <AdminLayout>{page}</AdminLayout>
);

export default AdminShipmentsPage;
