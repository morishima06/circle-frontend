// src/types/order.ts

export type Order = {
  id: number;
  email: string;
  selectedAddressId: number | null;
  status: string;
  number: string;
  customerType: string;
  guestToken: string | null;
  shipping: Shipping;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
};

export type OrderItem = {
  id: number;
  skuId: number;
  quantity: number;
  name: string;
  color: string;
  designer: string;
  size: string;
  unitPrice: number;
  originalPrice: number;
  imageUrl: string | null;
  stockStatus: StockStatus;
};

export type StockStatus = "in_stock" | "out_of_stock";

export type Shipping = {
  lastName: string;
  firstName: string;
  postalCode: string;
  prefecture: string;
  city: string;
  addressLine1: string;
  addressLine2: string | null;
  phoneNumber: string;
};

export type OrderCompleteStatus =
  "pending" | "confirmed" | "failed" | "cancelled";

export type OrderComplete = {
  status: OrderCompleteStatus;
  number: string;
  confirmedAt: string | null;
  paymentMethod: string;
};
