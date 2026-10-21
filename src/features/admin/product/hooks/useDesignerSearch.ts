import useSWR from "swr";

import { searchDesigners } from "@/api/admin/designer";

export const useDesignerSearch = (query: string) => {
  const { data: designers = [], isLoading: loading } = useSWR(
    query ? `/admin/designers/search?q=${query}` : null,
    () => searchDesigners(query),
  );

  return {
    designers,
    loading,
  };
};
