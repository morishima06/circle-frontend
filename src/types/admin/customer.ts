export type Customer = {
  id: number;
  name: string;
  email: string;
  status: "active" | "suspended" | "banned" | "withdrawn";
  phoneNumber: string | null;
  createdAt: string;
};

export type CustomerParams = {
  keyword?: string;
  status?: string[];
  page?: number;
  perPage?: number;
};

export type CustomerPagination = {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  perPage: number;
};

export type CustomerResponse = {
  customers: Customer[];
  pagination: CustomerPagination;
};
