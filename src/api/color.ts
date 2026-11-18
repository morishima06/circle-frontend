import client from "@/lib/api/client";

export const fetchColors = async () => {
  const res = await client.get("/api/v1/colors");
  return res.data;
};
