import client from "@/lib/api/client";

export const addCartItem = ({
  skuId,
  quantity,
}: {
  skuId: number;
  quantity: number;
}) => {
  return client.post("/api/v1/cart_items", {
    sku_id: skuId,
    quantity,
  });
};

export const updateCartItem = ({
  skuId,
  quantity,
}: {
  skuId: number;
  quantity: number;
}) => {
  return client.patch(`/api/v1/cart_items/${skuId}`, { quantity });
};

export const destroyCartItem = (skuId: number) => {
  return client.delete(`/api/v1cart_items/${skuId}`);
};
