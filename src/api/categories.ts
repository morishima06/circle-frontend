import client from "@/lib/api/client";

// 一覧
export const fetchCategoriesTree = () => {
  return client.get("/categories/tree");
};
