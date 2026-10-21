import useSWR from "swr";

import { getCart } from "@/api/cart";

export const useCart = () => {
  const { data: cart, error, isLoading, mutate } = useSWR("/cart", getCart);
  return { cart, error, isLoading, mutate };
};
