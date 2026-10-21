// product.js
import client from "@/lib/api/client";
// 詳細
import type { ProductDetail } from "@/types/product";

export const getProduct = async (
  gender: string,
  designer: string,
  styleCode: string,
): Promise<ProductDetail> => {
  const res = await client.get(`/${gender}/p/${designer}/${styleCode}`);
  return res.data;
};
