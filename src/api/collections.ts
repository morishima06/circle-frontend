import client from "@/lib/api/client";
import type { Collection } from "@/types/collection";

export const getCollection = async (path: string): Promise<Collection> => {
  const response = await client.get<Collection>(path);

  return response.data;
};
