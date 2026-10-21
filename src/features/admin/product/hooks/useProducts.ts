import useSWR from "swr";

import { getProducts } from "@/api/admin/product";

type ProductParams = {
  keyword?: string;
  page?: number;
  perPage?: number;
};

export const useProducts = (params: ProductParams) => {
  const { data, isLoading, error } = useSWR(
    ["/admin/products", params],
    ([, p]) => getProducts(p),
  );

  return {
    products: data?.products ?? [],
    pagination: data?.pagination,
    isLoading,
    error,
  };
};
