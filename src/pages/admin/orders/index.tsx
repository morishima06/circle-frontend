import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useRouter } from "next/router";
import { type ReactNode, useEffect, useState } from "react";

import { AdminLayout } from "@/components/layout/admin/AdminLayout";
import { AdminCheckboxFilter } from "@/features/admin/components/AdminCheckboxFilter";
import { AdminDataTable } from "@/features/admin/components/AdminDataTable";
import { AdminPagination } from "@/features/admin/components/AdminPagination";
import { AdminSearchForm } from "@/features/admin/components/AdminSearchForm";
import { CSVExport } from "@/features/admin/components/CSVExport";
import { PerPageSelect } from "@/features/admin/components/PerPageSelect";
import { orderColumns } from "@/features/admin/order/components/ordersColumns";
import { orderStatuses } from "@/features/admin/order/data/order";
import { useOrders } from "@/features/admin/order/hooks/useOrders";
import { buildQuery } from "@/utils/buildQuery";

const AdminOrdersPage = () => {
  const router = useRouter();

  const keyword = (router.query.keyword as string) ?? "";
  const orderStatus = (router.query.order_status as string) ?? "";
  const page = Number(router.query.page ?? 1);
  const perPage = Number(router.query.per_page ?? 10);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedOrderStatuses, setSelectedOrderStatuses] = useState<string[]>(
    [],
  );

  const { orders, pagination, isLoading, error } = useOrders({
    keyword,
    orderStatus,
    page,
    perPage,
  });

  // URLの検索条件をフォームへ反映する
  useEffect(() => {
    if (!router.isReady) return;

    setSearchKeyword(keyword);

    setSelectedOrderStatuses(
      orderStatus
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean),
    );
  }, [router.isReady, keyword, orderStatus]);

  const handleSearch = () => {
    const query = buildQuery({
      page: "1",
      per_page: String(perPage),
      keyword: searchKeyword,
      order_status: selectedOrderStatuses,
    });

    router.push({
      pathname: "/admin/orders",
      query,
    });
  };

  const table = useReactTable({
    data: orders,
    columns: orderColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (error) {
    return (
      <p className="mb-4 text-sm text-red-500">
        注文データの取得に失敗しました
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <div className="mx-auto max-w-screen-xl px-6 py-8">
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">注文管理</h1>

          <div className="flex gap-2">
            <CSVExport type="orders" selectedRecords={[]} allRecords={orders} />
          </div>
        </div>

        <AdminSearchForm
          keyword={searchKeyword}
          keywordLabel="注文番号・顧客名"
          keywordPlaceholder="注文番号・お名前・会社名・メールアドレスで検索"
          onChangeKeyword={setSearchKeyword}
          onSubmit={handleSearch}
        >
          <AdminCheckboxFilter
            label="注文状況"
            options={orderStatuses}
            selectedValues={selectedOrderStatuses}
            onChange={setSelectedOrderStatuses}
          />
        </AdminSearchForm>

        <div className="mb-4 flex justify-between pt-6">
          <AdminPagination
            currentPage={page}
            totalPages={pagination?.totalPages ?? 1}
            totalCount={pagination?.totalCount ?? 0}
            perPage={perPage}
            onPageChange={(nextPage) =>
              router.push({
                pathname: "/admin/orders",
                query: {
                  ...router.query,
                  page: nextPage,
                },
              })
            }
          />

          <div className="flex items-center gap-1">
            <PerPageSelect
              perPage={perPage}
              onChangePerPage={(value) =>
                router.push({
                  pathname: "/admin/orders",
                  query: {
                    ...router.query,
                    page: 1,
                    per_page: value,
                  },
                })
              }
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border bg-white">
          <AdminDataTable
            table={table}
            columnsCount={orderColumns.length}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

AdminOrdersPage.getLayout = (page: ReactNode) => (
  <AdminLayout>{page}</AdminLayout>
);

export default AdminOrdersPage;
