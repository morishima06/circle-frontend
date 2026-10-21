// api/color.ts

import client from "@/lib/api/client";
import type { Color } from "@/types/admin/color";

export const getColors = async (): Promise<Color[]> => {
  const res = await client.get("/admin/colors");
  return res.data;
};
