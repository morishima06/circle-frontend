import client from "@/lib/api/client";

type SearchProductsParams = {
  q: string;
  sort?: "price_asc" | "price_desc";
};

export const searchProducts = async ({ q, sort }: SearchProductsParams) => {
  const res = await client.get("/search", {
    params: { q, sort },
  });

  return res.data;
};
