// api/admin/product.ts
import client from "@/lib/api/client";
import type { ProductParams, ProductResponse } from "@/types/admin/product";

export const getProducts = async (
  params?: ProductParams,
): Promise<ProductResponse> => {
  const res = await client.get("/admin/products", {
    params,
  });

  return res.data;
};
