import client from "@/lib/api/client";
import type { Category } from "@/types/admin/category";

export const getCategoriesTree = async (): Promise<Category[]> => {
  const res = await client.get("admin/categories/tree");

  return res.data;
};
