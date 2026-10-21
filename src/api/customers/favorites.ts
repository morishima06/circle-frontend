import client from "@/lib/api/client";
import type { Favorite } from "@/types/customer/favorite";
// 一覧
export const getFavorites = async (): Promise<Favorite[]> => {
  const res = await client.get("/customers/favorites");
  return res.data;
};

// 作成
export const createFavorite = async (productId: number) => {
  console.log(productId);
  const res = await client.post("/customers/favorites", {
    productId,
  });
  return res.data;
};

// 削除
export const deleteFavorite = async (productId: number) => {
  const res = await client.delete(`/customers/favorites/${productId}`);
  return res.data;
};

// お気に入りID一覧
export const getFavoriteIds = async (): Promise<number[]> => {
  const res = await client.get("/customers/favorites/ids");
  return res.data.favoriteIds;
};
