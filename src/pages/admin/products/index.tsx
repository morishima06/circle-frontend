import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import Link from "next/link";
import { useRouter } from "next/router";
import { type ReactNode, useEffect, useState } from "react";

import { AdminLayout } from "@/components/layout/admin/AdminLayout";
import { Button } from "@/components/ui/Button";
import { AdminDataTable } from "@/features/admin/components/AdminDataTable";
import { AdminPagination } from "@/features/admin/components/AdminPagination";
import { AdminSearchForm } from "@/features/admin/components/AdminSearchForm";
import { PerPageSelect } from "@/features/admin/components/PerPageSelect";
import { productColumns } from "@/features/admin/product/components/productColumns";
import { useProducts } from "@/features/admin/product/hooks/useProducts";
import { buildQuery } from "@/utils/buildQuery";

const AdminProductsPage = () => {
  const router = useRouter();
  const keyword = (router.query.keyword as string) ?? "";
  const page = Number(router.query.page ?? 1);
  const perPage = Number(router.query.per_page ?? 10);

  const [searchKeyword, setSearchKeyword] = useState("");
  const { products, pagination, isLoading, error } = useProducts({
    keyword,
    page,
    perPage,
  });

  // URLの検索条件をフォームへ反映する
  useEffect(() => {
    if (!router.isReady) return;

    setSearchKeyword(keyword);
  }, [router.isReady, keyword]);

  // 検索処理
  const handleSearch = () => {
    const query = buildQuery({
      page: "1",
      per_page: String(perPage),
      keyword: searchKeyword,
    });

    router.push({
      pathname: "/admin/products",
      query,
    });
  };

  const table = useReactTable({
    data: products,
    columns: productColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (error) {
    return (
      <p className="mb-4 text-sm text-red-500">データの取得に失敗しました</p>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <div className="mx-auto max-w-screen-xl px-6 py-8">
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">商品管理</h1>

          <div className="flex gap-2">
            <Button
              className="rounded-md bg-slate-800 p-3.5 text-sm text-white transition hover:bg-slate-700"
              variant="outline"
              size="sm"
              asChild
            >
              <Link href="/admin/products/new">新規出品</Link>
            </Button>
          </div>
        </div>

        <AdminSearchForm
          keyword={searchKeyword}
          keywordLabel="商品コード・商品名"
          keywordPlaceholder="商品コード・商品名で検索"
          onChangeKeyword={setSearchKeyword}
          onSubmit={handleSearch}
        />

        <div className="mb-4 flex justify-between pt-6">
          <AdminPagination
            currentPage={page}
            totalPages={pagination?.totalPages ?? 1}
            totalCount={pagination?.totalCount ?? 0}
            perPage={perPage}
            onPageChange={(nextPage) =>
              router.push({
                pathname: "/admin/products",
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
                  pathname: "/admin/products",
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
            columnsCount={productColumns.length}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

AdminProductsPage.getLayout = (page: ReactNode) => (
  <AdminLayout>{page}</AdminLayout>
);

export default AdminProductsPage;
