// product.js
import client from "@/lib/api/client";
// 詳細
import type { ProductResponse } from "@/types/product";

export const getProduct = async (
  gender: string,
  designer: string,
  styleCode: string,
): Promise<ProductResponse> => {
  const res = await client.get(`/${gender}/p/${designer}/${styleCode}`);
  console.log(res);
  return res.data;
};
