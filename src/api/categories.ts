import client from "@/lib/api/client";

// 一覧
export const fetchCategoriesTree = () => {
  return client.get("/api/v1/categories/tree");
};
