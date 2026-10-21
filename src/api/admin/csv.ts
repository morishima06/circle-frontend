import client from "@/lib/api/client";

export const exportOrdersCSV = (orderIds: number[]) =>
  client.post(
    "/admin/csv/orders",
    { order_ids: orderIds },
    { responseType: "blob" },
  );

export const exportCustomersCSV = (customerIds: number[]) =>
  client.post(
    "/admin/csv/customers",
    { customer_ids: customerIds },
    { responseType: "blob" },
  );
