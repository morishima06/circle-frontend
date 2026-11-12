export type SearchProduct = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  salePrice: number | null;
  imageUrl: string | null;
  gender: string;
  designer: {
    name: string;
    slug: string;
  };
  styleCodeSlug: string;
};

export type SearchProductsParams = {
  q: string;
  sort?: "price_asc" | "price_desc";
};
