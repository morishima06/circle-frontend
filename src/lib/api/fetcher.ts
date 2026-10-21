import client from "./client";

export const fetcher = async (url: string) => {
  const res = await client.get(url);
  return res.data;
};
