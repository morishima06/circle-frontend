import useSWR from "swr";

import { getCartItemCount } from "@/api/cart";

export const useCartItemCount = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/cart_item_count",
    getCartItemCount,
  );
  return { itemCount: data?.itemCount ?? 0, error, isLoading, mutate };
};
