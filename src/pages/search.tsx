import Link from "next/link";
import { useRouter } from "next/router";
import type { GetServerSideProps } from "next";
import type { ReactNode } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

import { searchProducts } from "@/api/search";
import type { SearchProduct } from "@/types/search";
import { StoreLayout } from "@/components/layout/store/StoreLayout";
import { EmptySearchResults } from "@/features/search/EmptySearchResul";

type SearchPageProps = {
  products: SearchProduct[];
  q: string;
  sort: "" | "price_asc" | "price_desc";
};

/**
 * 商品詳細ページのURLを生成する
 */
const getProductUrl = (product: SearchProduct) =>
  `/${product.gender}/p/${product.designer.slug}/${product.styleCodeSlug}`;

export default function SearchPage({ products, q, sort }: SearchPageProps) {
  const router = useRouter();

  /**
   * 価格の並び替え
   */
  const handleSortChange = (value: string) => {
    if (value !== "price_asc" && value !== "price_desc") {
      return;
    }

    void router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          sort: value,
        },
      },
      undefined,
      { scroll: false },
    );
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-12 py-8">
      {products.length === 0 ? (
        <EmptySearchResults q={q} />
      ) : (
        <>
          <div className="flex justify-between">
            <h1 className="mb-8 text-lg font-medium">検索結果：{q}</h1>

            <Select value={sort || undefined} onValueChange={handleSortChange}>
              <SelectTrigger className="w-40 rounded-none border-gray-300 px-3 py-5 text-black data-[placeholder]:text-black">
                <SelectValue placeholder="並び替え" />
              </SelectTrigger>

              <SelectContent position="popper" className="w-40 rounded-none">
                <SelectItem className="rounded-none" value="price_asc">
                  価格の安い順
                </SelectItem>

                <SelectItem className="rounded-none" value="price_desc">
                  価格の高い順
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
            {products.map((product) => {
              const productUrl = getProductUrl(product);
              const displayPrice = product.salePrice ?? product.price;

              return (
                <li key={product.id}>
                  {/* 商品画像 */}
                  <Link href={productUrl} className="block">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="aspect-[4/5] w-full object-cover"
                      />
                    ) : (
                      <div className="flex aspect-[4/5] w-full items-center justify-center bg-gray-100 text-sm text-gray-500">
                        画像なし
                      </div>
                    )}
                  </Link>

                  {/* デザイナー名 */}
                  <p className="mt-3 text-sm text-gray-500">
                    <Link
                      href={`/designers/${product.designer.slug}`}
                      className="hover:underline"
                    >
                      {product.designer.name}
                    </Link>
                  </p>

                  {/* 商品名 */}
                  <h2 className="mt-1 text-sm">
                    <Link href={productUrl} className="hover:underline">
                      {product.name}
                    </Link>
                  </h2>

                  {/* 価格 */}
                  <p className="mt-2 font-medium">
                    {displayPrice.toLocaleString()}円
                  </p>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </main>
  );
}

SearchPage.getLayout = (page: ReactNode) => <StoreLayout>{page}</StoreLayout>;

/**
 * サーバー側で検索結果を取得する
 */
export const getServerSideProps: GetServerSideProps<SearchPageProps> = async ({
  query,
}) => {
  const q = typeof query.q === "string" ? query.q.trim() : "";

  const sort =
    query.sort === "price_asc" || query.sort === "price_desc" ? query.sort : "";

  let products: SearchProduct[] = [];

  if (q) {
    try {
      products = await searchProducts({
        q,
        sort: sort || undefined,
      });
    } catch (error) {
      console.error("商品検索に失敗しました", error);
    }
  }

  return {
    props: {
      products,
      q,
      sort,
    },
  };
};
