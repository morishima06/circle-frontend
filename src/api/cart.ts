import client from "@/lib/api/client";
import type { Cart } from "@/types/cart";
import type { CartItemCount } from "@/types/cart";

// カート取得
export const getCart = async (): Promise<Cart> => {
  const res = await client.get("/cart");
  return res.data;
};

export const getCartItemCount = async (): Promise<CartItemCount> => {
  const res = await client.get("/cart_item_count");
  return res.data;
};
