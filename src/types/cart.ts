// src/types/cart.ts

export type Cart = {
  id: number;
  itemCount: number;
  subtotal: number;
  shippingFee: number;
  total: number;
  currency: string;
  items: CartItem[];
};

export type CartItem = {
  id: number;
  quantity: number;
  color: {
    name: string;
  };
  product: {
    name: string;
    gender: string;
    imageUrl: string | null;
    styleCode: string;
    styleCodeSlug: string;
    designer: {
      name: string;
      slug: string;
    };
  };
  sku: {
    id: number;
    size: string;
    availableStock: number;
  };
  price: {
    originalPrice: number;
    unitPrice: number;
    lineTotal: number;
  };
};

export type CartItemCount = {
  itemCount: number;
};
