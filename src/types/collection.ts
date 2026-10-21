export type Product = {
  id: number;
  name: string;
  originalPrice: number;
  salePrice: number | null;
  imageUrl: string | null;
  designer: Designer;
  url: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  children?: Category[];
};

export type Designer = {
  id: number;
  name: string;
  slug: string;
};

export type Color = {
  id: number;
  name: string;
  slug: string;
};

export type Collection = {
  products: Product[];
  heading: string;
  categories: Category[];
  designers: Designer[];
  colors: Color[];
  pagination: Pagination;
  error?: string;
};

export type Pagination = {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  perPage: number;
};
