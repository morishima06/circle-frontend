import client from "@/lib/api/client";

// お気に入りID一覧
export const getFavoriteIds = async (): Promise<number[]> => {
  const res = await client.get("/favorites/ids");
  return res.data.favoriteIds;
};
