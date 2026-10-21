import client from "@/lib/api/client";
import type { Designer, DesignersData } from "@/types/designer";

export const fetchDesigners = async (): Promise<DesignersData> => {
  const res = await client.get<DesignersData>("/designers");

  return res.data;
};

export const searchDesignerSuggestions = async (
  query: string,
): Promise<Designer[]> => {
  const res = await client.get<Designer[]>("/designers/suggestions", {
    params: { q: query },
  });

  return res.data;
};
