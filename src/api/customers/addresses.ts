import type { AccountAddressData } from "@/features/customers/addresses/schemas/accountAddressSchema";
import client from "@/lib/api/client";
import type { Address } from "@/types/customer/address";

// 一覧
export const getAddresses = async (): Promise<Address[]> => {
  const { data } = await client.get("/customers/addresses");
  return data;
};

export const getAddress = async (id: string): Promise<Address> => {
  const { data } = await client.get(`/customers/addresses/${id}`);
  return data;
};

// 作成
export const createAddress = async (data: AccountAddressData) => {
  const res = await client.post("/customers/addresses", data);
  return res.data;
};

// 更新
export const updateAddress = async (
  addressId: string,
  data: AccountAddressData,
) => {
  await client.patch(`/customers/addresses/${addressId}`, data);
};
// 削除
export const deleteAddress = async (id: number) => {
  const res = await client.delete(`/customers/addresses/${id}`);
  return res.data;
};
