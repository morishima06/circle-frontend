import useSWR from "swr";

import { getCategoriesTree } from "@/api/admin/category";

export const useCategoriesTree = () => {
  const { data, error, isLoading } = useSWR(
    "admin/categories/tree",
    getCategoriesTree,
  );

  console.log(data);
  return {
    categories: data ?? [],
    loading: isLoading,
    error,
  };
};
