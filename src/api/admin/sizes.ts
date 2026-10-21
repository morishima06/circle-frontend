import client from "@/lib/api/client";

export const fetchCategorySizes = async (categoryId: number) => {
  const res = await client.get(`/admin/categories/${categoryId}/sizes`);
  return res.data;
};
