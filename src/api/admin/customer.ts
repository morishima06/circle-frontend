import type { CustomerParams,CustomerResponse } from "@//types/admin/customer";
import client from "@/lib/api/client";

// 顧客一覧取得
export const getCustomers = async (
  params?: CustomerParams,
): Promise<CustomerResponse> => {
  const res = await client.get("/admin/customers", {
    params,
  });

  return res.data;
};
