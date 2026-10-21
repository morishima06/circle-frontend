import { useState } from "react";

import { addCartItem, destroyCartItem,updateCartItem } from "@/api/cartItem";

import { useCart } from "./useCart";
import { useCartItemCount } from "./useCartItemCount";

export const useCartItemActions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingItemId, setLoadingItemId] = useState<number | null>(null);

  const { mutate: mutateCart } = useCart();
  const { mutate: mutateCartItemCount } = useCartItemCount();

  const refreshCart = () => Promise.all([mutateCart(), mutateCartItemCount()]);

  const addItem = async (skuId: number, quantity: number) => {
    setIsLoading(true);

    try {
      await addCartItem({ skuId, quantity });
      await refreshCart();
    } finally {
      setIsLoading(false);
    }
  };

  const updateItem = async (skuId: number, quantity: number) => {
    setLoadingItemId(skuId);

    try {
      await updateCartItem({ skuId, quantity });
      await refreshCart();
    } finally {
      setLoadingItemId(null);
    }
  };

  const removeItem = async (skuId: number) => {
    await destroyCartItem(skuId);
    await refreshCart();
  };

  return {
    addItem,
    updateItem,
    removeItem,
    loadingItemId,
    isLoading,
  };
};
