import useSWR from "swr";

import { fetchCategorySizes } from "@/api/admin/sizes";

export const useCategorySizes = (categoryId?: number | null) => {
  const { data } = useSWR(
    categoryId ? ["category-sizes", categoryId] : null,
    ([, id]) => fetchCategorySizes(id),
  );

  return {
    sizes: data ?? [],
  };
};
