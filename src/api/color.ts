import client from "@/lib/api/client";

export const fetchColors = async () => {
  const res = await client.get("/colors");
  return res.data;
};
