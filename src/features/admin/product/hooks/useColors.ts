import useSWR from "swr";

import { getColors } from "@/api/admin/color";

export const useColors = () => {
  const { data, error, isLoading } = useSWR("/admin/colors", getColors);

  return {
    colors: data ?? [],
    isLoading,
    error,
  };
};
