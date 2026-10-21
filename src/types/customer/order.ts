import { ORDER_STATUS_LABELS } from "@/features/customers/orders/constants";

export type OrderStatus = keyof typeof ORDER_STATUS_LABELS;

export type Order = {
  id: number;
  number: string;
  status: OrderStatus;
  orderedAt: string;
  itemsCount: number;
  subtotal: number;
  total: number;
  imageUrl: string | null;
};

export type OrderDetail = {
  id: number;
  email: string;
  selectedAddressId: number | null;
  status: OrderStatus;
  number: string;
  customerType: string;
  guestToken: string | null;

  shipping: {
    lastName: string;
    firstName: string;
    postalCode: string;
    prefecture: string;
    city: string;
    addressLine1: string;
    addressLine2: string | null;
    phoneNumber: string;
  };

  items: {
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
  }[];

  subtotal: number;
  shippingFee: number;
  total: number;
};
