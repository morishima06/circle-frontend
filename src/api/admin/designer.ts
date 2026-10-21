// /features/designers/api/fetchDesigners.ts
import client from "@/lib/api/client";
import type { Designer } from "@/types/admin/designer";

export const searchDesigners = async (query: string): Promise<Designer[]> => {
  const { data } = await client.get("/admin/designers/search", {
    params: { q: query },
  });

  return data;
};

export const getDesigners = async () => {
  const res = await client.get("admin/designers");
  return res.data;
};
