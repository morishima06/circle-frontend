// features/customer/favorites/hooks/useFavoriteIds.ts

import useSWR from "swr";

import { getFavoriteIds } from "@/api/favorites";

export const useFavoriteIds = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/favorites/ids",
    getFavoriteIds,
  );

  console.log(data);

  return {
    favoriteIds: data ?? [],
    isLoading,
    error,
    mutate,
  };
};
