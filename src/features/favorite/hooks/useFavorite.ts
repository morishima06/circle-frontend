import useSWR from "swr";

import { getFavorites } from "@/api/customers/favorites";

export const useFavorite = () => {
  const { data, error, isLoading, mutate } = useSWR("customers/favorites", () =>
    getFavorites(),
  );

  return {
    favorites: data || [],
    isLoading,
    error,
    mutate,
  };
};
