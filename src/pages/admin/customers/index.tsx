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
import { customerColumns } from "@/features/admin/customers/components/customerColumns";
import { customerStatuses } from "@/features/admin/customers/data/customer";
import { useCustomers } from "@/features/admin/customers/hooks/useCustomers";
import { buildQuery } from "@/utils/buildQuery";

const AdminCustomerPage = () => {
  const router = useRouter();

  const keyword = (router.query.keyword as string) ?? "";
  const statusParam = (router.query.status as string) ?? "";

  const status = statusParam
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  const page = Number(router.query.page ?? 1);
  const perPage = Number(router.query.per_page ?? 10);

  const [searchKeyword, setSearchKeyword] = useState(keyword);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const { customers, pagination, isLoading, error } = useCustomers({
    keyword,
    status,
    page,
    perPage,
  });

  const handleSearch = () => {
    const query = buildQuery({
      page: "1",
      per_page: String(perPage),
      keyword: searchKeyword,
      status: selectedStatuses,
    });

    router.push({
      pathname: "/admin/customers",
      query,
    });
  };

  useEffect(() => {
    if (!router.isReady) return;

    setSearchKeyword(keyword);
    setSelectedStatuses(status);
  }, [router.isReady, keyword, statusParam]);

  const table = useReactTable({
    data: customers,
    columns: customerColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (error) {
    return (
      <p className="mb-4 text-sm text-red-500">
        顧客データの取得に失敗しました
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <div className="mx-auto max-w-screen-xl px-6 py-8">
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">顧客管理</h1>

          <div className="flex gap-2">
            <CSVExport
              type="customers"
              selectedRecords={[]}
              allRecords={customers}
            />
          </div>
        </div>

        <AdminSearchForm
          keyword={searchKeyword}
          keywordLabel="氏名・メールアドレス"
          keywordPlaceholder="氏名・メールアドレスで検索"
          onChangeKeyword={setSearchKeyword}
          onSubmit={handleSearch}
        >
          <AdminCheckboxFilter
            label="ステータス"
            options={customerStatuses}
            selectedValues={selectedStatuses}
            onChange={setSelectedStatuses}
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
                pathname: "/admin/customers",
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
                  pathname: "/admin/customers",
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
            columnsCount={customerColumns.length}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

AdminCustomerPage.getLayout = (page: ReactNode) => (
  <AdminLayout>{page}</AdminLayout>
);

export default AdminCustomerPage;
