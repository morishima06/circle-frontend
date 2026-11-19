import client from "@/lib/api/client";
import type { Collection } from "@/types/collection";

export const getCollection = async (
  collectionPath: string,
): Promise<Collection> => {
  const response = await client.get<Collection>(`/api/v1/${collectionPath}`);

  return response.data;
};
