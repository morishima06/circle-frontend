import client from "@/lib/api/client";
import type { Category } from "@/types/admin/category";

export const getCategoriesTree = async (): Promise<Category[]> => {
  const res = await client.get("/api/v1admin/categories/tree");

  return res.data;
};
