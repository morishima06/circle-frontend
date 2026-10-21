export type ProductImage = {
  id: number;
  url: string;
};

export type ProductFormImage = {
  id?: number;
  signedId?: string;
  url: string;
};

export type Product = {
  id: number;
  name: string;
  imageUrl: string;
  styleCode: string;
  price: number;
  stock: number;
  status: "published" | "draft" | "archived";
  registeredAt: string;
  createdAt: string;
};

export type ProductParams = {
  keyword?: string;
  page?: number;
  perPage?: number;
};

export type ProductPagination = {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  perPage: number;
};

export type ProductResponse = {
  products: Product[];
  pagination: ProductPagination;
};

export type ProductDetail = {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  designerId: number;
  designerName: string;
  colorId: number;
  price: number;
  salePrice: number | null;
  status: string;

  images: ProductImage[];

  skus: {
    id: number;
    sizeId: number;
    stock: number;
  }[];

  specs: {
    id: number;
    key: string;
    value: string;
  }[];

  onSale: boolean;
  saleStartAt: string | null;
  saleEndAt: string | null;
};
