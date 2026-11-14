export type ProductDetail = {
  id: number;
  name: string;
  price: number;
  salePrice: number | null;
  description: string;
  specs: Spec[];
  color: string;
  styleCode: string;
  styleCode_slug: string;
  designer: Designer | null;
  category: Category | null;
  skus: Sku[];
  images: string[];
};

export type ProductResponse = {
  product: ProductDetail;
};

export type Spec = {
  id: number;
  key: string;
  value: string;
};

export type Designer = {
  id: number;
  name: string;
  slug: string;
};

export type Category = {
  id: number;
  name: string;
};

export type Sku = {
  id: number;
  availableStock: number;
  size: string;
};

export type Product = {
  id: number;
  name: string;
  imageUrl: string | null;
  originalPrice: number;
  salePrice: number | null;
  url: string;
  designer: {
    id: number;
    name: string;
    slug: string;
  };
};

export type Color = {
  id: number;
  name: string;
};

export type Pagination = {
  currentPage: number;
  totalPages: number;
};
