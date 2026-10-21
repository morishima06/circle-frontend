// features/admin/order/types/order.ts

export type OrderStatus =
  "pending" | "confirmed" | "shipped" | "on_hold" | "cancelled";

export type Order = {
  id: number;
  number: string;
  customerName: string;
  status: OrderStatus;
  paymentMethod: string;
  paymentStatus: string;
  shipmentStatus: string;

  total: number;
  orderedAt: string;
};

export type OrderParams = {
  keyword?: string;
  orderStatus?: string;
  page?: number;
  perPage?: number;
};

export type OrderPagination = {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  perPage: number;
};

export type OrdersResponse = {
  orders: Order[];
  pagination: OrderPagination;
};

export type OrderCounts = {
  orderTasksCount: number;
};

export type OrderItem = {
  id: number;
  name: string;
  designer: string;
  color: string;
  size: string;
  price: number;
  originalPrice: number;
  quantity: number;
};

export type OrderDetail = {
  id: number;
  number: string;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  orderedAt: string;
  notes: string | null;

  shipping: {
    name: string;
    email: string;
    postalCode: string;
    prefecture: string;
    city: string;
    addressLine1: string;
    addressLine2: string | null;
    phoneNumber: string;
  };

  payment: {
    method: "card" | "cod";
    status: string;
    total: number;
    shippingFee: number;
  };

  shipment: {
    status: "pending" | "shipped";
    carrierName: string;
    trackingNumber: string | null;
    shippedAt: string | null;
  };

  items: OrderItem[];
};

export type ShipOrderParams = {
  orderId: number;
  carrier: string;
  trackingNumber: string;
};
